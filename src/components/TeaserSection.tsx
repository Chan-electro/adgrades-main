import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles, Zap } from "lucide-react";

const TeaserSection: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-8 sm:p-12 overflow-hidden shadow-2xl">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
          </div>

          <div className="relative z-10 text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Experience the <span className="gradient-text">Next Evolution</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover our next-generation platforms designed to revolutionize your digital presence and advertising workflow.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* AdGrades 2.0 Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-background/50 hover:bg-background/80 transition-all duration-300 rounded-xl p-6 border border-border/50 hover:border-primary/50 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <span className="text-xs font-semibold text-primary">New Website</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">AdGrades 2.0</h3>
              <p className="text-muted-foreground text-sm mb-6">
                The future of marketing is here. Explore our redesigned experience with enhanced features and seamless navigation.
              </p>
              <a
                href="https://test.adgrades.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Visit Website
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* AdForge Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative bg-background/50 hover:bg-background/80 transition-all duration-300 rounded-xl p-6 border border-border/50 hover:border-secondary/50 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-secondary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
                <div className="px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20">
                  <span className="text-xs font-semibold text-secondary">New Product</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">AdForge</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Unleash the power of AI-driven ads. Generate high-converting ad copy and visuals in seconds.
              </p>
              <a
                href="https://adforge-test.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-secondary hover:text-secondary/80 transition-colors"
              >
                Try AdForge
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeaserSection;
