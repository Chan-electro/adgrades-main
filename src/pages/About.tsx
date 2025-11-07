import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Award,
  Users,
  Target,
  Zap,
  ArrowRight,
  Calendar,
  Sparkles,
} from "lucide-react";
import AnimatedCounter from "../components/AnimatedCounter";
import { milestones, values, team } from "../data/aboutData";

const About: React.FC = () => {
  const [expandedBios, setExpandedBios] = useState<Set<string>>(new Set());

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
                Meet the Team Behind the Magic
              </span>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We're <span className="gradient-text">AdGrades</span>
            </motion.h1>

            {/* Hero Description */}
            <motion.p
              className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A passionate team of marketers, designers, and developers
              dedicated to helping startups and growing businesses become
              industry leaders through strategic marketing and exceptional
              creativity.
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-2" />
                <div className="text-lg sm:text-xl font-bold text-foreground mb-1">
                  <AnimatedCounter end={25} suffix="+" />
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  Happy Clients
                </div>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-secondary mx-auto mb-2" />
                <div className="text-lg sm:text-xl font-bold text-foreground mb-1">
                  <AnimatedCounter end={15} suffix="" />
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  Team Members
                </div>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-accent mx-auto mb-2" />
                <div className="text-lg sm:text-xl font-bold text-foreground mb-1">
                  90%
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  Success Rate
                </div>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mx-auto mb-2" />
                <div className="text-lg sm:text-xl font-bold text-foreground mb-1">
                  2+
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  Years Experience
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="https://calendly.com/chandanbkrishna077/adgrades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden transition-all duration-300"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Book a Call</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => {
                    document.getElementById("team-section")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span>Meet the Team</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>{" "}
      {/* Company Story Timeline */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              From a startup idea to a growing agency, here's how we've evolved
              alongside our clients.
            </p>
          </motion.div>{" "}
          {/* Snake-like Timeline Path */}
          <div className="relative">
            {/* Enhanced Snake Curved Path - Connecting actual card positions */}
            <div className="hidden lg:block absolute inset-0 overflow-visible">
              <svg
                className="w-full h-full"
                viewBox="0 0 1200 800"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Main snake path connecting all 5 milestone cards with proper positioning */}
                <motion.path
                  d="M120 400 Q240 200 360 400 Q480 600 600 400 Q720 200 840 400 Q960 600 1080 400"
                  stroke="url(#snakeGradient)"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="20,10"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 5, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
                {/* Glow effect for better visibility */}
                <motion.path
                  d="M120 400 Q240 200 360 400 Q480 600 600 400 Q720 200 840 400 Q960 600 1080 400"
                  stroke="url(#snakeGlowGradient)"
                  strokeWidth="12"
                  fill="none"
                  opacity="0.4"
                  strokeDasharray="20,10"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 5, ease: "easeInOut", delay: 0.3 }}
                  viewport={{ once: true }}
                />
                {/* Dark shadow path for light mode visibility */}
                <motion.path
                  d="M120 403 Q240 203 360 403 Q480 603 600 403 Q720 203 840 403 Q960 603 1080 403"
                  stroke="rgba(0,0,0,0.4)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="20,10"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 5, ease: "easeInOut", delay: 0.1 }}
                  viewport={{ once: true }}
                />
                {/* Light shadow path for dark mode visibility */}
                <motion.path
                  d="M120 397 Q240 197 360 397 Q480 597 600 397 Q720 197 840 397 Q960 597 1080 397"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="20,10"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 5, ease: "easeInOut", delay: 0.2 }}
                  viewport={{ once: true }}
                />
                {/* Connection points positioned at exact card centers */}
                {[120, 360, 600, 840, 1080].map((x, i) => (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy="400"
                    r="10"
                    fill="url(#pointGradient)"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.3 + 1.5 }}
                    viewport={{ once: true }}
                  />
                ))}
                {/* Pulse effect on connection points */}
                {[120, 360, 600, 840, 1080].map((x, i) => (
                  <motion.circle
                    key={`pulse-${i}`}
                    cx={x}
                    cy="400"
                    r="10"
                    fill="none"
                    stroke="url(#snakeGradient)"
                    strokeWidth="2"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
                <defs>
                  <linearGradient
                    id="snakeGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#9333ea" stopOpacity="1" />
                    <stop offset="25%" stopColor="#c026d3" stopOpacity="1" />
                    <stop offset="50%" stopColor="#db2777" stopOpacity="1" />
                    <stop offset="75%" stopColor="#dc2626" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ea580c" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient
                    id="snakeGlowGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#9333ea" stopOpacity="0.6" />
                    <stop offset="25%" stopColor="#c026d3" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#db2777" stopOpacity="0.6" />
                    <stop offset="75%" stopColor="#dc2626" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ea580c" stopOpacity="0.6" />
                  </linearGradient>
                  <radialGradient id="pointGradient">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="50%" stopColor="#9333ea" stopOpacity="1" />
                    <stop offset="100%" stopColor="#c026d3" stopOpacity="1" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Enhanced Mobile Path */}
            <div className="lg:hidden absolute left-4 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 opacity-90 rounded-full shadow-lg" />

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`${milestone.year}-${index}`}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  {/* Timeline Dot for Mobile */}
                  <div className="lg:hidden absolute left-0 top-4 w-3 h-3 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-background shadow-lg transform -translate-x-1/2" />

                  {/* Timeline Card */}
                  <div className="lg:ml-0 ml-8 relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-6 hover:border-primary/30 transition-all duration-500 hover:shadow-xl overflow-hidden">
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                    {/* Step indicator for Desktop */}
                    <div className="relative z-10 flex items-center justify-center lg:justify-start gap-3 mb-4">
                      <motion.div
                        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-white font-bold text-sm sm:text-base">
                          {index + 1}
                        </span>
                      </motion.div>{" "}
                      <div className="text-xl sm:text-2xl font-bold gradient-text">
                        {milestone.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center lg:text-left">
                      <h3 className="text-sm sm:text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-2xl opacity-50" />
                  </div>

                  {/* Desktop Timeline Dot */}
                  <motion.div
                    className="hidden lg:flex absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-background shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>{" "}
      {/* Core Values */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and define how we serve
              our clients.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group text-center bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <value.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </motion.div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>{" "}
      {/* Team Section */}
      <section
        id="team-section"
        className="py-6 sm:py-8 md:py-12 lg:py-16 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              The talented individuals behind AdGrades who make the magic happen
              every day.
            </p>
          </motion.div>{" "}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Large Emphasized Image Section */}
                <div className="relative p-6 pb-4">
                  <motion.div
                    className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-full h-full rounded-3xl object-cover border-3 border-white/50 shadow-xl group-hover:shadow-2xl transition-shadow duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=400&h=400&fit=crop&crop=face`;
                      }}
                    />
                    {/* Active Status Ring */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </motion.div>
                </div>

                {/* Enhanced Content Section */}
                <div className="relative z-10 px-6 pb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {member.name}
                    </h3>
                    <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-full border border-primary/20">
                      <span className="text-primary font-semibold text-xs sm:text-sm">
                        {member.role}
                      </span>
                    </div>
                  </div>{" "}
                  {/* Enhanced Bio with Click Expansion */}
                  <div className="bg-muted/30 rounded-2xl p-3 mb-4 border border-border/30 transition-all duration-300 hover:bg-muted/50">
                    <motion.p
                      className={`text-foreground/80 text-xs sm:text-sm leading-relaxed text-center font-medium cursor-pointer transition-all duration-300 ${
                        expandedBios.has(member.name) ? "" : "line-clamp-3"
                      }`}
                      onClick={() => {
                        const newExpanded = new Set(expandedBios);
                        if (expandedBios.has(member.name)) {
                          newExpanded.delete(member.name);
                        } else {
                          newExpanded.add(member.name);
                        }
                        setExpandedBios(newExpanded);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {member.bio}
                    </motion.p>
                    {/* Click indicator */}
                    <motion.div
                      className="text-center mt-2 transition-opacity duration-300"
                      animate={{
                        opacity: expandedBios.has(member.name) ? 0 : 1,
                      }}
                    >
                      <span className="text-primary text-xs font-medium">
                        {expandedBios.has(member.name)
                          ? "Click to show less"
                          : "Click to read more"}
                      </span>
                    </motion.div>
                  </div>
                  {/* Enhanced Action Button */}
                  <div className="flex justify-center">
                    <motion.a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Connect with ${member.name}`}
                      className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl border-0"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="h-4 w-4" />
                      <span>Connect</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.a>
                  </div>
                </div>

                {/* Enhanced Decorative elements */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/15 to-transparent rounded-bl-3xl opacity-60" />
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-secondary/15 to-transparent rounded-tr-3xl opacity-60" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>{" "}
      {/* CTA Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            className="bg-gradient-to-br from-card to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Work with <span className="gradient-text">Our Team</span>
              ?
            </motion.h2>
            <motion.p
              className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Let's discuss how our expertise and passion can help transform
              your business. Every great partnership starts with a conversation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="https://calendly.com/chandanbkrishna077/adgrades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden transition-all duration-300"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 relative z-10" />
                  <span className="relative z-10">
                    Get Your Free Strategy Session
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => {
                    document.getElementById("team-section")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span>Meet the Team</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
