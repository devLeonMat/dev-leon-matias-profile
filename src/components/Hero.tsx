import { Mail, FileDown, ArrowDown, MapPin } from "lucide-react";
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 6.8c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.373-12-12-12z"/></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { RESUME_URLS } from "@/lib/resume";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import myPhoto from "@/assets/photo.png";
import whatsappIcon from "@/assets/brands/whatsapp-icon.svg";
import { LightWaves } from "./ui/LightWaves";

const {
  VITE_WHATSAPP_NUMBER,
  VITE_EMAIL,
  VITE_LINKEDIN_URL,
  VITE_GITHUB_URL,
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
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current!, {
      strings: [
        "Lead Software Engineer",
        "Cloud Native Architect",
        "Java &amp; Spring Boot Expert",
        "AWS Solutions Architect",
        "Microservices Specialist",
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 2200,
      startDelay: 600,
      loop: true,
      smartBackspace: true,
    });
    return () => typed.destroy();
  }, []);

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
      {/* LightWaves canvas background */}
      <LightWaves intensity={theme === "dark" ? 1.0 : 0.65} className="absolute inset-0" />

      {/* Dot grid — neutro en light, suave en dark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18] dark:opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 65%) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-80px)] py-16">

          {/* Text */}
          <div className="space-y-7 animate-fade-in text-center lg:text-left">

            <div className="flex justify-center lg:justify-start">
              <span className="badge-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {t("hero.availability")}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-base text-muted-foreground font-medium tracking-wide">
                {t("hero.greeting")}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                <span className="text-gradient">Leon</span>
                <br />
                <span className="text-gradient">Matias</span>
              </h1>

              {/* Typed.js role */}
              <div className="flex items-center gap-2 justify-center lg:justify-start pt-1 min-h-[2rem]">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground/75">
                  <span ref={typedRef} />
                </h2>
              </div>

              <div className="flex items-center gap-1.5 justify-center lg:justify-start text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                Lima, Peru · Remote-first
              </div>
            </div>

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
              <Button size="lg" variant="outline" onClick={() => scrollToSection("timeline")} className="font-semibold">
                {t("hero.cta.projects")}
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="ghost" asChild className="font-semibold text-muted-foreground hover:text-foreground">
                <a href={RESUME_URLS[language]} target="_blank" rel="noopener noreferrer">
                  {t("hero.cta.resume")}
                  <FileDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Social */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <Button variant="outline" size="sm" className="hover:border-[#181717] hover:text-[#181717] dark:hover:text-white dark:hover:border-white transition-colors" asChild>
                <a href={VITE_GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="h-4 w-4 mr-1.5" /> GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" className="hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors" asChild>
                <a href={VITE_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon className="h-4 w-4 mr-1.5" /> LinkedIn
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
          <div className="hidden lg:flex justify-center items-center animate-scale-in" style={{ animationDelay: "200ms" }}>
            <div className="relative">
              {floatingBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="absolute z-20 px-3 py-1.5 rounded-full text-xs font-semibold card-elevated border border-border/60 whitespace-nowrap"
                  style={{
                    top: badge.top, left: badge.left, right: badge.right, bottom: badge.bottom,
                    animation: "badgeFloat 4s ease-in-out infinite",
                    animationDelay: badge.delay,
                    boxShadow: "var(--shadow-elevated)",
                  }}
                >
                  <span className="text-gradient">{badge.label}</span>
                </div>
              ))}

              <div className="absolute inset-0 rounded-2xl scale-105 opacity-20 blur-xl"
                style={{ background: "var(--gradient-primary)" }} />

              <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-2xl overflow-hidden card-elevated"
                style={{ border: "1px solid hsl(var(--primary) / 0.2)" }}>
                <img src={myPhoto} alt="Leon Matias" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                  style={{ background: "linear-gradient(to top, hsl(var(--primary) / 0.15), transparent)" }} />
              </div>

              <div
                className="absolute -bottom-4 -right-4 z-20 card-elevated rounded-xl px-3 py-2 text-xs font-semibold"
                style={{
                  animation: "badgeFloat 5s ease-in-out infinite", animationDelay: "1s",
                  boxShadow: "var(--shadow-elevated)", border: "1px solid hsl(var(--primary) / 0.15)",
                }}
              >
                <p className="text-gradient">AWS Certified</p>
                <p className="text-muted-foreground font-normal text-[10px]">Solutions Architect</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
