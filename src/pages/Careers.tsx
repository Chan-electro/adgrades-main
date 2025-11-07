import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Shield,
  ArrowRight,
  Zap,
  Users,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Heart,
  Globe,
  Target,
} from "lucide-react";
import { cultureValues, openPositions, benefits } from "../data/careersData";

const FORM_SUBMIT_ENDPOINT =
  import.meta.env.VITE_CAREERS_FORM_ENDPOINT ||
  "https://formsubmit.co/ajax/adgradesweb@gmail.com";

const initialApplicationData = {
  name: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  portfolio: "",
  message: "",
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const Careers: React.FC = () => {
  const [applicationData, setApplicationData] = useState(
    initialApplicationData
  );
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selectedPositionTitle = useMemo(() => {
    if (!applicationData.position) {
      return "";
    }

    if (applicationData.position === "other") {
      return "Other / General Application";
    }

    const matchingPosition = openPositions.find(
      (position) =>
        position.title.toLowerCase().replace(/ /g, "-") ===
        applicationData.position
    );

    return matchingPosition?.title ?? applicationData.position;
  }, [applicationData.position]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const payload = {
      name: applicationData.name,
      email: applicationData.email,
      phone: applicationData.phone,
      portfolio: applicationData.portfolio,
      position: selectedPositionTitle || "Not specified",
      experience: applicationData.experience,
      message: applicationData.message,
      _subject: `New Career Application from ${applicationData.name}`,
      _template: "table",
      _captcha: "false",
      source: "AdGrades careers page",
    };

    try {
      const response = await fetch(FORM_SUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message =
          errorData?.message ||
          "We couldn't submit your application right now. Please try again.";
        throw new Error(message);
      }

      setStatus("success");
      setApplicationData(initialApplicationData);
    } catch (error) {
      console.error("Failed to submit application", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We couldn't submit your application right now. Please try again."
      );
    }
  };

  const careerFaqs = [
    {
      question: "What is the interview process like at AdGrades?",
      answer:
        "Our interview process typically involves three stages: an initial phone screening, a portfolio/skills assessment, and a final interview with the team. We focus on understanding your creativity, problem-solving abilities, and cultural fit rather than just technical skills.",
    },
    {
      question: "Do you offer remote work opportunities?",
      answer:
        "Yes! We offer flexible work arrangements including remote work, hybrid options, and flexible hours. We believe in work-life balance and trust our team members to deliver excellent results regardless of where they work from.",
    },
    {
      question: "What growth opportunities are available?",
      answer:
        "AdGrades is a rapidly growing company, which means plenty of opportunities for career advancement. We provide regular training, mentorship programs, conference attendance, and clear career progression paths. Many of our current leaders started in junior positions.",
    },
    {
      question: "What benefits do you offer to employees?",
      answer:
        "We offer competitive salaries, health insurance, flexible PTO, learning and development budgets, latest tech equipment, team outings, performance bonuses, and stock options for senior roles. We also provide a collaborative work environment with opportunities to work on exciting projects.",
    },
    {
      question: "How do you support work-life balance?",
      answer:
        "We strongly believe in work-life balance. We offer flexible working hours, mental health support, regular team breaks, and encourage taking time off. Our culture promotes sustainable work practices and we regularly check in with team members about their workload and wellbeing.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-14 sm:pt-16 lg:pt-20 bg-background">
      {/* Hero Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center bg-secondary/10 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-secondary mr-1 sm:mr-1.5" />
              <span className="text-secondary font-semibold text-xs sm:text-sm">
                Join Our Growing Team
              </span>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Build Your Career with{" "}
              <span className="gradient-text">AdGrades</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join a dynamic team that's revolutionizing digital marketing.
              We're looking for passionate individuals who want to make a real
              impact and grow their careers with us.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="#application-form"
                  className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden transition-all duration-300"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2 relative z-10 group-hover:animate-pulse" />
                  <span className="relative z-10">Apply Now</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="#open-positions"
                  className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span>View Positions</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Certificate Verification Section */}
      <section className="py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center bg-card/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-border/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-secondary mx-auto mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3">
              Verify Employee Certificates
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto">
              Verify the authenticity of AdGrades employee certificates and
              achievements.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/verify"
                className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-sm font-semibold rounded-full bg-secondary/20 text-secondary border-2 border-secondary hover:bg-secondary hover:text-white overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10">Verify Certificate</span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>{" "}
      {/* Culture & Values */}
      <section className="py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Culture & <span className="gradient-text">Values</span>
            </motion.h2>
            <motion.p
              className="text-sm sm:text-base text-muted-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              At AdGrades, we've built a culture that fosters creativity,
              collaboration, and personal growth.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {cultureValues.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-card/40 rounded-lg p-4 sm:p-6 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:bg-card/60"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <value.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>{" "}
      {/* Open Positions Section with Grid Layout */}
      <section
        id="open-positions"
        className="py-6 sm:py-8 md:py-12 relative overflow-hidden"
      >
        {/* Background decoration elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center bg-primary/10 rounded-full px-3 py-1 mb-3"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Briefcase className="w-4 h-4 text-primary mr-1.5" />
              <span className="text-primary font-medium text-sm">
                Current Openings
              </span>
            </motion.div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              Join Our <span className="gradient-text">Dream Team</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl mx-auto">
              Explore our current openings and find the perfect role that
              matches your skills and passion
            </p>
          </motion.div>{" "}
          {/* Grid layout for open positions */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                className={`bg-card/40 backdrop-blur-sm rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300 h-full ${
                  index % 3 === 0
                    ? "border-primary/20 hover:border-primary/40"
                    : index % 2 === 0
                    ? "border-secondary/20 hover:border-secondary/40"
                    : "border-accent/20 hover:border-accent/40"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Card header with gradient */}
                <div
                  className={`h-3 w-full ${
                    index % 3 === 0
                      ? "bg-gradient-to-r from-primary to-primary/60"
                      : index % 2 === 0
                      ? "bg-gradient-to-r from-secondary to-secondary/60"
                      : "bg-gradient-to-r from-accent to-accent/60"
                  }`}
                ></div>

                <div className="p-5 sm:p-6 flex flex-col h-[calc(100%-3px)]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="pr-3">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 line-clamp-2">
                        {position.title}
                      </h3>
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                        {position.department}
                      </div>
                    </div>

                    <div
                      className={`flex-shrink-0 flex items-center justify-center rounded-full w-12 h-12 ${
                        index % 3 === 0
                          ? "bg-primary/10 text-primary"
                          : index % 2 === 0
                          ? "bg-secondary/10 text-secondary"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {/* Icon based on department */}
                      {position.department === "Marketing" ? (
                        <Target className="h-5 w-5 sm:h-6 sm:w-6" />
                      ) : position.department === "Design" ? (
                        <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                      ) : position.department === "Content" ? (
                        <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                      ) : position.department === "Creative" ? (
                        <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                      ) : (
                        <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm sm:text-base mb-5 line-clamp-3">
                    {position.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4 mt-auto">
                    <span className="flex items-center bg-background/80 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3 mr-1" />
                      {position.type}
                    </span>
                    <span className="flex items-center bg-background/80 px-2 py-1 rounded-full">
                      <MapPin className="h-3 w-3 mr-1" />
                      {position.location}
                    </span>
                    <span className="flex items-center bg-background/80 px-2 py-1 rounded-full">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {position.salary}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/30 mt-auto">
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        index % 3 === 0
                          ? "text-primary"
                          : index % 2 === 0
                          ? "text-secondary"
                          : "text-accent"
                      }`}
                    >
                      {index % 3 === 0
                        ? "New"
                        : index % 2 === 0
                        ? "Featured"
                        : "Trending"}
                    </span>

                    <a
                      href="#application-form"
                      onClick={() => {
                        setApplicationData({
                          ...applicationData,
                          position: position.title
                            .toLowerCase()
                            .replace(/ /g, "-"),
                        });
                      }}
                      className={`group inline-flex items-center text-sm sm:text-base font-medium ${
                        index % 3 === 0
                          ? "text-primary"
                          : index % 2 === 0
                          ? "text-secondary"
                          : "text-accent"
                      }`}
                    >
                      Apply Now
                      <ArrowRight className="ml-1.5 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Application Form Section - Styled Uniquely */}
      <section
        id="application-form"
        className="py-10 sm:py-12 md:py-16 relative"
      >
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0,rgba(var(--background-rgb),0)_50%)] z-0"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with decorative elements */}
          <motion.div
            className="text-center mb-12 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Decorative shapes */}
            <motion.div
              className="absolute left-1/4 -top-16 w-12 h-12 rounded-full border border-primary/20"
              animate={{
                y: [0, 8, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
            <motion.div
              className="absolute right-1/4 -top-6 w-8 h-8 rounded-full border border-secondary/20"
              animate={{
                y: [0, -8, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
            <div className="inline-flex items-center bg-primary/10 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-3 sm:mb-4">
              <Send className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5" />
              <span className="text-primary font-semibold text-xs sm:text-sm">
                Join Our Team
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to <span className="gradient-text">Apply?</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-2">
              Take the first step towards joining our team. Fill out the form
              below, and we'll get back to you soon.
            </p>
          </motion.div>
          {/* Application Form with unique styling */}
          <motion.div
            id="application-form"
            className="relative mt-6 overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-2xl backdrop-blur-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 -right-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-36 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
            />
            {status === "success" ? (
              <div className="relative px-6 py-10 sm:px-10">
                <motion.div
                  className="relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-white/80 px-6 py-8 text-center shadow-xl dark:border-emerald-500/30 dark:bg-emerald-950/70"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-transparent to-emerald-200/40 dark:from-emerald-900/40 dark:via-transparent dark:to-emerald-800/30" aria-hidden />
                  <CheckCircle className="relative mx-auto mb-4 h-10 w-10 text-emerald-500" />
                  <h3 className="relative text-lg font-semibold text-foreground">
                    Application Submitted Successfully!
                  </h3>
                  <p className="relative mt-2 text-sm text-muted-foreground">
                    We'll review your application and get back to you within 5 business days.
                  </p>
                  <motion.button
                    className="relative mt-6 inline-flex items-center justify-center rounded-lg border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/15"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setStatus("idle");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Back to Top
                  </motion.button>
                </motion.div>
              </div>
            ) : (
              <div className="relative">
                {/* Form header with accent */}
                <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-secondary px-5 py-6 sm:px-7 sm:py-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.3),_transparent_60%)]" aria-hidden />
                  <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center text-white">
                      <span className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                        <Send className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold">Apply Now</h3>
                        <p className="text-xs sm:text-sm text-white/80">
                          Fields marked with * are required
                        </p>
                      </div>
                    </div>
                    <div className="hidden items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white sm:flex">
                      <Sparkles className="h-4 w-4" />
                      <span>Be part of a fast-growing team</span>
                    </div>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 bg-gradient-to-br from-background/85 via-background/80 to-background/90 px-5 py-6 shadow-inner backdrop-blur-md sm:px-7 sm:py-8 dark:from-background/95 dark:via-background/92 dark:to-background/98"
                >
                  {status === "error" && errorMessage && (
                    <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-left text-xs sm:text-sm font-medium text-destructive dark:border-destructive/30 dark:bg-destructive/15">
                      {errorMessage}
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="block text-xs sm:text-sm font-semibold text-foreground"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={applicationData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-border/60 bg-background/70 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background dark:border-border/40 dark:bg-background/80"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block text-xs sm:text-sm font-semibold text-foreground"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={applicationData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-border/60 bg-background/70 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background dark:border-border/40 dark:bg-background/80"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="phone"
                        className="block text-xs sm:text-sm font-semibold text-foreground"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={applicationData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-border/60 bg-background/70 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background dark:border-border/40 dark:bg-background/80"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="portfolio"
                        className="block text-xs sm:text-sm font-semibold text-foreground"
                      >
                        Portfolio/LinkedIn URL
                      </label>
                      <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={applicationData.portfolio}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-border/60 bg-background/70 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background dark:border-border/40 dark:bg-background/80"
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="position"
                        className="block text-xs sm:text-sm font-semibold text-foreground"
                      >
                        Position of Interest *
                      </label>
                      <select
                        id="position"
                        name="position"
                        required
                        value={applicationData.position}
                        onChange={handleInputChange}
                        className="w-full appearance-none rounded-lg border border-border/60 bg-background/70 px-4 py-2.5 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background dark:border-border/40 dark:bg-background/80"
                      >
                        <option value="">Select a position</option>
                        {openPositions.map((position) => (
                          <option
                            key={position.title}
                            value={position.title
                              .toLowerCase()
                              .replace(/ /g, "-")}
                          >
                            {position.title}
                          </option>
                        ))}
                        <option value="other">
                          Other / General Application
                        </option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="experience"
                        className="block text-xs sm:text-sm font-semibold text-foreground"
                      >
                        Years of Experience
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={applicationData.experience}
                        onChange={handleInputChange}
                        className="w-full appearance-none rounded-lg border border-border/60 bg-background/70 px-4 py-2.5 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background dark:border-border/40 dark:bg-background/80"
                      >
                        <option value="">Select experience level</option>
                        <option value="0-1">0-1 years (Entry Level)</option>
                        <option value="2-3">2-3 years</option>
                        <option value="4-5">4-5 years</option>
                        <option value="6+">6+ years (Senior Level)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block text-xs sm:text-sm font-semibold text-foreground"
                    >
                      Tell us about yourself *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={applicationData.message}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background dark:border-border/40 dark:bg-background/80"
                      placeholder="Highlight your experience, achievements, and what excites you about working with AdGrades."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="resume"
                      className="block text-xs sm:text-sm font-semibold text-foreground"
                    >
                      Resume / CV URL
                    </label>
                    <input
                      type="url"
                      id="resume"
                      name="resume"
                      value={applicationData.resume}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-border/60 bg-background/70 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background dark:border-border/40 dark:bg-background/80"
                      placeholder="Share a Google Drive, Dropbox, or portfolio link."
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] sm:text-xs text-muted-foreground">
                      By submitting this form, you agree to our privacy policy.
                    </p>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={status === "submitting"}
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {status === "submitting" ? "Submitting..." : "Submit Application"}
                        <Send className="h-4 w-4" />
                      </span>
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-secondary/40 to-primary/40 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    </motion.button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>{" "}
      </section>
      {/* Benefits Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                Why Work at <span className="gradient-text">AdGrades?</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                We believe in taking care of our team members and providing an
                environment where everyone can thrive both professionally and
                personally.
              </p>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-secondary mr-2 sm:mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?w=600&h=400&fit=crop"
                alt="AdGrades team working together"
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-card/80 backdrop-blur-xl p-3 sm:p-4 rounded-lg shadow-lg border border-border">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  <div>
                    <div className="font-bold text-foreground text-sm sm:text-base">
                      15+ Team Members
                    </div>
                    <div className="text-muted-foreground text-xs">
                      And Growing!
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* FAQs Section */}
      <section className="py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Frequently Asked <span className="gradient-text">Questions</span>
            </motion.h2>
            <motion.p
              className="text-sm sm:text-base text-muted-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Get answers to common questions about working at AdGrades.
            </motion.p>
          </div>

          <div className="divide-y divide-border/30">
            {careerFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-0 py-3 sm:py-4 text-left flex items-center justify-between hover:text-primary/80 transition-colors duration-300 focus:outline-none"
                >
                  <h3 className="text-sm sm:text-base font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <motion.div
                    className="pb-3 sm:pb-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="pt-2 sm:pt-3">
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-border/50"
          >
            <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3">
              Ready to Join Our Team?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto">
              Let's discuss how you can contribute to our mission and grow your
              career with AdGrades.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="https://calendly.com/chandanbkrishna077/adgrades"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-sm font-semibold rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden transition-all duration-300"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">
                  Get Your Free Strategy Session
                </span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
