import { Code2, Rocket, Users } from "lucide-react";
import { Card } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Code2,
      title: t("about.highlight1.title"),
      description: t("about.highlight1.desc")
    },
    {
      icon: Rocket,
      title: t("about.highlight2.title"),
      description: t("about.highlight2.desc")
    },
    {
      icon: Users,
      title: t("about.highlight3.title"),
      description: t("about.highlight3.desc")
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("about.title")} <span className="text-gradient">{t("about.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-4 animate-fade-in">
            <p className="text-lg leading-relaxed">
              {t("about.p1")}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t("about.p2")}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t("about.p3")}
            </p>
          </div>

          <div className="relative animate-scale-in">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border-glow relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <Card 
              key={index} 
              className="p-6 bg-card/50 backdrop-blur-sm border-glow hover:bg-card/70 transition-all hover:-translate-y-1 animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <item.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
