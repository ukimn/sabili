"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ChevronRight, CheckCircle2 } from "lucide-react";

// Define the structure of a Zikr item
interface ZikrItem {
  zekr: string; // The Arabic/transliterated name (e.g., "SubhanAllah")
  repeat: number; // Target count (e.g., 33)
  blessing?: string; // Optional meaning or blessing (e.g., "Glory be to Allah")
}

// A beautiful default set of sequential Thikr
const DEFAULT_PLAYLIST: ZikrItem[] = [
  {
    zekr: "Subhan'Allah",
    repeat: 33,
    blessing: "Glory be to Allah",
  },
  {
    zekr: "Alhamdulillah",
    repeat: 33,
    blessing: "All praise is due to Allah",
  },
  {
    zekr: "Allahu Akbar",
    repeat: 33,
    blessing: "Allah is the Greatest",
  },
  {
    zekr: "La ilaha illa Allah",
    repeat: 10,
    blessing: "There is no deity worthy of worship except Allah",
  },
];

export default function ZikrCounter({
  playlist = DEFAULT_PLAYLIST,
}: {
  playlist?: ZikrItem[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(1);

  // Get the current active Thikr from our list
  const currentZikr = playlist[currentIndex] || DEFAULT_PLAYLIST[0];

  const progress = Math.min((count / currentZikr.repeat) * 100, 100);
  const isCompleted = count >= currentZikr.repeat;

  const handleIncrement = () => {
    if (count < currentZikr.repeat) {
      setCount((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleNextZikr = () => {
    setCount(0);
    if (currentIndex < playlist.length - 1) {
      // Move to the next Thikr in the array
      setCurrentIndex((prev) => prev + 1);
    } else {
      // If we finished the entire playlist, loop back to the first one and increment the overall cycle
      setCurrentIndex(0);
      setCycle((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-slate-100 p-6">
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/20 shadow-2xl shadow-emerald-950/50 flex flex-col items-center relative overflow-hidden"
      >
        {/* Glow effect in background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Badges */}
        <div className="flex justify-between w-full mb-6 z-10">
          <span className="px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            THIKR {currentIndex + 1} OF {playlist.length}
          </span>
          <span className="px-3 py-1 text-xs font-semibold tracking-wider text-teal-400 bg-teal-500/10 rounded-full border border-teal-500/20">
            CYCLE {cycle}
          </span>
        </div>

        {/* Zikr Name & Translation with Slide-and-Fade Animations */}
        <div className="text-center min-h-[110px] flex flex-col justify-center items-center z-10 w-full">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentZikr.zekr}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-100"
            >
              {currentZikr.zekr}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {currentZikr.blessing && (
              <motion.p
                key={currentZikr.blessing}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-sm italic text-emerald-100/70 mt-2 max-w-xs leading-relaxed"
              >
                "{currentZikr.blessing}"
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Main Circular Tap Counter */}
        <div className="relative my-8 flex items-center justify-center z-10">
          {/* Progress Ring SVG */}
          <svg className="w-56 h-56 transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="112"
              cy="112"
              r="96"
              className="stroke-slate-800"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Animated Progress Arc */}
            <motion.circle
              cx="112"
              cy="112"
              r="96"
              className="stroke-emerald-400"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 96}
              initial={{ strokeDashoffset: 2 * Math.PI * 96 }}
              animate={{
                strokeDashoffset: 2 * Math.PI * 96 * (1 - progress / 100),
              }}
              transition={{ type: "spring" }}
              strokeLinecap="round"
            />
          </svg>

          {/* Interactive Tap Button */}
          <motion.button
            onClick={handleIncrement}
            disabled={isCompleted}
            whileTap={{ scale: 0.93 }}
            className={`absolute w-44 h-44 rounded-full flex flex-col items-center justify-center transition-colors duration-300 focus:outline-none select-none
              ${
                isCompleted
                  ? "bg-gradient-to-br from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/20 cursor-default"
                  : "bg-slate-900/80 hover:bg-slate-900 border border-emerald-500/30 active:border-emerald-400 shadow-inner"
              }`}
          >
            {/* Pulse wave upon click */}
            {!isCompleted && (
              <motion.div
                key={count}
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-full bg-emerald-500/20 pointer-events-none"
              />
            )}

            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div
                  key="completed"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="flex flex-col items-center text-white"
                >
                  <CheckCircle2 className="w-12 h-12 mb-1" />
                  <span className="text-xs tracking-wider uppercase font-semibold">
                    Done
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key={count}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-5xl font-extrabold tracking-tight text-white">
                    {count}
                  </span>
                  <span className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-medium">
                    of {currentZikr.repeat}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4 w-full px-4 justify-between z-10">
          {/* Reset Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </motion.button>

          {/* Next Thikr Button */}
          <AnimatePresence>
            {isCompleted && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                onClick={handleNextZikr}
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                {currentIndex < playlist.length - 1
                  ? "Next Thikr"
                  : "Start New Cycle"}
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
