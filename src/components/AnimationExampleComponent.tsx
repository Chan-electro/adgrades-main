import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../utils/animations';
import { motion } from 'framer-motion';

/**
 * Example component showing how to use the new animation system
 * This can replace components that previously used AOS animations
 */
const AnimationExampleComponent: React.FC = () => {
  return (
    <div className="container mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Animation Examples</h2>
      
      {/* Basic fade up animation (replaces data-aos="fade-up") */}
      <AnimateOnScroll variant={fadeInUp} className="mb-16">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Fade Up Animation</h3>
          <p>This element fades in from the bottom as you scroll to it.</p>
        </div>
      </AnimateOnScroll>
      
      {/* Side-by-side elements with different animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <AnimateOnScroll variant={fadeInLeft}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
            <h3 className="text-xl font-semibold mb-4">Fade In From Left</h3>
            <p>This element slides in from the left side.</p>
          </div>
        </AnimateOnScroll>
        
        <AnimateOnScroll variant={fadeInRight}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
            <h3 className="text-xl font-semibold mb-4">Fade In From Right</h3>
            <p>This element slides in from the right side.</p>
          </div>
        </AnimateOnScroll>
      </div>
      
      {/* Staggered animation of multiple items */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <motion.div
            key={item}
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">Item {item}</h3>
            <p>This item is part of a staggered animation sequence.</p>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Custom animation parameters */}
      <AnimateOnScroll 
        delay={0.3} 
        duration={1.2}
        className="mt-16 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-semibold mb-4">Custom Animation Parameters</h3>
        <p>This element has custom delay and duration values.</p>
      </AnimateOnScroll>
    </div>
  );
};

export default AnimationExampleComponent;
