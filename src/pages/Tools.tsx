import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SignatureGenerator from "../components/tools/SignatureGenerator";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PanelLeftClose, PanelLeftOpen, PenSquare } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Tools = () => {
  const { t } = useLanguage();
  const [activeTool, setActiveTool] = useState("signature-generator");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tools = [
    {
      id: "signature-generator",
      title: t("tools.signature-generator.title"),
      icon: <PenSquare className="h-5 w-5" />,
      component: <SignatureGenerator />,
    },
  ];

  const renderContent = () => {
    const activeToolData = tools.find((tool) => tool.id === activeTool);
    return activeToolData ? activeToolData.component : null;
  };

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row gap-8">
          <aside
            className={`transition-all duration-300 ${
              isCollapsed ? "w-16" : "w-full md:w-60"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              {!isCollapsed && (
                <h2 className="text-2xl font-bold">{t("nav.tools")}</h2>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hover:bg-muted"
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="h-5 w-5" />
                ) : (
                  <PanelLeftClose className="h-5 w-5" />
                )}
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              {tools.map((tool) =>
                isCollapsed ? (
                  <Tooltip key={tool.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeTool === tool.id ? "default" : "outline"}
                        onClick={() => setActiveTool(tool.id)}
                        className={`justify-center ${
                          activeTool === tool.id
                            ? "bg-black text-white hover:bg-black/90"
                            : "bg-white text-black hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {tool.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{tool.title}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Button
                    key={tool.id}
                    variant={activeTool === tool.id ? "default" : "outline"}
                    onClick={() => setActiveTool(tool.id)}
                    className={`justify-start ${
                      activeTool === tool.id
                        ? "bg-black text-white hover:bg-black/90"
                        : "bg-white text-black hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {tool.icon}
                    <span className="ml-2">{tool.title}</span>
                  </Button>
                )
              )}
            </div>
          </aside>
          <section className="w-full flex-1">{renderContent()}</section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Tools;
