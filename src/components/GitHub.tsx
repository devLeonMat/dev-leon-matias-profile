import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star, GitFork, ExternalLink, Code2 } from "lucide-react";
import { Button } from "./ui/button";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

interface LanguageStats {
  [key: string]: number;
}

const GitHub = () => {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<Repository[]>([]);
  const [languages, setLanguages] = useState<LanguageStats>({});
  const [loading, setLoading] = useState(true);
  const username = "devLeonMat";

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch ALL repositories for language statistics (up to 100 per page, can add more pages if needed)
        const allReposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&page=1`
        );
        let allRepos = await allReposResponse.json();

        // Fetch second page if there are more repos
        const secondPageResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&page=2`
        );
        const secondPageRepos = await secondPageResponse.json();
        if (secondPageRepos.length > 0) {
          allRepos = [...allRepos, ...secondPageRepos];
        }

        // Calculate language statistics from ALL repositories
        const langStats: LanguageStats = {};
        allRepos.forEach((repo: Repository) => {
          if (repo.language) {
            langStats[repo.language] = (langStats[repo.language] || 0) + 1;
          }
        });
        setLanguages(langStats);

        // Get top 6 repos by stars for featured section
        const sortedByStars = [...allRepos].sort(
          (a, b) => b.stargazers_count - a.stargazers_count
        );
        setRepos(sortedByStars.slice(0, 6));
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Java: "#b07219",
      Python: "#3572A5",
      HTML: "#e34c26",
      CSS: "#563d7c",
      React: "#61dafb",
      Vue: "#42b883",
    };
    return colors[language] || "#8b949e";
  };

  const sortedLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const maxCount = Math.max(...sortedLanguages.map(([_, count]) => count));

  if (loading) {
    return (
      <section id="github" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-muted-foreground">{t("github.loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("github.title")} <span className="text-gradient">{t("github.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("github.subtitle")}
          </p>
        </div>

        {/* Language Statistics */}
        <div className="mb-16 animate-fade-in">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            {t("github.languages.title")}
          </h3>
          <p className="text-center text-muted-foreground mb-6">
            {t("github.languages.subtitle")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sortedLanguages.map(([language, count]) => (
              <Card
                key={language}
                className="p-4 bg-card/50 backdrop-blur-sm border-glow hover:bg-card/70 transition-all hover-scale"
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${getLanguageColor(language)}20` }}
                  >
                    <Code2 
                      className="h-6 w-6" 
                      style={{ color: getLanguageColor(language) }}
                    />
                  </div>
                  <p className="font-semibold text-sm text-center">{language}</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(count / maxCount) * 100}%`,
                        backgroundColor: getLanguageColor(language),
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {count} {count === 1 ? "repo" : "repos"}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Repositories */}
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h3 className="text-2xl font-semibold mb-6 text-center">
            {t("github.repos.title")}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.slice(0, 6).map((repo, index) => (
              <Card
                key={repo.id}
                className="p-6 bg-card/50 backdrop-blur-sm border-glow hover:bg-card/70 transition-all hover:-translate-y-1 animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold line-clamp-1">
                      {repo.name}
                    </h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:text-primary"
                      asChild
                    >
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
                    {repo.description || t("github.repos.no_description")}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="hover-scale"
              asChild
            >
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("github.view_all")}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHub;
