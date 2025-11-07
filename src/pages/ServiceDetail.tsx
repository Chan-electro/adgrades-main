import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../data/servicesData";
import { ArrowRight, CheckCircle } from "lucide-react";

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Service Not Found</h1>
        <Link to="/services" className="text-primary underline">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14 sm:pt-16 lg:pt-20 bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Animated Gradient Badge */}
        <motion.div
          className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm mb-8 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-6 h-6 flex items-center justify-center mr-2">
            <service.icon className="w-5 h-5 text-primary" />
          </div>
          <span className="text-sm sm:text-base font-semibold gradient-text">
            {service.title}
          </span>
        </motion.div>
        {/* Card Container */}
        <motion.div
          className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl p-6 sm:p-10 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.p
            className="text-base sm:text-lg text-muted-foreground mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {service.fullDescription}
          </motion.p>
          {/* Section: Key Features */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 gradient-text border-l-4 border-primary pl-3">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-center bg-primary/5 rounded-lg px-3 py-2">
                  <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Section: Technologies */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 gradient-text border-l-4 border-secondary pl-3">Technologies We Use</h2>
            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech, idx) => (
                <motion.div
                  key={tech}
                  className="relative group px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-sm font-semibold shadow-md border border-primary/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-primary/30 hover:to-secondary/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -2, scale: 1.08 }}
                >
                  <span className="inline-block gradient-text group-hover:brightness-125 transition-all duration-300">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Section: Process */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 gradient-text border-l-4 border-accent pl-3">Process</h2>
            <ol className="list-decimal list-inside space-y-2">
              {service.process.map((step, idx) => (
                <li key={idx} className="text-muted-foreground">
                  <span className="font-semibold text-primary mr-2">{step.step}:</span>
                  {step.description}
                </li>
              ))}
            </ol>
          </div>
          {/* Section: Pricing */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 gradient-text border-l-4 border-primary pl-3">Pricing</h2>
            <ul className="space-y-1">
              <li><span className="font-semibold">Basic:</span> {service.pricing.basic}</li>
              <li><span className="font-semibold">Premium:</span> {service.pricing.premium}</li>
              <li><span className="font-semibold">Enterprise:</span> {service.pricing.enterprise}</li>
            </ul>
          </div>
          {/* Section: Deliverables */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 gradient-text border-l-4 border-secondary pl-3">Deliverables</h2>
            <ul className="list-disc list-inside space-y-1">
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {/* Section: Timeline */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 gradient-text border-l-4 border-accent pl-3">Timeline</h2>
            <p>{service.timeline}</p>
          </div>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
            <Link to="/services" className="inline-flex items-center text-primary font-semibold hover:underline">
              <ArrowRight className="mr-2 w-4 h-4" /> Back to Services
            </Link>
            <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetail;
