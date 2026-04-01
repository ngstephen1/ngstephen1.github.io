export default function VTCRODetail() {
  const sections = [
    {
      title: "Mission",
      body: "Improve the presence of robotics at Virginia Tech and surrounding communities.",
    },
    {
      title: "What we are",
      body: "We are Virginia Tech's premier engineering team, with six design teams working on varied projects and four support teams across three labs.",
    },
    {
      title: "We believe in small, dedicated teams.",
      body: "Even though we are Virginia Tech's largest design team, we believe in small, tight-knit design teams of 8-12 motivated and talented engineers.",
    },
  ];

  return (
    <div className="w-full space-y-4">
      {sections.map((section) => (
        <section
          key={section.title}
          className="rounded-lg border border-white/10 bg-dark-purple-300/25 px-4 py-3"
        >
          <h3 className="text-lg font-semibold text-white">{section.title}</h3>
          <p className="mt-2 text-base font-thin leading-8 text-white/85">
            {section.body}
          </p>
        </section>
      ))}
    </div>
  );
}
