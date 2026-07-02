import QuranPageSlider from "./QuranPageSlider";
import SurahPages from "./SurahPages";

export default function QuranFullPage() {
  return (
    <div className="grid grid-cols-[300px_1fr] gap-30 min-h-screen my-10">
      <QuranPageSlider />
      <SurahPages />
    </div>
  );
}
