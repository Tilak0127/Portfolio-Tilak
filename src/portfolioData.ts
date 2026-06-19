import { EducationItem, SkillGroup, ProjectItem, CertificationItem, AchievementItem } from "./types";

export const educationHistory: EducationItem[] = [
  {
    id: "edu-1",
    degree: "B.Tech",
    institution: "Anil Neerukonda Institute of Technology & Sciences",
    period: "2023–2027",
    grade: "CGPA: 8.28",
    details: "Focusing on Cloud Computing, Artificial Intelligence, Database Management Systems, and Data Warehousing. Member of computational research initiatives."
  },
  {
    id: "edu-2",
    degree: "Intermediate MPC",
    institution: "Gravity Junior College",
    period: "2021–2023",
    grade: "85.4%",
    details: "Mathematics, Physics, Chemistry focus. Developed excellent analytical foundations, setting the stage for engineering and intelligence systems."
  },
  {
    id: "edu-3",
    degree: "SSC",
    institution: "MSM English Medium School",
    period: "2020–2021",
    grade: "97.6%",
    details: "Completed standard curriculum with exceptional score of 97.6%. Recognized with scholastic excellence rewards."
  }
];

export const skillsData: SkillGroup[] = [
  {
    category: "Programming",
    skills: [
      { name: "Python", level: 90 },
      { name: "R", level: 75 },
      { name: "C", level: 80 }
    ]
  },
  {
    category: "Data Analytics",
    skills: [
      { name: "Data Cleaning", level: 95 },
      { name: "Exploratory Data Analysis", level: 92 },
      { name: "Statistical Analysis", level: 88 }
    ]
  },
  {
    category: "Visualization",
    skills: [
      { name: "Power BI", level: 92 },
      { name: "Excel", level: 90 },
      { name: "Dashboards", level: 94 }
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "SQL", level: 88 },
      { name: "MySQL", level: 85 }
    ]
  },
  {
    category: "Web Technologies",
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 80 }
    ]
  },
  {
    category: "Tools",
    skills: [
      { name: "GitHub", level: 88 },
      { name: "VS Code", level: 92 }
    ]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "project-1",
    title: "ChitraPath",
    tagline: "AI-Powered Indian Movie Recommendation System",
    description: "A highly sophisticated, intelligent cinematic search and personalized recommendation ecosystem engineered specifically for Indian cinema. Multi-lingual by design, ChitraPath uses custom curation and vectors based on user metrics to filter across 8+ regional languages (Hindi, Telugu, Tamil, Malayalam, Kannada, Bengali, Punjabi, Marathi). The application integrates a fully optimized TMDB API middleware architecture coupled with a clean Firebase store, allowing users to build synchronized personal watchlists, query real-time trending content, filter deep metadata, and experience a fluid cinematic interface.",
    features: [
      "Dynamic Content Pipeline: Integrates TMDB API wrapper supporting paginated real-time fetching of trending, high-voted, and regional language releases.",
      "Language-Specific Clustering: Implements deep-indexing multi-lingual filters, allowing granular exploration of regional Indian entertainment.",
      "Collaborative & Personal Watchlists: Configures sub-second synchronized watchlists powered by Firebase Firestore, preserving states across user instances.",
      "Predictive Recommendations: Features client-side priority scoring matching movie genres, viewing history, and user rating actions.",
      "Advanced Fuzzy Search Engine: Includes high-efficiency search input with automated debouncing and regex-based movie keyword matches."
    ],
    techStack: ["React.js", "TMDB API", "Firebase Store", "Firebase Auth", "Tailwind CSS"],
    category: "AI & Web",
    links: {
      github: "https://github.com/Tilak0127/ChitraPath",
      demo: "https://ai.studio/apps/79e1e9a7-6805-4052-a0a0-4e1d63829f1e?fullscreenApplet=true"
    },
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    isLive: true,
    keyDetails: "The primary objective of ChitraPath was to eliminate regional language friction in discovering sub-continental gems. By implementing custom-weighted content scoring arrays locally in the browser, the platform recommends similar cinematic structures without overhead server latency. It queries metadata from TMDB, normalizes language-specific codes, and matches them against Firestore collections to build instant feedback loops.",
    architecture: "React functional client-side controller leveraging Firestore collections for persistent user watchlists and dynamic state caching. Real-time REST endpoints fetch TMDB media blocks, utilizing localized debouncers to restrict search rate limits and minimize cellular data consumption."
  },
  {
    id: "project-2",
    title: "TO-DO",
    tagline: "Task Management Web Application",
    description: "An enterprise-grade, ultra-responsive productivity engine designed to eliminate localized friction. By integrating Firebase Authentication with Google Sign-In and standard SMTP credentials, it locks user contexts inside a fully sandboxed environment. The database layer utilizes Firestore’s real-time queries (onSnapshot) to synchronize tasks instantly across multiple browser windows. Featuring complete CRUD operational design with luxurious transitions, users can filter workflows, toggle task states, categorize lists, and monitor productivity streaks under a high-fidelity workspace template.",
    features: [
      "Decentralized Auth Security: Implements ultra-safe Firebase Auth gates managing secure state persistence, token refresh cycles, and route protection.",
      "Zero-Latency Cloud Syncing: Utilizes active Firestore snapshot listeners, resolving offline edits immediately upon network reconnect.",
      "Complete CRUD Lifecycle: Encapsulates actions with local state updates, preventing UI layout shifts or blocking waiting spinners.",
      "Workspace Organization: Allows tag-based task classification, creation timestamping, priority flags, and dynamic search filters."
    ],
    techStack: ["React.js", "Firebase Authentication", "Firestore DB", "JavaScript", "Tailwind CSS"],
    category: "AI & Web",
    links: {
      github: "https://github.com/Tilak0127/firebase-todo",
      demo: "https://ai.studio/apps/341f15ea-33ad-4585-92df-37fc5ae73e32?fullscreenApplet=true"
    },
    thumbnail: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800&q=80",
    isLive: true,
    keyDetails: "This application transforms standard tasks lists into high-performance pipelines. Firestore indexes are optimized to order documents chronologically by state (Pending first, then Completed) and priority. Subroutines evaluate the completion timestamp Delta to calculate ongoing user accountability streaks, motivating standard operators toward high performance.",
    architecture: "Sub-Second asynchronous Firestore snapshot controller paired with Google OAuth authorization. Built with highly modular state isolation patterns so that list manipulations render instantaneously on the UI, updating the server asynchronously in the background."
  },
  {
    id: "project-3",
    title: "OLIO",
    tagline: "Smart Community Resource Sharing Platform",
    description: "A community-centric, hyper-localized marketplace platform engineered to facilitate collaborative resource distribution. Built around the principles of green computing and environmental preservation, OLIO serves as a high-trust nexus allowing registered neighborhood actors to donate excess food, request tools, borrow appliances, and share resources smoothly. It maps active neighborhood listings securely, ensuring safe coordination, reducing landfill waste, and tracking visual dashboards of carbon weight offset, monetary savings, and community impact indicators.",
    features: [
      "Sustainable Impact Tracking: Calculates community carbon offset indices and currency saved, projecting them on beautiful dashboard boards.",
      "Dynamic Category Matrixing: Segregates items into intelligent taxonomies such as Perishables, Tools, Library, and Utility Assets.",
      "Frictionless Exchange Pipelines: Includes intuitive reservation queues where neighbors can request, claim, and coordinate pickups via instant trigger updates."
    ],
    techStack: ["React.js", "Firebase Services", "JavaScript", "HTML5", "Tailwind CSS", "CSS Modules"],
    category: "Community",
    links: {
      github: "https://github.com/Tilak0127/olio-community",
      demo: "https://preview--olivia-food-rescue-ai.lovable.app/"
    },
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80",
    isLive: true,
    keyDetails: "OLIO addresses the growing challenges of hyper-localization and resource underutilization. By engineering a custom ecological score calculator, the application translates physical weight of donation materials (e.g., kilograms of fresh food or generic tools) into equivalent units of CO2 Saved and household currency kept, demonstrating immediate neighborhood-level environmental benefits.",
    architecture: "Full client-side model running React Context states paired with persistent Firebase collections, optimized with custom mathematical hooks implementing environmental formulas dynamically."
  },
  {
    id: "project-4",
    title: "Tackling the Digital Divide",
    tagline: "Empowering Rural Education Networks",
    description: "A pioneering educational framework engineered as a lightweight, hybrid web-mobile application to deliver localized learning in digital deserts. To address high latency and offline modes in rural schools, this platform leverages persistent Service Workers and offline-first HTML5 application storage keys. It bundles educational modules across science, mathematics, and regional literature in native Indian languages, permitting under-served students to browse, play interactive video lectures, and complete scholastic quizzes entirely offline, auto-aligning analytics sync when cellular networks briefly resume.",
    features: [
      "Aggressive Offline-First Cache: Employs persistent Service Workers for background assets caching, working continuously with zero cellular connectivity.",
      "Regional Dialect Translation System: Automatically switches multi-lingual educational content matrices between Telugu, Hindi, and English.",
      "Aggregated Progress Syncing: Stores local test scores inside client-side stores, automatically syncing back to the cloud when online.",
      "Low-Memory Mobile Compression: Optimizes high-resolution media down to ultra-compact packages, ensuring fast performance on budget smartphones."
    ],
    techStack: ["React.js", "Firebase", "Service Workers", "Offline HTML5 Storage", "Educational Tech"],
    category: "Community",
    links: {
      github: "https://github.com/Tilak0127/digital-divide",
      demo: "https://preview--bharat-vidya-hub.lovable.app/auth"
    },
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    isLive: true,
    keyDetails: "This project provides robust accessibility solutions where modern broadband is absent. Content is pre-indexed and stored in standard browser IndexedDB blocks. Quizzes run in low-weight iframe environments. Once network access is checked and found true, a custom queue manager drains local records and reconciles individual school score sheets with remote servers.",
    architecture: "Lightweight single-page framework optimized for low CPU footprints, integrating custom shell wrappers for service-worker lifecycle listeners, caching binaries, and queuing database payloads."
  }
];

export const certificationsData: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Business Intelligence & Analytics",
    issuer: "NPTEL",
    date: "Elite Certification Status",
    previewUrl: "",
    verifyUrl: "https://files.catbox.moe/y7y2cl.pdf"
  },
  {
    id: "cert-2",
    title: "Introduction to Internet of Things",
    issuer: "NPTEL",
    date: "Scholastic Certification",
    previewUrl: "",
    verifyUrl: "https://files.catbox.moe/i5rtzh.pdf"
  },
  {
    id: "cert-3",
    title: "Basics of Python",
    issuer: "Infosys Springboard",
    date: "Completed In-Depth track",
    previewUrl: "",
    verifyUrl: "https://files.catbox.moe/on7lry.pdf"
  },
  {
    id: "cert-4",
    title: "Big Data 101",
    issuer: "Infosys Springboard",
    date: "Framework foundation",
    previewUrl: "",
    verifyUrl: "https://files.catbox.moe/eh3fmw.pdf"
  },
  {
    id: "cert-5",
    title: "Deloitte Data Analytics",
    issuer: "Deloitte / Forage",
    date: "Practical simulation mastery",
    previewUrl: "",
    verifyUrl: "https://files.catbox.moe/t9tj2c.pdf"
  },
  {
    id: "cert-6",
    title: "BCG GenAI Consultant",
    issuer: "BCG / Forage",
    date: "Generative AI applications",
    previewUrl: "",
    verifyUrl: "https://files.catbox.moe/351wxd.pdf"
  }
];

export const achievementsData: AchievementItem[] = [
  {
    id: "ach-1",
    title: "Smart Tourist Guide",
    description: "Spearheaded the wireframe design and full-stack development of a community-focused tourist guide, reducing localized travel friction.",
    iconName: "Compass"
  },
  {
    id: "ach-2",
    title: "Technova Hackathon Participant",
    description: "Competed alongside talented engineers to code an immersive community application within high constraints in 36 hours.",
    iconName: "Zap"
  },
  {
    id: "ach-3",
    title: "Deloitte Data Analytics Grad",
    description: "Successfully finalized Deloitte's consulting simulation focusing on telemetry telemetry systems, SQL querying, and BI proposals.",
    iconName: "TrendingUp"
  },
  {
    id: "ach-4",
    title: "BCG Generative AI simulation",
    description: "Conducted simulated advisory research utilizing advanced prompts and LLM-driven architectures for complex corporate workflows.",
    iconName: "Cpu"
  },
  {
    id: "ach-5",
    title: "NPTEL Elite Tier",
    description: "Achieved elite passing certificates globally for deep business intelligence architectures and analytical computations.",
    iconName: "Award"
  },
  {
    id: "ach-6",
    title: "AICTE Industry Cert",
    description: "Recognized among young developers with immediate dashboard development capability using Power BI and statistical tools.",
    iconName: "CheckCircle"
  }
];
