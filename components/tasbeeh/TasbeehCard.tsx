"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Repeat, CheckCheck, RotateCcw } from "lucide-react";
import { FaBook } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ZikrItem {
  id: number;
  zekr: string;
  repeat: number;
  bless: string;
}

const defaultAthkar: ZikrItem[] = [
  {
    id: 1,
    zekr: "سُبْحَانَ اللَّهِ",
    repeat: 33,
    bless: "Glorified is Allah",
  },
  {
    id: 2,
    zekr: "الْحَمْدُ لِلَّهِ",
    repeat: 33,
    bless: "Praise be to Allah",
  },
  {
    id: 3,
    zekr: "اللَّهُ أَكْبَرُ",
    repeat: 34,
    bless: "Allah is the Greatest",
  },
  {
    id: 4,
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
          className="h-full bg-linear-to-br from-se-primary to-se-accent"
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
                : "bg-linear-to-br from-se-primary to-se-primary-dark text-white shadow-se-primary/30 hover:shadow-xl hover:shadow-se-primary/40 active:scale-95"
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

  const handleChangeReadingMode = () => {
    setTasbeehMode((mode) => (mode == "default" ? "custom" : "default"));
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
          <button
            onClick={handleChangeReadingMode}
            className="flex items-center gap-1.5 rounded-lg border border-se-primary/10 px-3 py-1.5 text-xs font-medium text-text-muted transition-colors duration-200 hover:border-se-primary/20 hover:text-se-primary"
          >
            <FaBook />
            {tasbeehMode === "default" ? "Custom" : "Default"}
          </button>
        </div>
      </div>

      <div className="divider-gold" />

      {/* Zikr Cards */}
      <div className="space-y-4">
        {tasbeehMode === "default" ? (
          defaultAthkar.map((zikr, index) => (
            <ZikrCounter
              key={`${resetKey}-${index}`}
              {...zikr}
              onComplete={() => handleComplete(index)}
            />
          ))
        ) : (
          <CustomTasbeeh />
        )}
      </div>

      {/* Footer */}
      {tasbeehMode === "default" && (
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted/40">
          {completed.size} of {defaultAthkar.length} completed
        </p>
      )}
    </div>
  );
}

// TODO: create a new component that called CustomTasbeeh to give the user options to right any zikr to repeat it!

function CustomTasbeeh() {
  // Text currently typed into the "add new zikr" input field
  const [newZikrInput, setNewZikrInput] = useState<string>("");

  // Full list of azkar (default ones + any the user added)
  const [azkarList, setAzkarList] = useState<ZikrItem[]>(
    defaultAthkar.map((zekr) => zekr),
  );

  // How many times the selected zikr has been tapped so far
  const [currentCount, setCurrentCount] = useState<number>(0);

  // Target number of taps needed to complete the current zikr
  const [targetRepeatCount, setTargetRepeatCount] = useState<number>(33);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const addZikr = () => {
    const trimmedInput = newZikrInput.trim();
    if (!trimmedInput) return;

    const isDuplicate = azkarList.some(
      (zekrItem) =>
        zekrItem.zekr.trim().toLowerCase() === trimmedInput.toLowerCase(),
    );
    if (isDuplicate) return;

    const nextId =
      azkarList.length > 0
        ? Math.max(...azkarList.map((zekrItem) => zekrItem.id)) + 1
        : 1;

    setAzkarList((prev) => [
      ...prev,
      { id: nextId, zekr: trimmedInput, repeat: 33, bless: "" },
    ]);
    setNewZikrInput("");
  };

  const incrementCount = () => {
    if (currentCount >= targetRepeatCount) {
      setIsCompleted(true);
    } else {
      setCurrentCount((prev) => prev + 1);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center border-2 shadow-md rounded-lg py-8 px-4 bg-white"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", ease: "backOut" }}
    >
      <div className="flex gap-4 items-center">
        <input
          placeholder="Add"
          className="border py-2 px-4 rounded-sm bg-white"
          onChange={(e) => {
            setNewZikrInput(e.target.value);
          }}
          value={newZikrInput}
        />
        <motion.button
          whileHover={{ backgroundColor: "#047857", color: "#fff" }}
          className="border rounded-sm py-2 px-4 bg-white"
          type="submit"
          onClick={addZikr}
        >
          Add Zikr
        </motion.button>
      </div>
      <div className="my-4 min-w-full flex items-center justify-center">
        <Select dir="rtl">
          <SelectTrigger className="w-full max-w-48">
            <SelectValue defaultValue={azkarList[0].zekr} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Azkar</SelectLabel>
              {azkarList.map((zekrItem) => (
                <SelectItem key={zekrItem.id} value={zekrItem.zekr}>
                  {zekrItem.zekr}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-10 mx-8 flex flex-col items-center space-y-6">
        <motion.button
          onClick={incrementCount}
          disabled={isCompleted}
          className={`relative flex h-70 w-70 items-5xl items-center justify-center rounded-full font-bold shadow-lg transition-all duration-200 ${
            isCompleted
              ? "bg-green-100 text-green-600 shadow-green-200/50"
              : "bg-linear-to-br from-se-primary to-se-primary-dark text-white shadow-se-primary/30 hover:shadow-xl hover:shadow-se-primary/40 active:scale-95"
          }`}
          whileTap={isCompleted ? {} : { scale: 0.92 }}
        >
          <AnimatePresence mode="wait">
            {isCompleted ? (
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
                {currentCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Repeat className="h-3.5 w-3.5" />
          <span>
            {currentCount}/{targetRepeatCount} ·{" "}
            {isCompleted ? "Completed ✓" : "Tap to count"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
