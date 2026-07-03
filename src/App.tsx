import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type ExperienceKey =
  | "natixis"
  | "santander"
  | "servsys"
  | "bumble"
  | "ltech";

type DrawerContent =
  | {
      type: "competency";
      key: string;
    }
  | {
      type: "skill";
      key: string;
    }
  | {
      type: "education";
      key: string;
    }
  | {
      type: "experience";
      key: ExperienceKey;
    }
  | null;

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const experienceDetails: Record<
  ExperienceKey,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    overview: string;
    bullets: string[];
    tools: string[];
    impact: string[];
  }
> = {
  natixis: {
    eyebrow: "Current Role",
    title: "Vice President, Data Quality & Governance",
    subtitle:
      "Natixis North America LLC (CIB) · Chief Data Office||New York, NY · Jul 2025 to Present",
    overview:
      "At Natixis, I lead data quality and governance priorities across CIB Americas while extending that same control mindset into responsible AI adoption, policy retrieval, knowledge access, and safe use patterns for teams operating in a regulated environment.",
    bullets: [
      "Lead the end to end data quality and governance framework for CIB Americas, aligning standards, critical data elements, issue management, and executive visibility.",
      "Lead cross functional issue management and remediation forums across Finance, Risk, Product Control, Regulatory Reporting, and Operations.",
      "Lead AI enablement initiatives focused on awareness, safe prompting, governed retrieval, policy discovery, and practical internal assistant use cases.",
      "Drive metadata, lineage, control discipline, data classification, and revalidation practices that strengthen audit readiness.",
      "Translate governance from policy language into a working operating model that business, technology, and control teams can actually apply."
    ],
    tools: [
      "SQL",
      "Informatica IDQ",
      "Power BI",
      "Zeenea",
      "Cinchy",
      "Control M",
      "JIRA",
      "Policy Retrieval",
      "RAG Style Workflows"
    ],
    impact: [
      "Governance leadership across CIB Americas",
      "AI literacy and adoption leadership",
      "Audit ready operating discipline",
      "Cross functional remediation ownership"
    ]
  },
  santander: {
    eyebrow: "Prior Role",
    title: "Assistant Vice President, Data Quality",
    subtitle:
      "Santander Bank N.A. · Chief Data Office||New York, NY · Dec 2021 to Jun 2025",
    overview:
      "At Santander Bank N.A., I helped scale data quality into a mature enterprise capability, bringing stronger controls, better scorecards, and greater business accountability while also leading governance conversations that made emerging AI usage more practical and more disciplined.",
    bullets: [
      "Led enterprise data quality execution across multiple business domains, making controls more measurable, repeatable, and visible to leadership.",
      "Led work with business teams, source system owners, and development partners to improve data integrity and deployment discipline.",
      "Expanded data quality beyond isolated rule development into scorecards, issue analysis, root cause discussions, and governance accountability.",
      "Led offshore delivery coordination and strengthened execution rhythms that improved release consistency and production outcomes.",
      "Helped frame AI related thinking and awareness in a way that fit a regulated operating model rather than hype driven experimentation."
    ],
    tools: [
      "Informatica IDQ",
      "SQL",
      "PL SQL",
      "VQL",
      "Denodo",
      "Snowflake",
      "Oracle",
      "SQL Server",
      "JIRA"
    ],
    impact: [
      "2,500 plus rules engineered",
      "9,000 plus controls governed",
      "35 percent integrity uplift",
      "20 percent faster deployment cycles"
    ]
  },
  servsys: {
    eyebrow: "Earlier Chapter",
    title: "Data Analyst Engineer",
    subtitle: "Servsys Corporation · Boston, MA||Apr 2021 to Nov 2021",
    overview:
      "Servsys sharpened my execution layer by strengthening how I translate requirements into reporting workflows, technical logic, and outputs that decision makers can actually use.",
    bullets: [
      "Worked closely with business and system requirements to turn them into reporting structures and deployment ready workflows.",
      "Improved reporting quality through stronger transformation logic, cleaner queries, and better data handling practices.",
      "Built dashboards and reports that were both technically sound and useful to leadership teams.",
      "Deepened my habit of thinking from source to transformation to output, which later became essential in governance work."
    ],
    tools: ["SSIS", "SSRS", "SQL", "PL SQL", "Tableau"],
    impact: [
      "Improved reporting accuracy",
      "Business to technical translation",
      "Deployment ready workflows",
      "Leadership facing dashboards"
    ]
  },
  bumble: {
    eyebrow: "Earlier Chapter",
    title: "Data Analyst",
    subtitle: "Bumble Tech Solutions · Wardha, India||Sep 2018 to Mar 2021",
    overview:
      "This phase built my practical analytics muscle by teaching me how to turn performance data into decisions, and how to make technical outputs understandable to the people using them.",
    bullets: [
      "Worked across operational and performance datasets to uncover patterns, support business decisions, and improve reporting clarity.",
      "Built analytical views and dashboards that helped non technical stakeholders interpret data more effectively.",
      "Learned to connect analytical work with business context, timelines, and collaborative execution.",
      "Strengthened communication around data so insight became usable, not just technically correct."
    ],
    tools: ["SQL", "Excel", "Google Analytics", "Tableau", "SSRS"],
    impact: [
      "25 percent increase in marketing ROI",
      "Cross functional reporting support",
      "Better analytical communication",
      "Dashboard driven decisions"
    ]
  },
  ltech: {
    eyebrow: "Undergraduate Role",
    title: "Data Analyst",
    subtitle: "L tech Labs · Wardha, India||Apr 2017 to May 2018",
    overview:
      "This is where the analytical foundation began through reporting, dashboarding, and the early realization that better structure is what makes better insight possible.",
    bullets: [
      "Built early reporting solutions and dashboard views that translated business questions into measurable outputs.",
      "Developed a structural understanding of data models, relationships, and integrity that later became essential in governance work.",
      "Learned to think beyond rows and columns toward how data moves, connects, and supports decisions.",
      "Started building the technical discipline that later scaled into enterprise data quality and control frameworks."
    ],
    tools: ["Power BI", "Power Query", "PowerPivot", "DAX", "Python", "SciPy"],
    impact: [
      "Dashboard first reporting foundation",
      "Data model discipline",
      "Analytical engineering mindset",
      "Early governance instinct"
    ]
  }
};

const competencies = {
  dqFrameworks: {
    title: "Enterprise DQ Frameworks",
    category: "Operating Model",
    summary:
      "The operating model that turns data quality from an idea into a repeatable control discipline across business domains.",
    meaning:
      "Enterprise data quality frameworks define how quality problems are identified, profiled, translated into rules, tested, deployed, monitored, and remediated.",
    implementation:
      "I implemented this through profiling, rule design, UAT, production deployment, scorecards, exception management, issue routing, and remediation tracking across enterprise environments.",
    visualTitle: "Lifecycle",
    visualSteps: [
      "Requirements",
      "Profiling",
      "Rule Design",
      "UAT",
      "Production",
      "Monitoring",
      "Resolution"
    ],
    bullets: [
      "Connects policy to executable controls",
      "Creates repeatable delivery across domains",
      "Makes quality measurable for leadership"
    ],
    link: null
  },
  cdeGovernance: {
    title: "CDE Governance",
    category: "Critical Data",
    summary:
      "Governance for the data elements that matter most to risk, finance, regulatory reporting, and business decision making.",
    meaning:
      "Critical Data Element governance clarifies what the most important data is, who owns it, how it is measured, and what happens when it fails quality expectations.",
    implementation:
      "I applied this by aligning critical elements to owners and stewards, tying them to rules and scorecards, and making escalation and remediation paths visible across teams.",
    visualTitle: "Ownership Chain",
    visualSteps: [
      "Critical Element",
      "Owner",
      "Steward",
      "Rule",
      "Scorecard",
      "Escalation"
    ],
    bullets: [
      "Clarifies accountability",
      "Raises visibility of business critical data",
      "Improves control coverage and issue response"
    ],
    link: null
  },
  regulatoryControls: {
    title: "Regulatory Data Controls",
    category: "Regulatory Discipline",
    summary:
      "Controls that support trustworthy reporting, audit readiness, and regulatory confidence across financial data environments.",
    meaning:
      "Regulatory data controls are the mechanisms that make risk and financial data reliable enough for internal committees, external regulators, and supervisory expectations.",
    implementation:
      "I implemented these controls through governed DQ rules, traceable issue management, better scorecards, lineage awareness, and operating discipline around remediation and reporting readiness.",
    visualTitle: "Control Flow",
    visualSteps: [
      "Data Capture",
      "Control",
      "Validation",
      "Exception",
      "Escalation",
      "Remediation",
      "Reporting"
    ],
    bullets: [
      "Improves reporting confidence",
      "Supports audit and supervisory expectations",
      "Makes failures visible earlier"
    ],
    link: null
  },
  cdoModels: {
    title: "CDO Operating Models",
    category: "Leadership Structure",
    summary:
      "The structure that connects governance policy, metrics, committees, accountability, and execution.",
    meaning:
      "A CDO operating model defines how governance responsibilities are organized, measured, escalated, and reinforced across the enterprise.",
    implementation:
      "I worked within and strengthened these models by aligning controls, scorecards, issue forums, owners, stewards, committees, and leadership reporting into one connected rhythm.",
    visualTitle: "Governance Stack",
    visualSteps: [
      "Policy",
      "Procedure",
      "Control",
      "Metric",
      "Forum",
      "Accountability"
    ],
    bullets: [
      "Turns governance into a working model",
      "Improves coordination across business and technology",
      "Creates leadership visibility"
    ],
    link: null
  },
  imrLeadership: {
    title: "IMR Leadership",
    category: "Issue Management",
    summary:
      "A disciplined approach to issue management and resolution that moves data problems toward sustainable closure.",
    meaning:
      "Issue Management and Resolution leadership is about defining how issues are identified, triaged, prioritized, escalated, and closed with lasting remediation rather than temporary fixes.",
    implementation:
      "I led IMR rhythms by coordinating business, technology, owners, and quality teams around prioritization, root cause understanding, action tracking, and closure readiness.",
    visualTitle: "Issue Flow",
    visualSteps: [
      "Intake",
      "Triage",
      "Priority",
      "Root Cause",
      "Action",
      "Validation",
      "Closure"
    ],
    bullets: [
      "Creates governance follow through",
      "Improves cross functional accountability",
      "Reduces repeated failures"
    ],
    link: null
  },
  bcbs239: {
    title: "BCBS 239",
    category: "Regulatory Standard",
    summary:
      "A global banking standard focused on effective risk data aggregation and risk reporting.",
    meaning:
      "BCBS 239 sets principles that help banks improve the accuracy, completeness, timeliness, and governance of risk data and reporting.",
    implementation:
      "In practice, I aligned work to BCBS 239 through stronger control design, clearer critical data definitions, lineage awareness, governance accountability, and data quality discipline around reporting relevant data.",
    visualTitle: "Key Focus",
    visualSteps: [
      "Accuracy",
      "Completeness",
      "Timeliness",
      "Aggregation",
      "Reporting",
      "Governance"
    ],
    bullets: [
      "Strengthens risk data reliability",
      "Supports supervisory expectations",
      "Connects data quality with reporting confidence"
    ],
    link: "https://www.bis.org/publ/bcbs239.htm"
  },
  dfs500: {
    title: "NYDFS Part 500",
    category: "Cybersecurity Regulation",
    summary:
      "A New York, NY financial services regulation focused on cybersecurity governance and protection of information systems and nonpublic information.",
    meaning:
      "NYDFS Part 500 defines cybersecurity expectations for covered entities, including governance, controls, risk awareness, and handling of sensitive information.",
    implementation:
      "I connect this to data and AI work by strengthening awareness of classification, sensitive data handling, control discipline, and responsible use expectations in regulated environments.",
    visualTitle: "Control Areas",
    visualSteps: [
      "Governance",
      "Risk",
      "Access",
      "Protection",
      "Monitoring",
      "Response"
    ],
    bullets: [
      "Supports safer data handling",
      "Reinforces regulated control expectations",
      "Provides a stronger context for AI guardrails"
    ],
    link: "https://www.dfs.ny.gov/industry_guidance/cybersecurity"
  },
  dama: {
    title: "DAMA",
    category: "Data Management Framework",
    summary:
      "A recognized body of knowledge that helps structure governance, stewardship, quality, metadata, and broader data management disciplines.",
    meaning:
      "DAMA provides a common way to think about enterprise data management capabilities and how they fit together.",
    implementation:
      "I use DAMA aligned thinking to structure stewardship, governance roles, data quality methods, and operating clarity across data management functions.",
    visualTitle: "Capability View",
    visualSteps: [
      "Governance",
      "Quality",
      "Metadata",
      "Architecture",
      "Stewardship",
      "Operations"
    ],
    bullets: [
      "Creates shared vocabulary",
      "Helps organize governance maturity",
      "Links quality to broader data management"
    ],
    link: "https://dama.org/learning-resources/dama-data-management-body-of-knowledge-dmbok/"
  }
} as const;

const skillDetails = {
  governanceAi: {
    title: "Data Quality, Governance, and Responsible AI Leadership",
    intro:
      "I operate where data quality, enterprise governance, and responsible AI adoption come together.",
    meaning:
      "This is leadership at the intersection of control discipline and emerging technology. It means building trustworthy data foundations, then extending that same rigor into how organizations understand and adopt AI.",
    application:
      "I lead governance operating models, critical data programs, issue management, quality frameworks, and AI awareness efforts so adoption happens with structure, safety, and business relevance.",
    methods: [
      "Governance frameworks and scorecards",
      "Critical data element ownership and controls",
      "AI literacy and safe use guidance",
      "Cross functional leadership forums"
    ]
  },
  enterpriseOps: {
    title: "Enterprise Governance and Regulatory Operations",
    intro:
      "Governance needs to work operationally, not only conceptually.",
    meaning:
      "This capability is about translating policy and regulatory intent into standards, controls, issue management, and executive visibility.",
    application:
      "I apply this through data quality frameworks, CDO operating models, audit readiness, regulatory support, and routines that hold up under pressure.",
    methods: [
      "BCBS 239 aligned governance thinking",
      "Control mapping and scorecards",
      "Issue management and remediation tracking",
      "Executive reporting and accountability"
    ]
  },
  aiPractice: {
    title: "AI in Practice",
    intro:
      "I work with AI both as a governance leader and as a hands on practitioner outside sensitive data contexts.",
    meaning:
      "Professional AI work means shaping safe usage patterns, literacy, and controlled adoption. Personal hands on use helps me understand how models actually reason, draft, search, and generate.",
    application:
      "I use Claude for deeper reasoning and development adjacent exploration, ChatGPT for drafting and transformation, Perplexity for research with sources, and Gemini for multimodal generation and comparison thinking.",
    methods: [
      "Claude for structured reasoning and build exploration",
      "ChatGPT for drafting, rewriting, and iteration",
      "Perplexity for cited research and validation",
      "Gemini for multimodal generation and comparative model understanding"
    ]
  }
} as const;

const educationDetails = {
  northeastern: {
    title: "Northeastern University",
    subtitle: "Master of Science in Data Analytics Engineering||Boston, MA",
    overview:
      "A graduate program that deepened my analytics and engineering base and helped me think in terms of data systems, modeling, optimization, and applied decision making.",
    bullets: [
      "Deepened my foundation in statistics, data mining, database design, and data driven modeling.",
      "Strengthened how I think about machine learning, optimization, data engineering, and analytics as connected systems.",
      "Improved my ability to move from raw data to structured analysis, decision support, and technically sound communication.",
      "Built the analytical depth that now supports how I approach data quality, governance, and responsible AI."
    ],
    tags: [
      "Statistics",
      "Data Mining",
      "Database Design",
      "Modeling",
      "Visualization",
      "Machine Learning",
      "Python",
      "R",
      "SQL"
    ],
    link: "https://graduate.northeastern.edu/programs/ms-data-analytics-engineering/master-of-science-in-data-analytics-engineering/"
  },
  nagpur: {
    title: "Rashtrasant Tukadoji Maharaj Nagpur University",
    subtitle: "Bachelor of Engineering in Computer Engineering||Maharashtra, India",
    overview:
      "The engineering foundation behind how I think today about systems, architecture, databases, programming, and the structure required to make both data quality and AI reliable.",
    bullets: [
      "Built strong foundations in mathematics, programming, algorithms, systems, databases, and software engineering.",
      "Developed the structural mindset that later became central to governance and control thinking.",
      "Learned to think in terms of architecture, constraints, and failure modes rather than only surface outputs.",
      "Gained early exposure to artificial intelligence and modern computing topics that later connected naturally to data and AI leadership."
    ],
    tags: [
      "Programming",
      "Algorithms",
      "Systems",
      "Databases",
      "Software Engineering",
      "Architecture",
      "Artificial Intelligence"
    ],
    link: null
  }
} as const;

const sectionIds = [
  "about",
  "journey",
  "experience",
  "education",
  "impact",
  "expertise",
  "thinking",
  "future",
  "contact"
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState<string>("about");
  const [drawerContent, setDrawerContent] = useState<DrawerContent>(null);

  const getSectionOffset = (id: string): number => {
    const map: Record<string, number> = {
      about: 94, journey: 78, experience: 84, education: 84,
      impact: 86, expertise: 88, thinking: 86, future: 86, contact: 88,
    };
    return map[id] ?? 84;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const target = document.getElementById(sectionId);
    if (!target) return;
    setActiveSection(sectionId);
    const top = window.scrollY + target.getBoundingClientRect().top - getSectionOffset(sectionId);
    window.history.replaceState(null, '', '#' + sectionId);
    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
  }, [theme]);

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];
      if (!sections.length) return;
      let current = sectionIds[0];
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= getSectionOffset(section.id) + 140) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    if (!cursor || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(animateRing);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animateRing();

    const hoverTargets = document.querySelectorAll<HTMLElement>(
      "a, button, .stat-card, .exp-item, .skill-card, .now-next-card, .metric-card, .core-chip, .edu-item"
    );

    const addHover = () => {
      cursor.classList.add("hover");
      ring.classList.add("hover");
    };
    const removeHover = () => {
      cursor.classList.remove("hover");
      ring.classList.remove("hover");
    };

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".metric-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          const valueEl = card.querySelector<HTMLElement>(".metric-value");
          if (!valueEl) return;

          const targetAttr = valueEl.getAttribute("data-target");
          const target = targetAttr ? parseInt(targetAttr, 10) : 0;
          if (!target) {
            observer.unobserve(card);
            return;
          }

          let current = 0;
          const isPercent = valueEl.dataset.type === "percent";
          const duration = 1200;
          const start = performance.now();

          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            current = Math.floor(target * progress);
            valueEl.textContent = isPercent
              ? `${current}%`
              : `${current.toLocaleString()}+`;
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          observer.unobserve(card);
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("drawer-open", !!drawerContent);
    return () => document.body.classList.remove("drawer-open");
  }, [drawerContent]);

  const drawerData = useMemo(() => {
    if (!drawerContent) return null;
    if (drawerContent.type === "competency") {
      return competencies[drawerContent.key as keyof typeof competencies];
    }
    if (drawerContent.type === "skill") {
      return skillDetails[drawerContent.key as keyof typeof skillDetails];
    }
    if (drawerContent.type === "education") {
      return educationDetails[drawerContent.key as keyof typeof educationDetails];
    }
    return experienceDetails[drawerContent.key];
  }, [drawerContent]);

  const isActiveNav = (section: string) => activeSection === section;

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      <header>
        <div className="nav-inner">
          <div className="logo">ABHINAY</div>

          <nav aria-label="Primary">
            <ul>
              <li>
                <a className={isActiveNav("about") ? "active" : ""} href="#about" onClick={(e) => handleNavClick(e, "about")}>
                  About
                </a>
              </li>
              <li>
                <a className={isActiveNav("journey") ? "active" : ""} href="#journey" onClick={(e) => handleNavClick(e, "journey")}>
                  Journey
                </a>
              </li>
              <li>
                <a
                  className={isActiveNav("experience") ? "active" : ""}
                  href="#experience"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  className={isActiveNav("education") ? "active" : ""}
                  href="#education"
                >
                  Education
                </a>
              </li>
              <li>
                <a className={isActiveNav("impact") ? "active" : ""} href="#impact" onClick={(e) => handleNavClick(e, "impact")}>
                  Impact
                </a>
              </li>
              <li>
                <a
                  className={isActiveNav("expertise") ? "active" : ""}
                  href="#expertise"
                >
                  Expertise
                </a>
              </li>
              <li>
                <a className={isActiveNav("thinking") ? "active" : ""} href="#thinking" onClick={(e) => handleNavClick(e, "thinking")}>
                  How I Think
                </a>
              </li>
              <li>
                <a className={isActiveNav("future") ? "active" : ""} href="#future" onClick={(e) => handleNavClick(e, "future")}>
                  Now &amp; Next
                </a>
              </li>
              <li>
                <a className={isActiveNav("contact") ? "active" : ""} href="#contact" onClick={(e) => handleNavClick(e, "contact")}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? "☾" : "☼"}
          </button>
        </div>
      </header>

      <main>
        <section id="hero" aria-labelledby="hero-title">
          <div className="hero-bg" />
          <div className="hero-grid" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="hero-inner">
            <p className="hero-tag">
              Vice President of Data Quality, Governance &amp; Responsible AI Leadership
            </p>
            <h1 className="hero-name" id="hero-title">
              Abhi<em>nay</em> Bhoikar
            </h1>
            <p className="hero-subtitle">
              I build disciplined data quality and governance foundations, then extend that
              same control mindset into how organizations understand and adopt AI.
            </p>

            <div className="hero-bottom">
              <p className="hero-narrative">
                From risk and finance data controls to governed AI assistants, my work sits
                where trust in data, regulatory expectations, and real world usage meet. I
                care about systems that hold up in committees, audits, and daily decisions,
                not just in slideware.
              </p>
              <a href="#about" className="hero-cta">
                <span>Enter the Story</span>
                <span>↓</span>
              </a>
            </div>
          </div>

          <div className="hero-counter">NEW YORK · 2026</div>
          <div className="hero-scroll-hint">
            <div className="scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        <section id="about" aria-labelledby="about-title">
          <div className="section-inner">
            <div className="section-label">About</div>
            <h2 className="section-title" id="about-title">
              Building trust into <em>enterprise data</em>
            </h2>

            <div className="about-grid">
              <motion.div
                className="about-text reveal"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <p>
                  I am <strong>Abhinay Dhanraj Bhoikar</strong>, a Data Quality and
                  Governance leader with CDO embedded experience at global financial
                  institutions, now working at the intersection of trusted data and
                  responsible AI adoption.
                </p>
                <p>
                  My work spans enterprise data quality frameworks, governance operating
                  models, critical data elements, regulatory controls, issue management,
                  and leadership routines that make accountability real.
                </p>
                <p>
                  I am equally focused on the next layer: helping organizations adopt AI
                  with more understanding, better guardrails, and stronger alignment to
                  data, compliance, and real business use.
                </p>
              </motion.div>

              <motion.div
                className="about-stats reveal"
                variants={sectionVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <div className="stat-card">
                  <div className="stat-num">VP</div>
                  <div className="stat-label">Current Level</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">2,500+</div>
                  <div className="stat-label">DQ Rules Engineered</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">9,000+</div>
                  <div className="stat-label">Controls Governed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">35%</div>
                  <div className="stat-label">Integrity Uplift</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="core-expertise" className="core-strip" aria-label="Core competencies">
          <div className="section-inner">
            <div className="core-chips">
              {[
                ["dqFrameworks", "Enterprise DQ Frameworks"],
                ["cdeGovernance", "CDE Governance"],
                ["regulatoryControls", "Regulatory Data Controls"],
                ["cdoModels", "CDO Operating Models"],
                ["imrLeadership", "IMR Leadership"],
                ["bcbs239", "BCBS 239"],
                ["dfs500", "NYDFS Part 500"],
                ["dama", "DAMA"]
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className="core-chip"
                  onClick={() => setDrawerContent({ type: "competency", key })}
                >
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="marquee-wrap" aria-hidden="true">
          <div className="marquee-inner">
            <div className="marquee-track">
              <div className="marquee-item">Data Quality</div>
              <div className="marquee-item">Governance</div>
              <div className="marquee-item">Critical Data Elements</div>
              <div className="marquee-item">Regulatory Controls</div>
              <div className="marquee-item">Issue Management</div>
              <div className="marquee-item">Responsible AI</div>
              <div className="marquee-item">AI Literacy</div>
              <div className="marquee-item">Governed Retrieval</div>

              <div className="marquee-item">Data Quality</div>
              <div className="marquee-item">Governance</div>
              <div className="marquee-item">Critical Data Elements</div>
              <div className="marquee-item">Regulatory Controls</div>
              <div className="marquee-item">Issue Management</div>
              <div className="marquee-item">Responsible AI</div>
              <div className="marquee-item">AI Literacy</div>
              <div className="marquee-item">Governed Retrieval</div>
            </div>
          </div>
        </div>

        <section id="journey" aria-labelledby="journey-title">
          <div className="section-inner">
            <div className="section-label">Journey</div>
            <h2 className="section-title" id="journey-title">
              Leadership, growth, and a widening focus on <em>AI</em>
            </h2>

            <div className="timeline">
              <div className="timeline-line" aria-hidden="true" />

              <div className="timeline-item reveal">
                <div className="timeline-content">
                  <div className="timeline-year">Jul 2025 to Present</div>
                  <div className="timeline-place">New York, NY</div>
                  <div className="timeline-role">Natixis North America LLC</div>
                  <p className="timeline-desc">
                    A decade in data quality and governance taught me one thing: institutional trust is engineered, not declared. I bring that discipline to AI, building assistants grounded in real constraints, leading teams from GenAI curiosity into governed practice, and turning responsible adoption from a stated value into how the work actually gets done.
                  </p>
                </div>
                <div className="timeline-dot">
                  <div className="timeline-dot-inner" />
                </div>
                <div />
              </div>

              <div className="timeline-item reveal">
                <div />
                <div className="timeline-dot">
                  <div className="timeline-dot-inner" />
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">Dec 2021 to Jun 2025</div>
                  <div className="timeline-place">New York, NY</div>
                  <div className="timeline-role">Santander Bank N.A.</div>
                  <p className="timeline-desc">
                    Santander is where scale changed everything. Data quality became less
                    about isolated rule work and more about enterprise trust, visible
                    controls, accountable issue management, and leadership routines that
                    made governance measurable.
                  </p>
                </div>
              </div>

              <div className="timeline-item reveal">
                <div className="timeline-content">
                  <div className="timeline-year">Apr 2021 to Nov 2021</div>
                  <div className="timeline-place">Boston, MA</div>
                  <div className="timeline-role">Servsys Corporation</div>
                  <p className="timeline-desc">
                    Servsys strengthened the execution layer by sharpening how I moved from
                    requirements to workflows, from technical logic to leadership useful
                    reporting, and from analysis to operational clarity.
                  </p>
                </div>
                <div className="timeline-dot">
                  <div className="timeline-dot-inner" />
                </div>
                <div />
              </div>

              <div className="timeline-item reveal">
                <div />
                <div className="timeline-dot">
                  <div className="timeline-dot-inner" />
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">Sep 2018 to Mar 2021</div>
                  <div className="timeline-place">Wardha, India</div>
                  <div className="timeline-role">Bumble Tech Solutions</div>
                  <p className="timeline-desc">
                    This phase made analytics practical and business facing. I learned how
                    to make data understandable, useful, and tied to decisions people were
                    actually making.
                  </p>
                </div>
              </div>

              <div className="timeline-item reveal">
                <div className="timeline-content">
                  <div className="timeline-year">Apr 2017 to May 2018</div>
                  <div className="timeline-place">Wardha, India</div>
                  <div className="timeline-role">L tech Labs</div>
                  <p className="timeline-desc">
                    This is where the technical foundation became visible through reporting,
                    models, dashboards, and the early realization that structure is what
                    makes later insight possible.
                  </p>
                </div>
                <div className="timeline-dot">
                  <div className="timeline-dot-inner" />
                </div>
                <div />
              </div>
            </div>
          </div>
        </section>

        <section id="experience" aria-labelledby="experience-title">
          <div className="section-inner">
            <div className="section-label">Experience</div>
            <h2 className="section-title" id="experience-title">
              Professional <em>track</em>
            </h2>

            <div className="exp-list">
              {(
                [
                  ["natixis", "Jul 2025 to Present", "Vice President, Data Quality & Governance", "Natixis North America LLC (CIB)", "Leading enterprise governance priorities and AI enablement initiatives across CIB Americas with stronger control discipline, metadata, issue management, and safe AI adoption."],
                  ["santander", "Dec 2021 to Jun 2025", "Assistant Vice President, Data Quality", "Santander Bank N.A.", "Led enterprise data quality execution, stronger scorecards, more disciplined control delivery, and governance patterns that improved visibility, accountability, and trust."],
                  ["servsys", "Apr 2021 to Nov 2021", "Data Analyst Engineer", "Servsys Corporation", "Strengthened the bridge between requirements, technical workflows, reporting logic, and leadership useful analytics."],
                  ["bumble", "Sep 2018 to Mar 2021", "Data Analyst", "Bumble Tech Solutions", "Built practical analytics skills by turning business data into dashboards, decisions, and clearer communication."],
                  ["ltech", "Apr 2017 to May 2018", "Data Analyst", "L tech Labs", "Built early reporting and analytical foundations that later expanded into governance and control thinking."]
                ] as const
              ).map(([key, year, role, company, desc]) => (
                <article
                  key={key}
                  className="exp-item"
                  onClick={() => setDrawerContent({ type: "experience", key })}
                >
                  <div className="exp-year">{year}</div>
                  <div>
                    <h3 className="exp-role">{role}</h3>
                    <p className="exp-company">{company}</p>
                    <p className="exp-desc">{desc}</p>
                    <span className="card-tooltip">Click to explore</span>
                  </div>
                  <div className="exp-arrow" aria-hidden="true">
                    →
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" aria-labelledby="education-title">
          <div className="section-inner">
            <div className="section-label">Education</div>
            <h2 className="section-title" id="education-title">
              Technical depth behind the <em>story</em>
            </h2>

            <div className="edu-grid">
              <button
                type="button"
                className="edu-item"
                onClick={() => setDrawerContent({ type: "education", key: "northeastern" })}
              >
                <div className="edu-year">Graduate</div>
                <div>
                  <h3 className="edu-degree">Northeastern University</h3>
                  <p className="edu-school">
                    Master of Science in Data Analytics Engineering · Boston, MA
                  </p>
                  <p className="edu-desc">
                    Advanced the foundation across analytics, modeling, data systems,
                    engineering discipline, and the kind of technical depth that now
                    supports how I think about AI and governed data environments.
                  </p>
                </div>
                <span className="card-tooltip">Click to explore</span>
              </button>

              <button
                type="button"
                className="edu-item"
                onClick={() => setDrawerContent({ type: "education", key: "nagpur" })}
              >
                <div className="edu-year">Undergraduate</div>
                <div>
                  <h3 className="edu-degree">
                    Rashtrasant Tukadoji Maharaj Nagpur University
                  </h3>
                  <p className="edu-school">
                    Bachelor of Engineering in Computer Engineering · Maharashtra, India
                  </p>
                  <p className="edu-desc">
                    Built the engineering base behind how I think today about programming,
                    systems, databases, architecture, and the structure required to make
                    both data quality and AI reliable.
                  </p>
                </div>
                <span className="card-tooltip">Click to explore</span>
              </button>
            </div>
          </div>
        </section>

        <section id="impact" aria-labelledby="impact-title">
          <div className="section-inner">
            <div className="section-label">Impact</div>
            <h2 className="section-title" id="impact-title">
              Results, scale, and <em>influence</em>
            </h2>

            <div className="impact-grid">
              <div className="impact-block">
                <h3 className="impact-heading">Results</h3>
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div className="metric-value" data-target="2500">
                      2,500+
                    </div>
                    <div className="metric-label">DQ Rules</div>
                    <p className="metric-note">
                      Engineered across risk, finance, retail, and commercial data.
                    </p>
                  </div>
                  <div className="metric-card">
                    <div className="metric-value" data-target="9000">
                      9,000+
                    </div>
                    <div className="metric-label">Controls</div>
                    <p className="metric-note">
                      Governed across enterprise scorecards and source systems.
                    </p>
                  </div>
                  <div className="metric-card">
                    <div className="metric-value" data-target="35" data-type="percent">
                      35%
                    </div>
                    <div className="metric-label">Integrity Uplift</div>
                    <p className="metric-note">
                      Improved data integrity through stronger control design and issue
                      remediation.
                    </p>
                  </div>
                  <div className="metric-card">
                    <div className="metric-value" data-target="20" data-type="percent">
                      20%
                    </div>
                    <div className="metric-label">Faster Deployment</div>
                    <p className="metric-note">
                      Reduced production timelines while improving governance discipline.
                    </p>
                  </div>
                </div>
              </div>

              <div className="impact-block impact-copy-block">
                <div>
                  <h3 className="impact-heading">Scale</h3>
                  <ul className="impact-list">
                    <li>Tier 1 financial institutions and complex reporting environments</li>
                    <li>Coverage across Risk, Finance, Regulatory Reporting, Product Control, and Operations</li>
                    <li>Critical data elements, scorecards, issue forums, and executive visibility</li>
                  </ul>
                </div>

                <div>
                  <h3 className="impact-heading">Influence</h3>
                  <ul className="impact-list">
                    <li>Led cross functional governance rhythms and remediation forums</li>
                    <li>Led AI literacy and safe adoption conversations for business teams</li>
                    <li>Connected policy, controls, behavior, and real operating expectations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="expertise" aria-labelledby="expertise-title">
          <div className="section-inner">
            <div className="section-label">Expertise</div>
            <h2 className="section-title" id="expertise-title">
              What I <em>build</em>, govern, and lead
            </h2>

            <div className="skills-grid">
              {(
                [
                  ["governanceAi", "01", "Data Quality, Governance, and Responsible AI Leadership", "I operate where enterprise control discipline meets practical AI adoption and leadership level governance."],
                  ["enterpriseOps", "02", "Enterprise Governance and Regulatory Operations", "I turn policy, expectations, and control language into routines, scorecards, accountability, and operating structure."],
                  ["aiPractice", "03", "AI in Practice", "I stay hands on with leading models so I understand how they actually reason, draft, search, and generate, then translate that understanding into better governance conversations."]
                ] as const
              ).map(([key, num, title, desc]) => (
                <button
                  key={key}
                  type="button"
                  className="skill-card"
                  data-num={num}
                  onClick={() => setDrawerContent({ type: "skill", key })}
                >
                  <h3 className="skill-title">{title}</h3>
                  <p className="skill-desc">{desc}</p>
                  <span className="card-tooltip">Click to explore</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="thinking" aria-labelledby="thinking-title">
          <div className="section-inner">
            <div className="section-label">How I Think</div>
            <h2 className="section-title" id="thinking-title">
              Governance builds trust, and the same logic must extend into <em>AI</em>
            </h2>

            <div className="philosophy-grid">
              <div className="manifesto reveal">
                I do not believe governance should slow people down. I believe it should
                make good judgment easier by giving teams better structure, stronger
                controls, clearer responsibilities, and more confidence in the data and AI
                systems they rely on.
              </div>

              <div className="principles">
                <div className="principle">
                  <div className="principle-title">Trust in data is designed</div>
                  <p className="principle-text">
                    Reliable data comes from ownership, control logic, lineage, scorecards,
                    issue management, and follow through, not from policy language alone.
                  </p>
                </div>
                <div className="principle">
                  <div className="principle-title">Compliance is operational</div>
                  <p className="principle-text">
                    Good governance is not decorative. It becomes real when people know how
                    to apply it, how to measure it, and what happens when it fails.
                  </p>
                </div>
                <div className="principle">
                  <div className="principle-title">AI needs the right foundation before scale</div>
                  <p className="principle-text">
                    Sustainable AI adoption requires both human readiness and system architecture.
                    Teams need to understand what AI can and cannot do, and the infrastructure
                    must be built on access controls, retrieval logic, and data ownership.
                    Capability without that foundation creates risk faster than it creates value.
                  </p>
                </div>
                <div className="principle">
                  <div className="principle-title">Responsible AI is governed AI</div>
                  <p className="principle-text">
                    The same governance logic that makes data trustworthy applies to AI systems.
                    Classification, confidentiality, lineage, and operating discipline do not go
                    on pause when an assistant enters the workflow. They become more important.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="future" aria-labelledby="future-title">
          <div className="section-inner">
            <div className="section-label">Now / Next</div>
            <h2 className="section-title" id="future-title">
              What I am building <em>now</em>
            </h2>

            <div className="now-next-grid">
              <div className="now-next-card">
                <div className="now-next-label">Current Focus</div>
                <h3 className="now-next-title">AI in Practice</h3>
                <ul className="now-next-list">
                  <li>Led awareness around what AI, machine learning, generative AI, and emerging agentic systems actually mean in practice</li>
                  <li>Guided safe internal use patterns for summarization, rewriting, drafting, and governed knowledge access</li>
                  <li>Use Claude for deeper reasoning and development adjacent exploration</li>
                  <li>Use ChatGPT for drafting, reformulation, and faster communication workflows</li>
                  <li>Use Perplexity for fast research with linked sources and validation</li>
                  <li>Use Gemini for multimodal generation, comparison, and richer content exploration</li>
                </ul>
              </div>

              <div className="now-next-card">
                <div className="now-next-label">Next Direction</div>
                <h3 className="now-next-title">Larger platforms, broader influence</h3>
                <ul className="now-next-list">
                  <li>Expanding from framework ownership into broader enterprise governance leadership</li>
                  <li>Building programs where data quality, governance, and responsible AI form one connected leadership agenda</li>
                  <li>Working with organizations that want innovation with control, not innovation without discipline</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-title">
          <div className="section-inner contact-inner">
            <p className="contact-eyebrow">Let&apos;s connect</p>
            <h2 className="contact-title" id="contact-title">
              Bring rigor to your <em>data and AI story</em>
            </h2>
            <p className="contact-text">
              Based in New York, NY and open to on site or hybrid opportunities. If you
              are building a Data Office, governance program, or responsible AI operating
              model, I would love to connect.
            </p>

            <div className="contact-links">
              <a className="contact-link" href="mailto:abhinaybhoikar92@gmail.com">
                <span>Email</span>
              </a>
              <a className="contact-link" href="tel:+18578698973">
                <span>Call</span>
              </a>
              <a
                className="contact-link"
                href="https://www.linkedin.com/in/abhinaybhoikar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>LinkedIn</span>
              </a>
              <a
                className="contact-link"
                href="#"
                aria-label="Download resume by replacing this link with your hosted PDF"
              >
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-left">ABHINAY</div>
        <div>Data · Governance · Responsible AI · New York, NY · 2026</div>
      </footer>

      {drawerContent && drawerData && (
        <>
          <button
            type="button"
            className="drawer-backdrop"
            aria-label="Close drawer"
            onClick={() => setDrawerContent(null)}
          />
          <aside className="drawer" aria-label="Detail drawer">
            <div className="drawer-header">
              <div>
                <p className="drawer-eyebrow">
                  {drawerContent.type === "competency"
                    ? "Core Competency"
                    : drawerContent.type === "skill"
                      ? "Expertise Detail"
                      : drawerContent.type === "education"
                        ? "Education Detail"
                        : "Experience Detail"}
                </p>
                <h2 className="drawer-title">{drawerData.title}</h2>
                {"subtitle" in drawerData && drawerData.subtitle ? (
                  <p className="drawer-subtitle">
                    {drawerData.subtitle.includes("||")
                      ? drawerData.subtitle.split("||").map((line, i) => (
                          <span key={i} style={{display: "block"}}>{line}</span>
                        ))
                      : drawerData.subtitle}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                className="drawer-close"
                onClick={() => setDrawerContent(null)}
                aria-label="Close drawer"
              >
                ×
              </button>
            </div>

            {drawerContent.type === "competency" && (
              <div className="drawer-body">
                <p className="drawer-summary">{drawerData.summary}</p>
                <div className="drawer-section">
                  <h3>What it means</h3>
                  <p>{drawerData.meaning}</p>
                </div>
                <div className="drawer-section">
                  <h3>How I implemented it</h3>
                  <p>{drawerData.implementation}</p>
                </div>
                <div className="drawer-section">
                  <h3>{drawerData.visualTitle}</h3>
                  <div className="visual-flow">
                    {drawerData.visualSteps.map((step: string) => (
                      <span key={step} className="visual-step">
                        <span>{step}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="drawer-section">
                  <h3>Why it matters</h3>
                  <ul className="drawer-list">
                    {drawerData.bullets.map((bullet: string) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
                {drawerData.link && (
                  <a
                    className="drawer-link"
                    href={drawerData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View official source
                  </a>
                )}
              </div>
            )}

            {drawerContent.type === "skill" && (
              <div className="drawer-body">
                <p className="drawer-summary">{drawerData.intro}</p>
                <div className="drawer-section">
                  <h3>What it means</h3>
                  <p>{drawerData.meaning}</p>
                </div>
                <div className="drawer-section">
                  <h3>How I apply it</h3>
                  <p>{drawerData.application}</p>
                </div>
                <div className="drawer-section">
                  <h3>Key methods</h3>
                  <ul className="drawer-list">
                    {drawerData.methods.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {drawerContent.type === "education" && (
              <div className="drawer-body">
                <p className="drawer-summary">{drawerData.overview}</p>
                <div className="drawer-section">
                  <h3>What I learned</h3>
                  <ul className="drawer-list">
                    {drawerData.bullets.map((bullet: string) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
                <div className="drawer-section">
                  <h3>Key themes</h3>
                  <div className="drawer-tags">
                    {drawerData.tags.map((tag: string) => (
                      <span key={tag} className="drawer-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {drawerData.link && (
                  <a
                    className="drawer-link"
                    href={drawerData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View official program
                  </a>
                )}
              </div>
            )}

            {drawerContent.type === "experience" && (
              <div className="drawer-body">
                <p className="drawer-summary">{drawerData.overview}</p>
                <div className="drawer-section">
                  <h3>Key responsibilities</h3>
                  <ul className="drawer-list">
                    {drawerData.bullets.map((bullet: string) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
                <div className="drawer-section">
                  <h3>Tools and stack</h3>
                  <div className="drawer-tags">
                    {drawerData.tools.map((tool: string) => (
                      <span key={tool} className="drawer-tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="drawer-section">
                  <h3>Impact and themes</h3>
                  <ul className="drawer-list">
                    {drawerData.impact.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </aside>
        </>
      )}
    </>
  );
};

export default App;
