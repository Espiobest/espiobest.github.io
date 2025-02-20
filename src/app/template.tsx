'use client';

import { motion } from 'framer-motion';

import { ReactNode } from 'react';

interface TransitionProps {
  children: ReactNode;
}

const Transition = ({ children }: TransitionProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
