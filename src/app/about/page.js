import Link from "next/link";
import about from "@/data/about.json";

export default function About() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-x-10 gap-y-10 pb-10 md:flex-row-reverse md:pb-0">
      <div className="flex w-4/5 flex-col gap-y-4 font-ropaSans text-md font-bold text-white md:w-2/5 lg:w-1/3">
        <h2 className="opacity-70 text-accent-text">{about.name}</h2>

        {about.paragraphs.map((paragraph) => (
          <h2 key={paragraph}>{paragraph}</h2>
        ))}

        <Link
          href="/search?q=stephen-projects"
          className="flex w-full flex-row items-center justify-center rounded-md border border-[#DED7FC] p-4 transition-all duration-300 hover:bg-[#DED7FC] hover:text-dark-purple-100"
        >
          discover projects
        </Link>
      </div>

      <div className="flex items-center justify-start md:flex-col-reverse">
        <div
          className="h-6 w-28 bg-top bg-cover bg-no-repeat md:h-44 md:w-40"
          style={{ backgroundImage: 'url("signature.png")' }}
        />
        <div
          className="h-32 w-32 bg-cover bg-no-repeat md:h-48 md:w-48"
          style={{ backgroundImage: 'url("head-shot.png")' }}
        />
      </div>
    </div>
  );
}
