// Programs on /start-now/cart, the program picker after the Learner Stories
// page (it replaces learner.skillcase.in/start-now/cart, which still works).
//
// `courseSnapshot` is the learner site's `cart_blocks`, copied from its
// content API (GET learnerapi.skillcase.in/api/trust-page/content) on
// 2026-10-29. The page shows this copy first, then swaps in the live list
// through /api/cart/blocks (src/worker.js), so prices, seat notes and offers
// edited in the CMS show up without a rebuild. `id` is the block id the
// checkout API expects; payment runs through /api/cart/checkout, which asks
// the learner API for a Razorpay payment link.
export const courseSnapshot = [
  {
    id: 1,
    title: "End-to-End Germany Program",
    description: "Language Training, Interview Preparation, Job Placement, Recognition, Visa & Relocation Support.",
    price_paise: 8600000,
    is_recommended: true,
    show_gst_badge: false,
    urgency_badge_text: "Only 3 seats left!",
  },
  {
    id: 2,
    title: "Language Training + Job Placement",
    description: "Complete guidance to start your Germany journey.",
    price_paise: 720000,
    is_recommended: false,
    show_gst_badge: false,
    urgency_badge_text: "5 seats left",
  },
  {
    id: 3,
    title: "Crash Course (B1/B2)",
    description: "Fast-track revision for interview and language preparation.",
    price_paise: 1000000,
    is_recommended: false,
    show_gst_badge: false,
    urgency_badge_text: "5 seats left",
  },
  {
    id: 4,
    title: "Job Placement Services",
    description: "Hospital interviews and placement support.",
    price_paise: 1000000,
    is_recommended: false,
    show_gst_badge: false,
    urgency_badge_text: "5 seats left",
  },
  {
    id: 5,
    title: "A1 Standalone",
    description: "Beginner German Language Course.",
    price_paise: 1500000,
    is_recommended: false,
    show_gst_badge: true,
    urgency_badge_text: "5 seats left",
  },
  {
    id: 6,
    title: "A2 Standalone",
    description: "Elementary German Language Course.",
    price_paise: 1500000,
    is_recommended: false,
    show_gst_badge: true,
    urgency_badge_text: "5 seats left",
  },
  {
    id: 7,
    title: "B1 Standalone",
    description: "Intermediate German Language Course.",
    price_paise: 2500000,
    is_recommended: false,
    show_gst_badge: true,
    urgency_badge_text: "5 seats left",
  },
  {
    id: 8,
    title: "B2 Standalone",
    description: "Advanced German Language Course.",
    price_paise: 2500000,
    is_recommended: false,
    show_gst_badge: true,
    urgency_badge_text: "5 seats left",
  },
];

// Website-only details, by block id: which group a program sits in, how it
// is labelled and its card's photo (`image`, 240px square crops of the
// site's own photos in public/assets/images/cart). Each `includes` line restates
// the CMS description; don't add promises it doesn't make. A block the CMS
// adds later without an entry here gets a card with its own title and an
// icon in place of a photo.
//
// Struck-out prices must be real comparisons. India's consumer protection
// rules and Meta's and Google's ad policies treat a made-up "was" price as
// misleading, so:
// - `regular` is a program's real regular price, one it is or was actually
//   sold at (in paise, on the same basis as its price, so "+ GST" items
//   compare before GST). These are the prices in Skillcase's own records,
//   quoted to students who come to the team directly: 40% above the online
//   price, rounded up to the next ₹1,000 (confirmed by the owner,
//   2026-10-29). If an online price changes in the CMS, check its regular
//   price with the team; never set one that isn't really charged.
// - `separately` lists the programs a bundle covers that are sold here on
//   their own; its struck price is their regular prices added up (the
//   owner's request, 2026-10-29), with GST where they're "+ GST". Each part
//   counts once: other bundles and overlapping courses stay out.
export const courseExtras = {
  1: {
    group: "complete",
    // German A1–B2 and job placement. Interview preparation, recognition,
    // visa and relocation support aren't sold alone, so they add nothing to
    // the comparison; nor do Language Training + Job Placement (a bundle of
    // these same parts) or the crash course (not part of this program).
    separately: [5, 6, 7, 8, 4],
    // The two longest lines first, so they share a row on phones.
    includes: [
      { icon: "translate", label: "German language training" },
      { icon: "certificate", label: "Recognition of your qualification" },
      { icon: "chats-circle", label: "Interview preparation" },
      { icon: "briefcase", label: "Job placement" },
      { icon: "identification-card", label: "Visa support" },
      { icon: "airplane-tilt", label: "Relocation support" },
    ],
  },
  // Levels show `note` in place of the CMS's "Beginner German Language
  // Course." and so on, which repeats the name.
  5: {
    group: "german",
    level: "A1",
    label: "German A1",
    note: "Beginner",
    image: "/assets/images/cart/course-a1.webp",
    regular: 2100000,
  },
  6: {
    group: "german",
    level: "A2",
    label: "German A2",
    note: "Elementary",
    image: "/assets/images/cart/course-a2.webp",
    regular: 2100000,
  },
  7: {
    group: "german",
    level: "B1",
    label: "German B1",
    note: "Intermediate",
    image: "/assets/images/cart/course-b1.webp",
    regular: 3500000,
  },
  8: {
    group: "german",
    level: "B2",
    label: "German B2",
    note: "Advanced",
    image: "/assets/images/cart/course-b2.webp",
    regular: 3500000,
  },
  3: { group: "german", label: "Crash course (B1/B2)", image: "/assets/images/cart/course-crash.webp", regular: 1400000 },
  2: { group: "placement", image: "/assets/images/cart/course-language-placement.webp", regular: 1100000 },
  4: { group: "placement", image: "/assets/images/cart/course-placement.webp", regular: 1400000 },
};

export const COMPLETE_ID = 1;

// GST on private coaching. Only used to add up what "+ GST" prices come to.
export const GST_RATE = 0.18;

// A program's regular price, or its online price when it has none.
const regularOf = (block) => courseExtras[block.id]?.regular || block.price_paise;

// The struck-out price for a program, or null when there's no real one:
// `paise` on the same basis as the program's own price, and `parts` when it
// is a bundle's programs bought one by one at their regular prices.
export function comparePrice(block, blocks) {
  const extra = courseExtras[block.id] || {};
  if (extra.regular > block.price_paise) return { paise: extra.regular };
  if (!extra.separately) return null;
  const parts = extra.separately.map((id) => blocks.find((item) => item.id === id));
  if (parts.some((part) => !part)) return null;
  const gst = (part) => (part.show_gst_badge && !block.show_gst_badge ? 1 + GST_RATE : 1);
  const paise = parts.reduce((sum, part) => sum + Math.round(regularOf(part) * gst(part)), 0);
  return paise > block.price_paise ? { paise, parts } : null;
}

// What a struck-out price is, said next to it.
export const compareLabel = (compare) => (compare.parts ? "regular prices, bought separately" : "regular price");

// Paise to "₹1,04,400" (Indian grouping). Written by hand so the server and
// every browser print the same thing.
export function formatRupees(paise) {
  const digits = String(Math.round((paise || 0) / 100));
  if (digits.length <= 3) return `₹${digits}`;
  const head = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${head},${digits.slice(-3)}`;
}
