import Image from "next/image";
import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";

const levels = [
  {
    num: "01",
    title: "Building Strong Foundations",
    subtitle: "Level 1",
    audience: "Perfect for beginners",
    desc: "Start your AI journey here. Learn the fundamentals of prompt writing — how to talk to AI tools clearly, get better results, and build habits that save you time every day.",
    skills: ["Writing clear instructions", "Giving context", "Iterating on outputs", "Basic prompt structures"],
    videoLabel: "Watch Level 1",
    videoHref: "#", // Replace with Google Sites URL
    color: "cyan",
    textColor: "text-cyan-400",
    borderColor: "border-cyan-500/25",
    badgeBg: "bg-cyan-500/10",
    glowColor: "rgba(6,182,212,0.6)",
  },
  {
    num: "02",
    title: "Prompt Scholar",
    subtitle: "Level 2",
    audience: "Ready to go deeper",
    desc: "Take your skills to the next level. Explore advanced techniques — chain-of-thought prompting, personas, few-shot examples, and how to get consistently great results across different tools.",
    skills: ["Chain-of-thought prompting", "Persona & role prompts", "Few-shot examples", "Cross-tool techniques"],
    videoLabel: "Watch Level 2",
    videoHref: "#", // Replace with Google Sites URL
    color: "violet",
    textColor: "text-violet-400",
    borderColor: "border-violet-500/25",
    badgeBg: "bg-violet-500/10",
    glowColor: "rgba(139,92,246,0.6)",
  },
];

export default function TrainingPage() {
  return (
    <div className="min-h-dvh flex flex-col" style={{ background: "#0A071A" }}>

      {/* Background grid + glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(6,182,212,0.2) 0%, rgba(84,46,145,0.25) 40%, transparent 70%), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M60 0v60M0 60h60' stroke='rgba(139,92,246,0.05)' stroke-width='1'/%3E%3C/svg%3E\")",
        }} />
      </div>

      <TopNav />

      {/* Hero */}
      <div className="relative z-10 pt-28 pb-6 px-4 text-center">

        {/* Prompty */}
        <div className="flex justify-center mb-2">
          <Image
            src="/promty.png"
            alt="Prompty"
            width={240}
            height={240}
            className="w-48 h-48 object-contain"
            style={{ mixBlendMode: "screen" }}
            priority
          />
        </div>

        {/* Badge */}
        <div className="inline-block text-xs font-black tracking-[0.18em] uppercase px-4 py-1.5 rounded mb-5"
          style={{ color: "#22D3EE", border: "1px solid rgba(6,182,212,0.4)", background: "rgba(6,182,212,0.1)" }}>
          Holiday Extras · AI Training
        </div>

        <h1 className="font-black leading-none tracking-tight mb-4"
          style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", letterSpacing: "-2px" }}>
          <span style={{ background: "linear-gradient(160deg, #ffffff 0%, #a5f3fc 50%, #22D3EE 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Prompt
          </span>
          <br />
          <span style={{ color: "#A78BFA" }}>Excellence.</span>
        </h1>

        <p className="text-lg font-semibold max-w-lg mx-auto" style={{ color: "rgba(240,238,255,0.45)" }}>
          Learn to get the best out of AI — two levels, real skills, built for HXers.
        </p>
      </div>

      {/* Divider */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 my-8">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), rgba(139,92,246,0.4), transparent)" }} />
      </div>

      {/* Level cards */}
      <div className="relative z-10 max-w-3xl mx-auto w-full px-4 pb-16">
        <p className="text-center text-xs font-black tracking-[0.2em] uppercase mb-8" style={{ color: "#22D3EE" }}>
          Choose your level
        </p>

        <div className="flex flex-col gap-5">
          {levels.map((level) => (
            <div
              key={level.num}
              className={`group relative rounded-xl p-6 border overflow-hidden ${level.borderColor}`}
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {/* Top glow line */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${level.glowColor}, transparent)` }} />

              <div className="flex flex-col md:flex-row md:items-start gap-5">

                {/* Left: content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-black tracking-wider" style={{ color: "rgba(255,255,255,0.2)" }}>{level.num}</span>
                    <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded border ${level.badgeBg} ${level.textColor}`}
                      style={{ borderColor: level.glowColor.replace("0.6", "0.25") }}>
                      {level.subtitle}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>{level.audience}</span>
                  </div>

                  <h2 className="text-white font-black text-2xl leading-tight tracking-tight mb-3">{level.title}</h2>
                  <p className="text-sm font-semibold leading-relaxed mb-4" style={{ color: "rgba(240,238,255,0.45)" }}>{level.desc}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {level.skills.map((skill) => (
                      <span key={skill} className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="flex md:flex-col items-center justify-center md:justify-start gap-3 md:pt-8 shrink-0">
                  <Link
                    href={level.videoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-black text-sm transition-all hover:scale-105 ${level.textColor}`}
                    style={{ background: level.glowColor.replace("0.6", "0.15"), border: `1px solid ${level.glowColor.replace("0.6", "0.35")}` }}
                  >
                    ▶ {level.videoLabel}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back link */}
      <div className="relative z-10 text-center pb-8">
        <Link href="/" className="text-sm font-semibold transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>
          ← Back to HX AI Hub
        </Link>
      </div>

      <Footer />
    </div>
  );
}
