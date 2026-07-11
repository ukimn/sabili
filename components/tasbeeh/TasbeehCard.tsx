"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Repeat, CheckCheck, RotateCcw } from "lucide-react";

interface ZikrItem {
  zekr: string;
  repeat: number;
  bless: string;
}

const defaultAthkar: ZikrItem[] = [
  {
    zekr: "سُبْحَانَ اللَّهِ",
    repeat: 33,
    bless: "Glorified is Allah",
  },
  {
    zekr: "الْحَمْدُ لِلَّهِ",
    repeat: 33,
    bless: "Praise be to Allah",
  },
  {
    zekr: "اللَّهُ أَكْبَرُ",
    repeat: 34,
    bless: "Allah is the Greatest",
  },
  {
    zekr: "أَسْتَغْفِرُ اللَّهَ",
    repeat: 100,
    bless: "I seek forgiveness from Allah",
  },
];

function ZikrCounter({
  zekr,
  repeat,
  bless,
  onComplete,
}: ZikrItem & { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const progress = count / repeat;

  const handleTap = () => {
    if (count < repeat) {
      const next = count + 1;
      setCount(next);
      if (next >= repeat) {
        onComplete();
      }
    }
  };

  const isComplete = count >= repeat;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-se-primary/10 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
    >
      {/* Progress bar background */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-se-primary/5">
        <motion.div
          className="h-full bg-gradient-to-r from-se-primary to-se-accent"
          initial={{ width: "0%" }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Arabic Text */}
        <p
          className="text-3xl font-medium text-se-primary md:text-4xl"
          dir="rtl"
        >
          {zekr}
        </p>

        {/* Translation */}
        <p className="text-sm text-text-muted">{bless}</p>

        {/* Counter Display */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={handleTap}
            disabled={isComplete}
            className={`relative flex h-20 w-20 items-center justify-center rounded-full font-bold shadow-lg transition-all duration-200 ${
              isComplete
                ? "bg-green-100 text-green-600 shadow-green-200/50"
                : "bg-gradient-to-br from-se-primary to-se-primary-dark text-white shadow-se-primary/30 hover:shadow-xl hover:shadow-se-primary/40 active:scale-95"
            }`}
            whileTap={isComplete ? {} : { scale: 0.92 }}
          >
            <AnimatePresence mode="wait">
              {isComplete ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <CheckCheck className="h-8 w-8" />
                </motion.div>
              ) : (
                <motion.span
                  key="count"
                  className="text-2xl font-bold"
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -5, opacity: 0 }}
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Progress Text */}
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Repeat className="h-3.5 w-3.5" />
          <span>
            {count}/{repeat} · {isComplete ? "Completed ✓" : "Tap to count"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TasbeehCard() {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [resetKey, setResetKey] = useState(0);
  const [tasbeehMode, setTasbeehMode] = useState<"default" | "custom">(
    "default",
  );

  const handleComplete = (index: number) => {
    setCompleted((prev) => new Set(prev).add(index));
  };

  const handleReset = () => {
    setCompleted(new Set());
    setResetKey((k) => k + 1);
  };

  const allComplete = completed.size === defaultAthkar.length;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-se-primary">Athkar</h1>
          <p className="mt-1 text-sm text-text-muted">
            Morning & Evening Remembrances
          </p>
        </div>
        <div className="flex items-center gap-2">
          {allComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              All completed
            </motion.div>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg border border-se-primary/10 px-3 py-1.5 text-xs font-medium text-text-muted transition-colors duration-200 hover:border-se-primary/20 hover:text-se-primary"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="divider-gold" />

      {/* Zikr Cards */}
      <div className="space-y-4">
        {defaultAthkar.map((zikr, index) => (
          <ZikrCounter
            key={`${resetKey}-${index}`}
            {...zikr}
            onComplete={() => handleComplete(index)}
          />
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted/40">
        {completed.size} of {defaultAthkar.length} completed
      </p>
    </div>
  );
}

// TODO: create a new component that called CustomTasbeeh to give the user options to right any zikr to repeat it!
