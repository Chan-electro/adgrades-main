import {
  Globe,
  Smartphone,
  ShoppingCart,
  Search,
  BarChart3,
  Target,
  Lightbulb,
  Rocket,
  Heart,
  LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  features: string[];
  benefits: string[];
  technologies: string[];
  process: {
    step: string;
    description: string;
  }[];
  pricing: {
    basic: string;
    premium: string;
    enterprise: string;
  };
  deliverables: string[];
  timeline: string;
  category: "digital-marketing" | "software-solutions" | "offline-marketing";
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  description: string;
  price: string;
  ongoingPrice?: string;
  savings?: string;
  includes: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  service: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Comprehensive digital marketing solutions with social media, ads, and content",
    icon: Target,
    color: "from-secondary to-accent",
  },
  {
    id: "software-solutions",
    title: "Software Solutions",
    description:
      "Custom web & mobile applications, SEO, and e-commerce solutions",
    icon: Globe,
    color: "from-primary to-secondary",
  },
  {
    id: "offline-marketing",
    title: "Offline Marketing",
    description:
      "Event marketing, brand activations, and outdoor advertising solutions",
    icon: BarChart3,
    color: "from-primary/80 to-secondary/80",
  },
];

export const services: Service[] = [
  // Digital Marketing Services
  {
    id: "social-media-management",
    title: "Social Media Management & Marketing",
    shortDescription:
      "End-to-end social media management (strategy → posts → scheduling → community → reporting). Reel production billed separately.",
    fullDescription:
      "Built for sustainable growth (not trends-for-trends’ sake). We plan content pillars, design static creatives, write on-brand captions, schedule consistently, manage a defined community window, and report actionable insights monthly. Video production (reels/ads) is billed under Video Editing SKUs; we schedule/post those assets as part of this service.",
    icon: Target,
    features: [
      "On-brand captions & optimized hashtag sets",
      "Monthly content calendar (themes & pillars)",
      "Monthly performance report & insights",
    ],
    benefits: [
      "Consistent brand presence",
      "Higher engagement & saves",
      "Clear content strategy (pillars & hooks)",
      "Time-saving execution",
      "Actionable monthly insights",
    ],
    technologies: [
      "Instagram",
      "Facebook",
      "LinkedIn",
      "Twitter",
      "Canva",
      "Adobe Creative Suite",
      "Hootsuite",
    ],
    process: [
      { step: "Strategy", description: "Content pillars, hooks, brand voice" },
      { step: "Creation", description: "Static creatives + captions" },
      { step: "Publishing", description: "Scheduling & community window" },
      { step: "Analysis", description: "Monthly KPI report & next steps" },
    ],
    pricing: {
      basic: "₹12,999/month",
      premium: "₹26,999/month",
      enterprise: "₹42,999/month",
    },
    deliverables: [
      "Monthly content calendar (themes & pillars)",
      "12–20 static posts/month (tier-dependent)",
      "8–16 story frames/month (tier-dependent)",
      "Captions + hashtag sets per post",
      "Community management window (Mon–Fri)",
      "Monthly performance report (insights & actions)",
      "1–3 revision rounds per creative (tier-dependent)",
      "Strategy calls (1–4/month, tier-dependent)",
    ],
    timeline: "Ongoing monthly service",
    category: "digital-marketing",
  },
  {
    id: "meta-google-ads",
    title: "Meta & Google Ads (Performance Marketing)",
    shortDescription:
      "ROI-focused ad management on Meta and/or Google with structured testing and clean attribution.",
    fullDescription:
      "We set up tracking correctly, build clean account structures, run experiments, and optimize weekly for measurable results. Creative variants and copy are included; brand-new video production is billed via Video Editing SKUs. Ad spend is billed directly to platforms (not included).",
    icon: Target,
    features: [
      "Weekly optimization & pacing",
      "A/B testing & learnings (by tier)",
      "Clear KPI reporting & next-month plan",
      "Light dashboard (enterprise tier)",
    ],
    benefits: [
      "Measurable ROI and CAC control",
      "Faster learnings via structured tests",
      "Scalable account architecture",
      "Transparent reporting",
    ],
    technologies: [
      "Google Ads",
      "Facebook Ads Manager",
      "Instagram Ads",
      "Google Analytics",
      "Conversion Tracking",
      "Pixel/Tag Implementation",
    ],
    process: [
      { step: "Setup", description: "Tracking, structure, audiences" },
      { step: "Launch", description: "Creatives & campaigns live" },
      { step: "Monitor", description: "Weekly optimizations & tests" },
      { step: "Report", description: "KPI report & next-step plan" },
    ],
    pricing: {
      basic: "₹18,000/month (≤ ₹40,000 ad spend)",
      premium: "₹30,000/month (≤ ₹80,000 ad spend)",
      enterprise:
        "₹50,000/month (≤ ₹1,20,000 ad spend) + ₹1,500 per extra ₹10,000 spend",
    },
    deliverables: [
      "Tracking setup (pixels/GA4/conversions)",
      "Campaign structure & audiences (tier-dependent volume)",
      "8–30 ad creatives/month (variants; production billed separately)",
      "Weekly optimization & pacing",
      "Experimentation plan & A/B tests (by tier)",
      "Monthly KPI report + next-month action plan",
      "Light Looker/Sheets dashboard (enterprise)",
    ],
    timeline: "Ongoing monthly service",
    category: "digital-marketing",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    shortDescription:
      "Reels, ads, and explainers with clear edit tiers, multi‑ratio exports, and revision caps.",
    fullDescription:
      "Choose Basic for clean social edits, Intermediate for motion/graphics & extra aspect ratios, or commission Commercial Ads and Animated Explainers for higher-impact assets. All tiers use a defined revision policy and predictable turnaround.",
    icon: BarChart3,
    features: [
      "Clean cuts, pacing, color balance",
      "Hard/Styled captions (tier-dependent)",
      "Music & basic audio mix",
      "Motion text, speed ramps, light masking (Intermediate)",
    ],
    benefits: [
      "On-brand, scroll-stopping videos",
      "Predictable turnaround",
      "Revision caps to protect timelines",
      "Multi-platform delivery",
    ],
    technologies: [
      "Adobe Premiere Pro",
      "After Effects",
      "Final Cut Pro",
      "DaVinci Resolve",
      "Canva Video",
    ],
    process: [
      { step: "Brief", description: "Messaging, references, brand guide" },
      { step: "Edit", description: "Assembly → rhythm → polish" },
      { step: "Review", description: "Revisions per tier" },
      { step: "Deliver", description: "Master + optional extra ratios" },
    ],
    pricing: {
      basic: "Basic Reel ≤60s: ₹1,500 (61–120s: ₹2,500)",
      premium: "Intermediate Reel ≤60s: ₹3,500 (61–120s: ₹6,000)",
      enterprise: "Commercial Ad: from ₹25,000 | Explainer: from ₹20,000/min",
    },
    deliverables: [
      "Edit from raw footage, basic color balance",
      "Captions: simple (Basic) or styled/dynamic (Intermediate)",
      "1 royalty‑free music track + basic audio leveling",
      "Motion text/speed ramps/light masking (Intermediate)",
      "Up to 2 SFX (Intermediate)",
      "Exports: 9:16 (Basic); +1 extra ratio (1:1 or 16:9) for Intermediate",
      "Revisions: 1 round (Basic), 2 rounds (Intermediate)",
      "Commercial Ad: script (30–45s), edit, master + 1 cutdown",
      "Explainer: script, VO direction (talent fee extra), animation, Full‑HD master + .srt",
    ],
    timeline: "2–3 business days per reel; project-based for Ads/Explainers",
    category: "digital-marketing",
  },
  {
    id: "content-marketing",
    title: "Content Marketing / Writing",
    shortDescription:
      "SEO-optimized content creation for blogs, social media, and email marketing",
    fullDescription:
      "Drive engagement and improve your search rankings with our comprehensive content marketing services. From blog posts to email newsletters, we create content that converts.",
    icon: BarChart3,
    features: [
      "SEO-optimized blog posts",
      "Social media captions",
      "Ad copies",
      "Email newsletters",
      "Topic research",
      "Keyword planning",
      "Competitor analysis",
      "Performance reports",
    ],
    benefits: [
      "Improved search rankings",
      "Higher engagement rates",
      "Quality lead generation",
      "Brand authority building",
      "Consistent content flow",
      "Data-driven content strategy",
    ],
    technologies: [
      "WordPress",
      "SEMrush",
      "Ahrefs",
      "Google Analytics",
      "Mailchimp",
      "Grammarly",
      "Social Medias"
    ],
    process: [
      {
        step: "Research",
        description: "Topic and keyword research",
      },
      {
        step: "Creation",
        description: "Content writing and optimization",
      },
      {
        step: "Review",
        description: "Quality check and SEO optimization",
      },
      {
        step: "Publish",
        description: "Content publishing and promotion",
      },
    ],
    pricing: {
      basic: "₹4,999/month",
      premium: "₹7,999/month",
      enterprise: "₹11,999/month",
    },
    deliverables: [
      "Blog posts",
      "Social media content",
      "Email newsletters",
      "Content calendar",
      "Performance reports",
    ],
    timeline: "Ongoing monthly service",
    category: "digital-marketing",
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    shortDescription:
      "Professional email marketing campaigns with automation and analytics",
    fullDescription:
      "Build stronger customer relationships with our email marketing services. From campaign design to automation setup, we help you connect with your audience effectively.",
    icon: BarChart3,
    features: [
      "Campaign emails",
      "Template design",
      "A/B testing",
      "List segmentation",
      "Email automation",
      "CRM integration",
      "Performance reporting",
    ],
    benefits: [
      "Higher open rates",
      "Improved customer retention",
      "Automated workflows",
      "Better segmentation",
      "Increased conversions",
      "Cost-effective marketing",
    ],
    technologies: [
      "Mailchimp",
      "HubSpot",
      "Klaviyo",
      "ConvertKit",
      "ActiveCampaign",
      "Zapier",
    ],
    process: [
      {
        step: "Setup",
        description: "Email platform setup and list segmentation",
      },
      {
        step: "Design",
        description: "Email template design and content creation",
      },
      {
        step: "Launch",
        description: "Campaign launch and automation setup",
      },
      {
        step: "Optimize",
        description: "Performance tracking and optimization",
      },
    ],
    pricing: {
      basic: "₹3,999/month",
      premium: "₹6,999/month",
      enterprise: "₹10,999/month",
    },
    deliverables: [
      "Email campaigns",
      "Template designs",
      "Automation workflows",
      "Performance reports",
      "List management",
    ],
    timeline: "Ongoing monthly service",
    category: "digital-marketing",
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing (Cross‑Channel ROI)",
    shortDescription:
      "Cross‑channel ads with testing discipline, attribution hygiene, and weekly optimizations.",
    fullDescription:
      "Meta + Google focus with structured experiments and clean attribution. We iterate creatives, audiences, and funnels to improve ROAS/CAC. New video production billed via Video Editing SKUs; ad spend excluded.",
    icon: BarChart3,
    features: [
      "Meta + Google campaigns (tier-dependent scope)",
      "A/B testing (creative/audience/placement)",
      "Attribution hygiene: GA4 + UTMs",
      "Light dashboard (enterprise)",
      "Landing-page feedback & simple lead routing (Pro+)",
    ],
    benefits: [
      "Measurable ROI & scale path",
      "Better decision-making via clean data",
      "Repeatable testing framework",
    ],
    technologies: [
      "Google Ads",
      "Facebook Ads",
      "GA4",
      "Conversion APIs",
      "UTM tracking",
      "Looker Studio / Sheets",
    ],
    process: [
      { step: "Strategy", description: "Growth thesis & success metrics" },
      { step: "Setup", description: "Tracking + campaigns + creatives" },
      { step: "Optimize", description: "Weekly routines & experiments" },
      { step: "Scale", description: "Budget scaling with guardrails" },
    ],
    pricing: {
      basic: "₹18,000/month (≤ ₹40,000 ad spend)",
      premium: "₹30,000/month (≤ ₹80,000 ad spend)",
      enterprise:
        "₹50,000/month (≤ ₹1,20,000 ad spend) + ₹1,500 per extra ₹10,000 spend",
    },
    deliverables: [
      "Account/tracking setup",
      "Up to 3/4/6 campaigns (by tier) & structured ad sets",
      "8–30 creative variants/month (new production billed separately)",
      "Weekly optimization & pacing",
      "1–2 experiments/month (Pro+)",
      "Monthly report with learnings & plan",
      "Light dashboard (Enterprise)",
    ],
    timeline: "Ongoing monthly service",
    category: "digital-marketing",
  },
  {
    id: "lead-generation",
    title: "Lead Generation",
    shortDescription:
      "Comprehensive lead generation with custom forms and multi-channel outreach",
    fullDescription:
      "Generate high-quality leads for your business with our comprehensive lead generation services. From form design to CRM integration, we handle the entire lead funnel.",
    icon: Target,
    features: [
      "Verified leads",
      "Custom form design",
      "Lead filtering",
      "CRM integration",
      "Lead qualification",
      "Omnichannel outreach",
      "Lead scoring",
      "Performance tracking",
    ],
    benefits: [
      "Quality lead generation",
      "Improved conversion rates",
      "Automated lead nurturing",
      "Better lead qualification",
      "Multi-channel reach",
      "Data-driven insights",
    ],
    technologies: [
      "HubSpot",
      "Salesforce",
      "LinkedIn Sales Navigator",
      "WhatsApp Business",
      "Email automation",
      "Lead scoring tools",
    ],
    process: [
      {
        step: "Setup",
        description: "Lead generation strategy and tool setup",
      },
      {
        step: "Generate",
        description: "Lead generation and qualification",
      },
      {
        step: "Nurture",
        description: "Lead nurturing and follow-up",
      },
      {
        step: "Convert",
        description: "Conversion optimization and reporting",
      },
    ],
    pricing: {
      basic: "₹5,999/month",
      premium: "₹8,999/month",
      enterprise: "₹12,999/month",
    },
    deliverables: [
      "Verified leads",
      "Lead generation forms",
      "CRM setup",
      "Performance reports",
      "Lead scoring system",
    ],
    timeline: "Ongoing monthly service",
    category: "digital-marketing",
  },

  // Software Solutions
  {
    id: "web-development",
    title: "Web Development",
    shortDescription:
      "From 5‑page sites to CMS and premium builds, with maintenance SLAs.",
    fullDescription:
      "We deliver responsive, performant websites with clear scope by tier. All plans include on‑page SEO baseline, analytics, and a maintenance SLA covering updates, backups, and security. Premium adds staging, micro-interactions, and deeper QA.",
    icon: Globe,
    features: [
      "On-page SEO (meta/alt) + sitemap/robots",
      "GA4 setup + basic events",
      "Staging, QA, and cross-browser checks (Premium)",
    ],
    benefits: [
      "Professional presence",
      "Mobile-first experience",
      "SEO-ready structure",
      "Maintainable architecture",
      "Clear maintenance SLA",
    ],
    technologies: [
      "HTML/CSS",
      "JavaScript",
      "WordPress",
      "React",
      "Node.js",
      "PHP",
      "MySQL",
      "MongoDB",
    ],
    process: [
      { step: "Planning", description: "Requirements & site map" },
      { step: "Design", description: "UI/UX & section components" },
      { step: "Development", description: "Build, integrate, test" },
      { step: "Launch", description: "Deploy + handover + support" },
    ],
    pricing: {
      basic: "₹19,999 (One-time build) + ₹1,500/month maintenance",
      premium: "₹34,999 (One-time build, CMS) + ₹2,500/month maintenance",
      enterprise: "₹59,999 (One-time build, Premium) + ₹3,500/month maintenance",
    },
    deliverables: [
      "Pages: up to 5 / 10 / 20 (tier-dependent)",
      "Component library & branded sections (CMS+)",
      "Contact/lead form + WhatsApp integration",
      "On-page SEO baseline (titles/meta/alt) + sitemap/robots",
      "GA4 setup + basic events",
      "Revision rounds: 1 / 2 / 3 (tier-dependent)",
      "Maintenance: backups, updates, security + 1–3 hrs content edits/month (by tier)",
    ],
    timeline: "2–6 weeks",
    category: "software-solutions",
  },
  {
    id: "seo-optimization",
    title: "SEO Optimization",
    shortDescription:
      "Comprehensive SEO services to improve search rankings and organic traffic",
    fullDescription:
      "Dominate search results with our proven SEO strategies. We optimize your website for better visibility, higher rankings, and increased organic traffic that converts.",
    icon: Search,
    features: [
      "Keyword research",
      "On-page SEO",
      "Off-page SEO",
      "Technical SEO",
      "Local SEO",
      "Content optimization",
      "Backlink building",
      "Performance tracking",
    ],
    benefits: [
      "Higher search rankings",
      "Increased organic traffic",
      "Better user experience",
      "Long-term growth",
      "Cost-effective marketing",
      "Improved visibility",
    ],
    technologies: [
      "Google Analytics",
      "Search Console",
      "SEMrush",
      "Ahrefs",
      "Screaming Frog",
      "GTM",
    ],
    process: [
      {
        step: "Audit",
        description: "Comprehensive SEO audit and analysis",
      },
      {
        step: "Strategy",
        description: "SEO strategy and keyword planning",
      },
      {
        step: "Implementation",
        description: "On-page and technical optimization",
      },
      {
        step: "Monitoring",
        description: "Performance tracking and optimization",
      },
    ],
    pricing: {
      basic: "₹4,999/month",
      premium: "₹8,999/month",
      enterprise: "₹14,999/month",
    },
    deliverables: [
      "SEO audit report",
      "Keyword research",
      "Optimized content",
      "Technical fixes",
      "Monthly reports",
    ],
    timeline: "3-6 months to see results",
    category: "software-solutions",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    shortDescription:
      "Native and cross-platform mobile apps for Android and iOS",
    fullDescription:
      "Transform your ideas into powerful mobile applications. We develop native and hybrid apps that provide seamless user experiences across all devices.",
    icon: Smartphone,
    features: [
      "Android app development",
      "iOS app development",
      "Hybrid app development",
      "UI design",
      "API connectivity",
      "Backend integration",
      "Admin panels",
      "Store deployment",
      "Advanced features",
    ],
    benefits: [
      "Reach mobile audiences",
      "Improved user engagement",
      "Brand visibility",
      "Revenue generation",
      "Cross-platform compatibility",
      "Scalable solutions",
    ],
    technologies: [
      "Flutter",
      "React Native",
      "Android Studio",
      "Xcode",
      "Firebase",
      "Node.js",
      "Django",
    ],
    process: [
      {
        step: "Concept",
        description: "App concept and requirements analysis",
      },
      {
        step: "Design",
        description: "UI/UX design and prototyping",
      },
      {
        step: "Development",
        description: "App development and testing",
      },
      {
        step: "Launch",
        description: "Store deployment and support",
      },
    ],
    pricing: {
      basic: "₹39,999+ (One-time)",
      premium: "₹74,999+ (One-time)",
      enterprise: "₹1,25,000+ (One-time)",
    },
    deliverables: [
      "Mobile application",
      "Source code",
      "Store deployment",
      "Documentation",
      "Technical support",
    ],
    timeline: "6-16 weeks",
    category: "software-solutions",
  },
  {
    id: "ecommerce-solutions",
    title: "E‑commerce Solutions",
    shortDescription:
      "Conversion-ready stores with payments, shipping rules, catalogs, and growth analytics.",
    fullDescription:
      "We build and operate e‑commerce foundations with a CRO-friendly product template, catalog management, analytics, and platform integrations. Maintenance covers security/updates/backups and monthly catalog support. Revenue share protects ongoing growth effort.",
    icon: ShoppingCart,
    features: [
      "Inventory & order management flows",
      "Facebook/Google product catalogs",
      "Analytics (GA4 + conversions)",
      "Training & maintenance SLA",
    ],
    benefits: [
      "Faster go-to-market",
      "Higher conversion foundations",
      "Operational clarity (orders/inventory)",
      "Scalable integrations",
    ],
    technologies: [
      "WooCommerce",
      "Shopify",
      "Payment gateways",
      "Inventory systems",
      "Analytics tools",
    ],
    process: [
      { step: "Setup", description: "Platform & base configuration" },
      { step: "Customization", description: "Theme, templates, CRO elements" },
      { step: "Integration", description: "Payments, shipping, catalogs" },
      { step: "Launch", description: "Go-live + training + support" },
    ],
    pricing: {
      basic:
        "₹74,999+ (One-time build) + ₹6,000/month maintenance + 2% of sales (min ₹10,000/month)",
      premium: "Scope-based: advanced catalog/integrations (ask for quote)",
      enterprise: "Scope-based: multi-store/headless/SLA (ask for quote)",
    },
    deliverables: [
      "Store setup & theme customization",
      "Payments, taxes, shipping rules, order emails",
      "Catalog: up to 100 SKUs initial load",
      "Product template with CRO elements (reviews, trust badges)",
      "Facebook/Google product catalog sync",
      "Analytics (GA4 + conversions) & basic dashboards",
      "2 × 60‑min admin training",
      "Maintenance: security/updates/backups + 3 hrs/mo catalog/support",
    ],
    timeline: "3–8 weeks",
    category: "software-solutions",
  },
  {
    id: "crm-erp-development",
    title: "CRM & ERP Development",
    shortDescription:
      "Custom CRM and ERP solutions for business process automation",
    fullDescription:
      "Streamline your business operations with our custom CRM and ERP solutions. From lead tracking to inventory management, we build systems that grow with your business.",
    icon: Globe,
    features: [
      "Lead/contact tracking",
      "Inventory management",
      "Sales automation",
      "HR management",
      "Invoicing",
      "Task automation",
      "Role-based access",
      "Custom reports",
      "Third-party integration",
      "Real-time analytics",
    ],
    benefits: [
      "Improved efficiency",
      "Better data management",
      "Automated processes",
      "Enhanced collaboration",
      "Real-time insights",
      "Scalable solution",
    ],
    technologies: [
      "Web technologies",
      "Database systems",
      "API integration",
      "Cloud platforms",
      "Third-party tools",
      "Analytics systems",
    ],
    process: [
      {
        step: "Analysis",
        description: "Business process analysis and requirements",
      },
      {
        step: "Design",
        description: "System design and architecture planning",
      },
      {
        step: "Development",
        description: "Custom development and testing",
      },
      {
        step: "Deployment",
        description: "System deployment and training",
      },
    ],
    pricing: {
      basic: "₹49,999+ (One-time)",
      premium: "₹99,999+ (One-time)",
      enterprise: "₹1,75,000+ (One-time)",
    },
    deliverables: [
      "Custom CRM/ERP system",
      "User training",
      "Documentation",
      "Integration setup",
      "Support period",
    ],
    timeline: "8-20 weeks",
    category: "software-solutions",
  },

  // Offline Marketing Services
  {
    id: "event-marketing",
    title: "Event Marketing & Brand Activations",
    shortDescription:
      "Brand activations and event marketing from small stalls to large-scale events",
    fullDescription:
      "Create memorable brand experiences with our event marketing services. From mall activations to large corporate events, we help you connect with your audience in person.",
    icon: BarChart3,
    features: [
      "Brand stalls",
      "Promotional staff",
      "Custom booth design",
      "Live engagement activities",
      "Branded merchandise",
      "Lead capture",
      "Event photography",
      "Video coverage",
      "Social media promotion",
    ],
    benefits: [
      "Direct customer interaction",
      "Brand awareness boost",
      "Lead generation",
      "Market research opportunities",
      "Community engagement",
      "Brand loyalty building",
    ],
    technologies: [
      "Event management tools",
      "Lead capture systems",
      "Photography equipment",
      "Audio/visual setup",
      "Social media tools",
    ],
    process: [
      {
        step: "Planning",
        description: "Event planning and venue selection",
      },
      {
        step: "Setup",
        description: "Booth setup and staff briefing",
      },
      {
        step: "Execution",
        description: "Event execution and engagement",
      },
      {
        step: "Follow-up",
        description: "Lead follow-up and reporting",
      },
    ],
    pricing: {
      basic: "₹24,999/event",
      premium: "₹49,999/event",
      enterprise: "₹89,999/event",
    },
    deliverables: [
      "Event setup",
      "Promotional staff",
      "Brand materials",
      "Lead database",
      "Event coverage",
    ],
    timeline: "1-4 weeks planning + event day",
    category: "offline-marketing",
  },
  {
    id: "outdoor-advertising",
    title: "Hoardings & Outdoor Ads",
    shortDescription:
      "Outdoor advertising solutions including hoardings, banners, and highway displays",
    fullDescription:
      "Maximize your brand visibility with our outdoor advertising solutions. From local hoardings to premium highway displays, we help you reach audiences where they are.",
    icon: BarChart3,
    features: [
      "Local hoardings",
      "Highway displays",
      "Flex banners",
      "LED displays",
      "Location selection",
      "Design and printing",
      "Installation service",
      "Visibility reporting",
      "Campaign photography",
    ],
    benefits: [
      "Wide audience reach",
      "24/7 brand visibility",
      "Local market penetration",
      "Cost-effective advertising",
      "Brand recall improvement",
      "Geographic targeting",
    ],
    technologies: [
      "Design software",
      "Printing technology",
      "Installation equipment",
      "Location analytics",
      "Photography tools",
    ],
    process: [
      {
        step: "Planning",
        description: "Location selection and campaign planning",
      },
      {
        step: "Design",
        description: "Creative design and approval",
      },
      {
        step: "Production",
        description: "Printing and material preparation",
      },
      {
        step: "Installation",
        description: "Installation and monitoring",
      },
    ],
    pricing: {
      basic: "₹14,999/month",
      premium: "₹29,999/month",
      enterprise: "₹59,999+/month",
    },
    deliverables: [
      "Hoarding/banner installation",
      "Design and printing",
      "Location permits",
      "Campaign photography",
      "Visibility reports",
    ],
    timeline: "1-2 weeks setup + campaign duration",
    category: "offline-marketing",
  },
];

export const servicePackages: ServicePackage[] = [
  {
    id: "brand-kickstart",
    title: "Brand Kickstart",
    description:
      "Launch-ready bundle combining social media, video and ad management for growing brands.",
    price: "₹47,999/month",
    savings: "Save ₹3,000 vs actual pricing",
    includes: [
      "SMMA Pro (₹26,999)",
      "4 Basic Reels (₹6,000 total)",
      "Performance Marketing Basic (₹18,000)",
    ],
  },
  {
    id: "growth-engine",
    title: "Growth Engine",
    description:
      "Scale your performance with advanced social, video, and ads support every month.",
    price: "₹74,999/month",
    savings: "Save ₹3,000 vs individual services",
    includes: [
      "SMMA Pro (₹26,999)",
      "6 Intermediate Reels (₹21,000 total)",
      "Performance Marketing Pro (₹30,000)",
    ],
  },
  {
    id: "performance-plus",
    title: "Performance+",
    description:
      "High-impact performance marketing complemented by consistent content and social support.",
    price: "₹60,999/month",
    savings: "Save ₹3,000 with this bundle",
    includes: [
      "Performance Marketing Superb (₹50,000)",
      "SMMA Basic (₹12,999)",
      "4 Basic Reels (₹6,000 total)",
    ],
  },
  {
    id: "content-studio",
    title: "Content Studio",
    description:
      "Content-heavy plan for brands that need a steady stream of high-quality video and social posts.",
    price: "₹59,999/month",
    savings: "Save ₹5,000 on content production",
    includes: [
      "SMMA Basic (₹12,999)",
      "12 Basic Reels (₹18,000 total)",
      "4 Intermediate Reels (₹14,000 total)",
      "1 Explainer Video (₹20,000)",
    ],
  },
  {
    id: "website-launch",
    title: "Website Launch",
    description:
      "Launch your new site with ongoing marketing, content, and maintenance support built in.",
    price: "First Month: ₹69,999",
    ongoingPrice: "Ongoing: ₹38,999/month",
    includes: [
      "Website Standard (₹34,999 build + ₹2,500/month maintenance)",
      "SMMA Basic (₹12,999)",
      "2 Intermediate Reels (₹7,000 total)",
      "Performance Marketing Basic (₹18,000)",
    ],
  },
  {
    id: "ecom-launch-scale",
    title: "E-Com Launch & Scale",
    description:
      "End-to-end package for launching and scaling an e-commerce business with managed growth.",
    price: "First Month: ₹1,49,999",
    ongoingPrice:
      "Ongoing: ₹79,999/month + 2% of sales (minimum ₹10,000)",
    includes: [
      "E-commerce Website (₹74,999 build + ₹6,000/month maintenance)",
      "Performance Marketing Pro (₹30,000)",
      "SMMA Pro (₹26,999)",
      "6 Intermediate Reels (₹21,000 total)",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Planning",
    description:
      "We start by understanding your business goals, target audience, and project requirements through detailed consultation and research.",
    icon: Search,
  },
  {
    step: "02",
    title: "Strategy & Design",
    description:
      "Our team creates a comprehensive strategy and design mockups that align with your brand and user experience goals.",
    icon: Lightbulb,
  },
  {
    step: "03",
    title: "Development & Testing",
    description:
      "We build your solution using best practices, with regular testing and quality assurance throughout the process.",
    icon: Rocket,
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "After successful launch, we provide ongoing support, monitoring, and optimization to ensure continued success.",
    icon: Heart,
  },
];

export const serviceTestimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    company: "TechStart Inc.",
    role: "CEO",
    content:
      "AdGrades transformed our outdated website into a modern, high-performing platform. Our conversions increased by 150% in just 3 months!",
    rating: 5,
    avatar: "/avatars/sarah.jpg",
    service: "Web Development",
  },
  {
    name: "Michael Chen",
    company: "RetailPlus",
    role: "Marketing Director",
    content:
      "Their digital marketing expertise helped us reach new audiences and grow our online sales by 200%. Exceptional results and service!",
    rating: 5,
    avatar: "/avatars/michael.jpg",
    service: "Digital Marketing",
  },
  {
    name: "Emma Davis",
    company: "FinanceFlow",
    role: "CTO",
    content:
      "The mobile app they developed for us has received outstanding user reviews. The team's attention to detail and technical expertise is impressive.",
    rating: 5,
    avatar: "/avatars/emma.jpg",
    service: "Mobile Development",
  },
];

export const serviceFAQs: FAQ[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on scope and complexity. Web development projects typically take 6-16 weeks, while marketing campaigns are ongoing monthly services. We provide detailed timelines during the consultation phase.",
    category: "General",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes! We offer various support packages including maintenance, updates, and technical support. Most projects include 3-6 months of initial support, with extended support available.",
    category: "Support",
  },
  {
    question: "Can you work with our existing team?",
    answer:
      "Absolutely! We often collaborate with in-house teams and can integrate seamlessly into your existing workflows. We're flexible in our approach to match your needs.",
    category: "Collaboration",
  },
  {
    question: "What's included in your pricing?",
    answer:
      "Our pricing includes all development work, testing, documentation, and initial support. We provide transparent pricing with no hidden fees. Additional services like hosting or third-party integrations are clearly outlined.",
    category: "Pricing",
  },
  {
    question: "Do you sign NDAs and ensure data security?",
    answer:
      "Yes, we take confidentiality and security very seriously. We're happy to sign NDAs and follow strict security protocols to protect your sensitive information and intellectual property.",
    category: "Security",
  },
];

export const serviceStats = [
  {
    number: 500,
    suffix: "+",
    label: "Projects Completed",
  },
  {
    number: 98,
    suffix: "%",
    label: "Client Satisfaction",
  },
  {
    number: 24,
    suffix: "/7",
    label: "Support Available",
  },
  {
    number: 50,
    suffix: "+",
    label: "Team Experts",
  },
];
