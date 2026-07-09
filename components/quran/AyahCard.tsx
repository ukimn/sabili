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
    <div className="group w-full rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-se-primary/15 hover:shadow-md hover:shadow-se-primary/5 dark:border-zinc-800 dark:bg-zinc-900 md:p-7">
      {/* Top Section */}
      <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3 transition-colors duration-300 group-hover:border-se-primary/10 dark:border-zinc-800/60">
        {/* Verse Number Badge */}
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 font-mono text-sm font-bold text-amber-700 ring-1 ring-amber-500/20 transition-all duration-300 group-hover:ring-amber-500/40 dark:text-amber-400 dark:ring-amber-500/20">
          {number}
        </div>

        {/* Decorative Element */}
        {sajda ? (
          <span className="flex items-center gap-2 text-xl tracking-widest text-zinc-400 transition-colors duration-300 group-hover:text-se-primary/40 dark:text-zinc-600">
            <SujudLineIcon size={20} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
              Sajdah
            </span>
          </span>
        ) : (
          <span className="flex items-center gap-2 text-xl tracking-widest text-zinc-400 transition-colors duration-300 group-hover:text-se-accent/40 dark:text-zinc-600">
            <FaBook className="h-4 w-4" />
          </span>
        )}
      </div>

      {/* Arabic Text */}
      <div className="w-full" dir="rtl">
        <p className="select-text text-right text-2xl leading-[2.2] tracking-wide text-zinc-800 antialiased transition-colors duration-300 selection:bg-amber-200/60 group-hover:text-zinc-900 dark:text-zinc-100 md:text-3xl md:leading-[2.5] lg:text-4xl">
          {text}
        </p>
      </div>
    </div>
  );
}
