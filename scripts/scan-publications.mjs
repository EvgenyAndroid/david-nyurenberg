// Weekly scan for new David Nyurenberg coverage.
//
// Pulls candidates from news feeds, drops anything already on the site (or in
// src/data/scan-ignore.json), confirms each page actually names him, and
// appends the survivors to src/data/publications.json. The workflow then
// opens a PR so a human checks type + synopsis before it goes live.
//
// Writes a markdown summary to scan-report.md for the PR body.
import fs from 'node:fs';

const PUBS = 'src/data/publications.json';
const IGNORE = 'src/data/scan-ignore.json';
const NAME = /nyurenberg/i;
const UA = 'Mozilla/5.0 (compatible; david-nyurenberg.com publication scan)';

const FEEDS = [
  'https://www.adexchanger.com/tag/david-nyurenberg/feed/',
  'https://www.bing.com/news/search?q=%22David+Nyurenberg%22&format=rss',
];

const VENUES = {
  'adexchanger.com': 'AdExchanger',
  'adweek.com': 'ADWEEK',
  'digiday.com': 'Digiday',
  'prnewswire.com': 'PR Newswire',
  'stateofstreaming.com': 'State of Streaming',
  'marketecture.tv': 'Marketecture',
  'iheart.com': 'AdTechGod Pod',
};

// Index pages, not articles.
const SKIP_PATH = /\/(tag|author|category|topics?|search)\//i;

function normUrl(u) {
  try {
    const x = new URL(u);
    return (x.hostname.replace(/^www\./, '') + x.pathname.replace(/\/+$/, '')).toLowerCase();
  } catch { return u; }
}
function titleKey(s) {
  return s.toLowerCase().replace(/&amp;/g, '&').replace(/[^a-z0-9]+/g, ' ').trim();
}
function decode(s) {
  return s
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&[lr]squo;/g, "'").replace(/&[lr]dquo;/g, '"').replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .trim();
}
async function get(url) {
  const r = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.text();
}

// Feed items → article URLs. Bing wraps links in an apiclick redirect.
function itemsFrom(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => {
    let link = decode((m[1].match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '');
    const wrapped = link.match(/[?&]url=([^&]+)/);
    if (wrapped) link = decodeURIComponent(wrapped[1]);
    return link;
  }).filter(Boolean);
}

function meta(html, ...keys) {
  for (const k of keys) {
    const re = new RegExp(`<meta[^>]+(?:property|name)=["']${k}["'][^>]+content=["']([^"']*)["']`, 'i');
    const m = html.match(re);
    if (m) return decode(m[1]);
  }
  return '';
}
function publishedDate(html) {
  const d = meta(html, 'article:published_time', 'datePublished', 'pubdate')
    || (html.match(/"datePublished"\s*:\s*"([^"]+)"/) || [])[1]
    || (html.match(/<time[^>]+datetime=["']([^"']+)["']/i) || [])[1]
    || '';
  return /^\d{4}-\d{2}-\d{2}/.test(d) ? d.slice(0, 10) : '';
}
function guessType(url, html) {
  if (/prnewswire\.com/.test(url)) return 'Press Release';
  if (/podcast|iheart|spotify|apple\.com\/.*podcast/i.test(url)) return 'Podcast';
  if (/data-driven-thinking/i.test(url) || /"articleSection":\[?"Data-Driven Thinking"/.test(html)) return 'Authored';
  return 'Quoted';
}
function context(html) {
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const i = text.search(NAME);
  return i < 0 ? '' : decode(text.slice(Math.max(0, i - 160), i + 200));
}

const pubs = JSON.parse(fs.readFileSync(PUBS, 'utf8'));
const ignore = fs.existsSync(IGNORE) ? JSON.parse(fs.readFileSync(IGNORE, 'utf8')) : [];
const knownUrls = new Set([
  ...pubs.flatMap(p => [p.url, ...(p.links || []).map(l => l.url)]).filter(Boolean).map(normUrl),
  ...ignore.map(normUrl),
]);
const knownTitles = new Set(pubs.map(p => titleKey(p.title)));

const candidates = new Set();
for (const feed of FEEDS) {
  try { itemsFrom(await get(feed)).forEach(u => candidates.add(u)); }
  catch (e) { console.warn(`feed failed: ${e.message}`); }
}

const added = [];
const seen = new Set();
for (const url of candidates) {
  const key = normUrl(url);
  if (seen.has(key) || knownUrls.has(key) || SKIP_PATH.test(new URL(url).pathname)) continue;
  seen.add(key);
  let html;
  try { html = await get(url); } catch (e) { console.warn(`skip ${e.message}`); continue; }
  if (!NAME.test(html)) continue;
  const title = (meta(html, 'og:title', 'twitter:title') || decode((html.match(/<title>([^<]*)/i) || [])[1] || ''))
    .replace(/\s+[|–-]\s+[^|–-]+$/, '').trim();
  if (!title || knownTitles.has(titleKey(title))) continue;
  const host = new URL(url).hostname.replace(/^www\./, '');
  const venue = Object.entries(VENUES).find(([h]) => host.endsWith(h))?.[1] || meta(html, 'og:site_name') || host;
  const entry = {
    date: publishedDate(html) || new Date().toISOString().slice(0, 7),
    venue,
    title,
    type: guessType(url, html),
    synopsis: meta(html, 'og:description', 'description'),
    url: url.split('?')[0],
  };
  added.push({ entry, context: context(html) });
  knownTitles.add(titleKey(title));
}

if (added.length) {
  pubs.push(...added.map(a => a.entry));
  pubs.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  fs.writeFileSync(PUBS, JSON.stringify(pubs, null, 2) + '\n');
}

const report = added.length
  ? [
      `Found **${added.length}** new item(s) naming David. Before merging, check each one's \`type\` (guessed) and \`synopsis\` (copied from the page description, not about David's role).`,
      'To reject an item, delete it from `publications.json` and add its URL to `src/data/scan-ignore.json` so later scans skip it.',
      '',
      ...added.map(({ entry: e, context: c }) =>
        `### ${e.title}\n${e.date} · ${e.venue} · guessed **${e.type}** · ${e.url}\n\n> …${c}…\n`),
    ].join('\n')
  : 'No new items.';
fs.writeFileSync('scan-report.md', report + '\n');
console.log(`added ${added.length}`);
