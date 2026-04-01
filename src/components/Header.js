"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar";

export default function Header({ setShowMailer }) {
  const path = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [linkMenu, setLinkMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [textCopy, setTextCopy] = useState(false);
  const menuRef = useRef(null);
  const linkRef = useRef(null);
  const profileRef = useRef(null);

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const displayQuery = query || "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("stephenallstar24@vt.edu");
      setTextCopy(true);
      setTimeout(() => {
        setTextCopy(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const externalLinks = [
    { text: "code", icon: "github.svg", url: "https://github.com/ngstephen1" },
    {
      text: "connect",
      icon: "linkedin.svg",
      url: "https://www.linkedin.com/in/nguyenpn1/",
    },
    {
      text: "Hackathon",
      icon: "articles.svg",
      url: "https://devpost.com/stephenallstar24",
    },
    {
      text: "card",
      icon: "link-outline.svg",
      url: "https://dot.cards/steegle",
    },
    {
      text: "resume",
      icon: "resumeicon.png",
      url: "https://docs.google.com/document/d/10SzxbVKTdz6fP6wTFl4gU7gxC80E4v6y/edit",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedMenu = menuRef.current?.contains(event.target);
      const clickedLink = linkRef.current?.contains(event.target);
      const clickedProfile = profileRef.current?.contains(event.target);

      if (showMenu && !clickedMenu && !clickedLink && !clickedProfile) {
        setShowMenu(false);
        setProfileMenu(false);
        setLinkMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      className={`flex ${
        path !== "/" ? "flex-col-reverse" : "flex-row"
      } relative w-full items-center justify-between gap-y-2 p-4 font-ropaSans text-accent-text md:flex-row ${
        path !== "/" ? "pt-8 md:pl-16" : "pl-10 md:pl-16"
      }`}
    >
      <div
        style={{ zIndex: 40 }}
        className={`flex ${
          path !== "/" ? "flex-col" : "flex-row"
        } w-full items-center gap-x-5 md:flex-row`}
      >
        {(path !== "/" && (
          <Link href="/" className="hidden text-2xl text-white md:block">
            (Stee)gle
          </Link>
        )) || (
          <Link
            href="/about"
            className="cursor-pointer transition-all duration-300 hover:opacity-70"
          >
            About
          </Link>
        )}

        {path !== "/" && <SearchBar query={displayQuery} />}
      </div>

      <div className="flex flex-row items-center justify-center gap-x-5">
        {path !== "/" && (
          <Link href="/" className="block text-2xl text-white md:hidden">
            (Stee)gle
          </Link>
        )}

        <div
          className="cursor-pointer transition-all duration-300 hover:opacity-70"
          onClick={() => setShowMailer(true)}
        >
          Gmail
        </div>

        <div
          onClick={() => {
            setLinkMenu(!linkMenu);
            profileMenu ? setShowMenu(true) : setShowMenu(!showMenu);
            setProfileMenu(false);
          }}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
            (linkMenu && "bg-white bg-opacity-20") ||
            "hover:bg-white hover:bg-opacity-10"
          }`}
          ref={linkRef}
        >
          <div
            className="h-6 w-6 cursor-pointer bg-cover bg-no-repeat"
            style={{ backgroundImage: "url(icons/menu.svg)" }}
          />
        </div>

        <div
          style={{ backgroundImage: "url(head-shot.png)" }}
          onClick={() => {
            setProfileMenu(!profileMenu);
            linkMenu ? setShowMenu(true) : setShowMenu(!showMenu);
            setLinkMenu(false);
          }}
          ref={profileRef}
          className="h-8 w-8 cursor-pointer rounded-full bg-cover bg-no-repeat"
        />

        {showMenu && (
          <div
            ref={menuRef}
            style={{ zIndex: 90 }}
            className={`absolute ${
              (linkMenu &&
                "right-4 top-full mt-3 grid w-[calc(100vw-2rem)] max-w-[18rem] grid-cols-2") ||
              (profileMenu &&
                "right-4 top-full mt-3 flex w-[calc(100vw-2rem)] max-w-[22rem] flex-col")
            } max-h-[calc(100vh-6rem)] gap-6 overflow-y-auto rounded-[1.5rem] border border-[0.5rem] border-accent-color bg-dark-purple-200 p-6`}
          >
            {linkMenu &&
              externalLinks.map((link) => (
                <Link
                  key={link.text}
                  href={link.url}
                  target="_blank"
                  className="flex flex-col items-center rounded-lg px-4 py-2 transition duration-200 ease-out hover:bg-white hover:bg-opacity-5"
                >
                  <div
                    className="h-12 w-12 bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(icons/${link.icon})` }}
                  />
                  <h2>{link.text}</h2>
                </Link>
              ))}

            {profileMenu && (
              <div className="flex w-full flex-col">
                <div className="flex w-full flex-row justify-end gap-x-10">
                  <div className="flex flex-row">
                    <h2>stephenallstar24@vt.edu</h2>
                    <div
                      className="h-5 w-5 cursor-pointer bg-cover bg-no-repeat"
                      onClick={handleCopy}
                      style={{
                        backgroundImage: textCopy
                          ? "url(icons/copy-filled.svg)"
                          : "url(icons/copy.svg)",
                      }}
                    />
                  </div>
                  <div
                    className="h-5 w-5 cursor-pointer bg-cover bg-no-repeat"
                    onClick={() => {
                      setProfileMenu(false);
                      setShowMenu(false);
                      setLinkMenu(false);
                    }}
                    style={{ backgroundImage: "url(icons/exit.svg)" }}
                  />
                </div>

                <div className="flex w-full flex-row">
                  <h2
                    className={`${
                      textCopy ? "visible" : "invisible"
                    } mb-4 w-full text-center text-xs text-white`}
                  >
                    email copied successfully!
                  </h2>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div
                    style={{ backgroundImage: "url(head-shot.png)" }}
                    className="h-24 w-24 cursor-pointer rounded-full bg-cover bg-no-repeat"
                  />
                  <h2 className="text-xl">Hi, I&apos;m Nguyen</h2>
                </div>

                <div className="flex flex-col gap-y-4 text-md">
                  <h2 className="text-center">AI / ML engineer and builder.</h2>

                  <div className="flex flex-col">
                    <h2 className="text-sm text-white">HOW TO USE</h2>
                    <h2>
                      Explore my projects and work experience using{" "}
                      <span className="italic text-white">Search</span>
                    </h2>
                    <h2>
                      Send me a message using{" "}
                      <span className="italic text-white">Gmail</span>
                    </h2>
                    <h2>
                      Open my links using the{" "}
                      <span className="italic text-white">Dot-Menu</span>
                    </h2>
                    <h2 className="flex flex-row items-center gap-x-1">
                      Open my contact card using{" "}
                      <span className="inline-flex self-center italic text-white">
                        <div
                          className="h-5 w-5 bg-cover bg-no-repeat"
                          style={{ backgroundImage: "url(icons/calendar.svg)" }}
                        />
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
