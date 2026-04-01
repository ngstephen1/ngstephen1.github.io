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

    window.location.href = `mailto:stephenallstar24@vt.edu?${params.toString()}`;
    setResp("Opening your email client...");

    setTimeout(() => {
      setResp("");
      setIsOpen(false);
    }, 1500);
  };

  return (
    <div
      className={`bg-white font-ropaSans font-light ${
        isMinimize
          ? "md:w-[25rem]"
          : `${isExpand ? "md:h-4/5 md:w-4/5" : "md:h-[35rem] md:w-[35rem]"}`
      } h-4/5 w-4/5 rounded-t-xl`}
    >
      <div className="flex h-10 w-full flex-row items-center justify-between rounded-t-xl bg-[#736B90] p-2 text-sm font-semibold text-white">
        <h2>New Message</h2>
        <div className="flex flex-row items-end gap-x-2">
          <div
            className={`mr-1 hidden md:block ${isMinimize && "pb-3"}`}
            onClick={() => {
              setIsExpand(false);
              setMinimize(!isMinimize);
            }}
          >
            _
          </div>
          <div
            className={`hidden bg-cover bg-no-repeat md:block ${
              !isExpand ? "h-5 w-5 rotate-45" : "h-4 w-4"
            }`}
            onClick={() => {
              setMinimize(false);
              setIsExpand(!isExpand);
            }}
            style={{
              backgroundImage: `url(icons/${isExpand ? "shrink" : "expand"}.svg)`,
            }}
          />
          <div
            className="h-5 w-5 bg-cover bg-no-repeat"
            onClick={() => setIsOpen(false)}
            style={{ backgroundImage: "url(icons/exit.svg)" }}
          />
        </div>
      </div>

      <form
        className={`${
          isMinimize ? "hidden md:hidden" : "flex"
        } h-full flex-col justify-between p-2`}
        onSubmit={handleContact}
      >
        <div className="flex h-full w-full flex-col gap-y-3">
          <div className="flex w-full flex-col border-b-[0.05rem]">
            <div className="flex w-full flex-row justify-between">
              <div className="flex w-full flex-row gap-x-2 py-2">
                <h2>From</h2>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your Email"
                  className="w-full bg-transparent text-[#736B90] placeholder-[#736B90] focus:outline-none"
                />
              </div>
              <div className="flex cursor-pointer flex-row justify-center gap-x-2 py-2">
                {!ccOpen && !bccOpen && (
                  <>
                    <div onClick={() => setCCOpen(true)}>Cc</div>
                    <div onClick={() => setBCCOpen(true)}>Bcc</div>
                  </>
                )}
              </div>
            </div>

            {ccOpen && (
              <div className="flex w-full flex-row justify-between">
                <div className="flex w-full flex-row gap-x-2 py-2">
                  <h2>Cc</h2>
                  <input
                    type="email"
                    value={cc}
                    onChange={(event) => setCC(event.target.value)}
                    placeholder="Cc Email"
                    className="w-full bg-transparent text-[#736B90] placeholder-[#736B90] focus:outline-none"
                  />
                </div>
                <div className="flex cursor-pointer flex-row justify-center gap-x-2 py-2">
                  {!bccOpen && <div onClick={() => setBCCOpen(true)}>Bcc</div>}
                </div>
              </div>
            )}

            {bccOpen && (
              <div className="flex w-full flex-row justify-between">
                <div className="flex w-full flex-row gap-x-2 py-2">
                  <h2>Bcc</h2>
                  <input
                    type="email"
                    value={bcc}
                    onChange={(event) => setBCC(event.target.value)}
                    placeholder="Bcc Email"
                    className="w-full bg-transparent text-[#736B90] placeholder-[#736B90] focus:outline-none"
                  />
                </div>
                <div className="flex cursor-pointer flex-row justify-center gap-x-2 py-2">
                  {!ccOpen && <div onClick={() => setCCOpen(true)}>Cc</div>}
                </div>
              </div>
            )}
          </div>

          <div className="flex w-full flex-row justify-between border-b-[0.05rem] pb-2">
            <input
              type="text"
              required
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Subject"
              className="w-full bg-transparent placeholder-[#736B90] focus:outline-none"
            />
          </div>

          <textarea
            className="h-full w-full bg-transparent text-dark-purple-200 focus:outline-none"
            placeholder="Tell me about the role, project, or collaboration."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

        {resp && (
          <h2 className="my-2 w-full rounded-md bg-green-100 p-2 text-green-800">
            {resp}
          </h2>
        )}

        <button
          type="submit"
          className="flex w-20 items-center justify-center rounded-full bg-accent-color p-2 text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
}
