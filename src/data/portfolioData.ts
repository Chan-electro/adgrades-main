// ---- Portfolio data model + seed dataset for AdGrades ----
import { z } from "zod";

/** Outcomes map to business results used for filters/sorting */
export const outcomes = ["leads", "sales", "roas", "visibility", "community"] as const;
export type Outcome = (typeof outcomes)[number];

export const artifactTypes = ["video", "poster", "social", "web"] as const;
export type ArtifactType = (typeof artifactTypes)[number];

export const ArtifactSchema = z.object({
  id: z.string(),
  type: z.enum(artifactTypes),
  title: z.string(),
  src: z.string(), // video url / image url / embed / thumbnail path
  href: z.string().optional(), // outbound url (post/page)
  dateISO: z.string(), // YYYY-MM-DD
  outcomes: z.array(z.enum(outcomes)).default([]),
  durationSec: z.number().optional(),
  aspect: z.enum(["9:16", "1:1", "16:9"]).optional(),
  meta: z.record(z.string()).optional(),
});

export const SocialHandleSchema = z.object({
  platform: z.enum(["instagram", "facebook", "linkedin", "twitter", "youtube", "tiktok"]),
  username: z.string(),
  url: z.string(),
});

export const KPISchema = z.object({
  dateISO: z.string(),
  label: z.string(), // e.g., "ROAS", "Leads"
  value: z.number(),
  unit: z.enum(["%", "x", "₹", ""]).default(""),
});

export const ClientChannelSchema = z.object({
  id: z.string(), // slug, e.g., "delhi-65"
  name: z.string(),
  logo: z.string().optional(), // path to logo asset (optional for fallback initials)
  industry: z.string(),
  socials: z.array(SocialHandleSchema).default([]),
  artifacts: z.array(ArtifactSchema).default([]),
  kpis: z.array(KPISchema).default([]),
  summary: z
    .object({
      challenge: z.string().optional(),
      strategy: z.array(z.string()).optional(),
      creative: z.array(z.string()).optional(),
      performance: z.array(z.string()).optional(),
    })
    .optional(),
});

export type Artifact = z.infer<typeof ArtifactSchema>;
export type SocialHandle = z.infer<typeof SocialHandleSchema>;
export type KPI = z.infer<typeof KPISchema>;
export type ClientChannel = z.infer<typeof ClientChannelSchema>;

/** Helper: validate entire dataset at build time */
export function validatePortfolioData(data: ClientChannel[]) {
  data.forEach((c) => ClientChannelSchema.parse(c));
  return data;
}

/** Helper: add a new client safely (throws if invalid/duplicate) */
export function addClient(clients: ClientChannel[], next: ClientChannel) {
  ClientChannelSchema.parse(next);
  if (clients.some((c) => c.id === next.id)) {
    throw new Error(`Client with id "${next.id}" already exists`);
  }
  clients.push(next);
  return clients;
}

/** Seed dataset: ALL known AdGrades clients (industries included).
 *  NOTE: Artifacts/socials are placeholders—replace src/href/handles with real links.
 *  You can ship with placeholders; the UI will still work.
 */
export const clientChannels: ClientChannel[] = validatePortfolioData([
  {
    id: "medhavi-classes",
    name: "Medhavi Classes",
    logo: "/client/medhavi.png",
    industry: "Online Education",
    socials: [
      { platform: "instagram", username: "@medhaviclasses", url: "https://instagram.com/medhaviclasses" },
      { platform: "linkedin", username: "Medhavi Classes", url: "https://linkedin.com/company/medhavi-classes" },
    ],
    kpis: [
      { dateISO: "2025-07-01", label: "Leads", value: 320, unit: "" },
      { dateISO: "2025-10-01", label: "ROAS", value: 2.4, unit: "x" },
    ],
    artifacts: [
      {
        id: "v1",
        type: "video",
        title: "Admissions Reel",
        src: "/portfolio/medhavi/reel1.mp4",
        dateISO: "2025-08-10",
        outcomes: ["leads", "visibility"],
        durationSec: 28,
        aspect: "9:16",
      },
      {
        id: "p1",
        type: "poster",
        title: "Scholarship Drive Poster",
        src: "/portfolio/medhavi/poster1.jpg",
        href: "https://example.com/medhavi/scholarship",
        dateISO: "2025-07-15",
        outcomes: ["leads", "community"],
        aspect: "1:1",
      },
      {
        id: "s1",
        type: "social",
        title: "Admissions Announcement",
        src: "/portfolio/medhavi/ig-thumb1.jpg",
        href: "https://instagram.com/p/xxxx",
        dateISO: "2025-07-05",
        outcomes: ["visibility"],
      },
      {
        id: "w1",
        type: "web",
        title: "Admissions Landing",
        src: "/portfolio/medhavi/landing-thumb.jpg",
        href: "https://medhavi.example/admissions",
        dateISO: "2025-07-01",
        outcomes: ["leads"],
      },
    ],
    summary: {
      challenge: "Increase inquiries for new session.",
      strategy: ["Parents-first messaging", "Exam hooks", "Localized lead gen"],
      creative: ["Scholarship posters", "UGC faculty reels"],
      performance: ["Leads up 38% QoQ"],
    },
  },
  {
    id: "aadhyan",
    name: "Aadhyan",
    logo: "/client/aadhyan.jpg",
    industry: "Education",
    socials: [{ platform: "instagram", username: "@aadhyan", url: "https://instagram.com/aadhyan" }],
    kpis: [{ dateISO: "2025-09-01", label: "Leads", value: 180, unit: "" }],
    artifacts: [
      {
        id: "v1",
        type: "video",
        title: "Course Highlight Reel",
        src: "/portfolio/aadhyan/reel1.mp4",
        dateISO: "2025-08-20",
        outcomes: ["leads", "visibility"],
        durationSec: 25,
        aspect: "9:16",
      },
      {
        id: "p1",
        type: "poster",
        title: "Open Day Poster",
        src: "/portfolio/aadhyan/poster1.jpg",
        dateISO: "2025-08-01",
        outcomes: ["community", "leads"],
        aspect: "1:1",
      },
    ],
  },
  {
    id: "os-code-solutions",
    name: "OS Code Solutions",
    logo: "/client/oscode.png",
    industry: "IT Development",
    socials: [
      { platform: "linkedin", username: "OS Code Solutions", url: "https://linkedin.com/company/os-code-solutions" },
    ],
    kpis: [{ dateISO: "2025-10-01", label: "Leads", value: 86, unit: "" }],
    artifacts: [
      {
        id: "w1",
        type: "web",
        title: "Case — SaaS Landing",
        src: "/portfolio/oscode/saas-thumb.jpg",
        href: "https://oscode.example/saas",
        dateISO: "2025-09-10",
        outcomes: ["leads", "visibility"],
      },
      {
        id: "v1",
        type: "video",
        title: "Explainer Cut",
        src: "/portfolio/oscode/explainer.mp4",
        dateISO: "2025-09-20",
        outcomes: ["leads"],
        durationSec: 45,
        aspect: "16:9",
      },
    ],
  },
  {
    id: "os-code-community",
    name: "OS Code Community",
    // no dedicated logo available yet — UI will fallback to initials
    industry: "Student Tech Community",
    socials: [
      { platform: "instagram", username: "@oscodecommunity", url: "https://instagram.com/oscodecommunity" },
    ],
    kpis: [{ dateISO: "2025-08-01", label: "Community", value: 1200, unit: "" }],
    artifacts: [
      {
        id: "p1",
        type: "poster",
        title: "Hackathon Poster",
        src: "/portfolio/oscc/poster-hack.jpg",
        dateISO: "2025-07-22",
        outcomes: ["community", "visibility"],
        aspect: "1:1",
      },
      {
        id: "s1",
        type: "social",
        title: "Event Recap",
        src: "/portfolio/oscc/ig-thumb.jpg",
        href: "https://instagram.com/p/yyyy",
        dateISO: "2025-07-30",
        outcomes: ["community"],
      },
    ],
  },
  {
    id: "delhi-65",
    name: "Delhi 65",
    logo: "/client/delhi65.png",
    industry: "Restaurant",
    socials: [{ platform: "instagram", username: "@delhi65", url: "https://instagram.com/delhi65" }],
    kpis: [
      { dateISO: "2025-02-01", label: "ROAS", value: 1.8, unit: "x" },
      { dateISO: "2025-09-01", label: "ROAS", value: 3.1, unit: "x" },
    ],
    artifacts: [
      {
        id: "v1",
        type: "video",
        title: "Festive Promo",
        src: "/portfolio/d65/festive.mp4",
        dateISO: "2025-10-10",
        outcomes: ["sales", "roas"],
        durationSec: 28,
        aspect: "9:16",
      },
      {
        id: "p1",
        type: "poster",
        title: "Combo Offer",
        src: "/portfolio/d65/combo.jpg",
        dateISO: "2025-09-20",
        outcomes: ["sales", "visibility"],
        aspect: "1:1",
      },
      {
        id: "w1",
        type: "web",
        title: "Lunch Combos Landing",
        src: "/portfolio/d65/lunch-thumb.jpg",
        href: "https://delhi65.example/lunch",
        dateISO: "2025-09-10",
        outcomes: ["sales"],
      },
    ],
  },
  {
    id: "species-and-stories",
    name: "Species and Stories",
    // no dedicated logo available yet — UI will fallback to initials
    industry: "Café",
    socials: [
      { platform: "instagram", username: "@speciesandstories", url: "https://instagram.com/speciesandstories" },
    ],
    kpis: [{ dateISO: "2025-09-01", label: "Footfall", value: 140, unit: "%" }],
    artifacts: [
      {
        id: "v1",
        type: "video",
        title: "Menu Reel",
        src: "/portfolio/sns/menu.mp4",
        dateISO: "2025-08-12",
        outcomes: ["visibility"],
        durationSec: 22,
        aspect: "9:16",
      },
      {
        id: "p1",
        type: "poster",
        title: "Seasonal Drink Poster",
        src: "/portfolio/sns/drink.jpg",
        dateISO: "2025-08-01",
        outcomes: ["community", "visibility"],
        aspect: "1:1",
      },
    ],
  },
  {
    id: "mk-streetwear",
    name: "MK Streetwear",
    logo: "/client/mk.png",
    industry: "Fashion",
    socials: [
      { platform: "instagram", username: "@mkstreetwear", url: "https://instagram.com/mkstreetwear" },
    ],
    kpis: [{ dateISO: "2025-10-01", label: "Sales", value: 210, unit: "%" }],
    artifacts: [
      {
        id: "v1",
        type: "video",
        title: "Drop Teaser",
        src: "/portfolio/mk/drop-teaser.mp4",
        dateISO: "2025-09-05",
        outcomes: ["sales", "visibility"],
        durationSec: 17,
        aspect: "9:16",
      },
      {
        id: "p1",
        type: "poster",
        title: "Lookbook Poster",
        src: "/portfolio/mk/lookbook.jpg",
        dateISO: "2025-09-01",
        outcomes: ["visibility"],
        aspect: "1:1",
      },
      {
        id: "s1",
        type: "social",
        title: "Drop Post",
        src: "/portfolio/mk/ig-drop.jpg",
        href: "https://instagram.com/p/drop",
        dateISO: "2025-09-06",
        outcomes: ["sales"],
      },
    ],
  },
  {
    id: "dew-drop-homestays",
    name: "Dew Drop Homestays",
    logo: "/client/dewdrop.png",
    industry: "Hospitality",
    socials: [
      { platform: "instagram", username: "@dewdrophomestays", url: "https://instagram.com/dewdrophomestays" },
    ],
    kpis: [{ dateISO: "2025-09-01", label: "Bookings", value: 165, unit: "%" }],
    artifacts: [
      {
        id: "v1",
        type: "video",
        title: "Property Tour",
        src: "/portfolio/dew/tour.mp4",
        dateISO: "2025-08-18",
        outcomes: ["sales", "visibility"],
        durationSec: 32,
        aspect: "16:9",
      },
      {
        id: "p1",
        type: "poster",
        title: "Weekend Offer",
        src: "/portfolio/dew/offer.jpg",
        dateISO: "2025-08-10",
        outcomes: ["sales"],
        aspect: "1:1",
      },
      {
        id: "w1",
        type: "web",
        title: "Booking Page",
        src: "/portfolio/dew/booking-thumb.jpg",
        href: "https://dew.example/book",
        dateISO: "2025-08-05",
        outcomes: ["sales"],
      },
    ],
  },
  {
    id: "pureblend",
    name: "PureBlend",
    logo: "/client/pureblend.jpg",
    industry: "Food Supply Chain",
    socials: [
      { platform: "linkedin", username: "PureBlend", url: "https://linkedin.com/company/pureblend" },
    ],
    kpis: [{ dateISO: "2025-08-01", label: "Leads", value: 64, unit: "" }],
    artifacts: [
      {
        id: "p1",
        type: "poster",
        title: "Sourcing Poster",
        src: "/portfolio/pureblend/sourcing.jpg",
        dateISO: "2025-07-21",
        outcomes: ["leads", "visibility"],
        aspect: "1:1",
      },
      {
        id: "w1",
        type: "web",
        title: "Supplier Landing",
        src: "/portfolio/pureblend/supplier-thumb.jpg",
        href: "https://pureblend.example/suppliers",
        dateISO: "2025-07-18",
        outcomes: ["leads"],
      },
    ],
  },
  {
    id: "vinayaka-enterprises",
    name: "Vinayaka Enterprises",
    logo: "/client/vinayaka.jpg",
    industry: "Interior Design",
    socials: [
      { platform: "instagram", username: "@vinayakainteriors", url: "https://instagram.com/vinayakainteriors" },
    ],
    kpis: [{ dateISO: "2025-10-01", label: "Leads", value: 45, unit: "" }],
    artifacts: [
      {
        id: "v1",
        type: "video",
        title: "Before/After Reel",
        src: "/portfolio/vinayaka/before-after.mp4",
        dateISO: "2025-09-10",
        outcomes: ["leads", "visibility"],
        durationSec: 26,
        aspect: "9:16",
      },
      {
        id: "p1",
        type: "poster",
        title: "Makeover Poster",
        src: "/portfolio/vinayaka/makeover.jpg",
        dateISO: "2025-09-02",
        outcomes: ["visibility"],
        aspect: "1:1",
      },
    ],
  },
  {
    id: "as-tech",
    name: "AS Tech",
    logo: "/client/asti.png",
    industry: "Vehicle Parts Supply",
    socials: [
      { platform: "linkedin", username: "AS Tech", url: "https://linkedin.com/company/as-tech" },
    ],
    kpis: [{ dateISO: "2025-08-01", label: "B2B Leads", value: 28, unit: "" }],
    artifacts: [
      {
        id: "w1",
        type: "web",
        title: "Parts Catalog Page",
        src: "/portfolio/astech/catalog-thumb.jpg",
        href: "https://astech.example/catalog",
        dateISO: "2025-07-12",
        outcomes: ["leads"],
      },
      {
        id: "p1",
        type: "poster",
        title: "OEM Poster",
        src: "/portfolio/astech/oem.jpg",
        dateISO: "2025-07-01",
        outcomes: ["visibility"],
      },
    ],
  },
  {
    id: "sp-enterprises",
    name: "SP Enterprises",
    logo: "/client/splogo.png",
    industry: "Industrial, Vehicle Supply",
    socials: [
      { platform: "linkedin", username: "SP Enterprises", url: "https://linkedin.com/company/sp-enterprises" },
    ],
    kpis: [{ dateISO: "2025-09-01", label: "RFQs", value: 19, unit: "" }],
    artifacts: [
      {
        id: "p1",
        type: "poster",
        title: "Industrial Line Poster",
        src: "/portfolio/sp/line.jpg",
        dateISO: "2025-08-04",
        outcomes: ["leads", "visibility"],
        aspect: "1:1",
      },
      {
        id: "w1",
        type: "web",
        title: "Spec Sheet Hub",
        src: "/portfolio/sp/specs-thumb.jpg",
        href: "https://sp.example/specs",
        dateISO: "2025-08-18",
        outcomes: ["leads"],
      },
    ],
  },
]);

/** Utility: get earliest & latest dates from dataset for timebar defaults */
export function getPortfolioDateBounds(clients = clientChannels) {
  const dates = clients.flatMap((c) => c.artifacts.map((a) => new Date(a.dateISO).getTime()));
  const min = new Date(Math.min(...dates));
  const max = new Date(Math.max(...dates));
  return { min, max };
}
