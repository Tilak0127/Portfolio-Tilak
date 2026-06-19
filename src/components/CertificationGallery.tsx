import { useState } from "react";
import { certificationsData } from "../portfolioData";
import { Award, ExternalLink, ShieldCheck, CheckCircle, FileText } from "lucide-react";
import { motion } from "motion/react";

export default function CertificationGallery() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters = ["All", "NPTEL", "Infosys Springboard", "Job Simulation"];

  const filteredCerts = certificationsData.filter((cert) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Job Simulation") {
      return cert.issuer.includes("Deloitte") || cert.issuer.includes("BCG") || cert.issuer.includes("Forage");
    }
    return cert.issuer.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            id={`filter-cert-${filter.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-xs font-display tracking-wider uppercase transition-all duration-300 border rounded-full cursor-pointer ${
              activeFilter === filter
                ? "bg-brand-gold border-brand-gold text-neutral-950 shadow-[0_0_15px_rgba(216,194,138,0.25)] font-bold"
                : "border-white/10 text-gray-400 hover:text-white hover:border-brand-gold/50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Gallery Grid - Text-based elegant cards (No useless image containers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => (
          <motion.div
            key={cert.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-zinc-950/60 border border-brand-gold/20 rounded-2xl p-6 hover:border-brand-gold/70 hover:shadow-[0_0_20px_rgba(216,194,138,0.1)] hover:bg-zinc-900/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group min-h-[190px]"
          >
            {/* Elegant top micro-border highlight */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-zinc-900 border border-white/5 rounded-lg text-[9px] font-mono text-brand-gold uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <ShieldCheck size={11} className="text-brand-gold animate-pulse" />
                  Verified
                </span>
                <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase tracking-wider">
                  {cert.issuer.split(" ")[0]}
                </span>
              </div>

              <div>
                <h3 className="text-base font-display font-bold text-white tracking-wide leading-tight group-hover:text-brand-gold transition-all mt-1">
                  {cert.title}
                </h3>
                <p className="text-[11px] text-zinc-400 font-mono mt-1 flex items-center gap-1">
                  <Award size={12} className="text-brand-gold" />
                  {cert.issuer}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-4">
              <span className="text-[10px] text-zinc-500 font-mono tracking-tight font-medium italic">
                {cert.date}
              </span>
              
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold hover:bg-transparent border border-brand-gold text-neutral-950 hover:text-brand-gold font-mono text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all duration-300 shadow-sm"
              >
                <FileText size={11} />
                <span>Open Certificate</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
