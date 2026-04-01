import Link from "next/link";
import about from "@/data/about.json";

export default function About() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-x-10 gap-y-10 pb-10 md:flex-row-reverse md:pb-0">
      <div className="flex w-4/5 flex-col gap-y-5 font-ropaSans text-white md:w-2/5 lg:w-1/3">
        <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-accent-text opacity-80">
          {about.name}
        </h2>

        {about.paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={`${
              index === 0
                ? "text-[1.45rem] font-bold leading-[1.45]"
                : "text-[1.08rem] font-medium leading-[1.75] text-white text-opacity-90"
            }`}
          >
            {paragraph}
          </p>
        ))}

        <div className="flex w-full flex-col gap-y-3 pt-2">
          <h3 className="text-sm uppercase tracking-[0.2em] text-accent-text opacity-80">
            discover
          </h3>
          <div className="grid w-full gap-3 md:grid-cols-3">
            <Link
              href="/search?q=stephen-projects"
              className="flex min-h-14 items-center justify-center rounded-md border border-[#DED7FC] bg-white bg-opacity-0 px-4 py-3 text-center capitalize transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DED7FC] hover:text-dark-purple-100"
            >
              projects
            </Link>
            <Link
              href="/search?q=work-experience"
              className="flex min-h-14 items-center justify-center rounded-md border border-[#DED7FC] bg-white bg-opacity-0 px-4 py-3 text-center capitalize transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DED7FC] hover:text-dark-purple-100"
            >
              work
            </Link>
            <Link
              href="/search?q=life"
              className="flex min-h-14 items-center justify-center rounded-md border border-[#DED7FC] bg-white bg-opacity-0 px-4 py-3 text-center capitalize transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DED7FC] hover:text-dark-purple-100"
            >
              life
            </Link>
          </div>
        </div>
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
