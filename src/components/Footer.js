"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const path = usePathname();
  const [tooltip, setTooltip] = useState(false);

  return (
    <div className="relative flex w-full flex-col justify-center gap-y-4 bg-dark-purple-300 py-4 font-ropaSans text-accent-text">
      <div className="flex items-center px-4">
        <div className="flex w-full items-center justify-between">
          <div
            className="cursor-pointer"
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
          >
            Virginia, United States
          </div>

          {path === "/" && <div>Last updated: March 28, 2026</div>}
        </div>
      </div>

      <div
        className={`absolute left-[4.5rem] top-2 rounded-xl border border-accent-text border-opacity-40 bg-[#15131B] p-2 px-4 text-white ${
          tooltip ? "hidden md:block" : "hidden"
        }`}
      >
        Open to ambitious engineering and AI work.
      </div>

      <div className="border border-1 border-accent-text" />

      <div className="flex w-full flex-row justify-between px-4">
        <div className="flex flex-row gap-x-6">
          <Link
            href="https://www.linkedin.com/in/nguyenpn1/"
            className="transition-all duration-300 hover:opacity-70"
          >
            LinkedIn
          </Link>

          <div className="cursor-pointer">
            {currentYear} ® Nguyen Phan Nguyen
          </div>
        </div>

        {path === "/" && <div>Credit: Rumeza</div>}

        {path === "/search" && (
          <Link
            href="/about"
            className="transition-all duration-300 hover:opacity-70"
          >
            About
          </Link>
        )}
      </div>
    </div>
  );
}
