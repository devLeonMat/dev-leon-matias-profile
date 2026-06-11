import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "./ui/badge";
import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
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

const Timeline = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true;

          // Line draw animation
          const line = el.querySelector<HTMLElement>(".timeline-line");
          if (line) {
            animate(line, { scaleY: [0, 1], duration: 900, ease: "outCubic" });
          }

          // Cards stagger slide-in
          const cards = Array.from(el.querySelectorAll("[data-timeline-card]")) as HTMLElement[];
          animate(cards, {
            translateX: [-40, 0],
            opacity: [0, 1],
            duration: 600,
            delay: stagger(150, { start: 200 }),
            ease: "outCubic",
          });

          // Dots pop
          const dots = Array.from(el.querySelectorAll("[data-timeline-dot]")) as HTMLElement[];
          animate(dots, {
            scale: [0, 1],
            duration: 400,
            delay: stagger(150, { start: 300 }),
            ease: "outBack",
          });

          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("timeline.title")}{" "}
            <span className="text-gradient">{t("timeline.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("timeline.subtitle")}</p>
        </div>

        <div ref={containerRef} className="relative">
          {/* Vertical line */}
          <div
            className="timeline-line absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/70 via-primary/40 to-transparent -translate-x-1/2 origin-top"
          />

          <div className="space-y-10">
            {entries.map((entry, index) => (
              <div key={index} className="relative flex gap-8 md:gap-0" style={{ opacity: 0 }} data-timeline-card>

                {/* Timeline dot */}
                <div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 z-10"
                  data-timeline-dot
                  style={{ transform: "scale(0)" }}
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full border-2 border-background"
                    style={{
                      background: entry.current ? "rgb(34 197 94)" : "hsl(var(--primary))",
                      boxShadow: `0 0 0 4px ${entry.current ? "rgb(34 197 94 / 0.2)" : "hsl(var(--primary) / 0.2)"}`,
                    }}
                  />
                </div>

                {/* Period — left side desktop */}
                <div className="hidden md:flex md:w-1/2 pr-10 justify-end items-start pt-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground/70">{entry.period}</p>
                    <div className="flex items-center gap-1 justify-end mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {entry.location}
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div className="ml-12 md:ml-0 md:w-1/2 md:pl-10">
                  <div className="card-elevated rounded-xl p-5 hover-lift transition-all">
                    {/* Mobile period */}
                    <div className="flex items-center gap-2 mb-3 md:hidden">
                      <p className="text-xs font-medium text-muted-foreground">{entry.period}</p>
                      {entry.current && <CurrentBadge />}
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
                        {entry.logo ? (
                          <img src={entry.logo} alt={entry.company} className="w-full h-full object-contain p-1.5" />
                        ) : (
                          <span
                            className="text-sm font-bold text-white w-full h-full flex items-center justify-center"
                            style={{ background: entry.initialsColor }}
                          >
                            {entry.initials}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base">{entry.company}</h3>
                          {entry.current && <span className="hidden md:inline-flex"><CurrentBadge /></span>}
                        </div>
                        <p className="text-sm text-primary font-semibold">{entry.role}</p>
                        <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground md:hidden">
                          <MapPin className="h-3 w-3" />{entry.location}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {entry.tasksKeys.map((key) => (
                        <li key={key} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                          <span className="text-primary mt-0.5 shrink-0 font-bold">▸</span>
                          {t(key)}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                      {entry.tech.map((tech) => (
                        <TechBadge key={tech} name={tech} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Earlier career */}
            <div className="relative flex gap-8 md:gap-0">
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-3 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30 border-2 border-background" />
              </div>
              <div className="hidden md:block md:w-1/2" />
              <div className="ml-12 md:ml-0 md:w-1/2 md:pl-10">
                <p className="text-xs text-muted-foreground italic pt-2 leading-relaxed">
                  Earlier: INDRA (BCP, RIMAC Seguros) · Michael Page (Intercorp Retail) · Zoluxiones (SURA Perú) · Experis (Equifax) · Olva Courier · LimaW
                  <br />
                  <span className="text-muted-foreground/60">Banking · Insurance · Retail · Logistics · Financial Services</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function CurrentBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: "rgb(34 197 94 / 0.1)", color: "rgb(34 197 94)", border: "1px solid rgb(34 197 94 / 0.3)" }}
    >
      <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
      Current
    </span>
  );
}

/** Tech badge using svglogos.dev */
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
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold
        bg-muted text-foreground/80 border border-border
        hover:bg-primary/10 hover:text-primary hover:border-primary/30
        transition-colors mt-1 cursor-default"
    >
      {logo && (
        <img
          src={logo}
          alt={name}
          className="w-3 h-3 object-contain shrink-0"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      )}
      {name}
    </span>
  );
}

export default Timeline;
