import Link from "next/link";
export default function About() {
  return (
    <div className=" flex flex-col w-full md:flex-row-reverse h-full items-center gap-x-10 gap-y-10 justify-center pb-10 md:pb-0">
      <div className="flex flex-col font-ropaSans w-4/5 md:w-2/5 lg:w-1/3 font-bold text-md text-white gap-y-4">
        <h2 className="text-accent-text opacity-70">Stephen Nguyen</h2>
        <h2>
        I’ve always dreamed of being an AI Musician, using AI to create and redefine music. I strive to push the boundaries of creativity and bring new sounds to life.
        </h2>

        <h2>
          I'm advanced in{" "}
          <span className="text-[#DED7FC] italic ">
            Python with good experiences in Artificial Intelligence, Deep Learning and
            Business Analytics
          </span>{" "}
          as well as Project Management.
        </h2>

        <h2>
          I am an incomming Quality Engineering Intern at{" "}
          <span className="text-[#DED7FC] hover:opacity-70  transform transition-all duration-300">
            <Link href={"https://www.marriott.com/"} target={"_blank"}>
              Marriott International
            </Link>
          </span>{" "}
          , a multinational company that owns over 30 hotel and timeshare brands with 8,785 locations and 1,597,380 rooms across its network.
          At VT, I am a junior majoring in Computational Modeling and Data Analytics. I am also a student researcher at LLMs Lab 
          , and engineer at Hybrid Electric Vehicle Team (30-year-old team)
          . This year I’m creating this portfolio website to replicate Google Chrome Browser, since I was inspired by a Faculty Reseacher at Gemini and a Google Developer Expert, who I worked with.{" "}
          <span>
            <Link
              className="inline-flex items-center hover:underline hover:opacity-70 text-[#DED7FC] transform transition-all duration-300 gap-x-1"
              href="/search?q=stephen-projects&p=MUSAIC"
            >
              MUSAIC
              <div
                className="bg-no-repeat bg-cover w-4 h-4"
                style={{ backgroundImage: `url("icons/link.svg")` }}
              />
            </Link>
          </span>
        </h2>

        <h2>
        ... I approach life like a game of chess, always seeking bold moves and daring sacrifices to test my skills in the unknown.
        </h2>

        <Link
          href="/search?q=stephen-projects"
          className="border border-[#DED7FC] flex flex-row w-full items-center justify-center rounded-md p-4 hover:bg-[#DED7FC] hover:text-dark-purple-100 transform transition-all duration-300"
        >
          discover my projects
        </Link>
      </div>
      <div className="flex md:flex-col-reverse items-center justify-start">
        <div
          className="bg-no-repeat bg-cover w-28 h-6 md:w-40 md:h-44 bg-top"
          style={{ backgroundImage: `url("signature.png")` }}
        />
        <div
          className="bg-no-repeat bg-cover w-32 h-32 md:w-48 md:h-48"
          style={{ backgroundImage: `url("head-shot.png")` }}
        />
      </div>
    </div>
  );
}
