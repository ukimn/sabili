"use client";

import { motion } from "motion/react";

export default function ZikrCard() {
  return (
    <motion.div
      initial={{ y: -30 }}
      transition={{ type: "spring", stiffness: 120 }}
      animate={{ y: 0 }}
      className="border-e rounded-lg flex flex-col shadow-md"
      whileHover={{ y: 3 }}
      whileTap={{ scale: 0.98 }}
    >
        <h1>Welcome to my best</h1>
    </motion.div>
  );
}
