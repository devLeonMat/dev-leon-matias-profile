import { Github, Linkedin, Mail, FileDown, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import myPhoto from "@/assets/photo.jpeg";
import whatsappIcon from "@/assets/brands/whatsapp-icon.svg";

const {
  VITE_WHATSAPP_NUMBER,
  VITE_EMAIL,
  VITE_LINKEDIN_URL,
  VITE_GITHUB_URL,
  VITE_RESUME_URL,
} = import.meta.env;

const whatsappUrl = `https://wa.me/${VITE_WHATSAPP_NUMBER}?text=Hi%20Leon,%20I'd%20like%20to%20connect`;

const stats = [
  { value: "12+", label: "Years Experience" },
  { value: "3", label: "US Companies" },
  { value: "UTC-5", label: "Americas Timezone" },
];

const Hero = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(VITE_EMAIL);
    toast.success(t("hero.email.copied"));
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="absolute inset-0 hero-bg pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-8 animate-fade-in text-center lg:text-left">
            <div className="space-y-2">
              <span className="badge-pill animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {t("hero.availability")}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-lg text-muted-foreground font-medium">
                {t("hero.greeting")}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                <span className="text-gradient">Leon Matias</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground/80">
                {t("hero.role")}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-2">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="shadow-primary font-semibold"
                style={{
                  background: "var(--gradient-primary)",
                }}
              >
                {t("hero.cta.contact")}
                <Mail className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("timeline")}
                className="font-semibold"
              >
                {t("hero.cta.projects")}
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="font-semibold text-muted-foreground hover:text-foreground"
              >
                <a href={VITE_RESUME_URL} target="_blank" rel="noopener noreferrer">
                  {t("hero.cta.resume")}
                  <FileDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Social */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
              <Button
                variant="outline"
                size="sm"
                className="hover:border-[#181717] hover:text-[#181717] dark:hover:text-white dark:hover:border-white transition-colors"
                asChild
              >
                <a href={VITE_GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-1.5" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors"
                asChild
              >
                <a href={VITE_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 mr-1.5" />
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:border-primary hover:text-primary transition-colors"
                onClick={handleCopyEmail}
              >
                <Mail className="h-4 w-4 mr-1.5" />
                Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                asChild
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <img src={whatsappIcon} alt="WhatsApp" className="h-4 w-4 mr-1.5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Photo */}
          <div
            className="hidden lg:flex justify-center items-center animate-scale-in"
            style={{ animationDelay: "150ms" }}
          >
            <div className="relative">
              <div
                className="w-80 h-80 xl:w-96 xl:h-96 rounded-2xl overflow-hidden card-elevated card-primary"
              >
                <img
                  src={myPhoto}
                  alt="Leon Matias"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative blobs */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20 blur-2xl"
                style={{ background: "var(--gradient-primary)" }} />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-15 blur-2xl"
                style={{ background: "var(--gradient-secondary)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
