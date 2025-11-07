import { Variants } from 'framer-motion';

// Animation variants for common effects

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
};

// Fade up animation (similar to AOS fade-up)
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
};

// Fade down animation
export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
};

// Fade left animation
export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
};

// Fade right animation
export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
};

// Scale animation
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
};

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Hook to trigger animations when element enters viewport
export const useScrollAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
};
