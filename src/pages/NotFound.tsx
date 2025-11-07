import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  ArrowLeft,
  AlertCircle,
  RefreshCw,
  Compass,
  Mail,
  Users,
} from "lucide-react";
import VortexBackground from "../components/VortexBackground";

const quickLinks = [
  {
    title: "Explore our services",
    description: "Discover how we partner with organisations to unlock new opportunities.",
    icon: Compass,
    to: "/services",
  },
  {
    title: "Meet the team",
    description: "Learn about our story, mission, and the experts behind the scenes.",
    icon: Users,
    to: "/about",
  },
  {
    title: "Get personalised support",
    description: "Reach out and we’ll guide you to the right place in moments.",
    icon: Mail,
    to: "/contact",
  },
];

const NotFound: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-16 sm:pt-20">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,181,255,0.12),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(1,249,198,0.08),_transparent_50%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div className="absolute -bottom-10 right-1/5 h-80 w-80 rounded-full bg-secondary/20 blur-3xl animate-float" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="hidden md:block">
          <VortexBackground />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[80vh] w-full max-w-6xl flex-col items-center justify-center px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <motion.div
            className="relative inline-flex items-center justify-center"
            initial={{ rotateX: 20, rotateY: -20, scale: 0.75 }}
            animate={{ rotateX: [20, -10, 15, -5, 20], rotateY: [-20, 15, -18, 12, -20], scale: [0.75, 1.05, 0.98, 1.02, 1] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          >
            <motion.span
              className="absolute inset-0 -m-6 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 blur-3xl"
              animate={{ opacity: [0.3, 0.55, 0.35], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
            <motion.span
              className="relative flex h-28 w-28 items-center justify-center rounded-full bg-background/80 backdrop-blur-xl shadow-[0_25px_70px_-30px_rgba(0,181,255,0.75)] ring-1 ring-primary/40"
              animate={{ boxShadow: [
                "0 25px 70px -30px rgba(0,181,255,0.75)",
                "0 25px 90px -25px rgba(1,249,198,0.9)",
                "0 25px 70px -30px rgba(0,181,255,0.75)",
              ] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
              <motion.span
                className="absolute inset-4 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(0,181,255,0.3),rgba(1,249,198,0.08),rgba(0,181,255,0.3))] opacity-80"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="absolute inset-2 rounded-full border border-white/10"
                animate={{ scale: [1, 1.08, 0.96, 1] }}
                transition={{ duration: 3.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
              />
              <motion.span
                className="absolute -left-6 h-16 w-16 rounded-full bg-primary/25 blur-xl"
                animate={{
                  x: [0, 18, 40, 18, 0, -18, -40, -18, 0],
                  y: [0, -20, 0, 20, 0, -18, 0, 18, 0],
                  opacity: [0.6, 0.4, 0.55, 0.3, 0.5, 0.35, 0.6, 0.4, 0.6],
                }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="absolute -right-5 bottom-4 h-14 w-14 rounded-full bg-secondary/25 blur-xl"
                animate={{
                  x: [0, -25, -40, -25, 0, 18, 32, 18, 0],
                  y: [0, 16, 0, -18, 0, 16, 0, -18, 0],
                  opacity: [0.4, 0.6, 0.35, 0.5, 0.38, 0.6, 0.4, 0.55, 0.4],
                }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-background/60 to-secondary/20 backdrop-blur-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
              >
                <AlertCircle className="h-10 w-10 text-primary sm:h-14 sm:w-14" />
              </motion.div>
              <motion.span
                className="absolute inset-1 rounded-full"
                style={{ boxShadow: "0 0 25px rgba(1,249,198,0.3), inset 0 0 35px rgba(0,181,255,0.25)" }}
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              />
            </motion.span>
            <motion.span
              className="absolute -inset-10 rounded-full border-[1.5px] border-transparent"
              style={{ borderImage: "linear-gradient(120deg, rgba(0,181,255,0.35), rgba(1,249,198,0)) 1" }}
              animate={{ rotate: [0, 180, 360], scale: [1.05, 1.2, 1.05] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute -inset-16 rounded-full border border-white/10"
              animate={{ opacity: [0.15, 0.4, 0.2], scale: [1.2, 1.32, 1.2] }}
              transition={{ duration: 7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
            <motion.div
              initial={{ scale: 0.85, rotate: 0 }}
              animate={{ scale: 1, rotate: [0, 6, 0, -6, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 2,
              }}
              className="inline-flex items-center justify-center rounded-full bg-primary/15 p-6 shadow-[0_30px_80px_-40px_rgba(0,181,255,0.65)]"
            >
              <AlertCircle className="h-12 w-12 text-primary sm:h-16 sm:w-16" />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="relative w-full max-w-4xl">
          <div className="absolute -inset-[1.5px] rounded-[2.5rem] bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 opacity-70 blur-xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-background/80 backdrop-blur-2xl shadow-[0_30px_120px_-40px_rgba(15,23,42,0.7)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,181,255,0.08),_transparent_60%)]" />
            <div className="absolute inset-y-0 right-0 h-full w-1/2 bg-gradient-to-l from-primary/10 via-transparent to-transparent" />
            <div className="relative px-6 py-12 text-center sm:px-10 sm:py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="space-y-3 sm:space-y-4"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">
                  Lost in the vortex
                </span>
                <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    404
                  </span>
                </h1>
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
                  This space is uncharted
                </h2>
                <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
                  The page you’re seeking drifted beyond our navigation map. Let’s guide you back to something inspiring, or connect you with someone who can help.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    to="/"
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-300 sm:px-9 sm:py-4 sm:text-lg"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.35 }}
                    />
                    <Home className="relative z-10 mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="relative z-10">Take me home</span>
                    <ArrowLeft className="relative z-10 ml-2 h-4 w-4 -scale-x-100 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center justify-center rounded-full border border-primary/60 px-7 py-3 text-sm font-semibold text-primary transition-colors duration-300 hover:bg-primary/15 sm:px-9 sm:py-4 sm:text-lg"
                  >
                    <RefreshCw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Try previous page
                  </button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.title}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    >
                      <Link
                        to={link.to}
                        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-lg transition-all duration-300 hover:border-primary/40 hover:bg-primary/10"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-foreground sm:text-lg">
                              {link.title}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {link.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mt-10 flex flex-col items-center gap-3 text-xs text-muted-foreground sm:flex-row sm:text-sm"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_12px_rgba(1,249,198,0.65)]" />
                  Our team is online and ready to help.
                </span>
                <span>Need something specific? Email us and we’ll respond quickly.</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
};

export default NotFound;
