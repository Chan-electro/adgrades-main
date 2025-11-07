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
      "Complete social media management with posts, reels, and profile optimization",
    fullDescription:
      "Boost your social media presence with our comprehensive management packages. From content creation to profile optimization, we handle everything to grow your brand online.",
    icon: Target,
    features: [
      "Social Media Posts",
      "Reels Creation",
      "Graphic Designing",
      "Video Editing",
      "Profile Optimization",
      "Content Writing",
      "Performance Reports",
      "Dedicated Account Manager",
    ],
    benefits: [
      "Increased brand awareness",
      "Higher engagement rates",
      "Professional content quality",
      "Time-saving automation",
      "Consistent posting schedule",
      "Performance tracking",
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
      {
        step: "Strategy",
        description: "Content strategy development and calendar planning",
      },
      {
        step: "Creation",
        description: "Content creation including graphics, videos, and copy",
      },
      {
        step: "Publishing",
        description: "Scheduled posting and real-time engagement",
      },
      {
        step: "Analysis",
        description: "Performance tracking and strategy optimization",
      },
    ],
    pricing: {
      basic: "₹6,499/month | ₹69,999/year",
      premium: "₹8,499/month | ₹89,999/year",
      enterprise: "₹12,499/month | ₹1,24,999/year",
    },
    deliverables: [
      "Content calendar",
      "Social media posts and reels",
      "Profile optimization",
      "Performance reports",
      "Content writing",
    ],
    timeline: "Ongoing monthly service",
    category: "digital-marketing",
  },
  {
    id: "meta-google-ads",
    title: "Meta & Google Ads",
    shortDescription:
      "Targeted advertising campaigns on Google and Meta platforms",
    fullDescription:
      "Drive qualified traffic and conversions with our expert ad management services. We create, optimize, and monitor campaigns to maximize your advertising ROI.",
    icon: Target,
    features: [
      "Targeted Ad Campaigns",
      "Performance Reports",
      "Enhanced Ad Design",
      "Copywriting",
      "Video Ad Creation",
      "Performance Analysis",
    ],
    benefits: [
      "Qualified lead generation",
      "Improved conversion rates",
      "Better ROI on ad spend",
      "Professional ad creatives",
      "Continuous optimization",
      "Detailed analytics",
    ],
    technologies: [
      "Google Ads",
      "Facebook Ads Manager",
      "Instagram Ads",
      "Google Analytics",
      "Conversion Tracking",
      "Pixel Implementation",
    ],
    process: [
      {
        step: "Setup",
        description: "Campaign setup and audience targeting",
      },
      {
        step: "Launch",
        description: "Ad creation and campaign launch",
      },
      {
        step: "Monitor",
        description: "Performance monitoring and optimization",
      },
      {
        step: "Report",
        description: "Regular reporting and strategy refinement",
      },
    ],
    pricing: {
      basic: "₹3,999/month + ₹10,000-₹20,000 ad spend",
      premium: "₹8,999/month + ₹30,000-₹50,000 ad spend",
      enterprise: "₹16,999/month + ₹50,000+ ad spend",
    },
    deliverables: [
      "Campaign setup",
      "Ad creatives",
      "Performance reports",
      "Optimization recommendations",
    ],
    timeline: "Ongoing monthly service",
    category: "digital-marketing",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    shortDescription:
      "Professional video editing services for reels and content",
    fullDescription:
      "Transform your raw footage into engaging content with our professional video editing services. Perfect for social media reels and marketing videos.",
    icon: BarChart3,
    features: [
      "Simple cuts and transitions",
      "Advanced transitions",
      "Audio enhancements",
      "Color correction",
      "Motion graphics",
      "Text overlays",
    ],
    benefits: [
      "Professional video quality",
      "Engaging content creation",
      "Time-saving service",
      "Multiple format delivery",
      "Quick turnaround",
      "Cost-effective pricing",
    ],
    technologies: [
      "Adobe Premiere Pro",
      "After Effects",
      "Final Cut Pro",
      "DaVinci Resolve",
      "Canva Video",
    ],
    process: [
      {
        step: "Brief",
        description: "Understanding video requirements and style",
      },
      {
        step: "Edit",
        description: "Video editing and enhancement",
      },
      {
        step: "Review",
        description: "Client review and feedback incorporation",
      },
      {
        step: "Deliver",
        description: "Final video delivery in required formats",
      },
    ],
    pricing: {
      basic: "₹350-₹900 per video",
      premium: "₹500-₹1,200 per video",
      enterprise: "Custom pricing for bulk orders",
    },
    deliverables: [
      "Edited video files",
      "Multiple format options",
      "Source files (if requested)",
      "Revision rounds included",
    ],
    timeline: "1-3 days per video",
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
    title: "Performance Marketing",
    shortDescription:
      "Data-driven marketing campaigns focused on measurable results and ROI",
    fullDescription:
      "Maximize your marketing ROI with our performance marketing services. We focus on measurable results and continuous optimization across all channels.",
    icon: BarChart3,
    features: [
      "Campaign setup",
      "Ad optimization",
      "Cross-platform ads",
      "Conversion tracking",
      "Custom creatives",
      "Full-funnel strategy",
      "Retargeting campaigns",
      "Dashboard access",
    ],
    benefits: [
      "Measurable ROI",
      "Optimized ad spend",
      "Better conversion rates",
      "Multi-channel reach",
      "Data-driven decisions",
      "Continuous improvement",
    ],
    technologies: [
      "Google Ads",
      "Facebook Ads",
      "Google Analytics",
      "Conversion APIs",
      "UTM tracking",
      "Heat mapping tools",
    ],
    process: [
      {
        step: "Strategy",
        description: "Performance marketing strategy development",
      },
      {
        step: "Setup",
        description: "Campaign setup and tracking implementation",
      },
      {
        step: "Optimize",
        description: "Continuous optimization and testing",
      },
      {
        step: "Scale",
        description: "Scaling successful campaigns",
      },
    ],
    pricing: {
      basic: "₹6,999/month + ₹20,000-₹30,000 ad spend",
      premium: "₹9,999/month + ₹30,000-₹50,000 ad spend",
      enterprise: "₹14,999/month + ₹50,000+ ad spend",
    },
    deliverables: [
      "Campaign setup",
      "Performance reports",
      "Optimization recommendations",
      "Creative assets",
      "Dashboard access",
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
      "Custom websites from static pages to dynamic CMS-based solutions",
    fullDescription:
      "Create a powerful online presence with our web development services. From simple static websites to complex dynamic platforms, we build solutions that drive business growth.",
    icon: Globe,
    features: [
      "Responsive design",
      "Static & dynamic websites",
      "CMS integration",
      "Contact forms",
      "Blog integration",
      "On-page SEO",
      "API integration",
      "Admin panels",
      "Speed optimization",
      "Security implementation",
    ],
    benefits: [
      "Professional online presence",
      "Mobile-friendly design",
      "Better search rankings",
      "Improved user experience",
      "Scalable architecture",
      "Enhanced security",
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
      {
        step: "Planning",
        description: "Requirements gathering and site planning",
      },
      {
        step: "Design",
        description: "UI/UX design and wireframing",
      },
      {
        step: "Development",
        description: "Website development and testing",
      },
      {
        step: "Launch",
        description: "Deployment and post-launch support",
      },
    ],
    pricing: {
      basic: "₹14,999 (One-time)",
      premium: "₹29,999 (One-time)",
      enterprise: "₹49,999+ (One-time)",
    },
    deliverables: [
      "Fully functional website",
      "Responsive design",
      "Source code",
      "Documentation",
      "Training session",
    ],
    timeline: "2-6 weeks",
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
    title: "E-commerce Solutions",
    shortDescription:
      "Complete online stores with payment processing and inventory management",
    fullDescription:
      "Build a powerful online store with our comprehensive e-commerce solutions. From product listings to payment gateways, we create stores that sell.",
    icon: ShoppingCart,
    features: [
      "Product listings",
      "Payment gateway integration",
      "Inventory management",
      "Order tracking",
      "Multi-vendor support",
      "Custom features",
      "SEO optimization",
      "Analytics integration",
      "CRM sync",
    ],
    benefits: [
      "Increased online sales",
      "Automated order processing",
      "Better inventory control",
      "Improved customer experience",
      "Scalable platform",
      "Data-driven insights",
    ],
    technologies: [
      "WooCommerce",
      "Shopify",
      "Magento",
      "Payment gateways",
      "Inventory systems",
      "Analytics tools",
    ],
    process: [
      {
        step: "Setup",
        description: "Platform setup and configuration",
      },
      {
        step: "Customization",
        description: "Design and feature customization",
      },
      {
        step: "Integration",
        description: "Payment and shipping integration",
      },
      {
        step: "Launch",
        description: "Store launch and training",
      },
    ],
    pricing: {
      basic: "₹24,999 (One-time)",
      premium: "₹49,999 (One-time)",
      enterprise: "₹79,999+ (One-time)",
    },
    deliverables: [
      "E-commerce store",
      "Payment integration",
      "Product uploads",
      "Training session",
      "Support period",
    ],
    timeline: "3-8 weeks",
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
