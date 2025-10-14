import { Code, Database, Wrench } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      icon: Code,
      title: t("skills.frontend"),
      skills: [
        { name: "React", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg" },
        { name: "Angular", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/angular.svg" },
        { name: "TypeScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg" },
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/javascript.svg" },
        { name: "Tailwind", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg" },
        { name: "Material UI", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mui.svg" },
        { name: "Vue.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vuedotjs.svg" },
        { name: "RxJS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/reactivex.svg" }
      ]
    },
    {
      icon: Database,
      title: t("skills.backend"),
      skills: [
        { name: "Java", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oracle.svg" },
        { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/spring.svg" },
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg" },
        { name: "NestJS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nestjs.svg" },
        { name: "Scala", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/scala.svg" },
        { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postgresql.svg" },
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mongodb.svg" },
        { name: "Oracle", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oracle.svg" }
      ]
    },
    {
      icon: Wrench,
      title: t("skills.tools"),
      skills: [
        { name: "AWS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg" },
        { name: "Azure", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg" },
        { name: "Docker", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/docker.svg" },
        { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kubernetes.svg" },
        { name: "Kafka", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apachekafka.svg" },
        { name: "Git", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/git.svg" },
        { name: "Jenkins", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jenkins.svg" },
        { name: "GraphQL", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/graphql.svg" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("skills.title")} <span className="text-gradient">{t("skills.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("skills.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={index}
              className="p-8 bg-card/50 backdrop-blur-sm border-glow hover:bg-card/70 transition-all animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge 
                    key={skillIndex}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-colors hover-scale flex items-center gap-2 py-1.5 px-3"
                  >
                    <img 
                      src={skill.logo} 
                      alt={skill.name}
                      className="w-4 h-4 object-contain dark:invert dark:brightness-0"
                    />
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
