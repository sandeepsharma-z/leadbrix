const makeSections = (post) => [
  {
    id: "why-it-matters",
    title: `Why ${post.shortTitle} matters now`,
    paragraphs: [
      `${post.challenge} Customers now compare brands across search, social media, websites and reviews before they speak to a sales team. That means every digital touchpoint has to communicate the same promise, answer the right question and make the next step obvious.`,
      `The strongest approach is not to chase every new tactic. It is to build a focused system around audience intent, useful content, a clear offer and reliable measurement. When those pieces work together, marketing becomes easier to improve and far more predictable.`
    ]
  },
  {
    id: "strong-foundation",
    title: "Start with a strong strategic foundation",
    paragraphs: [
      `${post.approach} Before choosing channels or budgets, define the business outcome, the audience segment and the action that matters most. This keeps creative work and campaign decisions connected to commercial goals rather than surface-level engagement.`,
      `Document the customer journey from first discovery to final enquiry. Note the questions people ask, the proof they need and the objections that slow them down. This simple map becomes the foundation for page structure, campaign messaging and follow-up communication.`
    ],
    bullets: post.points
  },
  {
    id: "execution-framework",
    title: "A practical execution framework",
    paragraphs: [
      `Break the strategy into a small number of repeatable activities. Create one clear campaign theme, develop supporting assets for each stage of intent and connect every asset to a relevant landing page. Consistency improves recall while focused landing pages make performance easier to understand.`,
      `Work in short cycles. Launch a credible first version, collect real behaviour data and improve the weakest point before adding more complexity. A disciplined monthly rhythm normally produces better results than a large campaign that is reviewed only after the budget has been spent.`
    ],
    bullets: [
      "Define one primary conversion and one supporting conversion.",
      "Match each message to a specific audience need or search intent.",
      "Use clear ownership, deadlines and a shared reporting view.",
      "Review quality of enquiries, not only traffic or click volume."
    ]
  },
  {
    id: "measurement",
    title: "Measure what moves the business",
    paragraphs: [
      `A useful dashboard should explain what happened, why it happened and what the team will do next. Track reach and engagement for context, but make qualified enquiries, conversion rate, acquisition cost and revenue contribution the centre of the conversation.`,
      `${post.metric} Compare results by channel, audience, offer and landing page. Over time, this reveals which combinations create genuine demand and which ones only create activity. Keep reporting simple enough that leadership can use it to make decisions.`
    ],
    quote: "Good marketing reporting should lead to a decision, not simply describe a number."
  },
  {
    id: "mistakes",
    title: "Common mistakes to avoid",
    paragraphs: [
      `The most common mistake is treating a channel as a strategy. Posting more, increasing bids or redesigning a page cannot solve unclear positioning. Another mistake is changing too many variables at once, which makes it impossible to understand what actually improved the result.`,
      `Avoid measuring success too early. Some channels capture existing demand while others create future preference. Use realistic evaluation windows, protect brand consistency and keep a record of tests so the team does not repeat the same experiments.`
    ],
    bullets: [
      "Copying competitors without understanding their audience or economics.",
      "Sending every campaign to the same generic page.",
      "Optimising for cheap clicks instead of qualified opportunities.",
      "Ignoring mobile experience, page speed and follow-up time."
    ]
  },
  {
    id: "next-steps",
    title: "Turn the insight into action",
    paragraphs: [
      `${post.action} Choose the highest-impact gap, assign a clear owner and define the evidence that will show improvement. A focused 30-day plan is more valuable than a long list of disconnected ideas.`,
      `At LeadBrix, we combine strategy, creative execution and performance measurement so every improvement supports the same growth goal. If you want an outside view of your current system, start with a focused audit and use the findings to build a practical roadmap.`
    ]
  }
];

const rawPosts = [
  {
    slug: "digital-marketing-strategies-2026",
    category: "Digital Strategy",
    title: "10 Proven Digital Marketing Strategies to Grow Your Business in 2026",
    shortTitle: "digital marketing strategy",
    excerpt: "A practical framework for attracting the right audience, generating qualified leads and building sustainable business growth.",
    date: "Nov 12, 2026",
    readTime: "10 min read",
    image: "/images/home-redesign/blog-digital-growth.png",
    challenge: "Digital growth has become more competitive, more measurable and more connected than ever.",
    approach: "Begin with positioning and customer intent, then choose the smallest channel mix capable of reaching the goal.",
    metric: "For a complete growth programme, connect campaign data with CRM stages so the team can see which sources create real sales opportunities.",
    action: "Audit your current funnel from first impression to sales follow-up and identify the single point where the most valuable prospects are being lost.",
    points: ["Clarify the audience and the problem your offer solves.", "Build content around real buying questions.", "Create landing pages for specific campaigns and intent.", "Use retargeting and thoughtful follow-up to stay relevant."]
  },
  {
    slug: "seo-tactics-for-business-growth",
    category: "SEO",
    title: "How to Improve Your Website Ranking with Proven SEO Tactics",
    shortTitle: "SEO",
    excerpt: "Build lasting organic visibility with search intent, helpful content, technical clarity and authority signals that support real enquiries.",
    date: "Nov 08, 2026",
    readTime: "9 min read",
    image: "/images/home-redesign/blog-seo.png",
    challenge: "Search engines reward pages that solve a clear problem and offer a dependable user experience.",
    approach: "Start by grouping keywords by intent and map each group to one useful, well-structured page.",
    metric: "Measure non-branded impressions, meaningful ranking movement, engaged organic sessions and conversions from priority landing pages.",
    action: "Review the pages already receiving impressions, improve their intent match and internal linking, and fix technical issues that limit crawling or usability.",
    points: ["Create one authoritative page for each important intent.", "Strengthen titles, headings and internal links.", "Improve speed, mobile usability and crawlability.", "Earn relevant mentions through genuinely useful resources."]
  },
  {
    slug: "google-ads-vs-organic-traffic",
    category: "Google Ads",
    title: "Google Ads vs. Organic Traffic: Which Is Right for Your Business?",
    shortTitle: "paid and organic acquisition",
    excerpt: "Understand the role, cost and timing of paid search and SEO—and learn how to use both without wasting budget.",
    date: "Nov 05, 2026",
    readTime: "8 min read",
    image: "/images/home-redesign/blog-google-ads.png",
    challenge: "Paid search creates immediate visibility while organic search builds durable discovery, but they solve different timing and demand problems.",
    approach: "Use commercial intent, sales value, competition and the speed of feedback to decide the right investment split.",
    metric: "Compare qualified lead rate and cost per opportunity for paid traffic while tracking organic growth across priority topic clusters.",
    action: "Use paid search to test messages and high-intent terms, then turn the strongest learning into landing pages and long-term organic content.",
    points: ["Protect budget with tight intent and negative keywords.", "Build dedicated pages instead of using the homepage.", "Use SEO for recurring questions and category authority.", "Share conversion insights between paid and organic teams."]
  },
  {
    slug: "social-media-marketing-guide",
    category: "Social Media",
    title: "Social Media Marketing: A Step-by-Step Guide for Business Growth",
    shortTitle: "social media marketing",
    excerpt: "Create a recognisable social presence that earns attention, builds trust and consistently supports your sales pipeline.",
    date: "Nov 02, 2026",
    readTime: "9 min read",
    image: "/images/home-redesign/blog-social-media.png",
    challenge: "Social feeds are crowded, but focused brands can still win by being useful, recognisable and consistent.",
    approach: "Select platforms based on audience behaviour and create repeatable content pillars tied to awareness, trust and conversion.",
    metric: "Track saves, meaningful replies, profile actions, assisted conversions and the quality of conversations created by each content pillar.",
    action: "Choose three content pillars, define a recognisable visual system and plan four weeks of posts around real customer questions and proof.",
    points: ["Lead with a strong idea before polishing the format.", "Balance education, proof, perspective and offers.", "Repurpose strong ideas without copying the same post.", "Respond quickly and turn comments into useful conversations."]
  },
  {
    slug: "professional-website-for-your-brand",
    category: "Web Development",
    title: "Why a Professional Website Is Essential for Your Brand in 2026",
    shortTitle: "professional web design",
    excerpt: "Turn your website into a fast, credible and conversion-focused growth asset instead of a static online brochure.",
    date: "Oct 28, 2026",
    readTime: "10 min read",
    image: "/images/home-redesign/blog-web-development.png",
    challenge: "Your website is often the first place a serious prospect checks whether your business is credible and relevant.",
    approach: "Design the information architecture around customer decisions, then support it with strong copy, proof and effortless mobile usability.",
    metric: "Monitor page speed, engagement by device, journey drop-off, form completion and the quality of enquiries from key service pages.",
    action: "Test the website as a first-time visitor on mobile and list every point where the value, proof or next action feels unclear.",
    points: ["Explain who you help and why you are different quickly.", "Use authentic proof close to decision points.", "Make navigation and calls to action unambiguous.", "Build for performance, accessibility and future updates."]
  },
  {
    slug: "business-automation-for-growth",
    category: "Automation",
    title: "Business Automation: Save Time, Reduce Costs and Grow Faster",
    shortTitle: "business automation",
    excerpt: "Identify repeatable work, connect your tools and create reliable systems that help your team scale without losing the human touch.",
    date: "Oct 20, 2026",
    readTime: "9 min read",
    image: "/images/home-redesign/blog-automation.png",
    challenge: "Manual handoffs slow response times, create inconsistent data and keep skilled people busy with repetitive work.",
    approach: "Map one workflow at a time and automate clear rules while keeping judgement, empathy and exceptions with the right person.",
    metric: "Track hours saved, response time, error rate, completion rate and the impact of faster follow-up on qualified opportunities.",
    action: "Choose one frequent, rules-based process such as lead routing or reporting, document every step and automate the safest bottleneck first.",
    points: ["Standardise the process before automating it.", "Connect forms, CRM and communication tools carefully.", "Add alerts and human review for important exceptions.", "Document ownership, permissions and recovery steps."]
  }
];

export const blogs = rawPosts.map((post) => ({ ...post, sections: makeSections(post) }));

export function getBlog(slug) {
  return blogs.find((post) => post.slug === slug);
}
