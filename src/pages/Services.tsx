import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  ExternalLink,
  Play,
  Filter,
} from "lucide-react";
import {
  services,
  serviceCategories,
  type Service,
} from "../data/servicesData";

const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((service) => service.category === selectedCategory);
  return (
    <div className="min-h-screen pt-14 sm:pt-16 lg:pt-20 bg-background">
      {" "}
      {/* Hero Section */}
      <section className="py-4 sm:py-6 md:py-8 lg:py-12 relative overflow-hidden">
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
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-secondary mr-1 sm:mr-1.5" />
              <span className="text-secondary font-semibold text-xs sm:text-sm">
                Premium Services
              </span>
            </motion.div>{" "}
            {/* Title */}
            <motion.h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Elevate Your{" "}
              <span className="gradient-text">Digital Presence</span>
            </motion.h1>
            {/* Description */}
            <motion.p
              className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              From concept to launch, we deliver exceptional digital solutions
              that drive growth, enhance user experience, and transform your
              business.
            </motion.p>{" "}
            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden transition-all duration-300"
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 relative z-10 group-hover:animate-pulse" />
                  <span className="relative z-10">Start Your Project</span>
                  <ArrowRight className="ml-1.5 h-3 w-3 sm:h-4 sm:w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/clients"
                  className="group inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                  <span>View Our Work</span>
                  <ArrowRight className="ml-1.5 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>{" "}
      {/* Service Categories Filter */}
      <section className="py-4 sm:py-6 lg:py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {" "}
          <motion.div
            className="text-center mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 bg-card/60 rounded-full mb-2 sm:mb-3 text-muted-foreground backdrop-blur-sm border border-border/50"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">
                Filter by category
              </span>
            </motion.div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">
              Service <span className="gradient-text">Categories</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Choose from our comprehensive range of digital services designed
              to transform your business
            </p>
          </motion.div>
          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm ${
                selectedCategory === "all"
                  ? "bg-primary text-white shadow-lg transform scale-105"
                  : "bg-card/60 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:scale-105 border border-border/50 backdrop-blur-sm"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Services
            </motion.button>
            {serviceCategories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm ${
                  selectedCategory === category.id
                    ? "bg-primary text-white shadow-lg transform scale-105"
                    : "bg-card/60 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:scale-105 border border-border/50 backdrop-blur-sm"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true }}
              >
                {category.title}
              </motion.button>
            ))}
          </motion.div>
          <motion.div
            className="text-center text-xs sm:text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Showing {filteredServices.length} service
            {filteredServices.length !== 1 ? "s" : ""}
            {selectedCategory !== "all" &&
              ` in ${
                serviceCategories.find((cat) => cat.id === selectedCategory)
                  ?.title
              }`}
          </motion.div>
        </div>
      </section>{" "}
      {/* Services Grid */}
      <section className="py-4 sm:py-6 md:py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-6">
            <motion.h2
              className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 sm:mb-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our <span className="gradient-text">Premium Services</span>
            </motion.h2>
            <motion.p
              className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Comprehensive solutions designed to accelerate your digital
              transformation
            </motion.p>
          </div>{" "}
          {/* Services Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {filteredServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  className="group relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-primary/50 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -5 }}
                >
                  {/* Make the whole card a link to the detail page */}
                  <Link
                    to={`/services/${service.id}`}
                    className="absolute inset-0 z-20"
                    tabIndex={-1}
                    aria-label={`View details for ${service.title}`}
                  ></Link>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full transform translate-x-12 -translate-y-12"></div>
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="relative z-10 mb-3"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3">
                      {service.shortDescription}
                    </p>

                    {/* Features */}
                    <motion.div
                      className="flex flex-wrap gap-1.5 mb-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {service.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </motion.div>

                    {/* Pricing & Timeline */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Starting at
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {service.pricing.basic}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          Timeline
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {service.timeline}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to="/contact"
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
                        >
                          Get Started
                          <ArrowRight className="ml-1.5 w-3 h-3 group-hover:translate-x-2 transition-transform" />
                        </Link>
                      </motion.div>
                      <motion.button
                        className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/services/${service.id}`;
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>{" "}
      {/* CTA Section */}
      <section className="py-6 sm:py-8 lg:py-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            className="bg-gradient-to-br from-card to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3">
              Ready to{" "}
              <span className="gradient-text">Transform Your Business</span>?
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-3 sm:mb-4 lg:mb-6 max-w-2xl mx-auto">
              Let's discuss your project and create something amazing together.
              Get started with a free consultation today.
            </p>{" "}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden transition-all duration-300"
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Start Your Project</span>
                  <ArrowRight className="ml-1.5 h-3 w-3 sm:h-4 sm:w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/clients"
                  className="group inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  {" "}
                  <ExternalLink className="mr-1.5 w-3 h-3 sm:w-4 sm:h-4" />
                  View Portfolio
                  <ArrowRight className="ml-1.5 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="bg-card border border-border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mr-4">
                    <selectedService.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                      {selectedService.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {selectedService.category}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {selectedService.fullDescription}
                </p>
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedService.features.map((feature) => (
                      <div key={feature} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Technologies */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Technologies We Use
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>{" "}
                {/* CTA */}
                <div className="pt-4 border-t border-border">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/contact"
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
                        onClick={() => setSelectedService(null)}
                      >
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </motion.div>
                    <motion.button
                      onClick={() => setSelectedService(null)}
                      className="flex-1 inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Services;
