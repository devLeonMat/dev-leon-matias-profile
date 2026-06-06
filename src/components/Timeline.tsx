import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "./ui/badge";
import { MapPin } from "lucide-react";
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
    ],
    current: true,
  },
  {
    period: "Mar 2023 – Dec 2024",
    company: "Outcoding",
    role: "Senior Full Stack Engineer",
    location: "Remote · USA 🇺🇸",
    logo: outcodingLogo,
    tech: ["Angular", "Java 17", "Hexagonal Arch", "Kubernetes", "Azure", "PostgreSQL"],
    tasksKeys: [
      "companies.outcoding.task1",
      "companies.outcoding.task2",
      "companies.outcoding.task3",
      "companies.outcoding.task4",
    ],
  },
  {
    period: "Jun 2022 – May 2023",
    company: "Globant",
    role: "Senior Full Stack Engineer",
    location: "Remote · USA 🇺🇸",
    initials: "G",
    initialsColor: "#00AC70",
    tech: ["Java", "Angular", "Spring Cloud", "Feign", "CI/CD"],
    tasksKeys: [
      "companies.globant.task1",
      "companies.globant.task2",
      "companies.globant.task3",
    ],
  },
  {
    period: "Jan 2021 – Jan 2022",
    company: "The Bridge Social",
    role: "Full Stack Engineer",
    location: "Remote · USA 🇺🇸",
    initials: "TB",
    initialsColor: "#6366F1",
    tech: ["Java", "Spring Boot", "Kafka", "React", "Azure"],
    tasksKeys: [
      "companies.bridge.task1",
      "companies.bridge.task2",
      "companies.bridge.task3",
    ],
  },
];

const Timeline = () => {
  const { t } = useLanguage();

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

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-10">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="relative flex gap-8 md:gap-0 animate-fade-in"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 z-10">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-background"
                    style={{
                      background: entry.current ? "rgb(34 197 94)" : "hsl(var(--primary))",
                      boxShadow: `0 0 0 3px ${entry.current ? "rgb(34 197 94 / 0.25)" : "hsl(var(--primary) / 0.25)"}`,
                    }}
                  />
                </div>

                {/* Period — left side desktop */}
                <div className="hidden md:flex md:w-1/2 pr-10 justify-end items-start pt-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-muted-foreground">{entry.period}</p>
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
                      {entry.current && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ background: "rgb(34 197 94 / 0.1)", color: "rgb(34 197 94)", border: "1px solid rgb(34 197 94 / 0.3)" }}>
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      {/* Logo or initials */}
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
                        {entry.logo ? (
                          <img src={entry.logo} alt={entry.company} className="w-full h-full object-contain p-1.5" />
                        ) : (
                          <span
                            className="text-sm font-bold text-white"
                            style={{ background: entry.initialsColor, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            {entry.initials}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base">{entry.company}</h3>
                          {entry.current && (
                            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                              style={{ background: "rgb(34 197 94 / 0.1)", color: "rgb(34 197 94)", border: "1px solid rgb(34 197 94 / 0.3)" }}>
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-primary font-medium">{entry.role}</p>
                        <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground md:hidden">
                          <MapPin className="h-3 w-3" />
                          {entry.location}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-1.5 mb-4">
                      {entry.tasksKeys.map((key) => (
                        <li key={key} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5 shrink-0">▸</span>
                          {t(key)}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {entry.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs bg-primary/8 text-primary/80 border border-primary/15 hover:bg-primary/15 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Earlier career note */}
            <div className="relative flex gap-8 md:gap-0 animate-fade-in" style={{ animationDelay: "320ms" }}>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 z-10">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 border-2 border-background" />
              </div>
              <div className="hidden md:block md:w-1/2" />
              <div className="ml-12 md:ml-0 md:w-1/2 md:pl-10">
                <p className="text-xs text-muted-foreground italic pt-3">
                  Earlier: INDRA (BCP, RIMAC), Globant, Michael Page (Intercorp), Zoluxiones (SURA), Experis (Equifax), Olva Courier, LimaW — Banking, Insurance, Retail, Logistics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
