import { useState, useEffect, useRef } from "react";
import { 
  educationHistory, 
  skillsData, 
  achievementsData 
} from "./portfolioData";
import ParticleBackground from "./components/ParticleBackground";
import ProjectsShowcase from "./components/ProjectsShowcase";
import CertificationGallery from "./components/CertificationGallery";
import ContactForm from "./components/ContactForm";
import AiAssistant from "./components/AiAssistant";
import BentoAbout from "./components/BentoAbout";
import { 
  User, 
  GraduationCap, 
  Cpu, 
  Briefcase, 
  Award, 
  Mail, 
  Linkedin, 
  Github, 
  ArrowUp, 
  Download, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Clock, 
  Flame, 
  BookOpen, 
  Compass, 
  Zap, 
  TrendingUp, 
  CheckCircle,
  Database,
  BarChart3,
  Lightbulb,
  FileText,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
    }
    return true; // Default is Dark Mode
  });

  // Theme Sync with persistency and transition support
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const [loading, setLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTitleIdx, setActiveTitleIdx] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [skillsView, setSkillsView] = useState<"grid" | "analytics">("grid");
  const [activeSkillHover, setActiveSkillHover] = useState<string | null>(null);

  const titles = ["Data Analyst", "AI Enthusiast", "Problem Solver"];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  // Typing simulator effect
  useEffect(() => {
    let timer: number;
    const currentFullText = titles[activeTitleIdx];

    if (isDeleting) {
      timer = window.setTimeout(() => {
        setTypingText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timer = window.setTimeout(() => {
        setTypingText((prev) => currentFullText.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && typingText === currentFullText) {
      timer = window.setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && typingText === "") {
      setIsDeleting(false);
      setActiveTitleIdx((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [typingText, isDeleting, activeTitleIdx]);

  // Loading Screen simulation with smooth percentage counter
  useEffect(() => {
    let current = 0;
    const interval = window.setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
      setLoadingPercent(current);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Tracking Scroll and resizing
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((window.scrollY / scrollHeight) * 100);
      }

      // Track current section
      const sections = ["hero", "about", "education", "skills", "projects", "internships", "certifications", "achievements", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track cursor coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      setMobileMenuOpen(false);
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Education", id: "education" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Internships", id: "internships" },
    { label: "Certs", id: "certifications" },
    { label: "Contact", id: "contact" }
  ];

  // Helper to render achievement icons
  const getAchievementIcon = (name: string) => {
    switch (name) {
      case "Compass": return <Compass className="text-brand-gold shrink-0" size={24} />;
      case "Zap": return <Zap className="text-brand-red shrink-0" size={24} />;
      case "TrendingUp": return <TrendingUp className="text-brand-gold shrink-0" size={24} />;
      case "Cpu": return <Cpu className="text-brand-red shrink-0" size={24} />;
      case "Award": return <Award className="text-brand-gold shrink-0" size={24} />;
      default: return <CheckCircle className="text-brand-red shrink-0" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-coal-dark text-coal-text transition-colors duration-500">

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-[#121212] z-50 flex flex-col items-center justify-center p-6"
          >
            <div className="relative flex flex-col items-center">
              {/* Premium Portfolio logo pulse */}
              <h1 className="text-4xl md:text-5xl font-serif font-black tracking-[0.25em] text-[#F5F5F5] select-none mb-2 glow-text-gold">
                TILAK
              </h1>
              <p className="text-brand-gold font-mono uppercase tracking-[0.4em] text-[10px] md:text-xs mb-8 select-none">
                Tilak Killamsetty Portfolio
              </p>

              {/* Percentage animation */}
              <span className="text-2xl md:text-3xl font-mono font-black text-[#F5F5F5] mb-2 select-none">
                {loadingPercent}%
              </span>

              {/* Gold loading line */}
              <div className="relative w-48 h-[2px] bg-white/5 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-brand-gold transition-all duration-100 ease-out"
                  style={{ width: `${loadingPercent}%` }}
                />
              </div>

              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.3em] font-semibold">
                System Initializing
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-brand-gold z-50 transition-all duration-100 shadow-[0_10px_10px_rgba(216,194,138,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Global Navigation Hub */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrollProgress > 3 ? "bg-coal-dark/95 border-b border-white/5 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button 
            id="brand-logo"
            onClick={() => scrollToSection("hero")}
            className="flex items-center text-left cursor-pointer group"
          >
            <div className="bg-brand-gold hover:bg-[#C9AE68] text-neutral-950 font-display font-black text-sm px-2.5 py-1.5 rounded-lg shadow-md transition-all mr-3 tracking-wider select-none">
              TK
            </div>
            <div className="flex flex-col">
              <span className="text-white font-display font-black text-sm tracking-widest uppercase transition-colors group-hover:text-brand-gold">TILAK</span>
              <span className="text-brand-gold font-mono text-[9px] tracking-wider uppercase font-bold">DATA SCIENTIST</span>
            </div>
          </button>

          {/* Nav Menu Desktop */}
          <nav className="hidden lg:flex items-center gap-7">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`text-xs font-display font-semibold uppercase tracking-widest transition-all cursor-pointer ${
                  activeSection === item.id 
                    ? "text-brand-gold font-bold" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Tools & Theme switches */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              id="theme-toggler"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 border border-white/5 hover:border-brand-gold/30 bg-zinc-900/60 rounded-xl text-gray-300 hover:text-brand-gold transition-all duration-300 cursor-pointer flex items-center justify-center"
              title="Toggle Theme"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a
              id="btn-nav-resume"
              href="https://files.catbox.moe/cdy702.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-brand-gold hover:bg-[#C9AE68] text-neutral-950 font-display font-bold uppercase tracking-wider text-[11px] rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <span>DOWNLOAD RESUME</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-theme-toggler"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-zinc-900 border border-white/5 rounded-xl text-gray-300 cursor-pointer"
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-zinc-900 border border-white/5 rounded-xl text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[68px] left-0 w-full z-40 bg-zinc-950 border-b border-white/5 backdrop-blur-lg flex flex-col p-6 space-y-4 lg:hidden"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`text-left text-xs font-display font-semibold uppercase tracking-widest py-2 border-b border-white/5 ${
                  activeSection === item.id ? "text-brand-gold" : "text-gray-400"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              id="mobile-btn-resume"
              href="https://files.catbox.moe/cdy702.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-brand-gold text-neutral-950 hover:bg-[#C9AE68] rounded-lg text-xs font-display font-semibold uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
            >
              <Download size={14} />
              <span>Download Resume</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 pt-28 pb-16 bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: "linear-gradient(rgba(10, 10, 12, 0.55), rgba(10, 10, 12, 0.8)), url('https://files.catbox.moe/eprinb.jpeg')",
          backgroundPosition: "center 15%"
        }}
      >
        <ParticleBackground />

        {/* Ambient background glows */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-red/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-brand-gold/5 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-coal-dark to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-2xl flex flex-col items-start text-left space-y-4">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 border border-brand-gold/30 rounded-full text-[9px] font-mono uppercase tracking-[0.2em] text-brand-gold shadow-sm"
              >
                <Flame size={10} className="text-brand-gold animate-pulse" />
                <span>☉ DATA SCIENTIST & INSIGHTS ENGINE</span>
              </motion.div>
 
              <div className="space-y-2 pt-2">
                {/* Small Header */}
                <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.4em] text-zinc-400 uppercase">
                  WELCOME TO THE PORTFOLIO OF
                </p>

                {/* Medium Subtitle / Role Title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="h-6 flex items-center"
                >
                  <p className="text-sm sm:text-base text-brand-gold font-mono tracking-widest uppercase flex items-center font-bold">
                    {typingText}
                    <span className="typing-cursor inline-block w-[2px] h-3.5 ml-1 bg-brand-gold animate-pulse" />
                  </p>
                </motion.div>

                {/* Large Title - TILAK KILLAMSETTY Two-Line Layout */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="text-3xl sm:text-5xl lg:text-5xl font-serif font-black tracking-widest text-white leading-[1.05] uppercase border-y border-white/5 py-4 max-w-sm inline-block"
                >
                  TILAK <br />
                  <span className="text-brand-gold">KILLAMSETTY</span>
                </motion.h1>
              </div>

              {/* Body Summary */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-zinc-400 text-[10px] sm:text-xs leading-relaxed max-w-lg font-sans tracking-wide uppercase pt-2"
              >
                AN ASPIRING DATA ANALYST, AI ENTHUSIAST & LOGICAL PROBLEM SOLVER. PASSIONATE ABOUT TRANSFORMING RAW COMPLEX DATASETS INTO ACTIONABLE DECISIONS USING PYTHON, SQL, POWER BI, AND CONSTRUCTING INTELLIGENT APPLICATIONS.
              </motion.p>
 
              {/* Action CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap gap-3 w-full pt-1"
              >
                <button
                  id="hero-view-projects"
                  onClick={() => scrollToSection("projects")}
                  className="px-4 py-2.5 bg-brand-gold hover:bg-amber-400 text-neutral-950 font-display font-bold uppercase tracking-wider text-[10px] transition-colors duration-300 rounded-lg cursor-pointer"
                >
                  EXPLORE PROJECTS →
                </button>
                <a
                  id="hero-download-resume"
                  href="https://files.catbox.moe/cdy702.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-transparent border border-brand-gold/60 text-brand-gold hover:bg-brand-gold hover:text-black font-display font-bold uppercase tracking-wider text-[10px] transition-colors duration-300 cursor-pointer rounded-lg"
                >
                  ⤓ DOWNLOAD RESUME
                </a>
                <button
                  id="hero-contact"
                  onClick={() => scrollToSection("contact")}
                  className="px-4 py-2.5 bg-zinc-900 border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white font-display font-bold uppercase tracking-wider text-[10px] transition-colors cursor-pointer rounded-lg"
                >
                  GET IN TOUCH ✉
                </button>
              </motion.div>
 
              {/* Secure Network Access Row */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/5 w-full">
                <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold">
                  SECURE NETWORK ACCESS:
                </span>
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://github.com/Tilak0127"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-zinc-950 border border-white/5 hover:border-brand-gold/30 rounded-lg text-zinc-400 hover:text-white transition-all duration-300"
                    title="GitHub Repository"
                  >
                    <Github size={13} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tilakkillamsetty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-zinc-950 border border-white/5 hover:border-brand-gold/30 rounded-lg text-zinc-400 hover:text-white transition-all duration-300"
                    title="LinkedIn Verification"
                  >
                    <Linkedin size={13} />
                  </a>
                  <a
                    href="mailto:tilakkillamsetty1712@gmail.com"
                    className="p-2 bg-zinc-950 border border-white/5 hover:border-brand-gold/30 rounded-lg text-zinc-400 hover:text-white transition-all duration-300"
                    title="E-Mail Handshake"
                  >
                    <Mail size={13} />
                  </a>
                </div>
              </div>
 
              {/* Live Status indicator */}
              <div className="pt-1">
                <span className="px-2.5 py-1 bg-emerald-950/20 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 uppercase tracking-widest rounded-lg flex items-center gap-1.5 select-none font-semibold">
                  <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE VIEWER LOG: 142 VIEWS / 15 ENGAGED
                </span>
              </div>
            </div>
        </div>
      </section>

      {/* HIGHER LEVEL METRIC NUMBERS BAR */}
      <section className="relative z-10 py-10 bg-neutral-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1 group">
            <p className="text-4xl md:text-5xl font-mono font-black text-brand-gold group-hover:scale-105 transition-transform duration-300">8.28</p>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">B.Tech CGPA</p>
          </div>
          <div className="space-y-1 group">
            <p className="text-4xl md:text-5xl font-mono font-black text-[#F5F5F5] group-hover:scale-105 transition-transform duration-300">4+</p>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Core Projects</p>
          </div>
          <div className="space-y-1 group">
            <p className="text-4xl md:text-5xl font-mono font-black text-brand-gold group-hover:scale-105 transition-transform duration-300">7+</p>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Certifications</p>
          </div>
          <div className="space-y-1 group">
            <p className="text-4xl md:text-5xl font-mono font-black text-[#F5F5F5] group-hover:scale-105 transition-transform duration-300">6+</p>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Achievements</p>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-[0.4em] font-bold">☉ DETAILED SCHEMATIC</span>
            <h2 className="text-4xl font-serif font-black text-white uppercase tracking-widest mt-2">
              About Me
            </h2>
            <div className="w-28 h-[2px] bg-brand-gold mx-auto mt-4" />
          </div>

          <BentoAbout />
        </div>
      </section>

      {/* EDUCATION TIMELINE */}
      <section id="education" className="py-24 bg-neutral-950/40 relative z-10 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-[0.4em]">Academic Foundation</span>
            <h2 className="text-4xl font-display font-medium text-white uppercase tracking-wider mt-2">
              Education
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4" />
          </div>

          {/* Vertical timeline */}
          <div className="relative border-l-2 border-brand-gold/25 pl-8 ml-4 space-y-12">
            {educationHistory.map((edu, idx) => (
              <div key={edu.id} className="relative group pl-2">
                {/* Timeline node */}
                <div className="absolute -left-[41px] top-4.5 h-6 w-6 bg-[#121212] border-2 border-brand-gold shadow-[0_0_10px_rgba(216,194,138,0.25)] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <GraduationCap size={11} className="text-brand-gold" />
                </div>

                {/* Gilded Card container */}
                <div className="bg-[#1C1C1E] border border-brand-gold/25 group-hover:border-brand-gold rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(216,194,138,0.06)] hover:translate-y-[-4px]">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <span className="inline-block px-3 py-1 bg-[#121212] text-brand-gold text-[10px] font-mono rounded tracking-widest uppercase border border-brand-gold/20">
                      {edu.period}
                    </span>
                    <span className="text-xs text-brand-gold font-mono font-bold uppercase tracking-wider bg-brand-gold/10 px-2.5 py-0.5 rounded-full">
                      {edu.grade}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-black text-white tracking-wide group-hover:text-brand-gold transition-all">
                    {edu.degree}
                  </h3>
                  <h4 className="text-sm text-zinc-300 font-semibold font-sans mt-0.5">
                    {edu.institution}
                  </h4>

                  {edu.details && (
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans mt-3 border-t border-white/5 pt-3 uppercase tracking-wide">
                      {edu.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-[0.4em]">Expertise Map</span>
            <h2 className="text-4xl font-display font-medium text-white uppercase tracking-wider mt-2">
              Technical Skills
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4" />

            {/* View switcher buttons */}
            <div className="flex justify-center items-center gap-4 mt-8 max-w-xs mx-auto p-1 bg-zinc-950/60 rounded-xl border border-white/5">
              <button
                onClick={() => setSkillsView("grid")}
                className={`flex-1 py-1 px-3 text-[10px] font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  skillsView === "grid"
                    ? "bg-brand-gold text-neutral-950 shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                GRID MAP
              </button>
              <button
                onClick={() => setSkillsView("analytics")}
                className={`flex-1 py-1 px-3 text-[10px] font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  skillsView === "analytics"
                    ? "bg-brand-gold text-neutral-950 shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                SPECTRUM VIEW
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {skillsView === "grid" ? (
              <motion.div
                key="grid-map-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {skillsData.map((group) => {
                  const getIcon = (cat: string) => {
                    switch (cat) {
                      case "Programming": return <Cpu size={16} className="text-brand-gold" />;
                      case "Data Analytics": return <TrendingUp size={16} className="text-brand-gold" />;
                      case "Visualization": return <BarChart3 size={16} className="text-brand-gold" />;
                      case "Databases": return <Database size={16} className="text-brand-gold" />;
                      case "Web Technologies": return <Zap size={16} className="text-brand-gold" />;
                      case "Tools": return <Lightbulb size={16} className="text-brand-gold" />;
                      default: return <Cpu size={16} className="text-brand-gold" />;
                    }
                  };

                  return (
                    <div
                      key={group.category}
                      className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 hover:border-brand-gold/45 transition-all duration-300 relative overflow-hidden group/card backdrop-blur-md hover:shadow-[0_10px_35px_rgba(216,194,138,0.04)]"
                    >
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
                      
                      <h3 className="text-sm font-display font-bold text-white tracking-widest uppercase mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="flex items-center gap-2.5">
                          <span className="p-2 rounded-lg bg-brand-gold/10 border border-brand-gold/25 group-hover/card:scale-110 transition-transform duration-300 flex items-center justify-center">
                            {getIcon(group.category)}
                          </span>
                          {group.category}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-normal">Expertise</span>
                      </h3>

                      <div className="space-y-4">
                        {group.skills.map((skill) => {
                          const skillMeta: Record<string, { tag: string; label: string }> = {
                            "Python": { tag: "CORE STACK", label: "Data Science & Automation" },
                            "R": { tag: "STATISTICAL", label: "Statistical Analytics" },
                            "C": { tag: "ALGORITHMS", label: "Fundamental Logic" },
                            "Data Cleaning": { tag: "PIPELINES", label: "Ingestion & Preparation" },
                            "Exploratory Data Analysis": { tag: "INSIGHTS", label: "Interactive Discovery" },
                            "Statistical Analysis": { tag: "RELIABILITY", label: "Symmetric Inference" },
                            "Power BI": { tag: "BUSINESS INTEL", label: "Automated Reporting" },
                            "Excel": { tag: "SYSTEMATIC", label: "Spreadsheets & Pivots" },
                            "Dashboards": { tag: "KPI METRICS", label: "Executive Reporting" },
                            "SQL": { tag: "RELATIONAL", label: "Advanced Architectures" },
                            "MySQL": { tag: "REPOSITORIES", label: "Structured Query Stores" },
                            "HTML": { tag: "DEVELOPMENT", label: "Structural Semantics" },
                            "CSS": { tag: "INTERFACE", label: "Fluid Layout Engine" },
                            "JavaScript": { tag: "INTERACTIVE", label: "Application Frameworks" },
                            "GitHub": { tag: "PIPELINES", label: "Collaborative Control" },
                            "VS Code": { tag: "SANDBOX", label: "Custom Configuration" }
                          };

                          const info = skillMeta[skill.name] || { 
                            tag: skill.level >= 90 ? "CORE" : skill.level >= 85 ? "ADVANCED" : "PROFICIENT", 
                            label: "Advanced Application" 
                          };
                          const isCore = skill.level >= 90;

                          return (
                            <div 
                              key={skill.name} 
                              onMouseEnter={() => setActiveSkillHover(skill.name)}
                              onMouseLeave={() => setActiveSkillHover(null)}
                              className="p-3 bg-zinc-950/40 border border-white/[0.03] hover:border-brand-gold/30 rounded-xl transition-all duration-300 hover:bg-zinc-900/40 group/skill"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-mono font-medium text-zinc-300 group-hover/skill:text-white transition-colors flex items-center gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full bg-brand-gold transition-all duration-300 ${activeSkillHover === skill.name ? "scale-125 shadow-[0_0_8px_rgba(216,194,138,0.6)]" : ""}`} />
                                  {skill.name}
                                </span>
                                <span className={`text-[8.5px] font-mono font-bold tracking-widest px-2 py-0.5 rounded border ${
                                  isCore 
                                    ? "bg-brand-gold/10 border-brand-gold/25 text-brand-gold shadow-[0_0_8px_rgba(216,194,138,0.05)]" 
                                    : "bg-white/5 border-white/10 text-zinc-400"
                                }`}>
                                  {info.tag}
                                </span>
                              </div>
                              <p className="text-[10px] text-zinc-500 font-sans mt-1.5 group-hover/skill:text-zinc-400 transition-colors pl-3.5">
                                {info.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                key="analytics-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Key Highlights */}
                <div className="lg:col-span-5 bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-serif font-black text-white uppercase tracking-wider mb-2">
                      Core Pillars of Expertise
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">
                      A strategic combination of scientific analysis, automated visualization frameworks, and robust database architectures.
                    </p>

                    <div className="space-y-4">
                      <div className="p-4 bg-zinc-950/40 border border-brand-gold/20 rounded-xl flex gap-3.5 hover:border-brand-gold/35 transition-all duration-300">
                        <div className="h-10 w-10 rounded-lg bg-brand-gold/15 flex items-center justify-center shrink-0 border border-brand-gold/30">
                          <Cpu className="text-brand-gold" size={18} />
                        </div>
                        <div>
                          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Programming</h4>
                          <p className="text-[11px] text-zinc-400 mt-1">High-order Python workflows translating raw formulas into computational realities.</p>
                        </div>
                      </div>

                      <div className="p-4 bg-zinc-950/40 border border-brand-gold/20 rounded-xl flex gap-3.5 hover:border-brand-gold/35 transition-all duration-300">
                        <div className="h-10 w-10 rounded-lg bg-brand-gold/15 flex items-center justify-center shrink-0 border border-brand-gold/30">
                          <BarChart3 className="text-brand-gold" size={18} />
                        </div>
                        <div>
                          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Business Intelligence</h4>
                          <p className="text-[11px] text-zinc-400 mt-1">Sleek Power BI environments, automated pipeline reporting, and interactive stakeholder boards.</p>
                        </div>
                      </div>

                      <div className="p-4 bg-zinc-950/40 border border-brand-gold/20 rounded-xl flex gap-3.5 hover:border-brand-gold/35 transition-all duration-300">
                        <div className="h-10 w-10 rounded-lg bg-brand-gold/15 flex items-center justify-center shrink-0 border border-brand-gold/30">
                          <Database className="text-brand-gold" size={18} />
                        </div>
                        <div>
                          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Structural Databases</h4>
                          <p className="text-[11px] text-zinc-400 mt-1">High-performance custom SQL Ingestion matching complex relational mapping models.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">AISTUDIO Verified</span>
                    </div>
                    <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest font-black bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">Skill Spectrum</span>
                  </div>
                </div>

                {/* Full Unified Competency Spectrum */}
                <div className="lg:col-span-7 bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 relative flex flex-col">
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                      Competency Spectrum
                    </h3>
                    <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider bg-brand-gold/10 px-2.5 py-0.5 rounded-full border border-brand-gold/15 select-none font-bold">
                      All {skillsData.reduce((acc, g) => acc + g.skills.length, 0)} Active Domains
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
                    {skillsData.flatMap(g => g.skills.map(s => ({ ...s, category: g.category }))).sort((a,b) => b.level - a.level).map((skill) => {
                      const skillMeta: Record<string, { tag: string; label: string }> = {
                        "Python": { tag: "CORE STACK", label: "Data Science & Automation" },
                        "R": { tag: "STATISTICAL", label: "Statistical Analytics" },
                        "C": { tag: "ALGORITHMS", label: "Fundamental Logic" },
                        "Data Cleaning": { tag: "PIPELINES", label: "Ingestion & Preparation" },
                        "Exploratory Data Analysis": { tag: "INSIGHTS", label: "Interactive Discovery" },
                        "Statistical Analysis": { tag: "RELIABILITY", label: "Symmetric Inference" },
                        "Power BI": { tag: "BUSINESS INTEL", label: "Automated Reporting" },
                        "Excel": { tag: "SYSTEMATIC", label: "Spreadsheets & Pivots" },
                        "Dashboards": { tag: "KPI METRICS", label: "Executive Reporting" },
                        "SQL": { tag: "RELATIONAL", label: "Advanced Architectures" },
                        "MySQL": { tag: "REPOSITORIES", label: "Structured Query Stores" },
                        "HTML": { tag: "DEVELOPMENT", label: "Structural Semantics" },
                        "CSS": { tag: "INTERFACE", label: "Fluid Layout Engine" },
                        "JavaScript": { tag: "INTERACTIVE", label: "Application Frameworks" },
                        "GitHub": { tag: "PIPELINES", label: "Collaborative Control" },
                        "VS Code": { tag: "SANDBOX", label: "Custom Configuration" }
                      };

                      const info = skillMeta[skill.name] || { 
                        tag: skill.level >= 90 ? "CORE" : skill.level >= 85 ? "ADVANCED" : "PROFICIENT", 
                        label: "Advanced Application" 
                      };

                      const getStatusBadge = (lvl: number) => {
                        if (lvl >= 92) return "EXPERT";
                        if (lvl >= 88) return "ADVANCED";
                        return "PROFICIENT";
                      };

                      return (
                        <div 
                          key={skill.name}
                          className="p-3 border border-white/5 rounded-xl bg-zinc-950/40 hover:border-brand-gold/30 transition-all duration-300 group/spectrum hover:bg-zinc-900/20"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="text-xs font-mono font-bold text-white group-hover/spectrum:text-brand-gold transition-colors">{skill.name}</h4>
                              <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-widest">{skill.category}</span>
                            </div>
                            <span className={`text-[8px] font-mono tracking-wider font-extrabold px-2 py-0.5 rounded ${
                              skill.level >= 92 
                                ? "bg-brand-gold/15 text-brand-gold border border-brand-gold/20" 
                                : "bg-white/5 text-zinc-400 border border-white/10"
                            }`}>
                              {getStatusBadge(skill.level)}
                            </span>
                          </div>
                          
                          <p className="text-[10px] text-zinc-400 font-sans leading-snug">
                            {info.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 bg-neutral-950/40 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-[0.4em]">Development Showcase</span>
            <h2 className="text-4xl font-display font-medium text-white uppercase tracking-wider mt-2">
              Featured Projects
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4" />
          </div>

          <ProjectsShowcase />
        </div>
      </section>

      {/* INTERNSHIPS SECTION */}
      <section id="internships" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-[0.4em]">Applied Practice</span>
            <h2 className="text-4xl font-display font-medium text-white uppercase tracking-wider mt-2">
              Verified Internships
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4" />
          </div>

          {/* Premium Card Layout */}
          <div className="glass-panel border-l-4 border-l-brand-gold rounded-xl p-8 relative overflow-hidden group hover:border-brand-gold/30 transition-all duration-300">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 blur-[50px] pointer-events-none" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <span className="px-3 py-1 bg-zinc-900 border border-white/5 rounded text-[11px] font-mono text-brand-gold uppercase tracking-wider">
                  Internship Title
                </span>
                <h3 className="text-2xl font-display font-bold text-white tracking-wide mt-2">
                  AI-Driven Data Analytics and Visualization
                </h3>
                <p className="text-sm text-gray-300 font-semibold font-sans mt-0.5">
                  AICTE Internship Program
                </p>
              </div>

              <span className="shrink-0 px-3 py-1 bg-brand-gold/10 border border-brand-gold/30 rounded text-xs font-mono text-brand-gold font-semibold uppercase tracking-wider animate-pulse">
                Verified In-Field
              </span>
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans mb-6">
              Completed an intensive AICTE Internship in AI-Driven Data Analytics and Visualization, gaining deep hands-on expertise in data processing pipelines, visualization techniques, responsive business dashboard construction, and automated analytical summaries.
            </p>

            <ul className="mt-6 space-y-2 text-xs font-mono text-gray-400">
              <li className="flex items-center gap-2">
                <CheckCircle size={12} className="text-brand-gold" />
                <span>Gained deep proficiency in Power BI modeling techniques</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={12} className="text-brand-gold" />
                <span>Utilized clean ingestion pipes to process large industrial telemetry files</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={12} className="text-brand-gold" />
                <span>Generated automated business report recommendations leveraging LLM configurations</span>
              </li>
            </ul>

            <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
              <span className="text-xs text-zinc-500 font-mono">
                Credential Authority: AICTE Virtual Internships
              </span>
              
              <a
                href="https://files.catbox.moe/wqsq5k.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-gold hover:bg-neutral-900 border border-brand-gold text-neutral-950 hover:text-brand-gold font-mono text-xs font-semibold uppercase tracking-widest rounded-lg transition-all duration-300"
              >
                <FileText size={14} />
                <span>View Internship Certificate</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS GALLERY */}
      <section id="certifications" className="py-24 bg-neutral-950/40 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-[0.4em]">Credentials Locker</span>
            <h2 className="text-4xl font-display font-medium text-white uppercase tracking-wider mt-2">
              Certifications
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4" />
          </div>

          <CertificationGallery />
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section id="achievements" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-[0.4em]">Milestones reached</span>
            <h2 className="text-4xl font-display font-medium text-white uppercase tracking-wider mt-2">
              Achievements
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievementsData.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-zinc-900/60 border border-white/5 rounded-2xl flex gap-4 hover:border-brand-gold/30 hover:bg-zinc-900 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-center shrink-0">
                  {getAchievementIcon(item.iconName)}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-display font-bold text-white tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-neutral-950/40 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-[0.4em]">Establish Communication</span>
            <h2 className="text-4xl font-display font-medium text-white uppercase tracking-wider mt-2">
              Secure Channel
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4" />
          </div>

          <ContactForm />
        </div>
      </section>

      {/* GLOBAL FOOTER */}
      <footer className="relative z-10 bg-neutral-950 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold tracking-[0.3em] text-white">
              PORTFOLIO
            </h3>
            <p className="text-xs text-brand-gold font-mono uppercase tracking-widest">
              Built with Passion, Data, and Intelligence.
            </p>
          </div>

          {/* Copyright details */}
          <div className="space-y-1.5 md:text-right">
            <p className="text-xs text-gray-500 font-mono">
              © 2026 Tilak Killamsetty. All Rights Reserved.
            </p>
            <p className="text-[10px] text-gray-600 font-mono tracking-tight">
              Designed as a professional recruiter sandbox console. Fully responsive.
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING PORTFOLIO AI CHAT ASSISTANT */}
      <AiAssistant />
    </div>
  );
}
