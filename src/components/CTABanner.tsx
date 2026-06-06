import { Mail, FileDown, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const { VITE_RESUME_URL } = import.meta.env;

const CTABanner = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-8 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative">
        <div
          className="rounded-2xl px-8 py-14 md:px-14 text-white text-center relative overflow-hidden"
          style={{ background: "var(--gradient-primary)" }}
        >
          {/* Background noise/texture */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Glow blobs inside banner */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "hsl(262 83% 75%)" }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full blur-3xl opacity-25 pointer-events-none"
            style={{ background: "hsl(217 91% 75%)" }}
          />

          <div className="relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {t("hero.availability")}
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {t("cta.heading")}
            </h2>

            <p className="text-white/75 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {t("cta.subtext")}
            </p>

            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-white font-semibold hover:bg-white/90 transition-colors"
                style={{ color: "hsl(239 84% 67%)" }}
              >
                {t("cta.btn.contact")}
                <Mail className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/40 text-white hover:bg-white/10 hover:border-white/70 font-semibold"
              >
                <a href={VITE_RESUME_URL} target="_blank" rel="noopener noreferrer">
                  {t("hero.cta.resume")}
                  <FileDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Quick trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5"><ArrowRight className="h-3 w-3" />12+ years experience</span>
              <span className="flex items-center gap-1.5"><ArrowRight className="h-3 w-3" />Remote-ready · UTC-5</span>
              <span className="flex items-center gap-1.5"><ArrowRight className="h-3 w-3" />English B2 · Spanish native</span>
              <span className="flex items-center gap-1.5"><ArrowRight className="h-3 w-3" />AWS Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
