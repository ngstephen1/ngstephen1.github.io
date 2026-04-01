const languageData = [
  {
    label: "Python",
    color: "#74C3F5",
    badgeSrc:
      "https://img.shields.io/badge/-3776AB?style=flat-square&logo=python&logoColor=white",
  },
  {
    label: "Java",
    color: "#EF8A17",
    badgeSrc:
      "https://img.shields.io/badge/-007396?style=flat-square&logo=openjdk&logoColor=white",
  },
  {
    label: "R",
    color: "#5B8BD9",
    badgeSrc:
      "https://img.shields.io/badge/-276DC3?style=flat-square&logo=r&logoColor=white",
  },
  {
    label: "CUDA",
    color: "#89C20B",
    badgeSrc:
      "https://img.shields.io/badge/-76B900?style=flat-square&logo=nvidia&logoColor=white",
  },
  {
    label: "Go",
    color: "#4BE3A7",
    badgeSrc:
      "https://img.shields.io/badge/-00ADD8?style=flat-square&logo=go&logoColor=white",
  },
  {
    label: "TypeScript",
    color: "#5B7BFF",
    badgeSrc:
      "https://img.shields.io/badge/-3178C6?style=flat-square&logo=typescript&logoColor=white",
  },
  {
    label: "C++",
    color: "#5D9CFF",
    badgeSrc:
      "https://img.shields.io/badge/-00599C?style=flat-square&logo=c%2B%2B&logoColor=white",
  },
  {
    label: "Rust",
    color: "#D7D0CF",
    badgeSrc:
      "https://img.shields.io/badge/-000000?style=flat-square&logo=rust&logoColor=white",
  },
  {
    label: "Bash",
    color: "#6CC24A",
    badgeSrc:
      "https://img.shields.io/badge/-4EAA25?style=flat-square&logo=gnubash&logoColor=white",
  },
];

export default function MyLanguagesChart() {
  return (
    <div className="rounded-t-lg bg-[#262626] p-5 text-white">
      <h2 className="mb-5 text-center text-2xl font-semibold">
        Most Used Languages
      </h2>
      <div className="grid grid-cols-1 gap-2">
        {languageData.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 py-2"
          >
            <div className="flex items-center gap-x-3">
              <img
                src={item.badgeSrc}
                alt={`${item.label} logo`}
                className="h-5 w-auto rounded-sm"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <h3 className="text-sm font-medium text-white/90">{item.label}</h3>
            </div>
            <div
              className="text-sm tracking-[0.18em]"
              style={{
                color: item.color,
                textShadow: `0 0 14px ${item.color}33`,
              }}
            >
              ★★★★★
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
