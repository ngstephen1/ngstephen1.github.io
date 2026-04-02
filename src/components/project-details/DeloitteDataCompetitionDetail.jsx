const demoScript = [
  "Now everyone, have you ever heard of the word OpenClaw?",
  "That's good, let me tell you something.",
  "OpenClaw is a new wave of AI agents that live in your system and take actions for you.",
  "The CEO of NVIDIA just said this week that every company needs an OpenClaw strategy. So what about our strategy?",
  "We wanted to save you time and money.",
  "That's why we made Pi-rates Pipeline. We envision the solution to be the ChatGPT moment of fraud detection. Just upload your data and, within one click, our product solves your problem right away and knows what you need before you even ask.",
  "We integrated OpenClaw into the system with 24/7 multi-agent support. We don't just use AI to chat. AI agents can now take actions on your behalf so you can prioritize more meaningful tasks. OpenClaw is always on, so if you have 1000 fraud cases in the middle of the night and not enough human resources, OpenClaw will be there for you and get better over time.",
  "To start, users can upload banking data and images. Our system includes anomaly detection powered by advanced algorithms, followed by connected risk analysis to understand repeated suspicious activity. Is this account connected to too many suspicious IP addresses? After that, we score each risk, rank risky factors and accounts, then send the results to both an LLM and a human reviewer to refine rankings and approve decisions.",
  "All fraud results detected are automatically alerted across chat channels including Teams, email, iMessage, and Discord.",
  "Ask whatever you need there and get real-time output.",
  "Data is secured on the Amazon ecosystem, making it strong for scalable products.",
];

export default function DeloitteDataCompetitionDetail() {
  return (
    <div className="w-full space-y-4">
      <section className="rounded-lg border border-white/10 bg-dark-purple-300/25 px-4 py-4">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-search-blue/80">
          Demo Script
        </div>
        <div className="mt-3 space-y-3">
          {demoScript.map((line, index) => (
            <p
              key={index}
              className="text-base font-thin leading-8 text-white/85"
            >
              {line}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
