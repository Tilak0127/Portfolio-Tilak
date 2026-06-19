import React from "react";
import { 
  Database, 
  Cpu, 
  BarChart3, 
  Lightbulb,
  Sparkles,
  Layers,
  Settings,
  Terminal,
  Grid
} from "lucide-react";
import { motion } from "motion/react";

export default function BentoAbout() {
  const skillsList = [
    {
      title: "DATA ANALYTICS",
      desc: "STATISTICAL VALIDATION, POWER BI INSIGHTS, AND KPI DASHBOARDING PROJECTS.",
      icon: <BarChart3 className="text-brand-gold" size={18} />
    },
    {
      title: "MACHINE LEARNING",
      desc: "PREDICTIVE SYSTEMS, MODEL EVALUATION, AND PRACTICAL REGRESSION SETUPS DESIGNED.",
      icon: <Cpu className="text-brand-gold-secondary" size={18} />
    },
    {
      title: "BIG DATA",
      desc: "DATA MINING WORKFLOWS, DATABASE MANIPULATION, AND LARGE INGESTION FLOWS.",
      icon: <Database className="text-brand-gold" size={18} />
    },
    {
      title: "BUSINESS INTELLIGENCE",
      desc: "NPTEL BI MASTER CERTIFICATE, CASE PROBLEMS, AND CORPORATION DASHBOARDS.",
      icon: <Layers className="text-brand-gold-secondary" size={18} />
    },
    {
      title: "PYTHON SYSTEMS",
      desc: "AUTOMATED EXTRACTION, COMPACT SCRIPTS, AND ROBUST ALGORITHMIC STRUCTURES.",
      icon: <Terminal className="text-brand-gold" size={18} />
    },
    {
      title: "CLOUD & DATABASES",
      desc: "MYSQL DATA REPOSITORIES, SQL METRIC AGGREGATION, AND HYBRID CLEAN PIPELINES.",
      icon: <Settings className="text-brand-gold-secondary" size={18} />
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full pt-8 items-stretch">
      {/* Left Column: Core Philosophy Card (Col Span 5) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-6 bg-zinc-950/50 border-2 border-brand-gold/30 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-[0_0_40px_rgba(216,194,138,0.05)] hover:shadow-[0_0_40px_rgba(216,194,138,0.12)] transition-shadow duration-500"
      >
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/5 via-transparent to-transparent pointer-events-none" />

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-gold font-bold">☉ CORE PHILOSOPHY</span>
          </div>

          <h3 className="text-xl md:text-2xl font-serif font-black text-white tracking-widest uppercase leading-snug">
            ANALYTICS AT THE INTERSECTION OF <span className="text-brand-gold">DATA PIPELINES</span> & ACTIONABLE BUSINESS INTELLIGENCE
          </h3>

          <div className="space-y-4 text-xs tracking-wider text-zinc-300 font-sans leading-relaxed uppercase">
            <p>
              I AM A DATA ANALYST ACADEMICALLY ROOTED IN ANIL NEERUKONDA INSTITUTE OF TECHNOLOGY & SCIENCES (ANITS), BUILT AROUND DEEP INTEGRATIONS OF DETAILED PYTHON METRICS AND ROBUST SQL COMPLIANCE. I SPECIALIZE IN PIPELINES, STRUCTURAL SCHEMAS, AND ENGAGING CORPORATE SOLUTIONS WITH EXCELLENCE.
            </p>
            <p>
              I ACTIVELY ENGAGE IN NATIONAL SIMULATIONS, TECHNICAL RESEARCH CIRCLES, AND PRACTICAL CASE STUDIES. CONTINUOUS EVOLUTION OF MY EXPERTISE IN BIG DATA ARCHITECTURES AND ADVANCED BI VISUALIZATION FORMS MY PRIMARY LONG-TERM OBJECTIVE.
            </p>
          </div>
        </div>

        {/* Metrics Footer with gold division */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-around">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-mono font-black text-brand-gold">8.28</p>
            <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mt-1 font-bold">B.TECH CGPA</p>
          </div>
          
          <div className="h-10 w-[1px] bg-brand-gold/30" />

          <div className="text-center">
            <p className="text-3xl md:text-4xl font-mono font-black text-white">5+</p>
            <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mt-1 font-bold">CORE PROJECTS</p>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Grid of 6 Competencies (Col Span 7) */}
      <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillsList.map((skill, index) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="bg-zinc-950/40 border border-brand-gold/20 rounded-2xl p-6 hover:border-brand-gold/50 hover:shadow-[0_0_20px_rgba(216,194,138,0.06)] transition-all duration-300 relative group flex flex-col justify-between"
          >
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                {skill.icon}
                <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                  {skill.title}
                </h4>
              </div>
              
              <p className="text-[10px] sm:text-xs text-zinc-400 leading-relaxed tracking-wider font-sans uppercase">
                {skill.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
