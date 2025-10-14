import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            {t("footer.rights")}
          </p>
          
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:text-white hover:bg-[#181717] transition-all duration-300 hover-scale border border-transparent hover:border-[#181717]"
              asChild
            >
              <a href="https://github.com/devLeonMat" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:text-white hover:bg-[#0A66C2] transition-all duration-300 hover-scale border border-transparent hover:border-[#0A66C2]"
              asChild
            >
              <a href="https://www.linkedin.com/in/fs-leon-matias/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-accent transition-all duration-300 hover-scale border border-transparent hover:border-primary"
              asChild
            >
              <a href="mailto:leonmatias1991@gmail.com">
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
