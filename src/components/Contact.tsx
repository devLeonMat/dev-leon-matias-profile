import { Mail, MapPin, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import whatsappIcon from "@/assets/brands/whatsapp-icon.svg";

const { VITE_EMAIL, VITE_WHATSAPP_NUMBER } = import.meta.env;
const whatsappUrl = `https://wa.me/${VITE_WHATSAPP_NUMBER}?text=Hi%20Leon,%20I'd%20like%20to%20connect`;

const Contact = () => {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} copied`);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.info.email"),
      value: VITE_EMAIL,
      link: `mailto:${VITE_EMAIL}`,
      isWhatsApp: false,
    },
    {
      icon: "whatsapp",
      label: t("contact.info.phone"),
      value: `+${VITE_WHATSAPP_NUMBER}`,
      link: whatsappUrl,
      isWhatsApp: true,
    },
    {
      icon: MapPin,
      label: t("contact.info.location"),
      value: "Perú · UTC-5",
      isWhatsApp: false,
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 section-alt">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("contact.title")}{" "}
            <span className="text-gradient">{t("contact.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("contact.subtitle")}</p>
        </div>

        <div className="space-y-4 animate-fade-in">
          {contactInfo.map((item, index) => {
            const hasCopy = item.icon === Mail || item.isWhatsApp;
            const content = (
              <div className="flex items-center gap-4 justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                    {item.isWhatsApp ? (
                      <img src={whatsappIcon} alt="WhatsApp" className="h-5 w-5" />
                    ) : (
                      <item.icon className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                </div>
                {hasCopy && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`transition-opacity hover:bg-primary/10 hover:text-primary ${
                            hoveredIndex === index ? "opacity-100" : "opacity-0"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCopy(item.value, item.label);
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t(item.isWhatsApp ? "contact.copy.phone" : "contact.copy.email")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            );

            return (
              <div
                key={index}
                className="card-elevated rounded-xl p-5 hover-lift transition-all"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            );
          })}

          <div
            className="rounded-xl p-8 text-center mt-6 animate-fade-in"
            style={{ background: "var(--gradient-primary)", animationDelay: "200ms" }}
          >
            <h4 className="font-bold text-xl mb-2 text-white">{t("contact.card.title")}</h4>
            <p className="text-white/80 text-sm max-w-md mx-auto">{t("contact.card.desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
