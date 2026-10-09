// The four arguments David's published work keeps returning to.
// Every quote is verbatim from his own columns or interviews, and every
// number is sourced to the piece it appeared in. The argument paragraphs
// condense his published positions. They are a draft for David to put in
// his own voice.

export type Theme = 'transparency' | 'measurement' | 'incentives' | 'agentic' | 'career';

export const themeLabels: Record<Theme, string> = {
  transparency: 'Show-level transparency',
  measurement: 'TV is not search',
  incentives: 'Incentives',
  agentic: 'Agentic buying',
  career: 'Career',
};

export type Idea = {
  slug: string;
  theme: Theme;
  num: string;
  title: string;      // the claim, short
  thesis: string;     // one sentence
  argument: string[]; // paragraphs
  quotes: { text: string; source: string; url: string }[];
  numbers: { value: string; label: string; source: string; url: string }[];
};

const ADX_YT = 'https://www.adexchanger.com/data-driven-thinking/ctv-is-less-transparent-than-youtube-that-should-alarm-everyone/';
const ADX_94 = 'https://www.adexchanger.com/tv/ctv-buyers-are-getting-the-show-level-performance-optimization-theyve-always-wanted/';
const ADW_23 = 'https://www.adweek.com/programmatic/buyers-are-still-struggling-to-know-where-their-ads-ran/';
const ADX_1TO1 = 'https://www.adexchanger.com/on-tv-and-video/ctv-is-not-a-one-to-one-channel-so-stop-buying-it-like-one/';
const ADX_MYTHS = 'https://www.adexchanger.com/data-driven-thinking/three-advertising-industry-myths-the-market-has-already-debunked/';
const ADX_PRIV = 'https://www.adexchanger.com/data-driven-thinking/the-privacy-zealots-were-right-ad-techs-infrastructure-was-always-a-risk/';
const ADX_RACE = 'https://www.adexchanger.com/data-driven-thinking/the-race-to-the-bottom-is-over-advertisers-care-about-quality-again/';
const ADX_CALF = 'https://www.adexchanger.com/marketers/the-golden-calf-of-addressability-reevaluating-the-foundations-of-digital-advertising-2/';
const ADX_AGENT = 'https://www.adexchanger.com/ctv-roundup/how-does-agentic-buying-work-in-ctv/';
const PRN_OLY = 'https://www.prnewswire.com/news-releases/olyzon-launches-its-agentic-orchestration-platform-for-advertising-live-at-advertising-week-new-york-302900467.html';

export const ideas: Idea[] = [
  {
    slug: 'show-level-transparency',
    theme: 'transparency',
    num: '01',
    title: 'Buy streaming by the show.',
    thesis: 'You cannot optimize, protect a brand or price fairly what you are not allowed to see, and CTV still hides the one thing linear TV always showed: the program.',
    argument: [
      'Linear television was always bought and valued at the show and network level. CTV kept the screen and threw away that model, importing the audience-first habits of display and online video. Buyers get app-level reporting and, with luck, a genre label. Show-level data is mostly withheld because publishers fear buyers will cherry-pick the best content.',
      'The cost shows up in the market. When buyers cannot see what they are buying, budgets plateau, inventory becomes interchangeable, and the same publisher gets bought twice through different paths. Publishers lose too: content they pitch as premium is sold as an anonymous bundle the moment it goes programmatic.',
      'The fix is already working where it exists. Show-level inclusion lists built from top linear programs were the best-performing tactic when a partner exposed show data. Rain’s show-level algorithm found back doors in 2025, and in 2026 a privacy-safe content-ID framework with Peer39 and Pontiac Intelligence reported show-level CPA for 94% of a campaign’s impressions. That work became an AdExchanger Awards finalist.',
    ],
    quotes: [
      { text: 'You cannot market premium and deliver a blind bill of goods.', source: 'AdExchanger, Dec 2025', url: ADX_YT },
      { text: 'When buyers cannot see what they are buying, they cannot commit their spend with conviction.', source: 'AdExchanger, Dec 2025', url: ADX_YT },
    ],
    numbers: [
      { value: '4–10%', label: 'of open-exchange CTV impressions carried show-level data', source: 'ADWEEK, Aug 2023', url: ADW_23 },
      { value: '30–60%', label: 'of YouTube impressions show the exact video. CTV: app-level, maybe genre', source: 'AdExchanger, Dec 2025', url: ADX_YT },
      { value: '94%', label: 'of impressions with show-level CPA via Peer39 + Pontiac', source: 'AdExchanger, Jul 2026', url: ADX_94 },
    ],
  },
  {
    slug: 'tv-is-not-search',
    theme: 'measurement',
    num: '02',
    title: 'Stop measuring TV like search.',
    thesis: 'Television builds memory over weeks; judging it on attribution windows designed for intent capture makes a working channel look broken.',
    argument: [
      'The industry now describes connected TV in the vocabulary of paid search and social: outcomes, ROAS, performance. But a viewer watching a drama on a Tuesday night is not expressing intent the way a searcher is. TV’s influence is cumulative and delayed, so compressed attribution windows read it as underperformance and budgets get pulled from a channel doing exactly what it should.',
      'The same logic breaks targeting. CTV is a household screen, not a personal one, so one-to-one audience segments shrink supply, raise CPMs and concentrate delivery in the same five big markets. A better plan starts from the customer file: the ZIP codes where customers over-index, census data, lookalike markets, and direct relationships with the roughly 20 publishers that hold most viewing.',
      'None of this argues for less measurement. It argues for measurement that fits the channel: marketing mix models, incrementality tests and attribution read together, and identity treated as something to be measured rather than assumed.',
    ],
    quotes: [
      { text: 'CTV is not a personal screen; it is a household screen.', source: 'AdExchanger, Jul 2025', url: ADX_1TO1 },
      { text: 'A channel that builds memory deserves measurement capable of observing memory.', source: 'AdExchanger, Jul 2026', url: ADX_MYTHS },
    ],
    numbers: [
      { value: '~20', label: 'premium publishers, OEMs and vMVPDs hold the vast majority of CTV viewing', source: 'AdExchanger, Jul 2025', url: ADX_1TO1 },
      { value: '5', label: 'markets (NY, LA, Chicago, Miami, Houston) dominate third-party-segment delivery', source: 'AdExchanger, Jul 2025', url: ADX_1TO1 },
    ],
  },
  {
    slug: 'incentives',
    theme: 'incentives',
    num: '03',
    title: 'Follow the incentives.',
    thesis: 'Programmatic’s waste, fraud and opacity persist because the supply chain is paid to tolerate them, not because the technology is missing.',
    argument: [
      'Fifteen years of audience-first buying trained marketers to chase cheap, hypertargeted impressions validated by non-incremental attribution. That rewarded made-for-advertising sites and vendors whose incentives do not match their clients’. Quality, reach and context, the fundamentals of media planning, were traded for vanity metrics.',
      'The fix is contractual and structural before it is technical: SSP agreements that ban resold media and MFA and require make-goods, fees separated from working media, inclusion lists, and direct paths to publishers. The same lens explains curation markups, certification bodies losing ground, platform UX that adds friction, and the FTC’s case against Amazon. Opacity is a business model.',
      'It also explains privacy. An ecosystem built on broadcasting granular identity was always going to create exposure no one fully controls. Critics called that out for years and were waved off as zealots. Incentives, more than public statements, decide what the industry actually does.',
    ],
    quotes: [
      { text: 'In our industry, incentives shape behavior more than public statements or well-meaning buzzwords ever do.', source: 'AdExchanger, Mar 2026', url: ADX_PRIV },
      { text: 'The industry’s North Star of reaching the right person at the right time with the right message has always been a seductive fallacy.', source: 'AdExchanger, Jul 2024', url: ADX_CALF },
    ],
    numbers: [
      { value: '15 yrs', label: 'of audience-first buying that let MFA sites and vanity metrics thrive', source: 'AdExchanger, Nov 2024', url: ADX_RACE },
    ],
  },
  {
    slug: 'agentic-buying',
    theme: 'agentic',
    num: '04',
    title: 'Agents change what expertise means.',
    thesis: 'AI agents earn their place by shortening the distance between insight and action, with a human making the call. That takes operators, not demos.',
    argument: [
      'InterMedia runs agentic buying in production. CTV reporting from Vibe flows into Claude, and Olyzon’s orchestration layer carries decisions out to DSPs and SSPs across channels. Planners ask a question in plain language and act on the answer across platforms without rebuilding the stack.',
      'The skill shifts. Knowing which buttons to push in which platform matters less; judging which changes to make matters more. Larger holding companies and brands will likely build their own versions of these buying integrations.',
      'Agentic advertising is promising but still unproven at scale, so the bar is practical: a human makes every final decision, and the test is whether insight turns into action faster on the stack the team already runs.',
    ],
    quotes: [
      { text: 'Instead of being an expert in how to navigate a platform and push the buttons and knowing where to go, you’re an expert in being judicious about what changes to make.', source: 'AdExchanger, Oct 2026', url: ADX_AGENT },
      { text: 'Now the distance between seeing something and doing something is dramatically shorter, without rebuilding our stack around another platform.', source: 'Olyzon launch, Oct 2026', url: PRN_OLY },
    ],
    numbers: [],
  },
];

// Three pieces of work with outcomes, for the proof strip.
export const proof = [
  { year: '2026', title: 'Show-level CPA at 94% coverage', body: 'Privacy-safe content-ID framework with Peer39 and Pontiac Intelligence turned show-level reporting into live optimization signals.', url: ADX_94, source: 'AdExchanger' },
  { year: '2026', title: 'Agentic buying in production', body: 'Claude, Vibe and Olyzon wired into InterMedia’s CTV workflow, with humans approving every change.', url: ADX_AGENT, source: 'AdExchanger' },
  { year: '2025', title: 'Back doors to show-level data', body: 'A custom algorithm with Chalice to find and bid on specific streaming content when publishers would not share it.', url: 'https://www.adexchanger.com/tv/how-this-indie-agency-is-finding-back-doors-to-get-show-level-data-on-ctv/', source: 'AdExchanger' },
];
