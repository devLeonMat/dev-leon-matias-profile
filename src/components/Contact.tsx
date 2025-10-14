import { Mail, MapPin, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import whatsappIcon from "@/assets/whatsapp-icon.svg";

const Contact = () => {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} copiado al portapapeles`);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.info.email"),
      value: "leonmatias1991@gmail.com",
      link: "mailto:leonmatias1991@gmail.com",
      isWhatsApp: false
    },
    {
      icon: "whatsapp",
      label: t("contact.info.phone"),
      value: "+51 933 166 559",
      link: "https://wa.me/51933166559?text=Hola%20Leon,%20me%20gustaría%20contactarte",
      isWhatsApp: true
    },
    {
      icon: MapPin,
      label: t("contact.info.location"),
      value: "Perú",
      isWhatsApp: false
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("contact.title")} <span className="text-gradient">{t("contact.title.highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <div className="grid gap-6">
              {contactInfo.map((item, index) => {
                const hasCopy = item.icon === Mail || item.isWhatsApp;
                const content = (
                  <div className="flex items-center gap-6 justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                        {item.isWhatsApp ? (
                          <img src={whatsappIcon} alt="WhatsApp" className="h-6 w-6" />
                        ) : (
                          <item.icon className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                        <p className="font-semibold text-lg">{item.value}</p>
                      </div>
                    </div>
                    {hasCopy && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleCopy(item.value, item.label);
                              }}
                            >
                              <Copy className="h-5 w-5 text-foreground" />
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
                  <Card 
                    key={index}
                    className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all hover-scale relative"
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
                  </Card>
                );
              })}
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-glow mt-8">
              <div className="text-center">
                <h4 className="font-semibold text-xl mb-3">{t("contact.card.title")}</h4>
                <p className="text-muted-foreground">
                  {t("contact.card.desc")}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
