// /llms.txt: a plain-text map of the site for LLMs and AI answer engines
// (llmstxt.org). Generated from the same data as the pages, so it never drifts.
import publications from '../data/publications.json';
import { ideas, proof, awards } from '../data/ideas';
import { SITE, LINKEDIN, EMAIL } from '../data/person';

export function GET() {
  const all = (publications as any[]).slice().sort((a, b) => b.date.localeCompare(a.date));
  const authored = all.filter(e => e.type === 'Authored');
  const lines = [
    '# David Nyurenberg',
    '',
    '> SVP, Digital at InterMedia Advertising. Media buyer and writer arguing that streaming TV (CTV) should be bought like television: by the show, for the household, with incentives in plain sight, and with AI agents that make operators sharper. His team won the 2026 AdExchanger Award for Most Innovative Use of CTV Technology.',
    '',
    `Previously led video product development and innovation at Rain the Growth Agency, founded the consultancy Valor Digital, and began on the publisher side at Gameloft. Writes for AdExchanger. Contact: ${EMAIL} or ${LINKEDIN}`,
    '',
    '## Arguments',
    '',
    ...ideas.map(i => `- [${i.title}](${SITE}/ideas/${i.slug}/): ${i.thesis}`),
    '',
    '## Work with outcomes',
    '',
    ...proof.map(p => `- [${p.title}](${p.url}) (${p.org}, ${p.year}): ${p.body}${p.stats ? ' ' + p.stats.map(s => `${s.v} ${s.l}`).join('; ') + '.' : ''}`),
    ...awards.wins.map(w => `- 2026 AdExchanger Award winner, ${w.category} (InterMedia Advertising): ${w.entry}. Source: ${awards.url}`),
    '',
    '## Authored writing',
    '',
    ...authored.map(e => `- [${e.title}](${e.url}) (${e.venue}, ${e.date})`),
    '',
    '## Optional',
    '',
    `- [Full text of all four arguments and the complete press archive](${SITE}/llms-full.txt)`,
    `- [Searchable archive of all ${all.length} publications, interviews, podcasts and talks](${SITE}/archive/)`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
