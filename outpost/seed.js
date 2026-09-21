const seed = {
  posts: [
    {
      id: "p0",
      kind: "TEASER",
      status: "ready",
      when: "Tonight",
      target: "HUD sliver",
      media: "Tight HUD crop. No wide blockout.",
      body: "The glass got thinner.\n\n39% \u2192 26%."
    },
    {
      id: "p1",
      kind: "SCHEDULE",
      status: "ready",
      when: "Next quiet morning",
      target: "Licence in the air",
      media: "",
      body: "The lion got released into the wild and half the timeline is still arguing about the floor.\n\n220 assets. Open licence. $50k behind whoever builds something.\n\nI've been building the place they land in for months. Now I get to say what it is."
    },
    {
      id: "p2",
      kind: "DRAFT",
      status: "ready",
      when: "After a creature close-up exists",
      target: "Companion sliver",
      media: "Creature close-up only",
      body: "Every NFT game gives you a skin.\n\nMine gives you a partner.\n\nWalks in with you. Own health. Reaches the cache you can't. When it drops, it dissolves into you and heals you.\n\nYou don't wear it. It helps you."
    },
    {
      id: "p3",
      kind: "DRAFT",
      status: "ready",
      when: "After a real clip",
      target: "Name HUBPLACE + proof",
      media: "HUD or creature crop",
      body: "HUBPLACE. Browser. Phone.\n\n206 tests passing. Full run recorded at 124 seconds.\n\nNot a deck. Not a roadmap. You can play it.\n\nStill ugly in places. Fixing that this week."
    },
    {
      id: "p4",
      kind: "SCHEDULE",
      status: "ready",
      when: "Thu Sep 25 morning PDT",
      target: "Grant opens",
      media: "",
      body: "Applications for the Loaded Lions Open License grants open today.\n\nI'm putting HUBPLACE in.\n\nTen projects, $5k each. I'd rather be one of ten builders than one of a thousand people posting about it."
    },
    {
      id: "p5",
      kind: "DRAFT",
      status: "ready",
      when: "Anytime",
      target: "Browser",
      media: "",
      body: "No download. No app store. No install.\n\nA link. You tap it and you're standing in it."
    }
  ],
  replies: [
    { id: "r1", target: "Open License / grant threads", body: "Applying. Browser world on Cronos. The NFT helps you instead of dressing you.\n\nPutting HUBPLACE in when the form opens the 25th.\n#899" },
    { id: "r2", target: "Other grant applicants", body: "Good luck on the 25th. More builders on the licence is the whole point of opening it." },
    { id: "r3", target: "Mane City", body: "Not a city-builder. Not competing with Mane City. A holder can play both.\n\nMine is a browser world where the thing you own walks in with you." }
  ],
  tracker: [
    { q: "HubPlace OR hubplace OR \"hub place\"", why: "Product mentions" },
    { q: "from:LoadedLions_CDC", why: "Grant and licence" },
    { q: "Open License OR LionGrant Loaded Lions", why: "Application chatter" },
    { q: "from:ManeCityGame", why: "Game-layer context" }
  ],
  reveal: [
    { step: 1, status: "now", title: "The glass", note: "HUD number. No name. Tonight." },
    { step: 2, status: "next", title: "The air", note: "Licence opened. Still no HUBPLACE." },
    { step: 3, status: "wait", title: "The partner", note: "Companion idea. Creature close-up only." },
    { step: 4, status: "wait", title: "The link", note: "Browser. No download." },
    { step: 5, status: "wait", title: "The name", note: "Say HUBPLACE once, with proof." },
    { step: 6, status: "wait", title: "The ask", note: "Sep 25: I'm putting HUBPLACE in." },
    { step: 7, status: "locked", title: "The title", note: "Game name stays dark until you unlock it." }
  ],
  never: [
    "The Vault",
    "Partner-token system",
    "Live wallet gate (it is not live)",
    "Mint / price / supply / Sigil rates",
    "Grant outcome or backed",
    "Collection PFP art or 3D of a specific token",
    "Wide untextured blockout",
    "official / partner / APY / floor / LFG"
  ],
  calendar: [
    { day: "Tonight", item: "The glass got thinner. 39% \u2192 26%." },
    { day: "Fri\u2013Sun", item: "One sliver max. Tight crop only." },
    { day: "Mon 21", item: "Quiet replies. Generous to other applicants." },
    { day: "Thu 25", item: "Name HUBPLACE once. Applying, not awarded." },
    { day: "15 Oct", item: "Window closes." },
    { day: "15\u201318 Oct", item: "Say nothing about the outcome until they do." }
  ]
};
