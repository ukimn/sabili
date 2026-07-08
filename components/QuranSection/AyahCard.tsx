import SujudLineIcon from "../SujudIcons";
import { FaBook } from "react-icons/fa";

export default function AyahCard({
  text,
  number,
  sajda,
}: {
  text: string;
  number: number;
  sajda: boolean;
}) {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 md:p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5">
      {/* Top Section: Badge and Metadata */}
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-3">
        {/* Elegant modern geometric number badge */}
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-sm font-bold ring-1 ring-amber-500/20 select-none">
          {number}
        </div>

        {/* Subtle decorative element */}
        {sajda ? (
          <span className="text-black items-center flex dark:text-zinc-600 text-xl tracking-widest font-medium uppercase">
            ✦ <SujudLineIcon /> ✦
          </span>
        ) : (
          <span className="text-black items-center flex dark:text-zinc-600 text-xl tracking-widest font-medium uppercase">
            ✦ <FaBook /> ✦
          </span>
        )}
      </div>

      {/* Text Section: Optimized for Arabic typography */}
      <div className="w-full" dir="rtl">
        <p className="text-right text-2xl md:text-3xl lg:text-4xl text-zinc-800 dark:text-zinc-100 font-normal leading-[2.2] md:leading-[2.5] tracking-wide antialiased select-text selection:bg-amber-200/60">
          {text}
        </p>
      </div>
    </div>
  );
}
