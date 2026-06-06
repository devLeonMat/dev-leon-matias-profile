import { Github, Linkedin, Mail, FileDown, ArrowDown, MapPin } from "lucide-react";
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
  { value: "4", label: "US Companies" },
  { value: "UTC-5", label: "Americas Timezone" },
];

const floatingBadges = [
  { label: "Java", top: "8%", left: "-18%", delay: "0s" },
  { label: "Spring Boot", top: "28%", right: "-22%", delay: "0.4s" },
  { label: "AWS", bottom: "32%", right: "-20%", delay: "0.8s" },
  { label: "React", bottom: "10%", left: "-16%", delay: "1.2s" },
  { label: "Kubernetes", top: "62%", left: "-24%", delay: "0.6s" },
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{
          background: "var(--gradient-primary)",
          animation: "orbFloat 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{
          background: "var(--gradient-secondary)",
          animation: "orbFloat 10s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{
          background: "hsl(var(--accent))",
          animation: "orbFloat 12s ease-in-out infinite",
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35] dark:opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--muted-foreground)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-80px)]  py-16">

          {/* Text */}
          <div className="space-y-7 animate-fade-in text-center lg:text-left">

            {/* Availability badge */}
            <div className="flex justify-center lg:justify-start">
              <span className="badge-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {t("hero.availability")}
              </span>
            </div>

            {/* Name + role */}
            <div className="space-y-2">
              <p className="text-base text-muted-foreground font-medium tracking-wide">
                {t("hero.greeting")}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                <span className="text-gradient">Leon</span>
                <br />
                <span className="text-gradient">Matias</span>
              </h1>
              <div className="flex items-center gap-2 justify-center lg:justify-start pt-1">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground/75">
                  {t("hero.role")}
                </h2>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                Lima, Peru · Remote-first
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              {t("hero.subtitle")}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center lg:justify-start">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-12 h-px mx-auto lg:mx-0" style={{ background: "var(--gradient-primary)" }} />

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="font-semibold shadow-lg"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-primary)" }}
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

            {/* Social links */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <Button variant="outline" size="sm" className="hover:border-[#181717] hover:text-[#181717] dark:hover:text-white dark:hover:border-white transition-colors" asChild>
                <a href={VITE_GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-1.5" /> GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" className="hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors" asChild>
                <a href={VITE_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 mr-1.5" /> LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" className="hover:border-primary hover:text-primary transition-colors" onClick={handleCopyEmail}>
                <Mail className="h-4 w-4 mr-1.5" /> Email
              </Button>
              <Button variant="outline" size="sm" className="hover:border-[#25D366] hover:text-[#25D366] transition-colors" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <img src={whatsappIcon} alt="WhatsApp" className="h-4 w-4 mr-1.5" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Photo + floating badges */}
          <div
            className="hidden lg:flex justify-center items-center animate-scale-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative">
              {/* Floating tech badges */}
              {floatingBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="absolute z-20 px-3 py-1.5 rounded-full text-xs font-semibold card-elevated border border-border/60 whitespace-nowrap"
                  style={{
                    top: badge.top,
                    left: badge.left,
                    right: badge.right,
                    bottom: badge.bottom,
                    animation: `badgeFloat 4s ease-in-out infinite`,
                    animationDelay: badge.delay,
                    boxShadow: "var(--shadow-elevated)",
                  }}
                >
                  <span className="text-gradient">{badge.label}</span>
                </div>
              ))}

              {/* Glow ring behind photo */}
              <div
                className="absolute inset-0 rounded-2xl scale-105 opacity-20 blur-xl"
                style={{ background: "var(--gradient-primary)" }}
              />

              {/* Photo */}
              <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-2xl overflow-hidden card-elevated"
                style={{ border: "1px solid hsl(var(--primary) / 0.2)" }}>
                <img
                  src={myPhoto}
                  alt="Leon Matias"
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                  style={{ background: "linear-gradient(to top, hsl(var(--primary) / 0.15), transparent)" }} />
              </div>

              {/* Certifications badge pinned bottom-right */}
              <div
                className="absolute -bottom-4 -right-4 z-20 card-elevated rounded-xl px-3 py-2 text-xs font-semibold"
                style={{
                  animation: "badgeFloat 5s ease-in-out infinite",
                  animationDelay: "1s",
                  boxShadow: "var(--shadow-elevated)",
                  border: "1px solid hsl(var(--primary) / 0.15)",
                }}
              >
                <p className="text-gradient">AWS Certified</p>
                <p className="text-muted-foreground font-normal text-[10px]">Solutions Architect</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
        style={{ animation: "scrollBounce 2s ease-in-out infinite" }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown className="h-4 w-4" />
      </button>
    </section>
  );
};

export default Hero;
