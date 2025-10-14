import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.skills": "Skills",
    "nav.projects": "Proyectos",
    "nav.github": "GitHub",
    "nav.contact": "Contacto",
    
    // Hero
    "hero.greeting": "Hola, soy",
    "hero.title": "Leon Matias",
    "hero.role": "Senior Full Stack Developer",
    "hero.subtitle": "12+ años construyendo aplicaciones escalables, seguras y de alto rendimiento",
    "hero.cta.contact": "Contáctame",
    "hero.cta.projects": "Ver Proyectos",
    "hero.connect": "Conéctate conmigo",
    "hero.email.copied": "Email copiado al portapapeles",
    
    // About
    "about.title": "Sobre",
    "about.title.highlight": "Mí",
    "about.subtitle": "Desarrollador apasionado por crear soluciones digitales innovadoras",
    "about.p1": "Soy un desarrollador full stack senior con más de 12 años de experiencia en la creación de aplicaciones escalables, seguras y de alto rendimiento utilizando Java, JavaScript y TypeScript. Me especializo en arquitectura de microservicios, desarrollo cloud-native y frameworks modernos como Angular y React.",
    "about.p2": "Con una sólida base en desarrollo backend y frontend, he contribuido al éxito de proyectos de gran escala en industrias como banca, seguros, retail y logística, trabajando con clientes globales en Estados Unidos, Latinoamérica y el Caribe.",
    "about.p3": "Mi conjunto de herramientas incluye tecnologías como Spring Boot, Node.js, NestJS, AWS, Azure, Kafka, Docker y Kubernetes, aplicando siempre prácticas de código limpio, testing automatizado y pipelines CI/CD para garantizar calidad y agilidad del software.",
    "about.highlight1.title": "Clean Code",
    "about.highlight1.desc": "Código limpio, mantenible y escalable siguiendo las mejores prácticas",
    "about.highlight2.title": "Performance",
    "about.highlight2.desc": "Optimización constante para experiencias rápidas y fluidas",
    "about.highlight3.title": "Colaboración",
    "about.highlight3.desc": "Trabajo en equipo efectivo con metodologías ágiles",
    
    // Skills
    "skills.title": "Tech",
    "skills.title.highlight": "Stack",
    "skills.subtitle": "Tecnologías y herramientas que domino",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Herramientas",
    
    // Projects
    "projects.title": "Experiencia",
    "projects.title.highlight": "Profesional",
    "projects.subtitle": "Compañías donde he contribuido",
    "projects.btn.code": "Código",
    "projects.btn.demo": "Demo",
    
    // Companies
    "companies.title": "Compañías donde he",
    "companies.title.highlight": "Trabajado",
    "companies.agentcloud.name": "AgentCloud",
    "companies.agentcloud.role": "Desarrollador Full Stack Senior",
    "companies.agentcloud.period": "Ago 2024 - Presente",
    "companies.agentcloud.country": "Perú",
    "companies.outcoding.name": "Outcoding",
    "companies.outcoding.role": "Desarrollador Full Stack Senior",
    "companies.outcoding.period": "Nov 2023 - Ago 2024",
    "companies.outcoding.country": "Estados Unidos",
    "companies.nttdata.name": "NTT DATA",
    "companies.nttdata.role": "Ingeniero de Software Senior",
    "companies.nttdata.period": "Mar 2022 - Nov 2023",
    "companies.nttdata.country": "Perú",
    "companies.sophos.name": "Sophos Solutions",
    "companies.sophos.role": "Desarrollador de Software Senior",
    "companies.sophos.period": "Ene 2013 - Mar 2022",
    "companies.sophos.country": "Perú",
    
    // Contact
    "contact.title": "Hablemos del",
    "contact.title.highlight": "Proyecto",
    "contact.subtitle": "¿Tienes una idea? Me encantaría escucharla",
    "contact.info.title": "Información de Contacto",
    "contact.info.email": "Email",
    "contact.info.phone": "Teléfono",
    "contact.info.location": "Ubicación",
    "contact.copy.email": "Copiar email",
    "contact.copy.phone": "Copiar teléfono",
    "contact.whatsapp": "Escríbeme por WhatsApp",
    "contact.card.title": "¿Por qué trabajar juntos?",
    "contact.card.desc": "Transformo ideas en realidad digital con atención al detalle, comunicación clara y compromiso con la excelencia en cada proyecto.",
    "contact.form.name": "Nombre",
    "contact.form.name.placeholder": "Tu nombre",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "tu@email.com",
    "contact.form.message": "Mensaje",
    "contact.form.message.placeholder": "Cuéntame sobre tu proyecto...",
    "contact.form.submit": "Enviar Mensaje",
    "contact.form.success": "¡Mensaje enviado! Te responderé pronto.",
    
    // GitHub
    "github.title": "Proyectos en",
    "github.title.highlight": "GitHub",
    "github.subtitle": "Repositorios destacados y lenguajes más utilizados",
    "github.loading": "Cargando datos de GitHub...",
    "github.languages.title": "Lenguajes Más Usados",
    "github.languages.subtitle": "Análisis de todos mis repositorios",
    "github.repos.title": "Repositorios Destacados",
    "github.repos.no_description": "Sin descripción",
    "github.view_all": "Ver todos en GitHub",
    
    // Footer
    "footer.rights": "© 2025 Leon Matias. Todos los derechos reservados.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.github": "GitHub",
    "nav.contact": "Contact",
    
    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.title": "Leon Matias",
    "hero.role": "Senior Full Stack Developer",
    "hero.subtitle": "12+ years building scalable, secure, and high-performance applications",
    "hero.cta.contact": "Contact Me",
    "hero.cta.projects": "View Projects",
    "hero.connect": "Connect with me",
    "hero.email.copied": "Email copied to clipboard",
    
    // About
    "about.title": "About",
    "about.title.highlight": "Me",
    "about.subtitle": "Passionate developer creating innovative digital solutions",
    "about.p1": "I'm a passionate and results-driven Senior Full Stack Developer with over 12 years of experience building scalable, secure, and high-performance applications using Java, JavaScript, and TypeScript. I specialize in microservices architecture, cloud-native development, and modern frontend frameworks like Angular and React.",
    "about.p2": "With a strong foundation in both backend and frontend development, I have contributed to the success of large-scale projects in industries such as banking, insurance, retail, and logistics, working with global clients across the United States, Latin America, and the Caribbean.",
    "about.p3": "My toolset includes technologies like Spring Boot, Node.js, NestJS, AWS, Azure, Kafka, Docker, and Kubernetes, always applying clean code practices, automated testing, and CI/CD pipelines to ensure software quality and agility.",
    "about.highlight1.title": "Clean Code",
    "about.highlight1.desc": "Clean, maintainable, and scalable code following best practices",
    "about.highlight2.title": "Performance",
    "about.highlight2.desc": "Constant optimization for fast and smooth experiences",
    "about.highlight3.title": "Collaboration",
    "about.highlight3.desc": "Effective teamwork with agile methodologies",
    
    // Skills
    "skills.title": "Tech",
    "skills.title.highlight": "Stack",
    "skills.subtitle": "Technologies and tools I master",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Tools",
    
    // Projects
    "projects.title": "Professional",
    "projects.title.highlight": "Experience",
    "projects.subtitle": "Companies where I've contributed",
    "projects.btn.code": "Code",
    "projects.btn.demo": "Demo",
    
    // Companies
    "companies.title": "Companies I've",
    "companies.title.highlight": "Worked With",
    "companies.agentcloud.name": "AgentCloud",
    "companies.agentcloud.role": "Senior Full Stack Developer",
    "companies.agentcloud.period": "Aug 2024 - Present",
    "companies.agentcloud.country": "Peru",
    "companies.outcoding.name": "Outcoding",
    "companies.outcoding.role": "Senior Full Stack Developer",
    "companies.outcoding.period": "Nov 2023 - Aug 2024",
    "companies.outcoding.country": "United States",
    "companies.nttdata.name": "NTT DATA",
    "companies.nttdata.role": "Senior Software Engineer",
    "companies.nttdata.period": "Mar 2022 - Nov 2023",
    "companies.nttdata.country": "Peru",
    "companies.sophos.name": "Sophos Solutions",
    "companies.sophos.role": "Senior Software Developer",
    "companies.sophos.period": "Jan 2013 - Mar 2022",
    "companies.sophos.country": "Peru",
    
    // Contact
    "contact.title": "Let's Talk About",
    "contact.title.highlight": "Your Project",
    "contact.subtitle": "Have an idea? I'd love to hear it",
    "contact.info.title": "Contact Information",
    "contact.info.email": "Email",
    "contact.info.phone": "Phone",
    "contact.info.location": "Location",
    "contact.copy.email": "Copy email",
    "contact.copy.phone": "Copy phone",
    "contact.whatsapp": "Message me on WhatsApp",
    "contact.card.title": "Why work together?",
    "contact.card.desc": "I transform ideas into digital reality with attention to detail, clear communication, and commitment to excellence in every project.",
    "contact.form.name": "Name",
    "contact.form.name.placeholder": "Your name",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "your@email.com",
    "contact.form.message": "Message",
    "contact.form.message.placeholder": "Tell me about your project...",
    "contact.form.submit": "Send Message",
    "contact.form.success": "Message sent! I'll get back to you soon.",
    
    // GitHub
    "github.title": "Projects on",
    "github.title.highlight": "GitHub",
    "github.subtitle": "Featured repositories and most used languages",
    "github.loading": "Loading GitHub data...",
    "github.languages.title": "Most Used Languages",
    "github.languages.subtitle": "Analysis of all my repositories",
    "github.repos.title": "Featured Repositories",
    "github.repos.no_description": "No description available",
    "github.view_all": "View all on GitHub",
    
    // Footer
    "footer.rights": "© 2025 Leon Matias. All rights reserved.",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
