"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchBar({ query }) {
  const [search, setSearch] = useState("Search (Stee)gle");
  const [showSearch, setShowSearch] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [tooltip2, setTooltip2] = useState(false);
  const dropdownRef = useRef(null);
  const path = usePathname();

  const searches = [
    {
      search: "work experience",
      param: "work-experience",
      aliases: ["experience"],
    },
    { search: "projects", param: "stephen-projects" },
    { search: "life", param: "life" },
    { search: "why hire me", param: "why-hire-a-stephen" },
  ];

  useEffect(() => {
    setShowSearch(false);
  }, [search, path]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`flex w-full flex-col items-center gap-y-6 font-ropaSans ${
        path === "/" && "relative"
      }`}
      style={{ zIndex: 80 }}
    >
      {path === "/" && (
        <h2 className="absolute -top-20 text-6xl text-white lg:-top-28 lg:text-7xl xl:text-8xl">
          (Stee)gle
        </h2>
      )}

      <div
        ref={dropdownRef}
        className={`absolute flex flex-col items-center bg-accent-color py-2 shadow-lg ${
          path !== "/"
            ? "left-0 top-6 w-full md:absolute md:left-48 md:w-2/5"
            : "w-11/12 md:w-2/3 lg:w-2/5"
        } ${showSearch ? "rounded-3xl" : "rounded-full"}`}
      >
        <div className="flex w-full items-center px-4">
          <div
            className="h-5 w-5 bg-cover bg-no-repeat"
            style={{
              backgroundImage: showSearch
                ? "url(icons/arrow.svg)"
                : "url(icons/search.svg)",
            }}
            onClick={() => setShowSearch(!showSearch)}
          />

          <div
            className={`flex-grow bg-accent-color px-4 py-2 focus:outline-none ${
              search === "Search (Stee)gle" ? "text-accent-text" : "text-white"
            }`}
            onClick={() => setShowSearch(!showSearch)}
          >
            {(query &&
              searches.find(
                (item) =>
                  item.param === query || item.aliases?.includes(query)
              )?.search) ||
              search}
          </div>

          <div className="flex flex-row items-center justify-center gap-x-2">
            <div
              className="h-5 w-5 cursor-pointer bg-cover bg-no-repeat"
              onMouseEnter={() => setTooltip2(true)}
              onMouseLeave={() => setTooltip2(false)}
              style={{ backgroundImage: "url(icons/microphone.svg)" }}
            />
            <Link
              className="h-5 w-5 bg-cover bg-no-repeat"
              href="https://dot.cards/steegle"
              target="_blank"
              onMouseEnter={() => setTooltip(true)}
              onMouseLeave={() => setTooltip(false)}
              style={{ backgroundImage: "url(icons/calendar.svg)" }}
            />

            <div
              className={`absolute top-12 rounded-xl border border-accent-text border-opacity-40 bg-[#15131B] p-2 px-4 text-xs text-nowrap text-white ${
                tooltip ? "hidden md:block" : "hidden"
              }`}
            >
              open contact card
            </div>

            <div
              className={`absolute top-12 rounded-xl border border-accent-text border-opacity-40 bg-[#15131B] p-2 px-4 text-xs text-nowrap text-white ${
                tooltip2 ? "hidden md:block" : "hidden"
              }`}
            >
              singer mode coming soon
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="w-full">
            <div className="mx-4 border-b border-accent-text" />
            <h2 className="mt-2 px-4 text-md font-semibold text-accent-text">
              Trending searches
            </h2>
            {searches.map((item) => (
              <Link
                className="flex w-full flex-row items-center gap-x-2 rounded-lg px-4 py-2 text-[#E5DFFF] transition duration-200 ease-out hover:bg-white hover:bg-opacity-5"
                href={`/search?q=${encodeURIComponent(item.param)}`}
                key={item.param}
                onClick={() => setShowSearch(false)}
              >
                <div
                  className="h-3 w-5 bg-cover bg-no-repeat"
                  style={{ backgroundImage: "url(icons/trending.svg)" }}
                />
                {item.search}
              </Link>
            ))}
          </div>
        )}
      </div>

      {path === "/" && (
        <>
          <div
            className={`w-full transition-all duration-300 ${
              showSearch
                ? "h-[13.75rem] md:h-[14.25rem] lg:h-[14.75rem]"
                : "h-[6.25rem] md:h-[6.75rem] lg:h-[7.25rem]"
            }`}
          />
          <div className="w-11/12 md:w-2/3 lg:w-2/5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-center shadow-[0_12px_36px_rgba(0,0,0,0.1)] backdrop-blur-[2px] md:px-5">
              <p className="text-sm leading-6 text-white/85 md:text-[1.02rem] md:leading-7">
                I&apos;m looking for{" "}
                <span className="text-accent-text">
                  Summer 2026 Internship
                </span>{" "}
                &{" "}
                <span className="text-accent-text">
                  New Grad Roles in 2027
                </span>
                . Top choices are{" "}
                <span className="text-white">
                  AI Engineer, Software Engineer, Data Scientist/Engineer, Business Analyst
                </span>
                .
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
