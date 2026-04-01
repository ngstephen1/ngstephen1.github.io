const languageData = [
  { label: "Python", value: 94, color: "#74C3F5" },
  { label: "TypeScript", value: 56, color: "#E8E4E4" },
  { label: "Java", value: 48, color: "#EF8A17" },
  { label: "SQL", value: 44, color: "#F7D657" },
  { label: "CUDA", value: 32, color: "#8E2DE2" },
  { label: "Swift", value: 24, color: "#F04D37" },
  { label: "Go", value: 18, color: "#4BE3A7" },
];

export default function MyLanguagesChart() {
  return (
    <div className="rounded-t-lg bg-[#262626] p-6 text-white">
      <h2 className="mb-5 text-center text-2xl font-semibold">
        Most Used Languages
      </h2>
      <div className="flex flex-col gap-y-3">
        {languageData.map((item) => (
          <div key={item.label} className="flex items-center gap-x-4">
            <h3 className="w-20 text-right text-sm font-medium">{item.label}</h3>
            <div className="h-6 flex-1 overflow-hidden rounded-sm border border-[#5A5A5A]">
              <div
                className="h-full"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
            <h3 className="w-10 text-xs">{item.value}%</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
