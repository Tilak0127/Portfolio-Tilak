import { projectsData } from "../portfolioData";
import { Github, ExternalLink, Sparkles, Compass, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function ProjectsShowcase() {
  return (
    <div className="w-full">
      {/* Header and counter details */}
      <div className="flex items-center justify-between px-2 mb-6">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Architectural Registries</span>
        <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider bg-brand-gold/10 px-2.5 py-0.5 rounded border border-brand-gold/15">
          {projectsData.length} Systems Fully Elaborated
        </span>
      </div>

      {/* Grid Layout: Exactly 2 projects per line on tablet/desktop, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {projectsData.map((project, index) => {
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group relative flex flex-col justify-between h-full bg-[#19191B]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 hover:border-brand-gold/30 hover:shadow-[0_15px_45px_rgba(216,194,138,0.05)] transition-all duration-500 cursor-pointer"
              onClick={() => {
                window.open(project.links?.demo, "_blank", "noopener,noreferrer");
              }}
              title="Click to view live project"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />

              {/* Animated Top border glow bar */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-400 via-brand-gold to-amber-500 transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left" />

              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Header Row: Title, External Link Icon, and Live Status Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                    <div>
                      <span className="text-[8.5px] font-mono text-brand-gold uppercase tracking-[0.25em] block mb-1">
                        System Registry [{index + 1}]
                      </span>
                      <h3 className="text-xl font-serif font-black text-white flex items-center gap-2.5 group-hover:text-brand-gold transition-colors duration-300">
                        {project.title}
                        <ExternalLink size={15} className="text-zinc-500 group-hover:text-brand-gold transition-colors duration-300 shrink-0" />
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mt-1">
                        {project.tagline}
                      </p>
                    </div>

                    {project.isLive && (
                      <span className="self-start inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8.5px] font-mono rounded-full font-black tracking-widest uppercase shadow-[0_2px_10px_rgba(16,185,129,0.08)] shrink-0">
                        <span className="w-1.2 h-1.2 rounded-full bg-emerald-400 animate-pulse" />
                        ONLINE
                      </span>
                    )}
                  </div>

                  {/* Core Description */}
                  <div className="mb-5">
                    <h5 className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Architectural Summary</h5>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Capabilities */}
                  {project.features && project.features.length > 0 && (
                    <div className="mb-5">
                      <h5 className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2.5">Key Capabilities</h5>
                      <div className="flex flex-col gap-2">
                        {project.features.slice(0, 3).map((feature, i) => (
                          <div key={i} className="flex gap-2 items-start">
                            <CheckCircle2 size={12} className="text-brand-gold shrink-0 mt-0.5" />
                            <span className="text-[11px] text-zinc-400 leading-snug font-sans">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {/* Integrated Technologies */}
                  <div className="mb-6 pt-4 border-t border-white/5">
                    <h5 className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2.5">Integrated Technologies</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[8.5px] font-mono text-zinc-300 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-md hover:border-brand-gold/30 hover:text-white transition-all duration-300 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Action Hub */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    {/* Live Launch button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent calling parent handler
                        window.open(project.links?.demo, "_blank", "noopener,noreferrer");
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-brand-gold text-neutral-950 font-mono font-bold text-[9.5px] tracking-wider rounded-lg uppercase shadow-[0_4px_20px_rgba(216,194,138,0.12)] transition-transform duration-300 hover:scale-[1.01] hover:bg-amber-400 cursor-pointer"
                    >
                      Launch Live Project
                      <Sparkles size={11} className="shrink-0" />
                    </button>

                    {/* GitHub Repo button */}
                    {project.links?.github && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // prevent calling parent handler
                          window.open(project.links?.github, "_blank", "noopener,noreferrer");
                        }}
                        className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-900 border border-white/10 hover:border-brand-gold/30 hover:bg-neutral-800 text-zinc-300 hover:text-white rounded-lg transition-all duration-300 cursor-pointer font-mono font-bold text-[9.5px] uppercase tracking-wider shrink-0"
                      >
                        <Github size={13} className="shrink-0" />
                        Code
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tip for global exploration */}
      <div className="mt-8 p-4 bg-zinc-950/20 rounded-xl border border-white/5 flex gap-2.5 items-center justify-center max-w-xl mx-auto">
        <Compass size={14} className="text-zinc-500 animate-spin" style={{ animationDuration: '10s' }} />
        <p className="text-[10px] font-mono text-zinc-400 text-center leading-snug">
          Tip: Click on <span className="text-white">Launch Live Project</span> or click any card block to interact with the production system.
        </p>
      </div>
    </div>
  );
}
