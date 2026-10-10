// schema.org Person for David, shared by the JSON-LD on every page and by
// /llms.txt. Facts come from his published press only.
import { awards } from './ideas';

export const SITE = 'https://david-nyurenberg.com';
export const LINKEDIN = 'https://www.linkedin.com/in/david-nyurenberg-1b56578b/';
export const EMAIL = 'dnyurenberg@gmail.com';

export const person = {
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: 'David Nyurenberg',
  url: `${SITE}/`,
  image: `${SITE}/david-nyurenberg-headshot.jpg`,
  jobTitle: 'SVP, Digital',
  worksFor: { '@type': 'Organization', name: 'InterMedia Advertising' },
  alumniOf: [
    { '@type': 'Organization', name: 'Rain the Growth Agency' },
    { '@type': 'Organization', name: 'Valor Digital' },
  ],
  email: `mailto:${EMAIL}`,
  sameAs: [LINKEDIN, 'https://www.adexchanger.com/tag/david-nyurenberg/'],
  knowsAbout: ['Connected TV advertising', 'Programmatic advertising', 'Show-level transparency', 'Media measurement', 'Marketing mix modeling', 'Agentic advertising'],
  award: awards.wins.map(w => `2026 AdExchanger Award, ${w.category} (InterMedia Advertising)`),
};
