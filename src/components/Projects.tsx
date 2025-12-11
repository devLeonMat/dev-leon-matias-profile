import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import outcodingLogo from '@/assets/brands/outcoding.svg';
import nttLogo from '@/assets/brands/ntt-data.png';
import dacodes from '@/assets/brands/dacodes.webp';

const Projects = () => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const companies = [
    {
      name: t("companies.agentcloud.name"),
      role: t("companies.agentcloud.role"),
      period: t("companies.agentcloud.period"),
      country: "🇺🇸", // Flag directly here or via translation if needed
      tech: ["React", "Scala", "AWS", "Terraform"],
      logo: dacodes,
      gradient: "from-primary/20 to-accent/20",
      description: t("companies.agentcloud.task1") // Using the first task as a summary
    },
    {
      name: t("companies.outcoding.name"),
      role: t("companies.outcoding.role"),
      period: t("companies.outcoding.period"),
      country: "🇺🇸",
      tech: ["NestJS", "Angular", "Azure", "Nx"],
      logo: outcodingLogo,
      gradient: "from-secondary/20 to-primary/20",
      description: t("companies.outcoding.task1")
    },
    {
      name: t("companies.nttdata.name"),
      role: t("companies.nttdata.role"),
      period: t("companies.nttdata.period"),
      country: "🇵🇪",
      tech: ["Spring Boot", "Kafka", "Kubernetes", "Docker"],
      logo: nttLogo,
      gradient: "from-accent/20 to-secondary/20",
      description: t("companies.nttdata.task1")
    }
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("projects.title")} <span className="text-gradient">{t("projects.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Companies Carousel */}
        <div className="mb-16">
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {companies.map((company, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0"
                  >
                    <Card className="h-full bg-card/50 backdrop-blur-sm border-glow hover:bg-card/70 transition-all hover-scale flex flex-col">
                      {/* Company Logo */}
                      <div className={`h-32 bg-gradient-to-br ${company.gradient} relative overflow-hidden flex items-center justify-center p-6 rounded-t-lg`}>
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(100,100,100,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(100,100,100,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="relative z-10 max-h-20 max-w-full object-contain"
                        />
                      </div>

                      <div className="p-6 space-y-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-xl font-semibold">{company.name}</h4>
                            <span className="text-lg">{company.country}</span>
                          </div>
                          <p className="text-sm text-primary font-medium">{company.role}</p>
                          <p className="text-xs text-muted-foreground mt-1">{company.period}</p>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                          {company.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto pt-4">
                          {company.tech.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="border-primary/30 text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 border-primary/50 hover-scale bg-background/80 backdrop-blur-sm z-10 hidden md:flex"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 border-primary/50 hover-scale bg-background/80 backdrop-blur-sm z-10 hidden md:flex"
              onClick={scrollNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Mobile Navigation Buttons (below carousel) */}
            <div className="flex justify-center gap-4 mt-6 md:hidden">
               <Button
                variant="outline"
                size="icon"
                className="border-primary/50"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-primary/50"
                onClick={scrollNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
