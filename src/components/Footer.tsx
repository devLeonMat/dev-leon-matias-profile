import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { APP_VERSION } from "@/lib/appVersion";

const { VITE_EMAIL, VITE_LINKEDIN_URL, VITE_GITHUB_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

const Footer = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    if (!VITE_SUPABASE_URL || !VITE_SUPABASE_ANON_KEY) return;

    fetch(`${VITE_SUPABASE_URL}/rest/v1/rpc/increment_page_views`, {
      method: "POST",
      headers: {
        apikey: VITE_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((count) => typeof count === "number" && setVisitCount(count))
      .catch(() => {});
  }, []);

  return (
    <footer className="py-6 px-4 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © 2026 Leon Matias. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-xs text-muted-foreground/60 tracking-widest uppercase">
              v{APP_VERSION}
            </p>
            {visitCount !== null && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground/50">
                <Eye className="h-3 w-3" />
                {visitCount.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
              <a href={VITE_GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-[#0A66C2] transition-colors" asChild>
              <a href={VITE_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" asChild>
              <a href={`mailto:${VITE_EMAIL}`}>
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
