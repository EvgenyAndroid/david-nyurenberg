// /llms-full.txt: every argument in full plus the whole archive, as plain text.
import publications from '../data/publications.json';
import { ideas, themeLabels } from '../data/ideas';
import { SITE } from '../data/person';

export function GET() {
  const all = (publications as any[]).slice().sort((a, b) => b.date.localeCompare(a.date));
  const out: string[] = ['# David Nyurenberg: arguments and archive', '', `Source: ${SITE}/`, ''];
  for (const i of ideas) {
    out.push(`## ${i.num}. ${i.title}`, '', `URL: ${SITE}/ideas/${i.slug}/`, '', `Thesis: ${i.thesis}`, '');
    out.push(...i.argument.flatMap(p => [p, '']));
    if (i.quotes.length) out.push('Quotes:', ...i.quotes.map(q => `- "${q.text}" (${q.source}, ${q.url})`), '');
    if (i.numbers.length) out.push('Numbers:', ...i.numbers.map(n => `- ${n.value}: ${n.label} (${n.source}, ${n.url})`), '');
  }
  out.push('## Archive', '');
  for (const e of all) {
    const themes = (e.themes || []).filter((t: string) => t !== 'career').map((t: keyof typeof themeLabels) => themeLabels[t]).join(', ');
    out.push(`- ${e.date} | ${e.type || ''} | ${e.venue} | ${e.title} | ${e.url}${themes ? ` | ${themes}` : ''}`);
    if (e.synopsis) out.push(`  ${e.synopsis}`);
  }
  return new Response(out.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
