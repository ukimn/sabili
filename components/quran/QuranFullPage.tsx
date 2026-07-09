import QuranPageSlider from "./QuranPageSlider";
import SurahPages from "./SurahPages";
import { Amiri_Quran } from "next/font/google";

const amiriQuran = Amiri_Quran({
  subsets: ["latin"],
  weight: ["400"],
});

export default function QuranFullPage() {
  return (
    <div
      className={`${amiriQuran.className} mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 lg:grid lg:grid-cols-[320px_1fr] lg:gap-8`}
    >
      {/* Surah Sidebar */}
      <div className="order-2 lg:order-1">
        <QuranPageSlider />
      </div>

      {/* Main Content */}
      <div className="order-1 lg:order-2">
        {/* Decorative Bismillah Divider */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="divider-gold w-24" />
          <p
            className="text-3xl text-se-primary/70 md:text-4xl"
            dir="rtl"
          >
            ﷽
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-se-accent">
            In the Name of Allah, the Most Gracious, the Most Merciful
          </p>
          <div className="divider-gold w-24" />
        </div>

        <SurahPages />
      </div>
    </div>
  );
}
