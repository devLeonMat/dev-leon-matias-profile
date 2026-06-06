import { Code2, Rocket, Globe } from "lucide-react";
import { Card } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const metrics = [
  { value: "12+", label: "Years of Engineering" },
  { value: "3", label: "US Companies" },
  { value: "5+", label: "Industries Served" },
  { value: "∞", label: "Coffee Consumed" },
];

const About = () => {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Code2,
      title: t("about.highlight1.title"),
      description: t("about.highlight1.desc"),
    },
    {
      icon: Rocket,
      title: t("about.highlight2.title"),
      description: t("about.highlight2.desc"),
    },
    {
      icon: Globe,
      title: t("about.highlight3.title"),
      description: t("about.highlight3.desc"),
    },
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

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 animate-fade-in">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="card-elevated p-6 text-center hover-lift rounded-xl"
            >
              <p className="text-3xl font-bold text-gradient mb-1">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-4 animate-fade-in">
            <p className="text-lg leading-relaxed text-foreground">
              {t("about.p1")}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("about.p2")}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("about.p3")}
            </p>
          </div>

          <div className="grid gap-4">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="p-5 hover-lift transition-all animate-fade-in"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
