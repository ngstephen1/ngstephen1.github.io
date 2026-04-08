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
import VTCRODetail from "@/components/project-details/VTCRODetail";
import DeloitteDataCompetitionDetail from "@/components/project-details/DeloitteDataCompetitionDetail";

const projectStackSections = [
  {
    title: "programming languages",
    items: [
      "Python",
      "Java",
      "R",
      "CUDA",
      "Go",
      "TypeScript",
      "Kotlin",
      "Swift",
      "Rust",
      "Bash",
      "C",
      "C++",
      "MATLAB",
    ],
  },
  {
    title: "frameworks & libraries",
    items: [
      "Pandas",
      "Numpy",
      "TensorFlow",
      "PyTorch",
      "spaCy",
      "Keras",
      "React",
      "Spring Boot",
      "Vue.js",
      "FastAPI",
      "REST",
      "Seaborn",
      "scikit-learn",
      "Next.js",
      "Flask",
      "OpenCV",
      ".NET Core",
      "XGBoost",
      "Streamlit",
      "TensorRT",
      "LangChain",
      "Vite",
    ],
  },
  {
    title: "technologies",
    items: [
      "Microsoft Azure",
      "AWS",
      "IBM",
      "GCP",
      "Snowflake",
      "SLURM",
      "NVIDIA GPUs",
      "Docker",
      "Kubernetes",
      "Git",
      "MongoDB",
      "SQL",
      "Cosmos DB",
      "ROS 2",
      "Jira",
      "Selenium",
      "Node.js",
      "Appium",
      "PySpark",
      "Qmetry",
      "Harness",
      "Jenkins",
      "Nginx",
      "Arduino",
    ],
  },
];

const workExperienceBadges = [
  {
    title: "instruments",
    subtitle: "programming languages",
    items: [
      {
        alt: "Python",
        src: "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
      },
      {
        alt: "Java",
        src: "https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=openjdk&logoColor=white",
      },
      {
        alt: "R",
        src: "https://img.shields.io/badge/R-276DC3?style=for-the-badge&logo=r&logoColor=white",
      },
      {
        alt: "CUDA",
        src: "https://img.shields.io/badge/CUDA-76B900?style=for-the-badge&logo=nvidia&logoColor=white",
      },
      {
        alt: "Go",
        src: "https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white",
      },
      {
        alt: "TypeScript",
        src: "https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white",
      },
      {
        alt: "Kotlin",
        src: "https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white",
      },
      {
        alt: "Swift",
        src: "https://img.shields.io/badge/Swift-F05138?style=for-the-badge&logo=swift&logoColor=white",
      },
      {
        alt: "Rust",
        src: "https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white",
      },
      {
        alt: "Bash",
        src: "https://img.shields.io/badge/Bash-4EAA25?style=for-the-badge&logo=gnubash&logoColor=white",
      },
      {
        alt: "MATLAB",
        src: "https://img.shields.io/badge/MATLAB-0076A8?style=for-the-badge&logo=mathworks&logoColor=white",
      },
      {
        alt: "HTML5",
        src: "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white",
      },
      {
        alt: "CSS3",
        src: "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white",
      },
      {
        alt: "C",
        src: "https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white",
      },
      {
        alt: "C++",
        src: "https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white",
      },
    ],
  },
  {
    title: "synths & plugins",
    subtitle: "frameworks & libraries",
    items: [
      {
        alt: "pandas",
        src: "https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white",
      },
      {
        alt: "NumPy",
        src: "https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white",
      },
      {
        alt: "TensorFlow",
        src: "https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white",
      },
      {
        alt: "PyTorch",
        src: "https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white",
      },
      {
        alt: "spaCy",
        src: "https://img.shields.io/badge/spaCy-09A3D5?style=for-the-badge&logo=spacy&logoColor=white",
      },
      {
        alt: "Keras",
        src: "https://img.shields.io/badge/Keras-D00000?style=for-the-badge&logo=keras&logoColor=white",
      },
      {
        alt: "OpenCV",
        src: "https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white",
      },
      {
        alt: "scikit-learn",
        src: "https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white",
      },
      {
        alt: "XGBoost",
        src: "https://img.shields.io/badge/XGBoost-EC4D37?style=for-the-badge",
      },
      {
        alt: "TensorRT",
        src: "https://img.shields.io/badge/TensorRT-76B900?style=for-the-badge&logo=nvidia&logoColor=white",
      },
      {
        alt: "Seaborn",
        src: "https://img.shields.io/badge/Seaborn-4C72B0?style=for-the-badge",
      },
      {
        alt: "LangChain",
        src: "https://img.shields.io/badge/LangChain-000000?style=for-the-badge",
      },
      {
        alt: "Hugging Face",
        src: "https://img.shields.io/badge/Hugging%20Face-FFB000?style=for-the-badge&logo=huggingface&logoColor=white",
      },
      {
        alt: "Gradio",
        src: "https://img.shields.io/badge/Gradio-F97316?style=for-the-badge",
      },
      {
        alt: "React",
        src: "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
      },
      {
        alt: "Next.js",
        src: "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white",
      },
      {
        alt: "Vue.js",
        src: "https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white",
      },
      {
        alt: "Vite",
        src: "https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white",
      },
      {
        alt: "Flask",
        src: "https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white",
      },
      {
        alt: "Django",
        src: "https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white",
      },
      {
        alt: "FastAPI",
        src: "https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white",
      },
      {
        alt: "Spring Boot",
        src: "https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white",
      },
      {
        alt: ".NET Core",
        src: "https://img.shields.io/badge/.NET%20Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white",
      },
      {
        alt: "Streamlit",
        src: "https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white",
      },
      {
        alt: "REST API",
        src: "https://img.shields.io/badge/REST%20API-FF6F00?style=for-the-badge",
      },
    ],
  },
  {
    title: "studio gear",
    subtitle: "technologies & tools",
    items: [
      {
        alt: "Microsoft Azure",
        src: "https://img.shields.io/badge/Microsoft%20Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white",
      },
      {
        alt: "AWS",
        src: "https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white",
      },
      {
        alt: "IBM",
        src: "https://img.shields.io/badge/IBM-054ADA?style=for-the-badge&logo=ibm&logoColor=white",
      },
      {
        alt: "Azure OpenAI",
        src: "https://img.shields.io/badge/Azure%20OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white",
      },
      {
        alt: "GCP",
        src: "https://img.shields.io/badge/GCP-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white",
      },
      {
        alt: "Snowflake",
        src: "https://img.shields.io/badge/Snowflake-29B5E8?style=for-the-badge&logo=snowflake&logoColor=white",
      },
      {
        alt: "SQL",
        src: "https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white",
      },
      {
        alt: "OpenClaw lobster",
        src: "https://img.shields.io/badge/OpenClaw-%F0%9F%A6%9E-7A4DFF?style=for-the-badge",
      },
      {
        alt: "MongoDB",
        src: "https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white",
      },
      {
        alt: "PostgreSQL",
        src: "https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white",
      },
      {
        alt: "Cosmos DB",
        src: "https://img.shields.io/badge/Cosmos%20DB-0089D6?style=for-the-badge&logo=azurecosmosdb&logoColor=white",
      },
      {
        alt: "Node.js",
        src: "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white",
      },
      {
        alt: "Nginx",
        src: "https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white",
      },
      {
        alt: "Docker",
        src: "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white",
      },
      {
        alt: "Kubernetes",
        src: "https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white",
      },
      {
        alt: "SLURM",
        src: "https://img.shields.io/badge/SLURM-1F2937?style=for-the-badge",
      },
      {
        alt: "NVIDIA GPUs",
        src: "https://img.shields.io/badge/NVIDIA%20GPUs-76B900?style=for-the-badge&logo=nvidia&logoColor=white",
      },
      {
        alt: "Git",
        src: "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white",
      },
      {
        alt: "ROS 2",
        src: "https://img.shields.io/badge/ROS%202-22314E?style=for-the-badge&logo=ros&logoColor=white",
      },
      {
        alt: "Arduino",
        src: "https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white",
      },
      {
        alt: "Jira",
        src: "https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white",
      },
      {
        alt: "BrowserStack",
        src: "https://img.shields.io/badge/BrowserStack-FF7A00?style=for-the-badge&logo=browserstack&logoColor=white",
      },
      {
        alt: "Selenium",
        src: "https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=selenium&logoColor=white",
      },
      {
        alt: "Appium",
        src: "https://img.shields.io/badge/Appium-662D91?style=for-the-badge&logo=appium&logoColor=white",
      },
      {
        alt: "Harness",
        src: "https://img.shields.io/badge/Harness-3C3C3C?style=for-the-badge",
      },
      {
        alt: "GitHub Copilot",
        src: "https://img.shields.io/badge/GitHub%20Copilot-000000?style=for-the-badge&logo=githubcopilot&logoColor=white",
      },
      {
        alt: "Adobe Analytics",
        src: "https://img.shields.io/badge/Adobe%20Analytics-FF0000?style=for-the-badge&logo=adobe&logoColor=white",
      },
      {
        alt: "Jenkins",
        src: "https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white",
      },
      {
        alt: "QMetry",
        src: "https://img.shields.io/badge/QMetry-1E90FF?style=for-the-badge",
      },
      {
        alt: "Figma",
        src: "https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white",
      },
      {
        alt: "PySpark",
        src: "https://img.shields.io/badge/PySpark-E25A1C?style=for-the-badge&logo=apachespark&logoColor=white",
      },
      {
        alt: "Power BI",
        src: "https://img.shields.io/badge/Power%20BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black",
      },
      {
        alt: "Tableau",
        src: "https://img.shields.io/badge/Tableau-E97627?style=for-the-badge&logo=tableau&logoColor=white",
      },
    ],
  },
];

function BadgeWall({ title, subtitle, items }) {
  return (
    <div className="flex flex-col gap-y-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h2 className="text-sm uppercase tracking-wider">{title}</h2>
        {subtitle && (
          <h3 className="text-xs uppercase tracking-[0.18em] text-white/45">
            {subtitle}
          </h3>
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-2 overflow-hidden">
        {items.map((item) => (
          <img
            key={item.alt}
            src={item.src}
            alt={item.alt}
            className="h-6 max-w-full w-auto rounded-sm md:h-7"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ))}
      </div>
    </div>
  );
}

const detailComponentByAlias = {
  "kintsugi-hearts-dream": KintsugiHeartsDreamDetail,
  "vt-cro": VTCRODetail,
  "deloitte-data-competition": DeloitteDataCompetitionDetail,
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
            {!data.hideHero && (
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
            )}

            <h2 className="w-full text-2xl">{data.title}</h2>

            {!!data.links?.length && (
              <div className="flex w-full flex-row flex-wrap items-center gap-2">
                {data.linksLabel && (
                  <div className="mr-1 text-sm text-white/70">
                    {data.linksLabel}
                  </div>
                )}
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

            {!!data.highlightText && (
              <div className="w-full rounded-lg border border-white/10 bg-dark-purple-300/30 px-4 py-3 text-base font-medium leading-8 text-white">
                {data.highlightText}
              </div>
            )}

            {data.descriptionFirst && !!data.longDescription && (
              <div className="w-full font-thin">{data.longDescription}</div>
            )}

            {DetailComponent && data.detailFirst && <DetailComponent />}

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

            {!data.descriptionFirst && !!data.longDescription && (
              <div className="w-full font-thin">{data.longDescription}</div>
            )}

            {DetailComponent && !data.detailFirst && <DetailComponent />}

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
        <div className="flex flex-col gap-y-4 p-3 md:p-4">
          <div className="flex flex-col gap-y-1 pb-1">
            <h2 className="text-sm uppercase tracking-wider text-accent-text">
              music-coded tech stack
            </h2>
          </div>
          <div className="flex flex-col gap-y-4">
            {workExperienceBadges.map((section) => (
              <BadgeWall
                key={section.title}
                title={section.title}
                subtitle={section.subtitle}
                items={section.items}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-y-4">
        <MyLanguagesChart />
        <div className="flex flex-col gap-y-4 px-2 pb-2">
          <div className="rounded-xl border border-white/8 bg-white/[0.05] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <h2 className="text-[1.05rem] leading-8 text-white/95 md:text-[1.1rem]">
              I enjoy working with huge datasets, building AI products that
              drive business values.
            </h2>
          </div>
          <div className="rounded-xl border border-accent-text/20 bg-gradient-to-r from-accent-text/[0.08] via-white/[0.04] to-transparent px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <h2 className="text-[1.05rem] leading-8 text-accent-text md:text-[1.1rem]">
              Text me to collab and make an impact. Let&apos;s make a dent in
              the universise together!
            </h2>
          </div>
          {projectStackSections.map((section) => (
            <div
              className="flex flex-col gap-y-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
              key={section.title}
            >
              <h2 className="text-[0.95rem] uppercase tracking-[0.14em] text-white/90">
                {section.title}
              </h2>
              <p className="text-[0.98rem] leading-8 text-white/68">
                {section.items.join(", ")}.
              </p>
            </div>
          ))}
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
                          I love connecting the dots. I care deeply about the
                          future of AI, especially how it can bridge logic with
                          emotion and creativity.
                        </span>
                      </h2>
                      <h2>
                        <span className="bg-[#735B95] py-1">
                          As a TEDx speaker, I&apos;ve shared ideas on building AI
                          that feels more human, not just more powerful.
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
            <div
              className={`hidden w-1/3 shrink-0 flex-col gap-y-3 rounded-lg border-[0.05rem] border-white border-opacity-30 shadow-xl md:flex ${
                isWorkExperience
                  ? "self-start p-3"
                  : "h-[40rem] overflow-y-auto p-2"
              }`}
            >
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
