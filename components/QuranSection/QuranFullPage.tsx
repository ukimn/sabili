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
      className={`${amiriQuran.className} grid grid-cols-[300px_1fr] gap-30 min-h-screen my-10`}
    >
      <QuranPageSlider />
      <SurahPages />
    </div>
  );
}
