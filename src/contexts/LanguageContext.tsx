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
    "timeline.subtitle": "12+ años de experiencia en empresas de EE. UU. e internacionales",

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
    "companies.idm.task1": "Construí microservicios reactivos cloud-native (Java 25, Spring Boot 4, Spring WebFlux) para generación de QR dinámico y estático, procesamiento de pagos y persistencia de transacciones — cliente: Scotiabank Perú.",
    "companies.idm.task2": "Diseñé servicios de integración conectando Google Cloud Platform y Apigee con sistemas mainframe IBM AS/400 mediante DataQueues.",
    "companies.idm.task3": "Implementé autenticación bancaria con Spring Security y optimicé la capa SQL Server para cargas transaccionales de alto volumen.",
    "companies.idm.task4": "Desarrollé herramientas internas para operaciones bancarias con React, Electron, Node.js y Python.",
    "companies.idm.task5": "Mantuve pipelines Jenkins y quality gates SonarCloud; apliqué desarrollo asistido por IA (Claude Code, GitHub Copilot).",
    "companies.dacodes.task1": "Lideré la arquitectura y el desarrollo full-stack de AgentCloud, una plataforma SaaS cloud-native para una aseguradora de salud de EE. UU. — gestionando afiliados, proveedores y redes de clínicas de extremo a extremo.",
    "companies.dacodes.task2": "Construí microservicios para inscripción de afiliados, gestión de pólizas y autorizaciones de atención en AWS (Lambda, EKS, SQS) con Java, Spring Boot y Scala; contenedorizados con Docker y Kubernetes.",
    "companies.dacodes.task3": "Desarrollé portal de administración React 18 para el equipo de seguros y app móvil React Native para afiliados — cobertura, localización de clínicas y solicitud de autorizaciones.",
    "companies.dacodes.task4": "Implementé backend event-driven con Apache Kafka para autorización de atenciones, notificaciones de reclamaciones y triggers de facturación a proveedores.",
    "companies.dacodes.task5": "Definí estándares de ingeniería, lideré code reviews y guié al equipo distribuido en ceremonias Agile; CI/CD con GitHub Actions.",
    "companies.outcoding.task1": "Contribuí a Qorta, la plataforma de monitoreo de riesgo de conductores y vehículos de SambaSafety, utilizada por operadores de flotas en Norteamérica.",
    "companies.outcoding.task2": "Desarrollé y migré módulos frontend a micro-frontends con Angular 15 y Tailwind CSS; reemplacé listeners RabbitMQ legacy por Spring Cloud Stream.",
    "companies.outcoding.task3": "Construí microservicios con Java 17 y Spring Boot en arquitectura hexagonal; integré APIs de registros de vehículos (MVR) en múltiples jurisdicciones de EE. UU.",
    "companies.outcoding.task4": "Optimicé queries PostgreSQL para datasets de conductores a gran escala; mantuve 95%+ cobertura de código con JUnit, Mockito y Jest.",
    "companies.outcoding.task5": "Entregué en AWS (EKS, SES, SNS, S3) con pipelines CI/CD en Bitbucket para calidad y despliegue continuos.",
    "companies.globant.task1": "Desarrollé funcionalidades de banca digital como ingeniero embebido en Banco GNB Paraguay — gestión de cuentas, pagos de servicios y operaciones de banca retail y corporativa.",
    "companies.globant.task2": "Construí y mantuve microservicios con Java 11/Java 8 y Spring Boot; desarrollé componentes Angular 12 para banca personal y corporativa con JPA/Hibernate y Feign.",
    "companies.globant.task3": "Desarrollé app móvil React Native para gestión de cuentas, historial de transacciones y notificaciones push en tiempo real — desplegada en App Store y Google Play.",
    "companies.globant.task4": "Lideré migración de microservicios legacy con 85%+ cobertura de tests JUnit/Mockito para los quality gates del pipeline CI/CD.",
    "companies.bridge.task1": "Construí Lynk, una plataforma nacional de banca digital y monedero móvil para National Commercial Bank Jamaica, integrando sistemas core bancarios internos y proveedores externos.",
    "companies.bridge.task2": "Desarrollé ~50 microservicios con Java 11 y Spring Boot en arquitectura hexagonal; implementé arquitectura event-driven con Apache Kafka e integré Twilio para mensajería y verificación.",
    "companies.bridge.task3": "Construí microservicios serverless con Azure Functions y Node.js/NestJS; desarrollé frontend React y pantallas de monedero móvil con React Native.",
    "companies.bridge.task4": "Desplegué en Azure (AKS, App Insights, Event Hubs, Azure SQL) con PostgreSQL; gestioné calidad con SonarCloud y ciclo completo del proyecto en Azure DevOps.",

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
    "footer.rights": "© 2026 Leon Matias. Todos los derechos reservados.",
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
    "timeline.subtitle": "12+ years of experience across US and international companies",

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
    "companies.idm.task1": "Built cloud-native reactive microservices (Java 25, Spring Boot 4, Spring WebFlux) for dynamic and static QR generation, payment processing, and transaction persistence — client: Scotiabank Peru.",
    "companies.idm.task2": "Designed integration services connecting Google Cloud Platform and Apigee with IBM AS/400 mainframe systems through DataQueues.",
    "companies.idm.task3": "Implemented banking-grade authentication with Spring Security and optimized SQL Server persistence for high-throughput transactional workloads.",
    "companies.idm.task4": "Developed internal tools for bank operations using React, Electron, Node.js, and Python.",
    "companies.idm.task5": "Maintained Jenkins CI/CD pipelines and SonarCloud quality gates; applied AI-assisted development (Claude Code, GitHub Copilot).",
    "companies.dacodes.task1": "Led architecture and full-stack development of AgentCloud, a cloud-native SaaS platform for a U.S. health insurance company — managing members, providers, and clinic networks end to end.",
    "companies.dacodes.task2": "Built microservices for member enrollment, policy management, and care authorization on AWS (Lambda, EKS, SQS) with Java, Spring Boot, and Scala; containerized with Docker and Kubernetes.",
    "companies.dacodes.task3": "Developed React 18 admin portal for insurance staff and React Native mobile app for members to view coverage, locate clinics, and request care authorizations.",
    "companies.dacodes.task4": "Implemented event-driven backend with Apache Kafka for care authorization events, claim notifications, and provider billing triggers.",
    "companies.dacodes.task5": "Defined engineering standards, led code reviews, and guided the distributed team through Agile ceremonies; CI/CD with GitHub Actions.",
    "companies.outcoding.task1": "Contributed to Qorta, SambaSafety's driver and vehicle risk monitoring platform used by fleet operators across North America.",
    "companies.outcoding.task2": "Developed and migrated frontend modules to micro-frontends using Angular 15 and Tailwind CSS; replaced legacy RabbitMQ listeners with Spring Cloud Stream.",
    "companies.outcoding.task3": "Built microservices with Java 17 and Spring Boot following hexagonal architecture; integrated motor vehicle record (MVR) data providers across U.S. jurisdictions.",
    "companies.outcoding.task4": "Optimized PostgreSQL queries for large-scale driver datasets; maintained 95%+ code coverage with JUnit, Mockito, and Jest.",
    "companies.outcoding.task5": "Delivered on AWS (EKS, SES, SNS, S3) with Bitbucket CI/CD pipelines for continuous quality and deployment.",
    "companies.globant.task1": "Delivered digital banking features as embedded engineer within Banco GNB Paraguay's core team — account management, service payments, and retail and corporate banking operations.",
    "companies.globant.task2": "Built and maintained microservices with Java 11/Java 8 and Spring Boot; developed Angular 12 components for personal and corporate banking with JPA/Hibernate and Feign.",
    "companies.globant.task3": "Developed React Native mobile banking app for account management, transaction history, and real-time push notifications — deployed to App Store and Google Play.",
    "companies.globant.task4": "Led migration of legacy microservices; maintained 85%+ test coverage with JUnit and Mockito to satisfy CI/CD pipeline quality gates.",
    "companies.bridge.task1": "Built Lynk, a national digital banking and mobile wallet platform for National Commercial Bank Jamaica, integrating internal core-banking and external third-party systems.",
    "companies.bridge.task2": "Developed ~50 microservices with Java 11 and Spring Boot using hexagonal architecture; implemented event-driven flows with Apache Kafka and integrated Twilio for messaging and verification.",
    "companies.bridge.task3": "Built serverless microservices with Azure Functions and Node.js/NestJS; developed React frontend and React Native mobile wallet screens.",
    "companies.bridge.task4": "Delivered on Azure (AKS, App Insights, Event Hubs, Azure SQL) with PostgreSQL; managed quality with SonarCloud and full project lifecycle in Azure DevOps.",

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
    "footer.rights": "© 2026 Leon Matias. All rights reserved.",
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
