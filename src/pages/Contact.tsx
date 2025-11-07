import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  MessageCircle,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Globe,
} from "lucide-react";

const FORM_SUBMIT_ENDPOINT =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
  "https://formsubmit.co/ajax/adgradesweb@gmail.com";

const initialFormData = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

const budgetOptions = [
  { value: "5k-10k", label: "₹50K - ₹1L" },
  { value: "10k-25k", label: "₹1L - ₹2.5L" },
  { value: "25k-50k", label: "₹2.5L - ₹5L" },
  { value: "50k+", label: "₹5L+" },
  { value: "discuss", label: "Let's discuss" },
];

const responseStats = [
  { label: "Average reply time", value: "&lt; 12 hours" },
  { label: "Projects launched", value: "120+" },
  { label: "Client satisfaction", value: "98%" },
];

const serviceHighlights = [
  {
    title: "Strategy first",
    description: "Every inquiry receives a tailored roadmap built around your goals.",
  },
  {
    title: "Senior team access",
    description:
      "Speak directly with our strategists—no gatekeepers, only experts guiding you.",
  },
  {
    title: "Progress updates",
    description:
      "You'll receive a clear plan of action within a day of reaching out to us.",
  },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const selectedBudgetLabel = budgetOptions.find(
      (option) => option.value === formData.budget
    )?.label;

    const payload = {
      name: formData.name,
      email: formData.email,
      company: formData.company || "Not provided",
      service: formData.service || "Not specified",
      budget: selectedBudgetLabel || formData.budget || "Not specified",
      message: formData.message,
      _subject: `New Contact Inquiry from ${formData.name}`,
      _template: "table",
      _captcha: "false",
      source: "AdGrades contact page",
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
          "We couldn't submit your message right now. Please try again.";
        throw new Error(message);
      }

      setStatus("success");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Failed to submit contact form", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We couldn't submit your message right now. Please try again."
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMessage(null);
    setFormData(initialFormData);
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick responses for urgent inquiries",
      action: "Message us",
      link: "https://wa.me/919686314869",
      color: "text-green-500",
    },
    {
      icon: Instagram,
      title: "Instagram",
      description: "Follow our latest work and updates",
      action: "Follow us",
      link: "https://instagram.com/adgrades",
      color: "text-pink-500",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      description: "Professional networking and insights",
      action: "Connect with us",
      link: "https://www.linkedin.com/company/ad-grades",
      color: "text-blue-500",
    },
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: "Office",
      details: [
        "Vinayaka Industries",
        "Behind KMF Cattle Feed Factory",
        "K Hoskoppalu, Hassan 573201",
        "Karnataka, India",
      ],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 80736 98913", "+91 9686314869"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@adgrades.in", "adgradesweb@gmail.com"],
    },
    {
      icon: Clock,
      title: "Hours",
      details: [
        "Monday - Saturday: 9:00 AM - 9:00 PM",
        "Sunday: 9:00 AM - 1:30 PM",
      ],
    },
  ];

  const faqs = [
    {
      question: "What services does AdGrades offer?",
      answer:
        "AdGrades offers comprehensive digital marketing services including Social Media Marketing, Brand Identity & Design, Search Engine Optimization (SEO), Email Marketing, Performance Advertising, and Web & App Development. We provide end-to-end solutions to help businesses grow their online presence and achieve their marketing goals.",
    },
    {
      question: "How can I start a project with AdGrades?",
      answer:
        "Starting a project with AdGrades is simple! You can contact us through our contact form, WhatsApp, or schedule a free consultation call. We'll discuss your goals, requirements, and budget to create a customized strategy that fits your needs. Our team will then provide you with a detailed proposal and timeline.",
    },
    {
      question: "What industries does AdGrades specialize in?",
      answer:
        "We work with businesses across various industries including technology startups, e-commerce, education, hospitality, fashion, healthcare, and professional services. Our diverse experience allows us to adapt our strategies to meet the unique challenges and opportunities in different sectors.",
    },
    {
      question: "How long does it take to see results from a campaign?",
      answer:
        "Results vary depending on the service and campaign type. For paid advertising, you can see initial results within 1-2 weeks, with optimization improving performance over 1-3 months. SEO typically takes 3-6 months to show significant results. Social media growth and brand awareness campaigns usually show progress within 4-8 weeks. We provide regular reports to track progress.",
    },
    {
      question: "What makes AdGrades different from other agencies?",
      answer:
        "We combine creative storytelling with data-driven strategies to deliver results. Our team works closely with clients, offering transparency, regular communication, and tailored solutions to ensure every campaign is aligned with your brand vision and business objectives.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pb-24 pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-gradient-to-br from-primary/15 via-transparent to-secondary/20 blur-3xl"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(80,80,255,0.08),_transparent_55%)]" />

      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr,0.8fr] lg:items-center">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary"
              >
                <Sparkles className="h-4 w-4" />
                <span>Let’s craft your next milestone</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
              >
                Share your vision and we’ll turn it into measurable results
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="max-w-2xl text-sm text-muted-foreground sm:text-base"
              >
                Tell us where you are today and where you want to be. Our strategists will map out the experiments, campaigns, and creative systems to get you there.
              </motion.p>

              <div className="grid gap-4 sm:grid-cols-3">
                {responseStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="rounded-2xl border border-border/60 bg-card/70 px-4 py-3 shadow-sm backdrop-blur"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-primary">
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="relative rounded-3xl border border-border/60 bg-card/80 p-6 shadow-2xl backdrop-blur-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-x-6 top-6 -z-10 h-full rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/30 blur-2xl" />
              <div className="space-y-6">
                <div className="flex flex-col gap-3">
                  <h2 className="text-lg font-semibold text-foreground sm:text-xl">
                    What to expect after reaching out
                  </h2>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    {serviceHighlights.map((highlight) => (
                      <div
                        key={highlight.title}
                        className="rounded-2xl border border-border/50 bg-background/60 p-4"
                      >
                        <p className="font-semibold text-foreground">
                          {highlight.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {highlight.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#connect"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                  >
                    <Send className="h-4 w-4" />
                    Start a conversation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="https://wa.me/919686314869"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary hover:bg-primary/10"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp us
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="connect" className="relative z-10 mt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.9fr]">
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 sm:p-10 shadow-xl backdrop-blur-xl"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-background to-secondary/15" />
              <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-primary/20 blur-3xl" aria-hidden />
              <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" aria-hidden />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                      Tell us about your project
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Fill in the details below and our team will reach out with next steps within a business day.
                    </p>
                  </div>
                  <div className="rounded-full border border-border/70 bg-background/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Response guaranteed
                  </div>
                </div>

                <div className="mt-6">
                  {status === "success" ? (
                    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-background to-emerald-500/10 p-6 text-center">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_60%)]" aria-hidden />
                      <CheckCircle className="relative mx-auto h-12 w-12 text-emerald-500" />
                      <h3 className="relative mt-3 text-lg font-semibold text-foreground">
                        Message sent successfully
                      </h3>
                      <p className="relative mt-2 text-sm text-muted-foreground">
                        Thank you for reaching out! Our strategists will get in touch within the next 12 hours.
                      </p>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="relative mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/60 px-5 py-2 text-sm font-semibold text-emerald-600 transition-all duration-300 hover:bg-emerald-500/10"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
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
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40"
                            placeholder="John Doe"
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
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="company"
                            className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                          >
                            Company / brand
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40"
                            placeholder="Your company"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="service"
                            className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                          >
                            Primary service of interest
                          </label>
                          <input
                            type="text"
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            className="w-full rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40"
                            placeholder="e.g. Performance marketing"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="budget"
                          className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                          Monthly budget range
                        </label>
                        <div className="relative">
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full appearance-none rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground transition-all duration-300 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40"
                          >
                            <option value="">Select your investment</option>
                            {budgetOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <ArrowRight className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                          Tell us about your goals
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40"
                          placeholder="Share any context, timelines, or success metrics you have in mind"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                        disabled={status === "submitting"}
                      >
                        {status === "submitting" ? "Sending..." : "Submit inquiry"}
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
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Global partnerships
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Collaborating with teams across India, the Middle East, and beyond.
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {officeInfo.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border/50 bg-background/70 p-4"
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <item.icon className="h-4 w-4 text-primary" />
                        {item.title}
                      </div>
                      <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-xl backdrop-blur-xl">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Prefer instant replies?
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {contactMethods.map((method) => (
                    <a
                      key={method.title}
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/70 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
                    >
                      <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ${method.color}`}>
                        <method.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {method.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                      <span className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-primary">
                        {method.action}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border/60 bg-card/60 p-6 sm:p-10 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                  Frequently asked questions
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  Answers to popular questions about partnering with AdGrades. Need something specific? Drop us a line.
                </p>
              </div>
              <a
                href="mailto:info@adgrades.in"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition-all duration-300 hover:bg-primary/10"
              >
                Email our team
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 space-y-4">
              {faqs.map((faq, index) => {
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
                      <ArrowRight
                        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90 text-primary" : "text-muted-foreground"}`}
                      />
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

export default Contact;
