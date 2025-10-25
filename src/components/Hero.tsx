import { ArrowDown, Github, Linkedin, Mail, FileDown } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import heroImage1 from "@/assets/fullstack-hero.jpg";
import heroImage2 from "@/assets/programmer-three-screens.jpg";
import heroImage3 from "@/assets/mobile-dev-hero.jpg";
import heroImage4 from "@/assets/devops-hero.jpg";
import whatsappIcon from "@/assets/brands/whatsapp-icon.svg";

const Hero = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("leonmatias1991@gmail.com");
    toast.success(t("hero.email.copied"));
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(100,100,100,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(100,100,100,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in text-center lg:text-left">
            {/* Main heading */}
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-muted-foreground">
                {t("hero.greeting")}
              </p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="text-gradient">
                  {t("hero.title")}
                </span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground/90">
                {t("hero.role")}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl lg:max-w-none">
                {t("hero.subtitle")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg shadow-primary/30 hover-scale"
              >
                {t("hero.cta.contact")}
                <Mail className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToProjects}
                className="border-primary/50 hover:text-primary hover:bg-primary/10 hover:border-primary hover-scale"
              >
                {t("hero.cta.projects")}
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary/50 hover:text-primary hover:bg-primary/10 hover:border-primary hover-scale"
              >
                <a
                  href="https://drive.google.com/file/d/1-dgsmjTBgCwS9ZX_piaxwiz1XMEMdobO/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("hero.cta.resume")}
                  <FileDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Social Links & Contact */}
            <div className="space-y-3 pt-8">
              <p className="text-sm text-muted-foreground font-medium">{t("hero.connect")}</p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Button
                  variant="outline"
                  className="hover:text-white hover:bg-[#181717] hover:border-[#181717] transition-all hover-scale"
                  asChild
                >
                  <a href="https://github.com/devLeonMat" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all hover-scale"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/fs-leon-matias/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="hover:text-primary hover:bg-primary/10 hover:border-primary transition-all hover-scale"
                  onClick={handleCopyEmail}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>

                <Button
                  variant="outline"
                  className="hover:text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] transition-all hover-scale"
                  asChild
                >
                  <a href="https://wa.me/51933166559?text=Hola%20Leon,%20me%20gustaría%20contactarte" target="_blank" rel="noopener noreferrer">
                    <img src={whatsappIcon} alt="WhatsApp" className="h-4 w-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Hero Image Carousel */}
          <div className="relative animate-fade-in lg:block hidden" style={{ animationDelay: '200ms' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 hover-scale">
              {heroImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Developer Workspace ${index + 1}`}
                  className={`w-full h-auto object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                />
              ))}
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 pointer-events-none"></div>
            </div>
            {/* Carousel indicators */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-primary w-8'
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            {/* Floating elements decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-primary" />
      </div>
    </section>
  );
};

export default Hero;
