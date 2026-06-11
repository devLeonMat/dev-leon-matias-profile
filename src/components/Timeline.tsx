import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, ChevronDown } from "lucide-react";
import { animate, stagger } from "animejs";
import outcodingLogo from "@/assets/brands/outcoding.svg";
import dacodes from "@/assets/brands/dacodes.webp";

interface TimelineEntry {
  period: string;
  company: string;
  role: string;
  location: string;
  logo?: string;
  initials?: string;
  initialsColor?: string;
  tech: string[];
  tasksKeys: string[];
  current?: boolean;
}

const entries: TimelineEntry[] = [
  {
    period: "Jan 2025 – Present",
    company: "Dacodes",
    role: "Lead Software Engineer",
    location: "Remote · USA 🇺🇸",
    logo: dacodes,
    tech: ["React 18", "Scala", "Oracle 19c", "AWS Lambda", "S3", "RDS", "CloudWatch"],
    tasksKeys: [
      "companies.dacodes.task1",
      "companies.dacodes.task2",
      "companies.dacodes.task3",
      "companies.dacodes.task4",
      "companies.dacodes.task5",
    ],
    current: true,
  },
  {
    period: "Mar 2023 – Dec 2024",
    company: "Outcoding",
    role: "Senior Full Stack Engineer",
    location: "Remote · USA 🇺🇸",
    logo: outcodingLogo,
    tech: ["Angular", "Java 17", "Hexagonal Arch", "Kubernetes", "Azure AD", "PostgreSQL", "OAuth 2.0"],
    tasksKeys: [
      "companies.outcoding.task1",
      "companies.outcoding.task2",
      "companies.outcoding.task3",
      "companies.outcoding.task4",
      "companies.outcoding.task5",
    ],
  },
  {
    period: "Jun 2022 – May 2023",
    company: "Globant",
    role: "Senior Full Stack Engineer",
    location: "Remote · USA 🇺🇸",
    initials: "G",
    initialsColor: "#00AC70",
    tech: ["Java", "Angular", "Spring Cloud", "Spring WebFlux", "Feign", "CI/CD"],
    tasksKeys: [
      "companies.globant.task1",
      "companies.globant.task2",
      "companies.globant.task3",
      "companies.globant.task4",
    ],
  },
  {
    period: "Jan 2021 – Jan 2022",
    company: "The Bridge Social",
    role: "Full Stack Engineer",
    location: "Remote · USA 🇺🇸",
    initials: "TB",
    initialsColor: "#6366F1",
    tech: ["Java 11", "Spring Boot", "Kafka", "React", "Redux", "Azure", "AKS", "ELK"],
    tasksKeys: [
      "companies.bridge.task1",
      "companies.bridge.task2",
      "companies.bridge.task3",
      "companies.bridge.task4",
    ],
  },
];

const techLogoMap: Record<string, string> = {
  "React 18": "https://svglogos.dev/logos/react.svg",
  "React": "https://svglogos.dev/logos/react.svg",
  "Scala": "https://svglogos.dev/logos/scala.svg",
  "AWS Lambda": "https://svglogos.dev/logos/aws-lambda.svg",
  "S3": "https://svglogos.dev/logos/aws-s3.svg",
  "RDS": "https://svglogos.dev/logos/aws-rds.svg",
  "CloudWatch": "https://svglogos.dev/logos/aws-cloudwatch.svg",
  "AWS": "https://svglogos.dev/logos/aws.svg",
  "Angular": "https://svglogos.dev/logos/angular-icon.svg",
  "Java 17": "https://svglogos.dev/logos/java.svg",
  "Java 11": "https://svglogos.dev/logos/java.svg",
  "Java": "https://svglogos.dev/logos/java.svg",
  "Kubernetes": "https://svglogos.dev/logos/kubernetes.svg",
  "Azure": "https://svglogos.dev/logos/microsoft-azure.svg",
  "Azure AD": "https://svglogos.dev/logos/microsoft-azure.svg",
  "PostgreSQL": "https://svglogos.dev/logos/postgresql.svg",
  "Spring Cloud": "https://svglogos.dev/logos/spring.svg",
  "Spring Boot": "https://svglogos.dev/logos/spring-icon.svg",
  "Spring WebFlux": "https://svglogos.dev/logos/spring.svg",
  "Kafka": "https://svglogos.dev/logos/kafka.svg",
  "Redux": "https://svglogos.dev/logos/redux.svg",
  "Docker": "https://svglogos.dev/logos/docker-icon.svg",
  "AKS": "https://svglogos.dev/logos/microsoft-azure.svg",
  "ELK": "https://svglogos.dev/logos/elastic.svg",
};

function TechBadge({ name }: { name: string }) {
  const logo = techLogoMap[name];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold
      bg-muted text-foreground/80 border border-border
      hover:bg-primary/10 hover:text-primary hover:border-primary/30
      transition-colors cursor-default">
      {logo && (
        <img src={logo} alt={name} className="w-3 h-3 object-contain shrink-0"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      )}
      {name}
    </span>
  );
}

function AccordionItem({ entry, index, defaultOpen }: {
  entry: TimelineEntry;
  index: number;
  defaultOpen: boolean;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(defaultOpen);
  const bodyRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Animate height on toggle
  useEffect(() => {
    const body = bodyRef.current;
    const inner = innerRef.current;
    if (!body || !inner) return;
    const h = inner.scrollHeight;
    if (open) {
      body.style.height = "0px";
      body.style.overflow = "hidden";
      animate(body, { height: [0, h], opacity: [0, 1], duration: 320, ease: "outCubic",
        onComplete: () => { body.style.height = "auto"; body.style.overflow = "visible"; }
      });
    } else {
      body.style.height = `${h}px`;
      body.style.overflow = "hidden";
      animate(body, { height: [h, 0], opacity: [1, 0], duration: 260, ease: "inCubic" });
    }
  }, [open]);

  return (
    <div
      className="border border-border rounded-xl overflow-hidden bg-card transition-shadow hover:shadow-md"
      style={{ boxShadow: open ? "var(--shadow-elevated)" : "var(--shadow-card)" }}
    >
      {/* Header — always visible, click to toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-center gap-4 group"
        aria-expanded={open}
      >
        {/* Logo */}
        <div className="w-11 h-11 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0 border border-border/60">
          {entry.logo ? (
            <img src={entry.logo} alt={entry.company} className="w-full h-full object-contain p-1.5" />
          ) : (
            <span className="text-sm font-bold text-white w-full h-full flex items-center justify-center rounded-lg"
              style={{ background: entry.initialsColor }}>
              {entry.initials}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-base">{entry.company}</span>
            {entry.current && <CurrentBadge />}
          </div>
          <p className="text-sm text-primary font-semibold">{entry.role}</p>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground flex-wrap">
            <span>{entry.period}</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />{entry.location}
            </span>
          </div>
        </div>

        {/* Chevron */}
        <ChevronDown
          className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Expandable body */}
      <div ref={bodyRef} style={{ height: defaultOpen ? "auto" : "0px", opacity: defaultOpen ? 1 : 0, overflow: defaultOpen ? "visible" : "hidden" }}>
        <div ref={innerRef} className="px-5 pb-5 border-t border-border/60">
          {/* Bullets */}
          <ul className="space-y-2 mt-4 mb-4">
            {entry.tasksKeys.map((key) => (
              <li key={key} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary mt-0.5 shrink-0 font-bold">▸</span>
                {t(key)}
              </li>
            ))}
          </ul>
          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
            {entry.tech.map((tech) => <TechBadge key={tech} name={tech} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function CurrentBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: "rgb(34 197 94 / 0.1)", color: "rgb(34 197 94)", border: "1px solid rgb(34 197 94 / 0.3)" }}>
      <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
      Current
    </span>
  );
}

const Timeline = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !played.current) {
        played.current = true;
        const items = Array.from(el.querySelectorAll("[data-item]")) as HTMLElement[];
        animate(items, {
          translateY: [24, 0],
          opacity: [0, 1],
          duration: 500,
          delay: stagger(80),
          ease: "outCubic",
        });
        observer.disconnect();
      }
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("timeline.title")}{" "}
            <span className="text-gradient">{t("timeline.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("timeline.subtitle")}</p>
        </div>

        <div ref={sectionRef} className="space-y-3">
          {entries.map((entry, index) => (
            <div key={index} data-item style={{ opacity: 0 }}>
              <AccordionItem entry={entry} index={index} defaultOpen={index === 0} />
            </div>
          ))}

          {/* Earlier */}
          <p className="text-xs text-muted-foreground/70 italic text-center pt-2 leading-relaxed">
            Earlier: INDRA (BCP, RIMAC Seguros) · Michael Page (Intercorp Retail) · Zoluxiones (SURA Perú) · Experis (Equifax) · Olva Courier · LimaW
            <br />
            <span className="text-muted-foreground/50">Banking · Insurance · Retail · Logistics · Financial Services</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
