import Image from "next/image";
import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";
import { SECTIONS } from "@/lib/constants";

const sectionMeta: Record<string, { num: string; desc: string; footerLabel: string; textColor: string; borderColor: string; badgeBg: string; glowColor: string }> = {
  athx:   { num: "01", desc: "Stories, wins and experiments from across the business. See how HXers are using AI every day.",   footerLabel: "Latest stories",  textColor: "text-violet-400",  borderColor: "border-violet-500/25",  badgeBg: "bg-violet-500/12",  glowColor: "rgba(139,92,246,0.6)" },
  tools:  { num: "02", desc: "Every AI tool available to you at Holiday Extras — filterable by what you need it to do.",        footerLabel: "Browse tools",    textColor: "text-emerald-400", borderColor: "border-emerald-500/25", badgeBg: "bg-emerald-500/12", glowColor: "rgba(16,185,129,0.6)" },
  news:   { num: "03", desc: "The latest from the world of AI, curated for HXers. No noise, just what matters.",               footerLabel: "Read the news",   textColor: "text-blue-400",    borderColor: "border-blue-500/25",    badgeBg: "bg-blue-500/12",    glowColor: "rgba(59,130,246,0.6)" },
  models: { num: "04", desc: "New AI models — what they do, how they compare, and what they mean for us at HX.",              footerLabel: "See releases",    textColor: "text-amber-400",   borderColor: "border-amber-500/25",   badgeBg: "bg-amber-500/12",   glowColor: "rgba(245,158,11,0.6)" },
};

export default function Home() {
  const sections = Object.values(SECTIONS);

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: "#0A071A" }}>

      {/* Background grid + glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(84,46,145,0.35) 0%, transparent 70%), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M60 0v60M0 60h60' stroke='rgba(139,92,246,0.05)' stroke-width='1'/%3E%3C/svg%3E\")",
        }} />
      </div>

      <TopNav />

      {/* Hero image */}
      <div className="relative z-10 pt-28">
        <Image
          src="/hassle-away-hero.png"
          alt="HX AI Hub"
          width={1536}
          height={1024}
          className="w-full"
          priority
          style={{
            height: "62vh",
            objectFit: "cover",
            objectPosition: "center 35%",
            maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
          }}
        />
      </div>

      {/* Cover title */}
      <div className="relative z-10 text-center px-4 -mt-20 pb-4">
        <div className="inline-block text-xs font-black tracking-[0.18em] uppercase px-4 py-1.5 rounded mb-5"
          style={{ color: "#8B5CF6", border: "1px solid rgba(139,92,246,0.4)", background: "rgba(139,92,246,0.1)" }}>
          Holiday Extras · Internal AI Hub
        </div>
        <h1 className="font-black leading-none tracking-tight mb-5"
          style={{ fontSize: "clamp(3rem, 10vw, 6.5rem)", letterSpacing: "-3px" }}>
          <span style={{ background: "linear-gradient(160deg, #ffffff 0%, #d4bbff 50%, #8B5CF6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Less Hassle.
          </span>
          <br />
          <span style={{ color: "#A78BFA" }}>More AI.</span>
        </h1>
        <p className="text-lg font-semibold max-w-lg mx-auto" style={{ color: "rgba(240,238,255,0.45)" }}>
          Remove the friction. Turn ideas into reality faster. Your one-stop-shop for AI at Holiday Extras.
        </p>
      </div>

      {/* Divider */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 my-10">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }} />
      </div>

      {/* Section cards */}
      <div className="relative z-10 max-w-3xl mx-auto w-full px-4 pb-16">
        <p className="text-center text-xs font-black tracking-[0.2em] uppercase mb-8" style={{ color: "#8B5CF6" }}>
          Explore the hub
        </p>
        <div className="grid grid-cols-2 gap-5">
          {sections.map((section) => {
            const meta = sectionMeta[section.color] ?? sectionMeta.news;
            return (
              <Link
                key={section.slug}
                href={`/${section.slug}`}
                className={`group relative flex flex-col gap-3 rounded-xl p-6 border transition-all duration-200 hover:-translate-y-1 overflow-hidden ${meta.borderColor}`}
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                {/* Top glow line on hover */}
                <div className="absolute top-0 left-[10%] right-[10%] h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${meta.glowColor}, transparent)` }} />

                <span className="text-xs font-black tracking-wider" style={{ color: "rgba(255,255,255,0.2)" }}>{meta.num}</span>

                <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded w-fit border ${meta.badgeBg} ${meta.textColor}`}
                  style={{ borderColor: meta.glowColor.replace("0.6", "0.25") }}>
                  {section.label}
                </span>

                <h3 className="text-white font-black text-xl leading-tight tracking-tight">{section.label}</h3>
                <p className="text-sm font-semibold leading-relaxed" style={{ color: "rgba(240,238,255,0.45)" }}>{meta.desc}</p>

                <div className="mt-auto pt-4 flex items-center justify-between border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>{meta.footerLabel}</span>
                  <span className={`w-7 h-7 rounded-md border flex items-center justify-center text-sm transition-all group-hover:border-violet-500 group-hover:text-violet-400 ${meta.textColor}`}
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}>→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Prompt Excellence tile */}
        <Link
          href="/training"
          className="group relative flex items-center gap-5 rounded-xl p-6 border border-cyan-500/25 mt-5 transition-all duration-200 hover:-translate-y-1 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div className="absolute top-0 left-[10%] right-[10%] h-px opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.6), transparent)" }} />

          {/* Prompty icon */}
          <div className="shrink-0 w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden"
            style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)" }}>
            <img src="/promty.png" alt="Prompty" className="w-14 h-14 object-contain" style={{ mixBlendMode: "screen" }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded border text-cyan-400 bg-cyan-500/10"
                style={{ borderColor: "rgba(6,182,212,0.25)" }}>
                Prompt Excellence
              </span>
              <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>Training</span>
            </div>
            <p className="text-sm font-semibold leading-relaxed" style={{ color: "rgba(240,238,255,0.45)" }}>
              Learn to write better prompts — two levels, real skills, built for HXers.
            </p>
          </div>

          <span className="shrink-0 w-7 h-7 rounded-md border flex items-center justify-center text-sm text-cyan-400 transition-all group-hover:border-cyan-500"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}>→</span>
        </Link>
      </div>

    </div>
  );
}
