import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import whatsappIcon from "@/assets/brands/whatsapp-icon.svg";

const { VITE_WHATSAPP_NUMBER } = import.meta.env;
const whatsappUrl = `https://wa.me/${VITE_WHATSAPP_NUMBER}?text=Hola%20Leon,%20me%20gustaría%20contactarte`;

const WhatsAppButton = () => {
  const { t } = useLanguage();

  const handleClick = () => {
    window.open(whatsappUrl, "_blank");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-[#25D366] hover:bg-[#20BA5A] text-white z-50 hover-scale"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="h-8 w-8" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{t("contact.whatsapp")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WhatsAppButton;
