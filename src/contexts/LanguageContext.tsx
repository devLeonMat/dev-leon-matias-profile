import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.skills": "Skills",
    "nav.projects": "Proyectos",
    "nav.github": "GitHub",
    "nav.contact": "Contacto",
    "nav.tools": "Herramientas",

    // Tools
    "tools.signature-generator.title": "Generador de Firmas",
    "tools.qr-generator.title": "Generador de QR",
    "tools.signature-generator.tabs.data": "Datos",
    "tools.signature-generator.tabs.style": "Estilos",
    "tools.signature-generator.tabs.templates": "Plantillas",
    "tools.signature-generator.form.name": "Nombre",
    "tools.signature-generator.form.name.placeholder": "Tu Nombre",
    "tools.signature-generator.form.role": "Cargo",
    "tools.signature-generator.form.role.placeholder": "Tu Cargo",
    "tools.signature-generator.form.company": "Empresa",
    "tools.signature-generator.form.company.placeholder": "Tu Empresa",
    "tools.signature-generator.form.phone": "Teléfono",
    "tools.signature-generator.form.phone.placeholder": "Tu Teléfono",
    "tools.signature-generator.form.email": "Email",
    "tools.signature-generator.form.email.placeholder": "tu@email.com",
    "tools.signature-generator.form.website": "Sitio Web",
    "tools.signature-generator.form.website.placeholder": "tudominio.com",
    "tools.signature-generator.form.linkedin": "LinkedIn",
    "tools.signature-generator.form.linkedin.placeholder": "URL de tu perfil de LinkedIn",
    "tools.signature-generator.form.github": "GitHub",
    "tools.signature-generator.form.github.placeholder": "URL de tu perfil de GitHub",
    "tools.signature-generator.form.whatsapp": "WhatsApp",
    "tools.signature-generator.form.whatsapp.placeholder": "Tu número de WhatsApp",
    "tools.signature-generator.form.image": "Imagen de Perfil",
    "tools.signature-generator.form.image.placeholder": "URL de tu imagen o sube una",
    "tools.signature-generator.style.primary-color": "Color Primario",
    "tools.signature-generator.style.text-color": "Color de Texto",
    "tools.signature-generator.style.font-style": "Estilo de Fuente",
    "tools.signature-generator.style.font-size": "Tamaño de Fuente",
    "tools.signature-generator.style.image-radius": "Redondez de la Imagen",
    "tools.signature-generator.style.icon-size": "Tamaño de Iconos",
    "tools.signature-generator.templates.classic": "Clásico",
    "tools.signature-generator.templates.modern": "Moderno",
    "tools.signature-generator.templates.compact": "Compacto",
    "tools.signature-generator.preview": "Vista Previa",
    "tools.signature-generator.copy.html": "Copiar HTML",
    "tools.signature-generator.copy.signature": "Copiar Firma",
    "tools.signature-generator.copied.html": "¡HTML copiado al portapapeles!",
    "tools.signature-generator.copied.signature": "¡Firma copiada como texto plano!",
    "tools.signature-generator.guide.title": "Cómo Instalar tu Firma",
    "tools.signature-generator.guide.gmail": "Configuración > Ver todos los ajustes > Baja hasta \"Firma\" > Pega (Ctrl+V).",
    "tools.signature-generator.guide.outlook": "Archivo > Opciones > Correo > Firmas > Selecciona tu firma y pega.",
    "tools.signature-generator.guide.apple-mail": "Mail > Preferencias > Firmas > Arrastra y suelta la firma.",

    // Hero
    "hero.greeting": "Hola, soy",
    "hero.title": "Leon Matias",
    "hero.role": "Senior Full Stack Developer",
    "hero.subtitle":
      "12+ años construyendo aplicaciones escalables, seguras y de alto rendimiento",
    "hero.cta.contact": "Contáctame",
    "hero.cta.projects": "Ver Proyectos",
    "hero.cta.resume": "Descargar CV",
    "hero.connect": "Conéctate conmigo",
    "hero.email.copied": "Email copiado al portapapeles",

    // About
    "about.title": "Sobre",
    "about.title.highlight": "Mí",
    "about.subtitle":
      "Desarrollador apasionado por crear soluciones digitales innovadoras",
    "about.p1":
      "Soy un desarrollador full stack senior con más de 12 años de experiencia en la creación de aplicaciones escalables, seguras y de alto rendimiento utilizando Java, JavaScript y TypeScript. Me especializo en arquitectura de microservicios, desarrollo cloud-native y frameworks modernos como Angular y React.",
    "about.p2":
      "Con una sólida base en desarrollo backend y frontend, he contribuido al éxito de proyectos de gran escala en industrias como banca, seguros, retail y logística, trabajando con clientes globales en Estados Unidos, Latinoamérica y el Caribe.",
    "about.p3":
      "Mi conjunto de herramientas incluye tecnologías como Spring Boot, Node.js, NestJS, AWS, Azure, Kafka, Docker y Kubernetes, aplicando siempre prácticas de código limpio, testing automatizado y pipelines CI/CD para garantizar calidad y agilidad del software.",
    "about.highlight1.title": "Clean Code",
    "about.highlight1.desc":
      "Código limpio, mantenible y escalable siguiendo las mejores prácticas",
    "about.highlight2.title": "Performance",
    "about.highlight2.desc":
      "Optimización constante para experiencias rápidas y fluidas",
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
    "companies.agentcloud.task1": "Desarrollé y mantuve aplicaciones web complejas utilizando React y Scala con Play Framework.",
    "companies.agentcloud.task2": "Diseñé e implementé soluciones de infraestructura como código (IaC) utilizando Terraform en AWS.",
    "companies.agentcloud.task3": "Colaboré en la arquitectura de sistemas reactivos con Akka para alta concurrencia y tolerancia a fallos.",
    "companies.outcoding.name": "Outcoding",
    "companies.outcoding.role": "Desarrollador Full Stack Senior",
    "companies.outcoding.period": "Nov 2023 - Ago 2024",
    "companies.outcoding.task1": "Lideré el desarrollo de un monorepo con Nx, creando librerías y aplicaciones en NestJS y Angular.",
    "companies.outcoding.task2": "Implementé autenticación y autorización con OAuth 2.0 y OpenID Connect en Azure.",
    "companies.outcoding.task3": "Gestioné bases de datos PostgreSQL y optimicé consultas para mejorar el rendimiento.",
    "companies.nttdata.name": "NTT DATA",
    "companies.nttdata.role": "Ingeniero de Software Senior",
    "companies.nttdata.period": "Mar 2022 - Nov 2023",
    "companies.nttdata.task1": "Diseñé y desarrollé microservicios con Spring Boot y Java 11+ para un sistema bancario.",
    "companies.nttdata.task2": "Implementé patrones de comunicación asíncrona con Apache Kafka.",
    "companies.nttdata.task3": "Orquesté servicios en contenedores Docker utilizando Kubernetes en AWS.",

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
    "contact.card.desc":
      "Transformo ideas en realidad digital con atención al detalle, comunicación clara y compromiso con la excelencia en cada proyecto.",
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
    "nav.tools": "Tools",

    // Tools
    "tools.signature-generator.title": "Signature Generator",
    "tools.qr-generator.title": "QR Generator",
    "tools.signature-generator.tabs.data": "Data",
    "tools.signature-generator.tabs.style": "Styles",
    "tools.signature-generator.tabs.templates": "Templates",
    "tools.signature-generator.form.name": "Name",
    "tools.signature-generator.form.name.placeholder": "Your Name",
    "tools.signature-generator.form.role": "Role",
    "tools.signature-generator.form.role.placeholder": "Your Role",
    "tools.signature-generator.form.company": "Company",
    "tools.signature-generator.form.company.placeholder": "Your Company",
    "tools.signature-generator.form.phone": "Phone",
    "tools.signature-generator.form.phone.placeholder": "Your Phone",
    "tools.signature-generator.form.email": "Email",
    "tools.signature-generator.form.email.placeholder": "your@email.com",
    "tools.signature-generator.form.website": "Website",
    "tools.signature-generator.form.website.placeholder": "yourdomain.com",
    "tools.signature-generator.form.linkedin": "LinkedIn",
    "tools.signature-generator.form.linkedin.placeholder": "Your LinkedIn profile URL",
    "tools.signature-generator.form.github": "GitHub",
    "tools.signature-generator.form.github.placeholder": "Your GitHub profile URL",
    "tools.signature-generator.form.whatsapp": "WhatsApp",
    "tools.signature-generator.form.whatsapp.placeholder": "Your WhatsApp number",
    "tools.signature-generator.form.image": "Profile Image",
    "tools.signature-generator.form.image.placeholder": "Your image URL or upload one",
    "tools.signature-generator.style.primary-color": "Primary Color",
    "tools.signature-generator.style.text-color": "Text Color",
    "tools.signature-generator.style.font-style": "Font Style",
    "tools.signature-generator.style.font-size": "Font Size",
    "tools.signature-generator.style.image-radius": "Image Radius",
    "tools.signature-generator.style.icon-size": "Icon Size",
    "tools.signature-generator.templates.classic": "Classic",
    "tools.signature-generator.templates.modern": "Modern",
    "tools.signature-generator.templates.compact": "Compact",
    "tools.signature-generator.preview": "Preview",
    "tools.signature-generator.copy.html": "Copy HTML",
    "tools.signature-generator.copy.signature": "Copy Signature",
    "tools.signature-generator.copied.html": "HTML copied to clipboard!",
    "tools.signature-generator.copied.signature": "Signature copied as plain text!",
    "tools.signature-generator.guide.title": "How to Install Your Signature",
    "tools.signature-generator.guide.gmail": "Settings > See all settings > Scroll down to \"Signature\" > Paste (Ctrl+V).",
    "tools.signature-generator.guide.outlook": "File > Options > Mail > Signatures > Select your signature and paste.",
    "tools.signature-generator.guide.apple-mail": "Mail > Preferences > Signatures > Drag and drop the signature.",

    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.title": "Leon Matias",
    "hero.role": "Senior Full Stack Developer",
    "hero.subtitle":
      "12+ years building scalable, secure, and high-performance applications",
    "hero.cta.contact": "Contact Me",
    "hero.cta.projects": "View Projects",
    "hero.cta.resume": "Download Resume",
    "hero.connect": "Connect with me",
    "hero.email.copied": "Email copied to clipboard",

    // About
    "about.title": "About",
    "about.title.highlight": "Me",
    "about.subtitle": "Passionate developer creating innovative digital solutions",
    "about.p1":
      "I'm a passionate and results-driven Senior Full Stack Developer with over 12 years of experience building scalable, secure, and high-performance applications using Java, JavaScript, and TypeScript. I specialize in microservices architecture, cloud-native development, and modern frontend frameworks like Angular and React.",
    "about.p2":
      "With a strong foundation in both backend and frontend development, I have contributed to the success of large-scale projects in industries such as banking, insurance, retail, and logistics, working with global clients across the United States, Latin America, and the Caribbean.",
    "about.p3":
      "My toolset includes technologies like Spring Boot, Node.js, NestJS, AWS, Azure, Kafka, Docker, and Kubernetes, always applying clean code practices, automated testing, and CI/CD pipelines to ensure software quality and agility.",
    "about.highlight1.title": "Clean Code",
    "about.highlight1.desc":
      "Clean, maintainable, and scalable code following best practices",
    "about.highlight2.title": "Performance",
    "about.highlight2.desc":
      "Constant optimization for fast and smooth experiences",
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
    "companies.agentcloud.task1": "Developed and maintained complex web applications using React and Scala with Play Framework.",
    "companies.agentcloud.task2": "Designed and implemented Infrastructure as Code (IaC) solutions using Terraform on AWS.",
    "companies.agentcloud.task3": "Collaborated on reactive systems architecture with Akka for high concurrency and fault tolerance.",
    "companies.outcoding.name": "Outcoding",
    "companies.outcoding.role": "Senior Full Stack Developer",
    "companies.outcoding.period": "Nov 2023 - Aug 2024",
    "companies.outcoding.task1": "Led the development of a monorepo with Nx, creating libraries and applications in NestJS and Angular.",
    "companies.outcoding.task2": "Implemented authentication and authorization with OAuth 2.0 and OpenID Connect in Azure.",
    "companies.outcoding.task3": "Managed PostgreSQL databases and optimized queries to improve performance.",
    "companies.nttdata.name": "NTT DATA",
    "companies.nttdata.role": "Senior Software Engineer",
    "companies.nttdata.period": "Mar 2022 - Nov 2023",
    "companies.nttdata.task1": "Designed and developed microservices with Spring Boot and Java 11+ for a banking system.",
    "companies.nttdata.task2": "Implemented asynchronous communication patterns with Apache Kafka.",
    "companies.nttdata.task3": "Orchestrated Docker containerized services using Kubernetes on AWS.",

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
    "contact.card.desc":
      "I transform ideas into digital reality with attention to detail, clear communication, and commitment to excellence in every project.",
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
