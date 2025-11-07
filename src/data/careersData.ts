// Careers data for the Careers page
import { Users, Heart, Zap, Target, Coffee, Award } from "lucide-react";

export interface CultureValue {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface OpenPosition {
  title: string;
  department: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
}

export const cultureValues: CultureValue[] = [
  {
    icon: Zap,
    title: "Innovation First",
    description:
      "We embrace new ideas and cutting-edge technologies to stay ahead of the curve.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "We believe in the power of teamwork and support each other to achieve greatness.",
  },
  {
    icon: Target,
    title: "Results Driven",
    description:
      "We focus on delivering measurable results that make a real impact for our clients.",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description:
      "We prioritize mental health and ensure our team has time for what matters most.",
  },
  {
    icon: Coffee,
    title: "Fun Environment",
    description:
      "Work should be enjoyable! We create a positive, energetic atmosphere every day.",
  },
  {
    icon: Award,
    title: "Growth Opportunities",
    description:
      "We invest in our team's professional development and career advancement.",
  },
];

export const openPositions: OpenPosition[] = [
  {
    title: "Senior Digital Marketing Specialist",
    department: "Marketing",
    type: "Full-time",
    location: "Remote / Hybrid",
    salary: "Salary will be discussed",
    description:
      "Lead digital marketing campaigns across multiple platforms and mentor junior marketers to drive consistent performance growth.",
    requirements: [
      "5+ years of digital marketing experience",
      "Expertise in Google Ads, Meta Ads, and performance analytics",
      "Strong strategic thinking and communication abilities",
      "Hands-on experience with CRM and automation tools",
    ],
  },
  {
    title: "Junior Digital Marketing Executive",
    department: "Marketing",
    type: "Full-time",
    location: "Remote / Hybrid",
    salary: "Salary will be discussed",
    description:
      "Support in managing ad campaigns, analyzing performance, and assisting the senior team in multi-platform marketing execution.",
    requirements: [
      "6 months – 1 year of digital marketing experience",
      "Familiarity with Google Ads and Meta Business Suite",
      "Strong attention to detail and reporting skills",
      "Basic knowledge of SEO and email marketing tools",
    ],
  },
  {
    title: "Digital Marketing Intern",
    department: "Marketing",
    type: "Internship",
    location: "Remote / Hybrid",
    salary: "Salary will be discussed",
    description:
      "Gain hands-on experience working with digital campaigns and learn from a team of experienced marketers.",
    requirements: [
      "Prior internship, course, or training in digital marketing",
      "Eagerness to learn paid media, SEO, and analytics",
      "Basic knowledge of digital platforms",
      "Excellent communication and adaptability",
    ],
  },
  {
    title: "Professional Content Writer",
    department: "Content",
    type: "Full-time",
    location: "Remote / Hybrid",
    salary: "Salary will be discussed",
    description:
      "Craft high-converting content for digital campaigns, landing pages, blogs, and more with a strategic marketing approach.",
    requirements: [
      "1–2 years of content writing experience",
      "Knowledge of SEO and audience targeting",
      "Ability to write clear, persuasive, and engaging content",
      "Familiarity with digital platforms and CMS tools",
    ],
  },
  {
    title: "Photo & Videographer",
    department: "Creative",
    type: "Full-time",
    location: "Remote / Hybrid",
    salary: "Salary will be discussed",
    description:
      "Create engaging visual content that brings our brand and campaigns to life across platforms.",
    requirements: [
      "1+ year of photography and videography experience",
      "Familiarity with camera equipment and editing software",
      "Eye for detail and composition",
      "Portfolio or sample work is a must",
    ],
  },
  {
    title: "Video Editor",
    department: "Creative",
    type: "Full-time",
    location: "Remote / Hybrid",
    salary: "Salary will be discussed",
    description:
      "Edit and produce compelling videos for ads, social media, and promotional campaigns with a focus on impact.",
    requirements: [
      "1–2 years of video editing experience",
      "Proficiency in Premiere Pro, After Effects, or similar tools",
      "Creative storytelling through video",
      "Understanding of short-form content trends",
    ],
  },
  {
    title: "Lead Generation Expert",
    department: "Marketing",
    type: "Full-time",
    location: "Remote / Hybrid",
    salary: "Salary will be discussed",
    description:
      "Build and execute strategies to generate qualified leads using digital and outbound techniques.",
    requirements: [
      "1–2 years in lead generation or outbound campaigns",
      "Familiarity with LinkedIn, email automation, and CRM tools",
      "Strong communication and research skills",
      "Target-driven and organized approach",
    ],
  },
  {
    title: "Senior Graphic Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote / Hybrid",
    salary: "Salary will be discussed",
    description:
      "Design high-quality creatives for campaigns, branding, and digital media, ensuring brand consistency and innovation.",
    requirements: [
      "3+ years of graphic design experience",
      "Expertise in Adobe Suite and design systems",
      "Strong portfolio with digital-first designs",
      "Creative thinking with problem-solving skills",
    ],
  },
  {
    title: "Junior Graphic Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote / Hybrid",
    salary: "Salary will be discussed",
    description:
      "Assist in producing creative assets for social media, ads, and web with guidance from senior designers.",
    requirements: [
      "6 months – 1 year of experience or strong internship",
      "Proficiency in Adobe Photoshop, Illustrator, Canva",
      "Creativity and attention to design trends",
      "Ability to follow brand guidelines",
    ],
  },
  {
    title: "Graphic Design Intern",
    department: "Design",
    type: "Internship",
    location: "Remote / Hybrid",
    salary: "Salary will be discussed",
    description:
      "Kickstart your creative journey by working alongside experienced designers on real-world projects.",
    requirements: [
      "Basic understanding of design tools (Adobe / Canva)",
      "Portfolio of academic/personal projects",
      "Willingness to learn and receive feedback",
      "Creative eye and adaptability",
    ],
  },
];

export const benefits: string[] = [
  "Competitive salary and performance bonuses",
  "Comprehensive health, dental, and vision insurance",
  "Flexible working hours and remote work options",
  "Professional development budget (₹1,50,000/year)",
  "Modern equipment and tools",
  "Team building events and company retreats",
  "Unlimited PTO policy",
  "Stock options for senior positions",
];
