import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  in: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  out: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2
    }
  }
};

const AnimatedItem = ({ children, delay = 0, hover = false, ...props }) => {
  const finalVariants = { ...itemVariants };
  
  if (delay) {
    finalVariants.in.transition.delay = delay;
  }
  
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      whileHover={hover ? "hover" : undefined}
      variants={finalVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedItem; 