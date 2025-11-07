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
  ArrowRight,
  Users,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Heart,
  Target,
  MessageCircle,
  Mail,
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

const applicationStats = [
  {
    title: "Hybrid culture",
    description: "Collaborate remotely with quarterly in-person jams across India.",
  },
  {
    title: "Growth budgets",
    description: "Dedicated learning allowance and mentor support every quarter.",
  },
  {
    title: "Global clients",
    description: "Design for campaigns launching across 8+ countries and industries.",
  },
];

const journeySteps = [
  {
    title: "Share your story",
    description: "Tell us what excites you and attach work that makes you proud.",
    icon: Sparkles,
  },
  {
    title: "Meet the team",
    description: "We’ll schedule a culture-first chat with the hiring squad.",
    icon: Users,
  },
  {
    title: "Collaborative challenge",
    description: "Tackle a mini brief together to experience our workflow.",
    icon: Target,
  },
  {
    title: "Welcome aboard",
    description: "Receive a personalised growth plan and project roadmap.",
    icon: Heart,
  },
];

const Careers: React.FC = () => {
  const [applicationData, setApplicationData] = useState(initialApplicationData);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePosition, setActivePosition] = useState<number | null>(0);

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

  const togglePosition = (index: number) => {
    setActivePosition(activePosition === index ? null : index);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pb-24 pt-20">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-br from-secondary/20 via-transparent to-primary/20 blur-3xl"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.06),_transparent_55%)]" />

      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1 text-xs font-semibold text-secondary"
              >
                <Sparkles className="h-4 w-4" />
                <span>Where ambitious creatives build bold brands</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
              >
                Join the growth studio shaping the next wave of digital-first brands
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="max-w-2xl text-sm text-muted-foreground sm:text-base"
              >
                AdGrades is a team of storytellers, analysts, designers, and builders. We partner with founders to scale ideas into movements—and we’d love to build the next chapter with you.
              </motion.p>

              <div className="grid gap-4 sm:grid-cols-3">
                {applicationStats.map((stat) => (
                  <div
                    key={stat.title}
                    className="rounded-2xl border border-border/60 bg-card/70 px-4 py-3 shadow-sm backdrop-blur"
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#apply"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-secondary to-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30"
                >
                  <Send className="h-4 w-4" />
                  Apply now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-secondary/40 px-5 py-2 text-sm font-semibold text-secondary transition-all duration-300 hover:border-secondary hover:bg-secondary/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  Talk to our team
                </Link>
              </div>
            </div>

            <motion.div
              className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 shadow-2xl backdrop-blur-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary/15 via-background to-primary/15" />
              <div className="absolute -top-12 -right-10 h-48 w-48 rounded-full bg-secondary/20 blur-3xl" aria-hidden />
              <div className="absolute -bottom-16 -left-14 h-56 w-56 rounded-full bg-primary/20 blur-3xl" aria-hidden />

              <div className="relative space-y-6">
                <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                  The journey after you hit send
                </h2>
                <div className="space-y-4">
                  {journeySteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background/70 p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                        <step.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {index + 1}. {step.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground">
                  Curious about day-to-day life at AdGrades? Explore our
                  {" "}
                  <Link
                    to="/contact"
                    className="font-semibold text-secondary underline-offset-4 hover:underline"
                  >
                    open culture sessions
                  </Link>
                  {" "}
                  and chat directly with the team.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="apply" className="relative z-10 mt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 sm:p-10 shadow-xl backdrop-blur-xl"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary/15 via-background to-primary/15" />
              <div className="absolute -right-12 -top-14 h-60 w-60 rounded-full bg-secondary/25 blur-3xl" aria-hidden />
              <div className="absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-primary/25 blur-3xl" aria-hidden />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                      Apply in minutes
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Share your experience, portfolio, and the role you’re excited about. We’ll craft a tailored path together.
                    </p>
                  </div>
                  <div className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Roles updated weekly
                  </div>
                </div>

                <div className="mt-6">
                  {status === "success" ? (
                    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-background to-emerald-500/10 p-6 text-center">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_60%)]" aria-hidden />
                      <CheckCircle className="relative mx-auto h-12 w-12 text-emerald-500" />
                      <h3 className="relative mt-3 text-lg font-semibold text-foreground">
                        Application sent successfully
                      </h3>
                      <p className="relative mt-2 text-sm text-muted-foreground">
                        Thanks for sharing your story. Our people team will reach out with next steps within 48 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setStatus("idle");
                          setErrorMessage(null);
                        }}
                        className="relative mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/60 px-5 py-2 text-sm font-semibold text-emerald-600 transition-all duration-300 hover:bg-emerald-500/10"
                      >
                        Submit another application
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {status === "error" && errorMessage && (
                        <div className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                          {errorMessage}
                        </div>
                      )}

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                          >
                            Full name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={applicationData.name}
                            onChange={handleInputChange}
                            className="w-full rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                            placeholder="Alex Johnson"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={applicationData.email}
                            onChange={handleInputChange}
                            className="w-full rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                            placeholder="alex@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="phone"
                            className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                          >
                            Phone number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={applicationData.phone}
                            onChange={handleInputChange}
                            className="w-full rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                            placeholder="(+91) 98765 43210"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="experience"
                            className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                          >
                            Years of experience
                          </label>
                          <input
                            type="text"
                            id="experience"
                            name="experience"
                            value={applicationData.experience}
                            onChange={handleInputChange}
                            className="w-full rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                            placeholder="e.g. 3+ years in performance marketing"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="position"
                          className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                          Role you’re applying for
                        </label>
                        <div className="relative">
                          <select
                            id="position"
                            name="position"
                            value={applicationData.position}
                            onChange={handleInputChange}
                            className="w-full appearance-none rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground transition-all duration-300 focus:border-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                          >
                            <option value="">Select a role</option>
                            {openPositions.map((position) => (
                              <option
                                key={position.title}
                                value={position.title.toLowerCase().replace(/ /g, "-")}
                              >
                                {position.title}
                              </option>
                            ))}
                            <option value="other">Open to any opportunity</option>
                          </select>
                          <ArrowRight className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="portfolio"
                          className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                          Portfolio / LinkedIn / work samples
                        </label>
                        <input
                          type="url"
                          id="portfolio"
                          name="portfolio"
                          value={applicationData.portfolio}
                          onChange={handleInputChange}
                          className="w-full rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                          placeholder="https://"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                          What should we know about you?
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={applicationData.message}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                          placeholder="Share your superpowers, dream projects, or the impact you want to create with us."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-secondary to-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30"
                        disabled={status === "submitting"}
                      >
                        {status === "submitting" ? "Submitting..." : "Submit application"}
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="grid gap-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-xl backdrop-blur-xl">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Life at AdGrades
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <div
                      key={benefit.title}
                      className="rounded-2xl border border-border/50 bg-background/70 p-4"
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <benefit.icon className="h-4 w-4 text-secondary" />
                        {benefit.title}
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-xl backdrop-blur-xl">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Our core values
                </h3>
                <div className="mt-4 space-y-4">
                  {cultureValues.map((value) => (
                    <div
                      key={value.title}
                      className="flex items-start gap-4 rounded-2xl border border-border/50 bg-background/70 p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <value.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {value.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 sm:p-10 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                  Open roles
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  We’re hiring across strategy, performance, design, and production. Explore the role that matches your craft.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Updated weekly
              </span>
            </div>

            <div className="mt-8 space-y-4">
              {openPositions.map((position, index) => {
                const isOpen = activePosition === index;

                return (
                  <div
                    key={position.title}
                    className="rounded-2xl border border-border/60 bg-background/80 p-5 transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => togglePosition(index)}
                      className="flex w-full flex-col gap-4 text-left sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-lg font-semibold text-foreground">
                          {position.title}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />
                            {position.department}
                          </span>
                          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />
                            {position.type}
                          </span>
                          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />
                            {position.location}
                          </span>
                          <span className="inline-flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />
                            {position.salary}
                          </span>
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-secondary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="mt-5 space-y-4 text-sm text-muted-foreground">
                        <p>{position.description}</p>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            You’ll thrive if you have:
                          </p>
                          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                            {position.requirements.map((requirement) => (
                              <li
                                key={requirement}
                                className="rounded-xl border border-border/50 bg-background/70 px-3 py-2 text-xs"
                              >
                                {requirement}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <a
                            href="#apply"
                            className="inline-flex items-center gap-2 rounded-full border border-secondary/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-secondary transition-all duration-300 hover:bg-secondary/10"
                          >
                            Apply for this role
                            <ArrowRight className="h-4 w-4" />
                          </a>
                          <a
                            href="mailto:info@adgrades.in"
                            className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-all duration-300 hover:border-secondary/50"
                          >
                            Ask a question
                            <Mail className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border/60 bg-card/70 p-6 sm:p-10 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                  Frequently asked questions
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  Everything you need to know about interviewing, onboarding, and growing with AdGrades.
                </p>
              </div>
              <a
                href="mailto:info@adgrades.in"
                className="inline-flex items-center gap-2 rounded-full border border-secondary/40 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-secondary transition-all duration-300 hover:bg-secondary/10"
              >
                Email the people team
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 space-y-4">
              {careerFaqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={faq.question}
                    className="rounded-2xl border border-border/60 bg-background/80 p-4 transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between text-left"
                    >
                      <span className="text-sm font-semibold text-foreground">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-secondary" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
