import Image from "next/image";
import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";

const level1Parts = [
  {
    num: "Part 1",
    title: "What is AI & How to Prompt",
    embedId: "1KyW4XbmvBxCp5MSaib0401inndsBI3fH",
    skills: ["What AI actually is", "Writing your first prompt", "Data security basics", "Summarise, transform & create"],
  },
  {
    num: "Part 2",
    title: "Clarity, Context & Conciseness",
    embedId: "1ju-nuph4K6gyEe41W3wxgPC2yUsG9K6j",
    skills: ["Being specific & unambiguous", "Adding background context", "Managing output length", "Keeping prompts focused"],
  },
  {
    num: "Part 3",
    title: "Tips for Better Results",
    embedId: "1ceLHvPTaVBHwyMnl7waiXr4bpQbzhd9V",
    skills: ["Providing examples", "Referencing source material", "Breaking tasks into steps", "Iterative clarification"],
  },
];

const level2 = {
  title: "Prompt Scholar",
  embedId: "1tHNUoljy-UqW47kGNMzKYwXkNIL67iIq",
  skills: ["CO-STAR framework", "Chain-of-thought prompting", "Temperature & creativity", "Context & memory management"],
};

function VideoEmbed({ id, color }: { id: string; color: string }) {
  return (
    <div className="relative w-full rounded-lg overflow-hidden mt-4" style={{ paddingTop: "56.25%", border: `1px solid ${color}` }}>
      <iframe
        src={`https://drive.google.com/file/d/${id}/preview`}
        className="absolute inset-0 w-full h-full"
        allow="autoplay"
        style={{ border: 0 }}
      />
    </div>
  );
}

export default function TrainingPage() {
  return (
    <div className="min-h-dvh flex flex-col" style={{ background: "#0A071A" }}>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(6,182,212,0.2) 0%, rgba(84,46,145,0.25) 40%, transparent 70%), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M60 0v60M0 60h60' stroke='rgba(139,92,246,0.05)' stroke-width='1'/%3E%3C/svg%3E\")",
        }} />
      </div>

      <TopNav />

      {/* Hero */}
      <div className="relative z-10 pt-28 pb-6 px-4 text-center">
        <div className="flex justify-center mb-2">
          <Image src="/promty.png" alt="Prompty" width={240} height={240}
            className="w-44 h-44 object-contain" style={{ mixBlendMode: "screen" }} priority />
        </div>
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
          Getting the best out of AI starts with how you prompt it. Two levels, real skills, built for HXers.
        </p>
      </div>

      {/* Divider */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 my-8">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), rgba(139,92,246,0.4), transparent)" }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto w-full px-4 pb-16 flex flex-col gap-10">

        {/* Level 1 */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-black tracking-wider" style={{ color: "rgba(255,255,255,0.2)" }}>01</span>
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded border text-cyan-400 bg-cyan-500/10"
              style={{ borderColor: "rgba(6,182,212,0.25)" }}>Level 1</span>
            <span className="text-sm font-black text-white">Building Strong Foundations</span>
            <span className="text-xs font-semibold ml-auto" style={{ color: "rgba(255,255,255,0.3)" }}>For beginners</span>
          </div>

          <div className="flex flex-col gap-8">
            {level1Parts.map((part, i) => (
              <div key={i} className="relative rounded-xl p-5 border border-cyan-500/20 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="absolute top-0 left-[10%] right-[10%] h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)" }} />

                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-cyan-400/60 uppercase tracking-widest">{part.num}</span>
                </div>
                <h3 className="text-white font-black text-lg mb-3">{part.title}</h3>
                <div className="flex flex-wrap gap-2 mb-1">
                  {part.skills.map((skill) => (
                    <span key={skill} className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {skill}
                    </span>
                  ))}
                </div>
                <VideoEmbed id={part.embedId} color="rgba(6,182,212,0.2)" />
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)" }} />

        {/* Level 2 */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-black tracking-wider" style={{ color: "rgba(255,255,255,0.2)" }}>02</span>
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded border text-violet-400 bg-violet-500/10"
              style={{ borderColor: "rgba(139,92,246,0.25)" }}>Level 2</span>
            <span className="text-sm font-black text-white">Prompt Scholar</span>
            <span className="text-xs font-semibold ml-auto" style={{ color: "rgba(255,255,255,0.3)" }}>Ready to go deeper</span>
          </div>

          <div className="relative rounded-xl p-5 border border-violet-500/20 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="absolute top-0 left-[10%] right-[10%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }} />

            <h3 className="text-white font-black text-lg mb-3">{level2.title}</h3>
            <div className="flex flex-wrap gap-2 mb-1">
              {level2.skills.map((skill) => (
                <span key={skill} className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {skill}
                </span>
              ))}
            </div>
            <VideoEmbed id={level2.embedId} color="rgba(139,92,246,0.2)" />
          </div>
        </div>

      </div>

      <div className="relative z-10 text-center pb-8">
        <Link href="/" className="text-sm font-semibold transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>
          ← Back to HX AI Hub
        </Link>
      </div>

      <Footer />
    </div>
  );
}
