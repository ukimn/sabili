"use client";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { FaBook } from "react-icons/fa";

export default function ZikrCard({
  name,
  desc,
  id,
}: {
  name: string;
  desc: string;
  id: number;
}) {
  const router = useRouter();
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
      style={{ backgroundColor: "#ffffff" }}
      className="space-y-7 flex flex-col items-start w-full h-full border rounded-lg py-9 px-9 shadow-lg cursor-pointer select-none"
    >
      <motion.h1
        className="text-4xl font-bold truncate max-w-full"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {name}
      </motion.h1>

      <p className="text-lg grow line-clamp-4 text-ellipsis overflow-hidden w-full">
        {desc}
      </p>

      <motion.button
        className="relative border-2 border-emerald-600 py-2 px-4 flex items-center gap-2 rounded-md mt-auto overflow-hidden font-medium text-emerald-700"
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          router.push(`/athkar/${id}`);
        }}
      >
        {/* Fill layer that slides in */}
        <motion.span
          className="absolute inset-0 bg-emerald-600"
          variants={{
            rest: { x: "-100%" },
            hover: { x: "0%" },
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />

        {/* Glow layer */}
        <motion.span
          className="absolute inset-0 rounded-md"
          variants={{
            rest: { boxShadow: "0px 0px 0px rgba(16,185,129,0)" },
            hover: {
              boxShadow: [
                "0px 0px 12px rgba(16,185,129,0.5)",
                "0px 0px 22px rgba(16,185,129,0.8)",
                "0px 0px 12px rgba(16,185,129,0.5)",
              ],
            },
          }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Content stays on top */}
        <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
          <motion.span
            variants={{
              rest: { color: "#047857" },
              hover: { color: "#ffffff" },
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <FaBook />
            Read Zikr
          </motion.span>
        </span>
      </motion.button>
    </motion.div>
  );
}
