import { useRef, useEffect } from "react";
import { Code2, Rocket, Globe } from "lucide-react";
import { Card } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAnimeOnScroll } from "@/hooks/use-anime";
import { animate, stagger } from "animejs";

const metrics = [
  { value: 12, suffix: "+", label: "Years of Engineering" },
  { value: 4, suffix: "", label: "US Companies" },
  { value: 5, suffix: "+", label: "Industries Served" },
  { value: 50, suffix: "+", label: "Microservices Built" },
];

const About = () => {
  const { t } = useLanguage();

  const highlightsRef = useAnimeOnScroll((targets) =>
    animate(targets as HTMLElement[], {
      translateX: [-32, 0],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(120),
      ease: "outCubic",
    })
  );

  const metricsRef = useAnimeOnScroll((targets) =>
    animate(targets as HTMLElement[], {
      scale: [0.85, 1],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(80),
      ease: "outBack",
    })
  );

  const highlights = [
    { icon: Code2, title: t("about.highlight1.title"), description: t("about.highlight1.desc") },
    { icon: Rocket, title: t("about.highlight2.title"), description: t("about.highlight2.desc") },
    { icon: Globe, title: t("about.highlight3.title"), description: t("about.highlight3.desc") },
  ];

  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("about.title")}{" "}
            <span className="text-gradient">{t("about.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Metrics with countUp */}
        <div ref={metricsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>

        {/* Bio + illustration + highlights */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio text */}
          <div className="space-y-4 animate-fade-in">
            <p className="text-lg leading-relaxed text-foreground font-medium">
              {t("about.p1")}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("about.p2")}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("about.p3")}
            </p>

            {/* Certifications strip */}
            <div className="flex flex-wrap gap-2 pt-4">
              {[
                "AWS Solutions Architect",
                "B.S. Systems Engineering",
                "Advanced Java · Cibertec",
                "Angular Professional · Cibertec",
              ].map((cert) => (
                <span key={cert} className="badge-pill text-xs">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Storyset illustration + highlights */}
          <div className="space-y-4">
            {/* Illustration */}
            <div className="flex justify-center mb-2">
              <img
                src="https://storyset.com/illustration/programming/pana"
                alt="Developer illustration"
                className="w-56 h-56 object-contain opacity-90 dark:opacity-70"
                loading="lazy"
              />
            </div>

            {/* Highlights with anime.js */}
            <div ref={highlightsRef} className="space-y-3">
              {highlights.map((item, index) => (
                <Card
                  key={index}
                  data-anime
                  className="p-4 hover-lift transition-all opacity-0"
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-0.5">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Individual metric card with countUp */
function MetricCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref } = useMetricCountUp(value);
  return (
    <div data-anime className="card-elevated p-6 text-center hover-lift rounded-xl">
      <p className="text-3xl font-bold text-gradient mb-1">
        <span ref={ref}>0</span>{suffix}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

/** Inline countUp using IntersectionObserver */
function useMetricCountUp(target: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !played.current) {
        played.current = true;
        const obj = { val: 0 };
        animate(obj, {
          val: target,
          duration: 1200,
          ease: "outExpo",
          onUpdate: () => { if (ref.current) ref.current.textContent = Math.round(obj.val).toString(); },
        });
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return { ref };
}

export default About;
