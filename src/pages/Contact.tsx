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
  ChevronDown,
  ChevronUp,
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
      title: "Office Location",
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
      title: "Business Hours",
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
        "AdGrades combines creative excellence with data-driven strategies. We're a young, dynamic team that understands modern digital landscapes. Our unique blend of offline and online marketing expertise, personalized approach, and commitment to measurable results sets us apart. We treat each client as a partner and are invested in their long-term success.",
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
                Let's Start Something Amazing
              </span>
            </motion.div>
            {/* Hero Title */}
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let's Chat About Your{" "}
              <span className="gradient-text">Next Project</span>
            </motion.h1>
            {/* Description */}
            <motion.p
              className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ready to transform your business? We'd love to hear about your
              goals and discuss how AdGrades can help you achieve remarkable
              growth.
            </motion.p>{" "}
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
                  href="#contact-form"
                  className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden transition-all duration-300"
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2 relative z-10 group-hover:animate-pulse" />
                  <span className="relative z-10">Send Message</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="https://wa.me/919686314869"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span>WhatsApp Us</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>{" "}
      {/* Contact Form and Info */}
      <section id="contact-form" className="py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Contact Form */}
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -left-20 h-56 w-56 rounded-full bg-secondary/15 blur-3xl"
              />
              <div className="relative p-5 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] sm:text-xs font-semibold text-primary">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>We respond within 24 hours</span>
                    </div>
                    <h2 className="mt-3 text-xl sm:text-2xl font-bold text-foreground">
                      Send us a Message
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                      Share your project details and we’ll craft a tailored strategy for you.
                    </p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end text-right text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Average reply time</span>
                    <span className="text-primary font-semibold">&lt; 12 hours</span>
                  </div>
                </div>

                {status === "success" ? (
                  <div className="relative overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50/80 px-4 py-6 text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 to-transparent" aria-hidden />
                    <CheckCircle className="relative mx-auto mb-3 h-10 w-10 text-emerald-500" />
                    <h3 className="relative text-base sm:text-lg font-semibold text-foreground">
                      Message Sent Successfully!
                    </h3>
                    <p className="relative mt-1 text-xs sm:text-sm text-muted-foreground">
                      We’ll get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="relative mt-4 inline-flex items-center justify-center rounded-lg border border-primary/30 bg-white/70 px-4 py-2 text-xs sm:text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                  >
                    {status === "error" && errorMessage && (
                      <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-xs sm:text-sm font-medium text-destructive">
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
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-border/60 bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background"
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
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-border/60 bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="company"
                        className="block text-xs sm:text-sm font-semibold text-foreground"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-border/60 bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background"
                        placeholder="Your Company"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="service"
                          className="block text-xs sm:text-sm font-semibold text-foreground"
                        >
                          Service Interested In
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full appearance-none rounded-lg border border-border/60 bg-background/60 px-4 py-2.5 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background"
                        >
                          <option value="">Select a service</option>
                          <option value="social-media">
                            Social Media Marketing
                          </option>
                          <option value="branding">
                            Brand Identity &amp; Design
                          </option>
                          <option value="seo">Search Engine Optimization</option>
                          <option value="email">Email Marketing</option>
                          <option value="ads">Performance Advertising</option>
                          <option value="development">
                            Web &amp; App Development
                          </option>
                          <option value="multiple">Multiple Services</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="budget"
                          className="block text-xs sm:text-sm font-semibold text-foreground"
                        >
                          Project Budget
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full appearance-none rounded-lg border border-border/60 bg-background/60 px-4 py-2.5 text-sm text-foreground shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background"
                        >
                          <option value="">Select budget range</option>
                          {budgetOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="block text-xs sm:text-sm font-semibold text-foreground"
                      >
                        Project Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full resize-none rounded-lg border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/80 shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-background"
                        placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {status === "submitting" ? "Sending..." : "Send Message"}
                        <Send className="h-4 w-4" />
                      </span>
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-secondary/40 to-primary/40 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>{" "}
            {/* Contact Information */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                  Get in Touch
                </h2>

                {/* Office Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {officeInfo.map((info) => (
                    <div
                      key={info.title}
                      className="bg-card/40 rounded-lg p-4 border border-border/30"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                          <info.icon className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground text-sm">
                          {info.title}
                        </h3>
                      </div>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p
                            key={detailIndex}
                            className="text-muted-foreground text-xs leading-relaxed"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Contact Methods */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-3">
                    Connect with Us
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {contactMethods.map((method) => (
                      <a
                        key={method.title}
                        href={method.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center p-4 bg-card/40 rounded-lg border border-border/30 hover:border-primary/30 transition-all duration-300 hover:bg-card/60 text-center"
                      >
                        <div className="w-10 h-10 rounded-lg bg-background/80 flex items-center justify-center mb-2">
                          <method.icon className={`h-5 w-5 ${method.color}`} />
                        </div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">
                          {method.title}
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          {method.action}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>{" "}
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
              Get answers to common questions about our services and process.
            </motion.p>
          </div>

          <div className="divide-y divide-border/30">
            {faqs.map((faq, index) => (
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
      </section>{" "}
      {/* Map Section */}
      <section className="py-6 sm:py-8 md:py-12">
        <div className="text-center mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Visit Our <span className="gradient-text">Office</span>
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-muted-foreground"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Located in Hassan, Karnataka, we're always ready for a coffee chat.
          </motion.p>
        </div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="h-48 sm:h-64 md:h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.983962!2d76.107463!3d12.983962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU5JzAyLjMiTiA3NsKwMDYnMjYuOSJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="AdGrades Office Location - Vinayaka Industries, Hassan"
              className="border-0"
            />
          </div>
        </motion.div>
      </section>{" "}
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
            <Globe className="w-8 h-8 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3">
              Ready to Start Your Project?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto">
              Let's discuss your goals and create a strategy that drives real
              results for your business.
            </p>{" "}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="https://calendly.com/chandanbkrishna077/adgrades"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-sm font-semibold rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden transition-all duration-300"
              >
                {/* Animated background */}
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

export default Contact;
