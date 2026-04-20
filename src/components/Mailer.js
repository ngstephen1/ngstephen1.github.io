"use client";

import { useState } from "react";

export default function Mailer({ isExpand, setIsExpand, setIsOpen }) {
  const [email, setEmail] = useState("");
  const [cc, setCC] = useState("");
  const [bcc, setBCC] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [ccOpen, setCCOpen] = useState(false);
  const [bccOpen, setBCCOpen] = useState(false);
  const [resp, setResp] = useState("");
  const [isMinimize, setMinimize] = useState(false);

  const recipient = "npnallstar@gmail.com";

  const handleContact = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    if (subject) {
      params.set("subject", subject);
    }

    const body = [
      email ? `From: ${email}` : "",
      cc ? `Cc: ${cc}` : "",
      bcc ? `Bcc: ${bcc}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    if (body) {
      params.set("body", body);
    }

    window.location.href = `mailto:${recipient}?${params.toString()}`;
    setResp("Opening your email client...");

    setTimeout(() => {
      setResp("");
      setIsOpen(false);
    }, 1500);
  };

  const fieldClass =
    "w-full bg-transparent text-[#5f577b] placeholder-[#9c95b6] focus:outline-none";

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-[#f8f7fc] font-ropaSans shadow-[0_28px_80px_rgba(0,0,0,0.35)] ${
        isMinimize
          ? "md:w-[26rem]"
          : isExpand
            ? "h-[84vh] w-[92vw] md:h-[84vh] md:w-[78vw] md:max-w-[82rem]"
            : "h-[82vh] w-[92vw] md:h-[41rem] md:w-[48rem]"
      }`}
    >
      <div className="flex h-12 items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#7d749d] to-[#72688f] px-4 text-white">
        <div className="flex items-center gap-x-3">
          <h2 className="text-base font-semibold">New Message</h2>
          <div className="hidden rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-white/80 md:block">
            Draft
          </div>
        </div>

        <div className="flex items-center gap-x-1.5">
          <button
            type="button"
            aria-label="Minimize composer"
            className="hidden h-8 w-8 items-center justify-center rounded-full text-lg text-white/75 transition hover:bg-white/10 hover:text-white md:flex"
            onClick={() => {
              setIsExpand(false);
              setMinimize(!isMinimize);
            }}
          >
            −
          </button>
          <button
            type="button"
            aria-label={isExpand ? "Restore smaller composer" : "Expand composer"}
            className="hidden h-8 w-8 items-center justify-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white md:flex"
            onClick={() => {
              setMinimize(false);
              setIsExpand(!isExpand);
            }}
          >
            <div
              className={`bg-cover bg-no-repeat ${
                !isExpand ? "h-4 w-4 rotate-45" : "h-3.5 w-3.5"
              }`}
              style={{
                backgroundImage: `url(icons/${isExpand ? "shrink" : "expand"}.svg)`,
              }}
            />
          </button>
          <button
            type="button"
            aria-label="Close composer"
            className="flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-white/80 transition hover:bg-[#d6526f] hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>
      </div>

      <form
        className={`${isMinimize ? "hidden md:hidden" : "flex"} h-[calc(100%-3rem)] flex-col justify-between bg-[#faf9fd]`}
        onSubmit={handleContact}
      >
        <div className="flex h-full min-h-0 w-full flex-col">
          <div className="border-b border-[#ddd8ea] bg-white px-4 py-2.5">
            <div className="flex items-center gap-x-3">
              <span className="text-sm font-medium text-[#3f3758]">To</span>
              <div className="rounded-full border border-[#ded8eb] bg-[#f3f1f9] px-3 py-1 text-sm font-medium text-[#635a81] shadow-sm">
                {recipient}
              </div>
            </div>
          </div>

          <div className="border-b border-[#ddd8ea] bg-white px-4">
            <div className="flex items-center justify-between gap-x-4">
              <div className="flex w-full items-center gap-x-3 py-3">
                <span className="min-w-10 text-sm font-medium text-[#3f3758]">
                  From
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your Email"
                  className={fieldClass}
                />
              </div>

              <div className="flex items-center gap-x-3 text-sm font-medium text-[#6a6288]">
                {!ccOpen && !bccOpen && (
                  <>
                    <button
                      type="button"
                      className="transition hover:text-[#5189d8]"
                      onClick={() => setCCOpen(true)}
                    >
                      Cc
                    </button>
                    <button
                      type="button"
                      className="transition hover:text-[#5189d8]"
                      onClick={() => setBCCOpen(true)}
                    >
                      Bcc
                    </button>
                  </>
                )}
              </div>
            </div>

            {ccOpen && (
              <div className="flex items-center justify-between gap-x-4 border-t border-[#f0edf7]">
                <div className="flex w-full items-center gap-x-3 py-3">
                  <span className="min-w-10 text-sm font-medium text-[#3f3758]">
                    Cc
                  </span>
                  <input
                    type="email"
                    value={cc}
                    onChange={(event) => setCC(event.target.value)}
                    placeholder="Cc Email"
                    className={fieldClass}
                  />
                </div>

                {!bccOpen && (
                  <button
                    type="button"
                    className="text-sm font-medium text-[#6a6288] transition hover:text-[#5189d8]"
                    onClick={() => setBCCOpen(true)}
                  >
                    Bcc
                  </button>
                )}
              </div>
            )}

            {bccOpen && (
              <div className="flex items-center justify-between gap-x-4 border-t border-[#f0edf7]">
                <div className="flex w-full items-center gap-x-3 py-3">
                  <span className="min-w-10 text-sm font-medium text-[#3f3758]">
                    Bcc
                  </span>
                  <input
                    type="email"
                    value={bcc}
                    onChange={(event) => setBCC(event.target.value)}
                    placeholder="Bcc Email"
                    className={fieldClass}
                  />
                </div>

                {!ccOpen && (
                  <button
                    type="button"
                    className="text-sm font-medium text-[#6a6288] transition hover:text-[#5189d8]"
                    onClick={() => setCCOpen(true)}
                  >
                    Cc
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="border-b border-[#ddd8ea] bg-white px-4 py-3">
            <input
              type="text"
              required
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Subject"
              className="w-full bg-transparent text-[#3f3758] placeholder-[#9189ab] focus:outline-none"
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col bg-white px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#a49cbc]">
                Message
              </div>
              <div className="hidden text-xs text-[#9b93b6] md:block">
                Tell me about anything
              </div>
            </div>

            <textarea
              className="h-full min-h-[15rem] w-full resize-none bg-transparent text-[1.02rem] leading-8 text-dark-purple-200 placeholder-[#9ea8bb] focus:outline-none"
              placeholder="Tell me about anything"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
        </div>

        <div className="border-t border-[#ddd8ea] bg-[#f5f2fb] px-4 py-3">
          {resp && (
            <div className="mb-3 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
              {resp}
            </div>
          )}

          <div className="flex items-center justify-between gap-x-4">
            <div className="hidden text-sm text-[#8a83a4] md:block">
              This will open your default email client with a prefilled draft.
            </div>

            <button
              type="submit"
              className="ml-auto flex min-w-24 items-center justify-center rounded-full bg-gradient-to-r from-[#79a2db] to-[#6e92c8] px-5 py-2.5 text-base font-medium text-white shadow-[0_8px_20px_rgba(84,126,193,0.35)] transition hover:brightness-105"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
