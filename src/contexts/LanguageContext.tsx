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
    "hero.role": "Lead Software Engineer",
    "hero.availability": "Disponible para oportunidades remotas",
    "hero.subtitle":
      "12+ años entregando aplicaciones cloud-native, sistemas distribuidos y soluciones empresariales en Healthcare, Banking, Insurance y Logistics",
    "hero.cta.contact": "Contáctame",
    "hero.cta.projects": "Ver Experiencia",
    "hero.cta.resume": "Descargar CV",
    "hero.connect": "Conéctate conmigo",
    "hero.email.copied": "Email copiado al portapapeles",

    // Timeline
    "timeline.title": "Trayectoria",
    "timeline.title.highlight": "Profesional",
    "timeline.subtitle": "12+ años de experiencia en empresas de USA y Latinoamérica",

    // About
    "about.title": "Sobre",
    "about.title.highlight": "Mí",
    "about.subtitle": "Lead Software Engineer especializado en sistemas cloud-native y arquitectura de microservicios",
    "about.p1":
      "Lead Software Engineer con 12+ años de experiencia entregando aplicaciones cloud-native, sistemas distribuidos y soluciones empresariales en Healthcare, Banking, Insurance, Retail y Logistics. Especializado en Java, Spring Boot, React, Angular, AWS, Azure, Kubernetes, Kafka y Microservices Architecture.",
    "about.p2":
      "Historial comprobado modernizando plataformas legacy, liderando iniciativas técnicas y construyendo sistemas escalables para organizaciones en Estados Unidos, Latinoamérica y el Caribe.",
    "about.p3":
      "Comprometido con prácticas de ingeniería de excelencia: arquitectura hexagonal, DDD, testing automatizado con 95%+ cobertura, y pipelines CI/CD robustos para garantizar calidad y velocidad de entrega.",
    "about.highlight1.title": "Technical Leadership",
    "about.highlight1.desc": "Liderazgo técnico en iniciativas de modernización y arquitectura de sistemas distribuidos",
    "about.highlight2.title": "Cloud Native",
    "about.highlight2.desc": "AWS & Azure: Lambda, EKS, RDS, S3, CosmosDB, AKS y servicios gestionados",
    "about.highlight3.title": "Enterprise Scale",
    "about.highlight3.desc": "50+ microservicios, sistemas event-driven con Kafka, plataformas bancarias y de salud",

    // Skills
    "skills.title": "Tech",
    "skills.title.highlight": "Stack",
    "skills.subtitle": "Tecnologías y herramientas que domino",
    "skills.languages": "Lenguajes",
    "skills.frameworks": "Frameworks",
    "skills.cloud": "Cloud & Infra",

    // Companies
    "companies.dacodes.task1": "Entregué mejoras a plataforma healthcare: scheduling de citas, flujos de contratos y validación de seguros.",
    "companies.dacodes.task2": "Desarrollé soluciones con React 18 y Scala integradas con Oracle 19c y servicios cloud de AWS.",
    "companies.dacodes.task3": "Contribuí a arquitectura de microservicios cloud-native con AWS Lambda, S3, RDS y CloudWatch.",
    "companies.dacodes.task4": "Optimicé operaciones de base de datos y workflows backend para mejorar mantenibilidad y rendimiento.",
    "companies.outcoding.task1": "Construí micro-frontends en Angular y microservicios Java 17 para soluciones de seguros y gestión de riesgo.",
    "companies.outcoding.task2": "Implementé patrones de Arquitectura Hexagonal y prácticas de desarrollo cloud-native.",
    "companies.outcoding.task3": "Mantuve 95%+ de cobertura de tests automatizados para requisitos CI/CD enterprise.",
    "companies.outcoding.task4": "Mejoré mantenibilidad de plataforma mediante iniciativas de modernización y descomposición de servicios.",
    "companies.globant.task1": "Desarrollé capacidades de banca online para clientes retail y corporativos usando Java y Angular.",
    "companies.globant.task2": "Integré servicios distribuidos usando Spring Cloud y Feign en entorno bancario altamente regulado.",
    "companies.globant.task3": "Entregué soluciones financieras seguras y escalables con soporte de CI/CD enterprise.",
    "companies.bridge.task1": "Diseñé e implementé más de 50 microservicios bancarios usando Java y Spring Boot.",
    "companies.bridge.task2": "Construí soluciones event-driven con Kafka y servicios cloud-native en Azure.",
    "companies.bridge.task3": "Desarrollé aplicaciones bancarias con React para productos financieros orientados al cliente.",

    // CTA Banner
    "cta.heading": "¿Buscas un Lead Engineer?",
    "cta.subtext": "Disponible para roles remotos en empresas de Estados Unidos y Latinoamérica. Construyamos algo juntos.",
    "cta.btn.contact": "Hablemos",

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
    "hero.role": "Lead Software Engineer",
    "hero.availability": "Available for remote opportunities",
    "hero.subtitle":
      "12+ years delivering cloud-native applications, distributed systems, and enterprise software across Healthcare, Banking, Insurance, and Logistics",
    "hero.cta.contact": "Get in Touch",
    "hero.cta.projects": "View Experience",
    "hero.cta.resume": "Download Resume",
    "hero.connect": "Connect with me",
    "hero.email.copied": "Email copied to clipboard",

    // Timeline
    "timeline.title": "Career",
    "timeline.title.highlight": "Timeline",
    "timeline.subtitle": "12+ years of experience across US and Latin America companies",

    // About
    "about.title": "About",
    "about.title.highlight": "Me",
    "about.subtitle": "Lead Software Engineer specialized in cloud-native systems and microservices architecture",
    "about.p1":
      "Lead Software Engineer with 12+ years of experience delivering cloud-native applications, distributed systems, and enterprise software solutions across Healthcare, Banking, Insurance, Retail, and Logistics. Specialized in Java, Spring Boot, React, Angular, AWS, Azure, Kubernetes, Kafka, and Microservices Architecture.",
    "about.p2":
      "Proven success modernizing legacy platforms, leading technical initiatives, and building scalable systems for organizations across the United States, Latin America, and the Caribbean.",
    "about.p3":
      "Committed to engineering excellence: hexagonal architecture, DDD, 95%+ automated test coverage, and robust CI/CD pipelines to ensure quality and delivery speed.",
    "about.highlight1.title": "Technical Leadership",
    "about.highlight1.desc": "Leading modernization initiatives and distributed systems architecture decisions",
    "about.highlight2.title": "Cloud Native",
    "about.highlight2.desc": "AWS & Azure: Lambda, EKS, RDS, S3, CosmosDB, AKS and managed services",
    "about.highlight3.title": "Enterprise Scale",
    "about.highlight3.desc": "50+ microservices, event-driven systems with Kafka, banking and healthcare platforms",

    // Skills
    "skills.title": "Tech",
    "skills.title.highlight": "Stack",
    "skills.subtitle": "Technologies and tools I master",
    "skills.languages": "Languages",
    "skills.frameworks": "Frameworks",
    "skills.cloud": "Cloud & Infra",

    // Companies
    "companies.dacodes.task1": "Delivered healthcare platform enhancements: appointment scheduling, contract workflows, and insurance validation.",
    "companies.dacodes.task2": "Developed React 18 and Scala solutions integrated with Oracle 19c and AWS cloud services.",
    "companies.dacodes.task3": "Contributed to cloud-native microservices architecture using AWS Lambda, S3, RDS, and CloudWatch.",
    "companies.dacodes.task4": "Optimized database operations and backend workflows to improve maintainability and performance.",
    "companies.outcoding.task1": "Built Angular micro-frontends and Java 17 microservices for insurance and driver risk management.",
    "companies.outcoding.task2": "Implemented Hexagonal Architecture patterns and cloud-native development practices.",
    "companies.outcoding.task3": "Maintained 95%+ automated test coverage supporting enterprise CI/CD requirements.",
    "companies.outcoding.task4": "Improved platform maintainability through modernization initiatives and service decomposition.",
    "companies.globant.task1": "Developed online banking capabilities for retail and corporate customers using Java and Angular.",
    "companies.globant.task2": "Integrated distributed services using Spring Cloud and Feign in a highly regulated banking environment.",
    "companies.globant.task3": "Delivered secure, scalable financial solutions with enterprise CI/CD and QA support.",
    "companies.bridge.task1": "Designed and implemented 50+ banking microservices using Java and Spring Boot.",
    "companies.bridge.task2": "Built event-driven solutions using Kafka and cloud-native services on Azure.",
    "companies.bridge.task3": "Developed React-based banking applications supporting customer-facing financial products.",

    // CTA Banner
    "cta.heading": "Looking for a Lead Engineer?",
    "cta.subtext": "Available for remote roles at US and Latin America companies. Let's build something great together.",
    "cta.btn.contact": "Let's Talk",

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
