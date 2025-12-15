import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Share2,
  Palette,
  Search,
  Mail,
  TrendingUp,
  Code,
  Star,
  Users,
  Award,
  Target,
  CheckCircle,
  Zap,
  Play,
  Globe,
  Shield,
  Rocket,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import AnimatedCounter from "../components/AnimatedCounter";
import { heroData, servicesData, ctaData, testimonialData } from "../data/homeData";
import { TestimonialsColumn } from "../components/ui/testimonials-columns-1";
import TeaserSection from "../components/TeaserSection";

const Home: React.FC = () => {
  // Service icons mapping
  const serviceIcons = {
    "Social Media Marketing": Share2,
    "Brand Design & Identity": Palette,
    "SEO & Content Marketing": Search,
    "Email Marketing": Mail,
    "Web Development": Code,
    "Performance Advertising": TrendingUp,
  };

  const clients = [
    {
      name: "OS CODE Solutions",
      category: "IT Solutions",
      description: "Emerging IT solutions startup",
      logo: "./client/oscode.png",
    },
    {
      name: "Delhi 65",
      category: "Restaurant",
      description: "Ranchi Restaurant",
      logo: "./client/delhi65.png",
    },
    {
      name: "Medhavi Classes",
      category: "Education",
      description: "Online education platform",
      logo: "./client/medhavi.png",
    },
    {
      name: "Uplifto",
      category: "Tech Services",
      description: "Tech-based startup for IT services",
      logo: "./client/upliftio.png",
    },
    {
      name: "Vinayaka Enterprises",
      category: "Interior Design",
      description: "Interior Design Studio",
      logo: "./client/vinayaka.jpg",
    },
    {
      name: "M K Streetwear",
      category: "Fashion",
      description: "Streetwear Fashion Brand",
      logo: "./client/mk.png",
    },
    {
      name: "Adhyayan",
      category: "Education",
      description: "Online Coaching Institute",
      logo: "./client/aadhyan.jpg",
    },
    {
      name: "Dew Drop Homestay",
      category: "Hospitality",
      description: "Premium Hilltop Stay",
      logo: "./client/dewdrop.png",
    },
    {
      name: "Nataraj Dance Studios",
      category: "Entertainment",
      description: "Dance training academy",
      logo: "./client/nataraj.png",
    },
    {
      name: "Pureblend Foods",
      category: "Food & Beverage",
      description: "B2B Food Supply Chain Brand",
      logo: "./client/pureblend.jpg",
    },
    {
      name: "SP Enterprises",
      category: "Heavy Equipment",
      description: "Heavy Earthmoving Equipment & Spares",
      logo: "./client/splogo.png",
    },
    {
      name: "AS Tech Industries",
      category: "Engineering",
      description: "Engineering and Manufacturing Services",
      logo: "./client/asti.png",
    },
  ];

  const computeInitials = (value: string) =>
    value
      .split(/\s+/)
      .filter(Boolean)
      .map((segment) => segment[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const marqueeTestimonials = testimonialData.testimonials.map((testimonial) => {
    const logoSrc = testimonial.avatar ?? undefined;
    const fallbackLabel = testimonial.company || testimonial.name;

    return {
      text: testimonial.content,
      logoSrc,
      initials: logoSrc ? undefined : testimonial.initials ?? computeInitials(fallbackLabel),
      name: testimonial.name,
      role: testimonial.company
        ? `${testimonial.role} • ${testimonial.company}`
        : testimonial.role,
    };
  });

  type MarqueeTestimonial = (typeof marqueeTestimonials)[number];
  const marqueeColumns: MarqueeTestimonial[][] = [[], [], []];
  marqueeTestimonials.forEach((testimonial, index) => {
    marqueeColumns[index % marqueeColumns.length].push(testimonial);
  });

  const [firstColumn = [], secondColumn = [], thirdColumn = []] = marqueeColumns;
  return (
    <div className="pt-16 sm:pt-20 lg:pt-24 overflow-x-hidden">
      {" "}
      {/* Hero Section - Dynamic and Engaging Design */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen flex items-center justify-center px-3 sm:px-4 lg:px-8 overflow-hidden pt-4 sm:pt-8 lg:pt-12">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Main gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-secondary/25 to-accent/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(147 51 234) 1px, transparent 0)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            {/* Floating Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm mb-6 sm:mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
              </motion.div>
              <span className="text-sm sm:text-base font-semibold gradient-text">
                🚀 Transforming Businesses Since 2023
              </span>
            </motion.div>

            {/* Dynamic Main Title */}
            <div className="mb-6 sm:mb-8">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <motion.span
                  className="block text-foreground mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                >
                  {heroData.subtitle}
                </motion.span>{" "}
                <motion.span
                  className="relative inline-block gradient-text-large pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                >
                  {heroData.highlight}
                </motion.span>
                <motion.span
                  className="block text-lg sm:text-xl md:text-2xl text-muted-foreground/90 mt-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                >
                  Where creativity meets measurable growth.
                </motion.span>
              </motion.h1>
            </div>

            {/* Enhanced Description */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {heroData.description}
            </motion.p>

            {/* Dynamic CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {" "}
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden transition-all duration-300"
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <Zap className="w-5 h-5 mr-2 relative z-10 group-hover:animate-pulse" />
                  <span className="relative z-10">{heroData.primaryCTA}</span>
                  <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/portfolio"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  <span>{heroData.secondaryCTA}</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 right-12 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl hidden lg:block"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-12 w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full hidden lg:block"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </section>{" "}
      <TeaserSection />
      {/* Stats Section - Modern Floating Design */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/3 w-36 h-36 lg:w-48 lg:h-48 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center bg-accent/10 rounded-full px-4 py-1.5 sm:px-6 sm:py-2 mb-3 sm:mb-6">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-accent mr-1.5 sm:mr-2" />
              <span className="text-accent font-semibold text-sm sm:text-base">
                Our Impact
              </span>
            </div>{" "}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-4">
              Results That <span className="gradient-text">Speak Volumes</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Proven impact through exceptional partnerships and innovative
              solutions
            </p>
          </div>{" "}
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
            {heroData.stats.map((stat, index) => {
              const gradients = [
                "from-primary to-secondary",
                "from-secondary to-accent",
                "from-accent to-primary",
                "from-primary/80 to-secondary/80",
              ];

              return (
                <motion.div
                  key={stat.label}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  {" "}
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-card to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 xl:p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-primary/50">
                    {/* Floating Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl lg:rounded-3xl`}
                    ></div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-r from-primary to-secondary rounded-full opacity-60"></div>
                    <div className="absolute -bottom-0.5 -left-0.5 lg:-bottom-1 lg:-left-1 w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-r from-secondary to-accent rounded-full opacity-40"></div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                      {/* Number */}{" "}
                      <div
                        className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold gradient-stat-${index} mb-2 sm:mb-3 lg:mb-4`}
                      >
                        <AnimatedCounter
                          end={stat.number}
                          suffix={stat.suffix}
                        />
                      </div>
                      {/* Label */}
                      <p className="text-muted-foreground font-semibold text-xs sm:text-sm lg:text-base group-hover:text-foreground transition-colors">
                        {stat.label}
                      </p>
                    </div>

                    {/* Hover Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${gradients[index]} opacity-0 group-hover:opacity-5 rounded-2xl lg:rounded-3xl blur transition-opacity duration-500`}
                    ></div>
                  </div>{" "}
                  {/* Floating Elements for Visual Interest */}
                  {index === 0 && (
                    <motion.div
                      className="absolute -top-2 -left-2 lg:-top-4 lg:-left-4 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}{" "}
                  {index === 3 && (
                    <motion.div
                      className="absolute -bottom-1.5 -right-1.5 lg:-bottom-3 lg:-right-3 w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-r from-accent to-primary rounded-full opacity-30"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
          {/* Bottom Decorative Element */}
          <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
            <div className="inline-flex items-center space-x-1.5 sm:space-x-2 text-muted-foreground">
              <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent to-primary"></div>
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-sm font-medium">
                Trusted by industry leaders
              </span>
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-l from-transparent to-secondary"></div>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Services Section - Modern Bento Grid Layout */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-1.5 sm:px-6 sm:py-2 mb-3 sm:mb-6">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-1.5 sm:mr-2" />
              <span className="text-primary font-semibold text-sm sm:text-base">
                Our Expertise
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 sm:mb-4 lg:mb-6">
              {servicesData.title}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              {servicesData.description}
            </p>
          </div>{" "}
          {/* Varied Bento Grid - 1 Large, 2 Medium, 3 Regular Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 mb-8 sm:mb-10 lg:mb-12 rounded-2xl lg:rounded-3xl overflow-hidden border border-border/30">
            {servicesData.services.map((service, index) => {
              const IconComponent =
                serviceIcons[service.title as keyof typeof serviceIcons] ||
                Code; // Varied bento grid layouts - 1 large, 2 medium, 3 regular
              const layouts = [
                "sm:col-span-2 md:col-span-2 md:row-span-2", // Large card (Social Media) - 2x2 space
                "sm:col-span-1 md:col-span-1 md:row-span-3", // Medium card (Brand Design) - 1x2 space
                "sm:col-span-1 md:col-span-1 md:row-span-1", // Regular card (SEO) - 1x1 space
                "sm:col-span-1 md:col-span-1 md:row-span-1", // Regular card (Email Marketing) - 1x1 space
                "sm:col-span-2 md:col-span-2 md:row-span-1", // Medium card (Web Dev) - 2x1 space
                "sm:col-span-1 md:col-span-1 md:row-span-1", // Regular card (Performance Ads) - 1x1 space
              ];

              const cardSizes = [
                "large",
                "medium",
                "regular",
                "regular",
                "medium",
                "regular",
              ];
              const cardSize = cardSizes[index];
              const isLarge = cardSize === "large";
              const isMedium = cardSize === "medium";

              return (
                <div
                  key={service.title}
                  className={`${layouts[index]
                    } group relative overflow-hidden rounded-none bg-gradient-to-br from-card to-card/50 border-r border-b border-border hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:z-10 ${isLarge
                      ? "min-h-[250px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[350px] xl:min-h-[400px]"
                      : isMedium
                        ? "min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[280px] xl:min-h-[300px]"
                        : "min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[220px] xl:min-h-[240px]"
                    }`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full transform translate-x-16 -translate-y-16"></div>
                  </div>{" "}
                  {/* Content */}
                  <div className="relative z-10 p-3 sm:p-4 lg:p-6 xl:p-8 h-full flex flex-col">
                    {" "}
                    {/* Icon */}
                    <div className="mb-3 sm:mb-4 lg:mb-6">
                      <div className="relative">
                        {" "}
                        <div
                          className={`${isLarge
                            ? "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20"
                            : isMedium
                              ? "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18"
                              : "w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
                            } bg-gradient-to-br from-primary to-secondary rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent
                            className={`${isLarge
                              ? "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10"
                              : isMedium
                                ? "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9"
                                : "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8"
                              } text-white`}
                          />
                        </div>{" "}
                        {/* Floating elements for large card */}
                        {isLarge && (
                          <motion.div
                            className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-4 h-4 lg:w-6 lg:h-6 bg-secondary rounded-full"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.6, 1, 0.6],
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </div>
                    </div>
                    {/* Title */}{" "}
                    <h3
                      className={`${isLarge
                        ? "text-lg sm:text-xl md:text-2xl lg:text-3xl"
                        : isMedium
                          ? "text-base sm:text-lg md:text-xl lg:text-2xl"
                          : "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                        } font-bold text-foreground mb-2 sm:mb-3 lg:mb-4 group-hover:text-primary transition-colors`}
                    >
                      {service.title}
                    </h3>
                    {/* Description */}
                    <p
                      className={`text-muted-foreground leading-relaxed mb-3 sm:mb-4 lg:mb-6 flex-grow ${isLarge
                        ? "text-base sm:text-lg"
                        : isMedium
                          ? "text-sm sm:text-base"
                          : "text-xs sm:text-sm lg:text-base"
                        }`}
                    >
                      {service.description}
                    </p>
                    {/* Features - Show only for large card */}
                    {isLarge && (
                      <div className="mb-3 sm:mb-4 lg:mb-6">
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {service.features.slice(0, 4).map((feature) => (
                            <span
                              key={feature}
                              className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* CTA */}
                    <Link
                      to="/contact"
                      className="inline-flex items-center text-primary hover:text-secondary font-semibold transition-colors group-hover:translate-x-2 transform duration-300 text-xs sm:text-sm"
                    >
                      Explore Service
                      <ArrowRight className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl lg:rounded-3xl"></div>
                  </div>
                </div>
              );
            })}
          </div>{" "}
          {/* Bottom CTA */}
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-primary to-secondary rounded-full p-0.5 sm:p-1">
              <Link
                to="/services"
                className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base bg-background text-foreground hover:shadow-lg transition-all duration-300"
              >
                View All Services
                <ExternalLink className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Clients Section - Modern Grid Layout */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center bg-secondary/10 rounded-full px-4 py-1.5 sm:px-6 sm:py-2 mb-3 sm:mb-6">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-secondary mr-1.5 sm:mr-2" />
              <span className="text-secondary font-semibold text-sm sm:text-base">
                Trusted Partners
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 sm:mb-4 lg:mb-6">
              Trusted by <span className="gradient-text">Amazing Clients</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              We're proud to partner with innovative businesses across various
              industries, helping them achieve their digital transformation
              goals.
            </p>
          </div>
          {/* Clients Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12">
            {" "}
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                className="group relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-primary/50 flex flex-col items-center justify-center aspect-square"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-secondary rounded-full transform translate-x-6 -translate-y-6 lg:translate-x-8 lg:-translate-y-8"></div>
                </div>
                {/* Client Logo */}
                <div className="relative z-10 w-full h-12 sm:h-14 lg:h-16 mb-2 lg:mb-3 flex items-center justify-center">
                  {" "}
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />{" "}
                  {/* Fallback for missing images */}
                  <div className="hidden w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-sm">
                      {client.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                </div>
                {/* Client Info */}
                <div className="text-center">
                  <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-0.5 sm:mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {client.name}
                  </h3>
                  <p className="text-xs text-muted-foreground group-hover:text-secondary transition-colors">
                    {client.category}
                  </p>
                </div>{" "}
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl lg:rounded-2xl"></div>
              </motion.div>
            ))}
          </div>{" "}
          {/* Call to Action */}
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-primary to-secondary rounded-full p-0.5 sm:p-1 shadow-md">
              <Link
                to="/portfolio"
                className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base bg-background text-foreground hover:shadow-lg transition-all duration-300"
              >
                View Our Portfolio
                <ExternalLink className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Testimonials - Client Stories Columns */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden">
        <div
          className="absolute inset-x-0 -top-32 h-64 bg-gradient-to-b from-primary/10 via-background to-transparent"
          aria-hidden="true"
        ></div>
        <div
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-secondary/10 via-background to-transparent"
          aria-hidden="true"
        ></div>
        <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center border border-border/40 bg-card/60 backdrop-blur px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-widest text-primary">
              Testimonials
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-5">
              What our clients are saying
            </h2>
            <p className="mt-4 text-muted-foreground">
              Real feedback from teams that modernized their operations with our platform.
            </p>
          </motion.div>
          <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          </div>
        </div>
      </section>{" "}
      {/* CTA Section - Modern Interactive Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-background border-t border-border">
        {" "}
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          />
        </div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-border"></div>
            ))}
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            {" "}
            {/* Badge */}
            <div className="inline-flex items-center bg-primary/10 backdrop-blur-sm rounded-full px-4 py-1.5 sm:px-6 sm:py-2 mb-4 sm:mb-6 lg:mb-8 border border-primary/20">
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-1.5 sm:mr-2" />
              <span className="text-primary font-semibold text-sm sm:text-base">
                Ready to Launch?
              </span>
            </div>
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 lg:mb-8 leading-tight">
              {ctaData.title}
            </h2>
            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed">
              {ctaData.description}
            </p>{" "}
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10 sm:mb-12 lg:mb-16">
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-sm sm:text-base rounded-xl lg:rounded-2xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl lg:rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <span className="whitespace-nowrap">
                    {ctaData.primaryCTA}
                  </span>
                  <Target className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <a
                href="https://calendly.com/chandanbkrishna077/adgrades"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-5 py-4 border-2 border-primary/30 text-foreground font-bold rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
              >
                {ctaData.secondaryCTA}
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>{" "}
            {/* Feature Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {ctaData.features.map((feature) => (
                <div key={feature} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Elements */}
          <div className="relative">
            {/* Floating Cards */}
            <div className="hidden lg:block">
              {" "}
              <div className="absolute top-0 left-0 bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center text-foreground">
                  <Globe className="w-8 h-8 text-primary mr-3" />
                  <div>
                    <div className="font-bold">Global Reach</div>
                    <div className="text-sm text-muted-foreground">
                      Worldwide clients
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center text-foreground">
                  <Shield className="w-8 h-8 text-secondary mr-3" />
                  <div>
                    <div className="font-bold">Secure & Reliable</div>
                    <div className="text-sm text-muted-foreground">
                      100% guaranteed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 w-full">
              <svg
                viewBox="0 0 1200 120"
                className="w-full h-12 text-primary/20"
              >
                <path
                  d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
