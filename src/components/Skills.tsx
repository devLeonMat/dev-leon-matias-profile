import { Code, Layers, Cloud } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const skillCategories = [
  {
    icon: Code,
    titleKey: "skills.languages",
    skills: [
      { name: "Java", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/java.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/javascript.svg" },
      { name: "Scala", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/scala.svg" },
      { name: "SQL", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postgresql.svg" },
    ],
  },
  {
    icon: Layers,
    titleKey: "skills.frameworks",
    skills: [
      { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/spring.svg" },
      { name: "React", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg" },
      { name: "Angular", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/angular.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg" },
      { name: "NestJS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nestjs.svg" },
      { name: "Spring Cloud", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/spring.svg" },
    ],
  },
  {
    icon: Cloud,
    titleKey: "skills.cloud",
    skills: [
      { name: "AWS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg" },
      { name: "Azure", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/docker.svg" },
      { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kubernetes.svg" },
      { name: "Kafka", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apachekafka.svg" },
      { name: "Redis", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/redis.svg" },
    ],
  },
];

const dbAndTesting = [
  { name: "Oracle", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oracle.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postgresql.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mongodb.svg" },
  { name: "SQL Server", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftsqlserver.svg" },
  { name: "CosmosDB", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg" },
  { name: "JUnit", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/junit5.svg" },
  { name: "Mockito", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/java.svg" },
  { name: "Jest", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jest.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/git.svg" },
  { name: "Jenkins", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jenkins.svg" },
];

const Skills = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24 px-4 section-alt">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("skills.title")}{" "}
            <span className="text-gradient">{t("skills.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("skills.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="card-elevated p-6 rounded-xl animate-fade-in hover-lift"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{t(category.titleKey)}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium bg-muted hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-3.5 h-3.5 object-contain dark:invert"
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Databases & Testing row */}
        <div className="card-elevated p-5 rounded-xl animate-fade-in" style={{ animationDelay: "240ms" }}>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Databases · Testing · DevOps</p>
          <div className="flex flex-wrap gap-2">
            {dbAndTesting.map((skill) => (
              <span
                key={skill.name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium bg-muted hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-3.5 h-3.5 object-contain dark:invert"
                />
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
