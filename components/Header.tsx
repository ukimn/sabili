"use client";

import { headerData } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Moon } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="glass top-0 z-50 flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <Link href="/" className="group flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-se-primary text-white shadow-lg shadow-se-primary/20 transition-transform duration-300 group-hover:scale-105">
          <Moon className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight text-se-primary">
            Sabili
          </h1>
          <span className="-mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-se-accent">
            Your Spiritual Sanctuary
          </span>
        </div>
      </Link>

      {/* Navigation */}
      <nav>
        <div className="flex gap-1.5">
          {headerData.map(({ title, url }) => {
            const isActive = pathname === url;
            return (
              <Link
                href={url}
                key={title}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? "text-se-primary"
                    : "text-text-muted hover:text-se-primary"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-lg bg-se-primary/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{title}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
