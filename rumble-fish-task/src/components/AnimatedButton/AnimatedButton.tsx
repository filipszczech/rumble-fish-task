import React from "react";
import { motion } from "framer-motion";
import styles from "./AnimatedButton.module.css";

interface AnimatedButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onClick }) => {
  return (
    <motion.button
      className={styles.button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
