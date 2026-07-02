import { headerData } from "@/lib/data";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-7 px-6 bg-surface-offwhite border">
      <nav>
        <h1 className="text-se-primary text-5xl uppercase flex items-center gap-8">
          As&apos;sabeal |{" "}
          <span className="text-xl">Your Spritual Sancuary</span>
        </h1>
      </nav>
      <nav>
        <div className="flex gap-8">
          {headerData.map(({ title, url }) => {
            return (
              <Link href={url} key={title} className="duration-300 hover:text-se-primary-light text-xl hover:-translate-0.5">
                {title}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
