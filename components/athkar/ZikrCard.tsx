"use client";
import { motion } from "motion/react";

export default function ZikrCard({
  name,
  desc,
}: {
  name: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 150,
        duration: 0.5,
      }}
      whileHover={{
        y: -6,
        scale: 1.015,
        backgroundColor: "#065f46",
        color: "#fff",
        transition: {
          type: "tween",
          ease: "easeInOut",
          duration: 0.3,
        },
      }}
      whileTap={{
        y: 2,
        scale: 0.99,
      }}
      style={{ backgroundColor: "#ffffff" }}
      className="space-y-5 flex flex-col items-start max-w-full border rounded-lg py-9 px-9 shadow-lg cursor-pointer select-none"
    >
      <motion.h1
        className="text-2xl"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {name}
      </motion.h1>
      <motion.p>{desc}</motion.p>
    </motion.div>
  );
}
