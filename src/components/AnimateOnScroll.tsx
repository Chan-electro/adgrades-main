import { ReactNode, FC } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimateProps {
  children: ReactNode;
  variant?: Variants;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

/**
 * AnimateOnScroll - A replacement for AOS animations using Framer Motion
 * 
 * Example usage:
 * <AnimateOnScroll variant={fadeInUp}>
 *   <YourComponent />
 * </AnimateOnScroll>
 */
const AnimateOnScroll: FC<AnimateProps> = ({
  children,
  variant,
  className = '',
  delay = 0,
  duration = 0.8,
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const defaultVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration,
        delay,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variant || defaultVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;
