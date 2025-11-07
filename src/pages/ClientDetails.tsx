import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Award,
  ChevronRight,
  Globe,
  CheckCircle,
} from "lucide-react";
import { clientsData } from "../data/clientsData";

const ClientDetails: React.FC = () => {
  const { client } = useParams<{ client: string }>();
  const navigate = useNavigate();

  // Find the client data based on the URL parameter
  const clientData = clientsData.find((c) => c.id === client);

  if (!clientData) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Client Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The client you're looking for doesn't exist or may have been moved.
          </p>
          <button
            onClick={() => navigate("/clients")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Clients
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen pt-14 sm:pt-16 lg:pt-20 bg-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <motion.button
          onClick={() => navigate("/clients")}
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-300 mb-4 sm:mb-6 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Clients</span>
        </motion.button>
      </div>
      {/* Hero Image */}
      <section className="mb-4 sm:mb-6 lg:mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-lg sm:rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={clientData.image}
              alt={clientData.name}
              className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 mb-2">
                <span className="text-xs font-medium">
                  {clientData.category}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">
                {clientData.name}
              </h1>
              <p className="text-xs opacity-90 max-w-2xl line-clamp-2">
                {clientData.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>{" "}
      {/* Main Content with Sidebar */}
      <section className="pb-8 sm:pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Sticky Sidebar */}
            <motion.aside
              className="lg:col-span-1 order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="sticky top-24 space-y-4 h-fit z-10">
                {/* Client Info */}
                <div className="text-center p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 mx-auto mb-3 rounded-xl bg-white/90 p-2 shadow-lg flex items-center justify-center">
                    {clientData.logo ? (
                      <img
                        src={clientData.logo}
                        alt={`${clientData.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-full h-full bg-primary/10 rounded flex items-center justify-center text-primary font-bold text-lg">${clientData.name.charAt(
                              0
                            )}</div>`;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 rounded flex items-center justify-center text-primary font-bold text-lg">
                        {clientData.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-foreground mb-2">
                    {clientData.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {clientData.category}
                  </p>

                  <div className="flex justify-center gap-2 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground bg-background/50 px-2 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{clientData.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground bg-background/50 px-2 py-1 rounded-lg">
                      <Award className="w-3.5 h-3.5" />
                      <span>{clientData.year || "2024"}</span>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50">
                  <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                    Services Provided{" "}
                  </h4>
                  <div className="space-y-2">
                    {clientData.services.map((service, index) => (
                      <div
                        key={index}
                        className="text-sm px-3 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20 font-medium"
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Results */}
                {clientData.results && clientData.results.length > 0 && (
                  <div className="p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50">
                    <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                      Key Results
                    </h4>
                    <div className="space-y-3">
                      {clientData.results.slice(0, 3).map((result, index) => (
                        <div
                          key={index}
                          className="text-center p-2 rounded-lg bg-primary/5"
                        >
                          <div className="text-lg font-bold gradient-text">
                            {result.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {result.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <button
                  onClick={() => navigate("/clients")}
                  className="w-full inline-flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300 text-sm group p-3 rounded-xl border border-primary/30 hover:bg-primary/10 font-medium"
                >
                  <Globe className="w-4 h-4" />
                  View All Clients
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.aside>
            {/* Main Content */}
            <motion.main
              className="lg:col-span-3 order-1 lg:order-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="prose prose-sm max-w-none">
                {/* About Section */}
                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border/30">
                    About{" "}
                    <span className="gradient-text">{clientData.name}</span>
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">
                    {clientData.about.split("\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </section>

                {/* How We Helped */}
                <section className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border/30">
                    How We <span className="gradient-text">Helped</span>
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">
                    {clientData.howWeHelped
                      .split("\n")
                      .map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                </section>

                {/* Results Grid */}
                {clientData.results && clientData.results.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border/30">
                      Project <span className="gradient-text">Results</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose">
                      {clientData.results.map((result, index) => (
                        <motion.div
                          key={index}
                          className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/20"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.5 + index * 0.1,
                          }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                            {result.value}
                          </div>
                          <div className="text-xs font-semibold text-foreground mb-1">
                            {result.metric}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {result.description}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Testimonial */}
                {clientData.testimonial && (
                  <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border/30">
                      Client <span className="gradient-text">Testimonial</span>
                    </h2>
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-l-4 border-primary p-4 sm:p-6 rounded-r-lg not-prose">
                      <blockquote className="text-sm sm:text-base italic text-foreground/90 leading-relaxed mb-3">
                        "{clientData.testimonial.quote}"
                      </blockquote>
                      <div className="text-right">
                        <cite className="text-sm font-semibold text-primary not-italic">
                          — {clientData.testimonial.author}
                        </cite>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </motion.main>
          </div>
        </div>
      </section>{" "}
      {/* CTA Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
              Ready to achieve similar results?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss how we can help your business achieve remarkable
              growth and transformation like {clientData.name}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/contact")}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
              >
                Get in Touch
              </button>
              <button
                onClick={() => navigate("/services")}
                className="px-6 py-3 bg-transparent border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 text-sm"
              >
                Explore Our Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ClientDetails;
