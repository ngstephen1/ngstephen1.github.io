"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import projects from "@/data/projects.json";
import experiences from "@/data/experience.json";
import life from "@/data/life.json";
import whyHire from "@/data/why.json";
import MyLanguagesChart from "./MyLanguagesChart";
import KintsugiHeartsDreamDetail from "@/components/project-details/KintsugiHeartsDreamDetail";

const languages = [
  "Python",
  "TypeScript",
  "Java",
  "SQL",
  "CUDA",
  "Swift",
  "Go",
];

const projectTechnologies = [
  "PyTorch",
  "Azure OpenAI",
  "AWS Bedrock",
  "Amazon Nova",
  "Flask",
  "React",
  "Hugging Face",
  "FastAPI",
  "Docker",
  "ROS 2",
  "Snowflake",
  "Node.js",
];

const experienceTechnologies = [
  "RAG",
  "vLLM",
  "SQL",
  "BrowserStack",
  "Harness",
  "QMetry",
  "Computer Vision",
  "NLP",
  "ROS 2",
  "Evaluation",
];

const detailComponentByAlias = {
  "kintsugi-hearts-dream": KintsugiHeartsDreamDetail,
};

export default function Search() {
  const [showMore, setShowMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");
  const project = searchParams.get("p");

  const displayQuery = query || "";
  const isWorkExperience =
    displayQuery === "work-experience" || displayQuery === "experience";
  const displayData =
    (displayQuery === "stephen-projects" && projects) ||
    (isWorkExperience && experiences) ||
    (displayQuery === "life" && life) ||
    [];

  useEffect(() => {
    if (project) {
      const selected =
        [...projects, ...experiences, ...life].find(
          (item) => item.alias === project
        ) || null;

      if (selected) {
        setSelectedSearch(selected);
        setIsOpen(true);
      }

      const params = new URLSearchParams(searchParams.toString());
      params.delete("p");
      router.replace(`?${params.toString()}`, { shallow: true });
    }
  }, [project, router, searchParams]);

  const handleSelect = (data) => {
    setSelectedSearch(data);
    setIsOpen(true);
  };

  const ResultVisual = ({ data, banner = false }) => {
    const imageAlias = data.imageAlias || data.alias;
    const directSrc = banner ? data.bannerSrc || data.iconSrc : data.iconSrc;

    if (directSrc) {
      return (
        <div
          className={`rounded-md bg-cover bg-center bg-no-repeat ${
            banner ? "h-full w-full" : "h-24 w-24"
          }`}
          style={{ backgroundImage: `url(${directSrc})` }}
        />
      );
    }

    if (imageAlias) {
      if (data.imageFit === "contain") {
        return (
          <div
            className={`relative overflow-hidden rounded-md bg-white/5 ${
              banner ? "h-full w-full" : "h-24 w-24"
            }`}
          >
            <Image
              src={`/search-img/${imageAlias}-${banner ? "banner" : "icon"}.png`}
              alt={data.title}
              fill
              className={`${banner ? "p-4 md:p-6" : "p-2"} object-contain`}
              sizes={banner ? "100vw" : "96px"}
            />
          </div>
        );
      }

      return (
        <div
          className={`rounded-md bg-center bg-no-repeat ${
            banner ? "h-full w-full" : "h-24 w-24"
          } bg-cover`}
          style={{
            backgroundImage: `url(search-img/${imageAlias}-${
              banner ? "banner" : "icon"
            }.png)`,
          }}
        />
      );
    }

    return (
      <div
        className={`flex items-center justify-center rounded-md bg-dark-purple-300 text-white ${
          banner ? "h-full w-full text-3xl" : "h-24 w-24 text-lg"
        }`}
      >
        {data.title.slice(0, 2).toUpperCase()}
      </div>
    );
  };

  const SearchItem = ({ data }) => {
    return (
      <div className="flex flex-row gap-x-2 font-ropaSans" style={{ zIndex: 10 }}>
        <div className="w-4/5">
          <div className="flex flex-row items-center gap-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dark-purple-300">
              <div
                className="h-5 w-5 bg-cover bg-no-repeat"
                style={{ backgroundImage: "url(icons/key.svg)" }}
              />
            </div>
            <div className="font-light leading-tight">
              <h2>{data.title}</h2>
              <h2 className="text-sm opacity-75">{data.timeline}</h2>
            </div>
          </div>

          <h2
            className="cursor-pointer text-xl text-search-blue hover:underline"
            onClick={() => handleSelect(data)}
          >
            {data.headline}
          </h2>
          <h2 className="text-white opacity-50">{data.searchDescription}</h2>
        </div>

        <ResultVisual data={data} />
      </div>
    );
  };

  const SearchItemOpen = ({ data }) => {
    const DetailComponent = detailComponentByAlias[data.alias];

    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-70">
        <div className="z-50 flex h-[92vh] w-11/12 flex-col items-center rounded-lg bg-accent-color p-2 shadow-lg transition-transform duration-300 ease-in-out md:w-4/5 lg:w-3/5">
          <div className="mb-2 flex w-full row justify-end">
            <div
              className="h-6 w-6 bg-cover bg-no-repeat"
              style={{ backgroundImage: "url(icons/exit.svg)" }}
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div
            className="relative flex h-full w-full flex-col gap-y-3 overflow-y-scroll overflow-x-hidden p-4 scroll-smooth"
            style={{ scrollbarWidth: "1" }}
          >
            <div className="w-full overflow-hidden rounded-lg bg-black">
              {data.videoEmbed ? (
                <iframe
                  className="aspect-video w-full"
                  src={data.videoEmbed}
                  title={`${data.title} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div className="max-h-[52vh] w-full">
                  <ResultVisual data={data} banner />
                </div>
              )}
            </div>

            <h2 className="w-full text-2xl">{data.title}</h2>

            {!!data.links?.length && (
              <div className="flex w-full flex-row flex-wrap gap-2">
                {data.links.map((link) => (
                  <Link
                    className={`flex flex-row items-center gap-x-2 rounded border px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
                      link.name === "github"
                        ? "flex-row-reverse border-dark-purple-300 bg-dark-purple-300 hover:bg-[#4D456E]"
                        : "border-stone-700 bg-white text-dark-purple-100 hover:bg-stone-200 hover:text-dark-purple-300"
                    }`}
                    key={link.name}
                    href={link.link}
                    target="_blank"
                  >
                    <h2>{link.name}</h2>
                    <div
                      className={`bg-cover bg-no-repeat ${
                        link.name === "video" ? "h-6 w-6" : "h-4 w-4"
                      }`}
                      style={{ backgroundImage: `url(icons/${link.url})` }}
                    />
                  </Link>
                ))}
              </div>
            )}

            {data.descriptionFirst && (
              <div className="w-full font-thin">{data.longDescription}</div>
            )}

            {!!data.mediaFrames?.length && (
              <div className="flex w-full flex-col gap-3">
                {data.mediaFrames.map((frame, index) => (
                  <div
                    key={`${data.alias}-frame-${index}`}
                    className={`overflow-hidden rounded-lg border border-white border-opacity-10 bg-black ${
                      frame.layout === "compact"
                        ? "mx-auto w-full max-w-lg"
                        : "w-full"
                    }`}
                  >
                    {frame.type === "image" ? (
                      <div className="w-full">
                        <Image
                          src={frame.src}
                          alt={frame.alt || `${data.title} frame ${index + 1}`}
                          width={1200}
                          height={675}
                          className="h-auto w-full object-contain"
                        />
                        {frame.caption && (
                          <div className="px-3 py-2 text-sm text-white opacity-75">
                            {frame.caption}
                          </div>
                        )}
                      </div>
                    ) : frame.type === "video" ? (
                      <video
                        className="h-auto w-full"
                        controls
                        playsInline
                        preload="metadata"
                      >
                        <source src={frame.src} />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <iframe
                        className="aspect-video w-full"
                        src={frame.src}
                        title={frame.alt || `${data.title} frame ${index + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {!data.descriptionFirst && (
              <div className="w-full font-thin">{data.longDescription}</div>
            )}

            {DetailComponent && <DetailComponent />}

            {!!data.tech?.length && (
              <div className="flex w-full flex-row flex-wrap gap-2">
                {data.tech.map((stack) => (
                  <div
                    key={stack}
                    className="rounded bg-white bg-opacity-10 p-1 text-sm text-accent-text"
                  >
                    {stack}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const RightPanel = () => {
    if (displayQuery === "life") {
      return (
        <div className="flex flex-col gap-y-3 p-2">
          <Image
            src="/search-img/life.jpeg"
            alt="Nguyen Phan Nguyen"
            width={640}
            height={320}
            className="h-[17rem] w-full rounded-t-lg object-cover"
          />
          <h2 className="text-xl">
            &ldquo;The only thing constant in life is change. ⚡&rdquo;
          </h2>
          <h2 className="text-lg opacity-70">
            I was passionate about chess for 10 years before shifting my focus
            toward academics, storytelling, and a broader creative life.
          </h2>
          <h2 className="text-lg opacity-70">
            I gave a TEDx speech on AI, explored long stretches of self-growth,
            adapted to living far from home, and kept returning to music as a
            personal north star.
          </h2>
          <h2 className="text-lg opacity-70">
            My passion for AI and music still shapes where I want to go next:
            building technology that feels expressive, ambitious, and human.
          </h2>
          <h2 className="text-xl">To me, change is the symphony of life.</h2>
        </div>
      );
    }

    if (isWorkExperience) {
      return (
        <div className="flex flex-col gap-y-3 p-2">
          <h2 className="text-xl">
            Research, product engineering, and real-time systems.
          </h2>
          <h2 className="text-lg opacity-70">
            I’ve worked across ICLR-level research, enterprise mobile QA, AI art
            delivery, and hardware-adjacent data systems.
          </h2>
          <h2 className="text-lg opacity-70">
            That range makes me comfortable moving between evaluation, tooling,
            infrastructure, and user-facing outcomes.
          </h2>
          <div className="flex flex-col">
            <h2 className="text-sm uppercase tracking-wider">core stack</h2>
            <div className="flex flex-row flex-wrap gap-2">
              {experienceTechnologies.map((stack) => (
                <div
                  key={stack}
                  className="inline-flex rounded bg-white bg-opacity-10 p-1 text-sm text-accent-text"
                >
                  {stack}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-y-3">
        <MyLanguagesChart />
        <div className="flex flex-col gap-y-3 p-2">
          <h2 className="text-lg opacity-70">
            I like work that blends research depth, product speed, and measurable
            impact.
          </h2>
          <h2 className="text-lg opacity-70">
            The strongest thread in my portfolio is shipping AI systems that are
            both technically ambitious and easy to explain.
          </h2>

          <div className="flex flex-col">
            <h2 className="text-sm uppercase tracking-wider">languages</h2>
            <div className="flex flex-row flex-wrap gap-2">
              {languages.map((stack) => (
                <div
                  key={stack}
                  className="inline-flex rounded bg-white bg-opacity-10 p-1 text-sm text-accent-text"
                >
                  {stack}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="text-sm uppercase tracking-wider">
              frameworks & libraries
            </h2>
            <div className="flex flex-row flex-wrap gap-2">
              {projectTechnologies.map((stack) => (
                <div
                  key={stack}
                  className="inline-flex rounded bg-white bg-opacity-10 p-1 text-sm text-accent-text"
                >
                  {stack}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col font-ropaSans text-white">
      <div className="relative flex w-full flex-col">
        <div className="border border-[0.05rem] border-white border-opacity-10" />
        <div className="flex w-full flex-row gap-x-20 py-10">
          <div className="flex flex-col gap-y-4 px-4 md:w-1/2 lg:pl-48">
            {displayQuery !== "why-hire-a-stephen" ? (
              displayData.map((data) => (
                <div key={data.alias}>
                  <SearchItem data={data} />
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row items-center gap-x-2">
                  <div
                    className="h-5 w-4 bg-cover bg-no-repeat"
                    style={{ backgroundImage: "url(icons/star.svg)" }}
                  />
                  <h2>AI Overview</h2>
                </div>

                <div
                  className={`relative flex flex-col gap-y-3 ${
                    showMore ? "h-auto" : "h-48 overflow-y-hidden"
                  }`}
                >
                  {!showMore && (
                    <>
                      <h2>
                        <span className="bg-[#735B95] py-1">
                          I connect research, real systems, and product delivery.
                        </span>
                      </h2>
                      <h2>
                        <span className="bg-[#735B95] py-1">
                          I like work that has technical depth, visible impact, and
                          enough room to build something differentiated.
                        </span>
                      </h2>
                    </>
                  )}

                  {whyHire.aiDescription.map((paragraph) => (
                    <h2 key={paragraph}>{paragraph}</h2>
                  ))}

                  {!showMore && (
                    <div className="absolute -bottom-6 h-10 w-full bg-gradient-to-t from-dark-purple-300 via-dark-purple-200 via-dark-purple-100 to-transparent" />
                  )}
                </div>

                {!showMore && (
                  <div className="absolute -bottom-8 left-0 flex h-28 w-full flex-col justify-end bg-gradient-to-t from-dark-purple-300 to-transparent md:px-48">
                    <div
                      onClick={() => setShowMore(true)}
                      className="mt-3 flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-full border border-accent-color bg-dark-purple-200 py-3 hover:bg-[#322C48] md:w-2/3 lg:w-2/5"
                    >
                      <h2>Show More</h2>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18 9L12 15L6 9" stroke="#C48DF6" />
                      </svg>
                    </div>

                    <div className="mt-3 w-full border border-[0.05rem] border-accent-text border-opacity-50" />
                  </div>
                )}
              </div>
            )}
          </div>

          {displayQuery !== "why-hire-a-stephen" && (
            <div className="hidden h-[40rem] w-1/3 flex-col gap-y-3 rounded-lg border-[0.05rem] border-white border-opacity-30 p-2 shadow-xl md:flex">
              <RightPanel />
            </div>
          )}
        </div>

        {isOpen && selectedSearch && <SearchItemOpen data={selectedSearch} />}
      </div>

      {displayQuery === "why-hire-a-stephen" && !showMore && (
        <div className="flex flex-col gap-y-2 pl-10 pt-16 md:pl-48">
          <h2 className="text-sm">
            Your search - <span className="font-bold">why hire me</span> - did
            not match any documents
          </h2>
          <h2 className="text-sm">Suggestions:</h2>
          <ul className="list-disc pl-5 text-sm">
            <li>Open the overview and read the actual work signal</li>
            <li>Use Gmail or LinkedIn to start a conversation</li>
          </ul>
        </div>
      )}
    </div>
  );
}
