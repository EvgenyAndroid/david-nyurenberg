// The four arguments David's published work keeps returning to.
// Every quote is verbatim from his own columns or interviews, and every
// number is sourced to the piece it appeared in. The argument paragraphs
// are written in David's first-person voice, built only from experiences
// and positions he has already published. They need his sign-off.

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
  nav: string;        // short label for the menu
  title: string;      // the claim, short
  thesis: string;     // one sentence
  argument: string[]; // paragraphs
  quotes: { text: string; source: string; url: string }[];
  numbers: { value: string; label: string; source: string; url: string }[];
  // Three pieces to read first. Each url must match an entry in publications.json.
  essentials: { role: string; url: string }[];
  // Overrides the "related work since" line when the history needs nuance.
  sinceNote?: string;
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
const R = 'https://www.rainagency.com/insights-updates/';
const PRN_OLY = 'https://www.prnewswire.com/news-releases/olyzon-launches-its-agentic-orchestration-platform-for-advertising-live-at-advertising-week-new-york-302900467.html';

export const ideas: Idea[] = [
  {
    slug: 'show-level-transparency',
    theme: 'transparency',
    num: '01',
    nav: 'Transparency',
    title: 'Buy streaming by the show.',
    thesis: 'You cannot optimize, protect a brand or price fairly what you are not allowed to see, and CTV still hides the one thing linear TV always showed: the program.',
    argument: [
      'Television was never sold blind. Linear TV has always traded at the show and network level, where price reflected what the content cost to make and how much people cared about it. CTV kept the screen and threw that model away. I get app-level reporting and, if I’m lucky, a genre label. Show-level data is withheld because publishers are afraid I’ll cherry-pick their best programs. That is not innovation. It’s a regression.',
      'The cost is already showing up. Publishers tell me privately that CTV spend is flattening and buyers are hesitant to push more budget. Of course they are. When you can’t see what you’re buying, every package looks the same, optimization turns into guesswork, and you end up buying the same publisher twice through two different paths. Publishers lose too. Every sales pitch I hear is about the content, and the moment that inventory goes programmatic, the content disappears.',
      'I know what happens when the lights come on. When a partner gave me true show-level transparency, an inclusion list built from top-performing linear shows was the best tactic in the entire campaign. At Rain we built an algorithm to find back doors to show-level data. At InterMedia, working with Peer39 and Pontiac, we got show-level CPA on 94% of a campaign’s impressions, all privacy-safe. I teared up at the first spreadsheet. The Holy Grail is in reach. My challenge to the CTV industry is simple: be better than Google.',
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
    essentials: [
      { role: 'The clearest explanation', url: ADX_YT },
      { role: 'The strongest case study', url: ADX_94 },
      { role: 'The latest development', url: 'https://podcast.stateofstreaming.com/david-nyurenberg-intermedia-s5e5/' },
    ],
  },
  {
    slug: 'tv-is-not-search',
    theme: 'measurement',
    num: '02',
    nav: 'Measurement',
    title: 'Stop measuring TV like search.',
    thesis: 'Television builds memory over weeks; judging it on attribution windows designed for intent capture makes a working channel look broken.',
    argument: [
      'Somewhere along the way we started talking about TV in the language of paid search and social: outcomes, ROAS, performance. But someone watching a drama on a Tuesday night is not typing a query into a search box. One is watching content. The other is expressing intent. TV works over weeks and months, and when you judge it on attribution windows built for search, it looks like it failed when it’s doing exactly what it was built to do.',
      'We made the same mistake with targeting. CTV is not a personal screen; it’s a household screen. A logged-in profile doesn’t tell you who is on the couch. Pile on third-party segments and supply shrinks, CPMs climb, and delivery collapses into the same five markets every time. I start somewhere else: the customer file, the ZIP codes where customers over-index, census data and lookalike markets. Then I buy direct from the roughly 20 publishers that hold most of the viewing.',
      'I’m not arguing for less measurement. I’m arguing for measurement that fits the channel, with each tool doing the job it’s good at. Show-level CPA is an in-flight signal: it tells me which programs to lean into and which to cut while the campaign is still running. Incrementality tests and mix models answer the bigger question of whether TV is building the business over time. Read them together, and treat identity as a standard you measure, not an assumption you make. Plan CTV like linear: context first, geography informed, built for households, not IDs.',
    ],
    quotes: [
      { text: 'CTV is not a personal screen; it is a household screen.', source: 'AdExchanger, Jul 2025', url: ADX_1TO1 },
      { text: 'A channel that builds memory deserves measurement capable of observing memory.', source: 'AdExchanger, Jul 2026', url: ADX_MYTHS },
    ],
    numbers: [
      { value: '~20', label: 'premium publishers, OEMs and vMVPDs hold the vast majority of CTV viewing', source: 'AdExchanger, Jul 2025', url: ADX_1TO1 },
      { value: '5', label: 'markets (NY, LA, Chicago, Miami, Houston) dominate third-party-segment delivery', source: 'AdExchanger, Jul 2025', url: ADX_1TO1 },
    ],
    essentials: [
      { role: 'The clearest explanation', url: 'https://www.signalandnoise.ai/post/tv-was-never-built-to-behave-like-meta' },
      { role: 'The strongest case study', url: R + 'case-study-leveraging-metadata-optimization-in-connected-tv-advertising/' },
      { role: 'The latest development', url: ADX_MYTHS },
    ],
  },
  {
    slug: 'incentives',
    theme: 'incentives',
    num: '03',
    nav: 'Incentives',
    title: 'Follow the incentives.',
    thesis: 'Programmatic’s waste, fraud and opacity persist because the supply chain is paid to tolerate them, not because the technology is missing.',
    argument: [
      'Early in my career, on the ad tech vendor side, I watched audiences get swapped or dropped to hit budgets without the client ever knowing. The performance metrics didn’t move, so nobody asked. That stuck with me. Fifteen years of audience-first buying trained a generation of marketers to chase cheap, hypertargeted impressions, and the people who benefited most were made-for-advertising sites and vendors whose incentives never matched their clients’.',
      'You don’t fix that with another tool. You fix it with contracts and structure. At Rain, our SSP agreements prohibited resold media and MFA sites, required ads.txt compliance and restricted delivery to our inclusion list, and when a partner missed, we required make-goods. We broke tech, audience and platform fees out of working media. Look at curation markups, certification bodies losing ground or the FTC’s case against Amazon through the same lens and you see the same thing. Opacity isn’t a bug. It’s a business model.',
      'The same goes for privacy. I’ve been saying for years that addressable advertising was a strategic mistake. An ecosystem built on broadcasting granular identity was always going to create exposure no one could control. The critics we waved off as zealots were right. In our industry, what people are paid to do beats what they say every time.',
    ],
    quotes: [
      { text: 'In our industry, incentives shape behavior more than public statements or well-meaning buzzwords ever do.', source: 'AdExchanger, Mar 2026', url: ADX_PRIV },
      { text: 'The industry’s North Star of reaching the right person at the right time with the right message has always been a seductive fallacy.', source: 'AdExchanger, Jul 2024', url: ADX_CALF },
    ],
    numbers: [
      { value: '15 yrs', label: 'of audience-first buying that let MFA sites and vanity metrics thrive', source: 'AdExchanger, Nov 2024', url: ADX_RACE },
    ],
    essentials: [
      { role: 'The clearest explanation', url: ADX_RACE },
      { role: 'The strongest case study', url: R + 'fighting-winning-the-battle-against-made-for-advertising-sites/' },
      { role: 'The latest development', url: 'https://www.adexchanger.com/platforms/the-ftcs-amazon-lawsuit-is-ad-techs-history-of-opacity-repeating-itself/' },
    ],
  },
  {
    slug: 'agentic-buying',
    theme: 'agentic',
    num: '04',
    nav: 'AI',
    title: 'Agents change what expertise means.',
    thesis: 'AI agents earn their place by shortening the distance between insight and action, with a human making the call. That takes operators, not demos.',
    argument: [
      'We used to spend a ridiculous amount of time bouncing between platforms, digging through spreadsheets for insights, and then acting on them by hand. Now our CTV reporting flows into Claude, and Olyzon carries the decisions out to DSPs and SSPs across channels. I can ask how a campaign is doing in plain language and act on the answer across platforms with a single prompt, without rebuilding our stack around another platform.',
      'That changes what it means to be an expert. It used to mean knowing your way around a platform: which buttons to push and where to go. Now it means being judicious about which changes to make. I expect the big holding companies and brands to build their own versions of these integrations.',
      'Agentic advertising is promising, and it is still unproven at scale. My bar is practical. A human makes every final call, and the only test that matters is whether the distance between seeing something and doing something gets shorter on the stack you already run.',
    ],
    quotes: [
      { text: 'Instead of being an expert in how to navigate a platform and push the buttons and knowing where to go, you’re an expert in being judicious about what changes to make.', source: 'AdExchanger, Oct 2026', url: ADX_AGENT },
      { text: 'Now the distance between seeing something and doing something is dramatically shorter, without rebuilding our stack around another platform.', source: 'Olyzon launch, Oct 2026', url: PRN_OLY },
    ],
    numbers: [],
    essentials: [
      { role: 'The clearest explanation', url: ADX_AGENT },
      { role: 'In production', url: PRN_OLY },
      { role: 'Where it started: custom AI algorithms', url: R + 'case-study-revolutionizing-ctv-with-custom-ai-algorithms/' },
    ],
    sinceNote: 'AI optimization work since 2024 · agentic buying since 2026',
  },
];

// Three pieces of work with outcomes, for the proof strip.
export const proof = [
  { year: '2026', org: 'InterMedia Advertising', title: 'Laundry Sauce: show-level CPA, optimized live',
    body: 'In a closed beta on an open-auction CTV campaign for the detergent brand, a privacy-safe content-ID framework with Peer39 and Pontiac Intelligence reported results by show. Fed back into the live campaign, AdExchanger reported:',
    stats: [{ v: '94%', l: 'impressions with show-level reporting' }, { v: '+64%', l: 'add-to-cart conversions' }, { v: '2.5×', l: 'page-view-to-cart rate on optimized impressions' }],
    url: ADX_94, source: 'AdExchanger, Jul 2026' },
  { year: '2026', org: 'InterMedia Advertising', title: 'Agentic buying in production',
    body: 'CTV reporting from Vibe flows into Claude; Olyzon carries decisions out to DSPs and SSPs across channels, with a human approving every change.',
    url: ADX_AGENT, source: 'AdExchanger, Oct 2026' },
  { year: '2025', org: 'Rain the Growth Agency', title: 'Back doors to show-level data',
    body: 'Rain built a custom algorithm with Chalice to find and bid on specific streaming content when publishers would not share show-level data.',
    url: 'https://www.adexchanger.com/tv/how-this-indie-agency-is-finding-back-doors-to-get-show-level-data-on-ctv/', source: 'AdExchanger, Feb 2025' },
];

// 2026 AdExchanger Awards, from AdExchanger's official winners page.
export const awards = {
  url: 'https://www.adexchanger.com/go/awards-2026/',
  wins: [
    { category: 'Most Innovative Use of CTV Technology', entry: 'The first privacy-safe framework for show-level buying and optimization in programmatic CTV' },
    { category: 'Best Use of Data by an Agency', entry: 'Closing the Loop, with CarShield, NBC, Paramount and Tubi' },
  ],
};
