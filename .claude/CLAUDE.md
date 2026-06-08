# dev-leon-matias-profile — Claude Context

Portfolio profesional de **Roslin Leon Matias** (Lead Software Engineer).
Stack: React 18 + Vite + TypeScript + Tailwind + shadcn/ui.

## Quick start

```bash
npm run dev        # http://localhost:5174/dev-leon-matias-profile/
npm run build      # Producción en dist/
git push origin main  # Auto-deploy (GitHub Pages / Vercel si configurado)
```

## Estructura de componentes

```
src/
├── components/
│   ├── Hero.tsx          # Landing: foto, badges flotantes, orbs animados, dot grid
│   ├── About.tsx         # Métricas + bio del CV + highlights
│   ├── Skills.tsx        # Languages / Frameworks / Cloud+Infra + DBs row
│   ├── Timeline.tsx      # Career timeline: 4 empresas reales del CV
│   ├── CTABanner.tsx     # Banner gradiente "Looking for a Lead Engineer?"
│   ├── GitHub.tsx        # Repos y lenguajes de GitHub API (username: devLeonMat)
│   ├── Contact.tsx       # Email / WhatsApp / Location cards
│   ├── Navigation.tsx    # Transparente → solid on scroll, active pill
│   └── Footer.tsx        # © 2026, social links
├── contexts/
│   ├── LanguageContext.tsx  # i18n ES/EN — TODAS las traducciones aquí
│   └── ThemeContext.tsx     # Dark/light — persiste en localStorage
├── pages/
│   ├── Index.tsx         # Orden: Hero→About→Skills→Timeline→CTABanner→GitHub→Contact→Footer
│   └── Tools.tsx         # Página /tools separada
└── index.css             # Design system completo (variables HSL, animaciones)
```

## Design system (index.css)

**Paleta**: Indigo primary `239 84% 67%` / Violet accent `262 83% 58%` / Near-white bg `220 33% 98%`  
**Dark mode**: Navy `224 71% 4%` / Cards `222 47% 7%` / Primary más claro `239 80% 72%`

**Clases clave:**
- `card-elevated` — card con shadow, border, hover lift
- `text-gradient` — gradient indigo→violet en texto
- `badge-pill` — pill con borde primary/8 bg
- `hero-bg` — gradient mesh radial para Hero
- `section-alt` — bg ligeramente gris para secciones alternas
- `hover-lift` — translateY(-2px) on hover

**Animaciones CSS:**
- `orbFloat` — orbs de fondo flotando (Hero)
- `badgeFloat` — tech badges flotando alrededor de la foto
- `scrollBounce` — indicador de scroll abajo del Hero
- `fadeIn`, `scaleIn`, `slideUp` — entrada de elementos

## Contenido del CV (fuente de verdad)

**Nombre completo**: Roslin Leon Matias  
**Email**: leonmatias1991@gmail.com  
**WhatsApp**: +51 933 166 559  
**LinkedIn**: https://www.linkedin.com/in/fs-leon-matias/  
**GitHub**: https://github.com/devLeonMat  

**Resumen**: Lead Software Engineer, 12+ años, Healthcare / Banking / Insurance / Retail / Logistics. AWS Certified Solutions Architect. Bachelor of Systems Engineering — National University of Callao.

**Empresas (timeline):**
1. **Dacodes** — Lead Software Engineer · Jan 2025–Present · Remote USA
2. **Outcoding** — Senior Full Stack Engineer · Mar 2023–Dec 2024 · Remote USA
3. **Globant** — Senior Full Stack Engineer · Jun 2022–May 2023 · Remote USA
4. **The Bridge Social** — Full Stack Engineer · Jan 2021–Jan 2022 · Remote USA
5. Earlier: INDRA (BCP, RIMAC), Michael Page (Intercorp), Zoluxiones (SURA), Experis (Equifax), Olva, LimaW

**Tech stack del CV:**
- Lenguajes: Java, Scala, TypeScript, JavaScript, SQL
- Frameworks: Spring Boot, Spring Cloud, React, Angular, NestJS, Node.js
- Cloud: AWS (Lambda, S3, RDS, CloudWatch, EKS), Azure (AKS, CosmosDB)
- Infra: Docker, Kubernetes, Kafka, Redis
- DBs: Oracle 19c, PostgreSQL, SQL Server, MongoDB, CosmosDB
- Testing: JUnit, Mockito, Jest, Karma, Jasmine

## Variables de entorno (.env)

```
VITE_WHATSAPP_NUMBER=51933166559
VITE_EMAIL=leonmatias1991@gmail.com
VITE_LINKEDIN_URL=https://www.linkedin.com/in/fs-leon-matias/
VITE_GITHUB_URL=https://github.com/devLeonMat
VITE_RESUME_URL=<URL del CV en Google Drive u otro>
```

## Assets locales

```
src/assets/
├── photo.jpeg              # Foto profesional (usada en Hero y About)
├── brands/
│   ├── dacodes.webp        # Logo Dacodes
│   ├── outcoding.svg       # Logo Outcoding
│   ├── ntt-data.png/.svg   # Logo NTT Data (no en uso activo)
│   └── whatsapp-icon.svg   # Icono WhatsApp
```

Globant y The Bridge Social usan **iniciales con color** (no hay logo local):
- Globant: `G` verde `#00AC70`
- The Bridge Social: `TB` indigo `#6366F1`

## Pendientes / ideas registradas

- [ ] **Background animado**: tsParticles o aurora shader (simplex-noise + canvas) — discutido, no implementado aún
- [ ] **Certifications section**: AWS Certified, Bachelor Eng — agregar debajo de Timeline o en About
- [ ] **Industries strip**: Healthcare · Banking · Insurance · Retail · Logistics como pills visuales entre Hero y About
- [ ] **Testimonios**: quotes de LinkedIn recommendations — requiere contenido
- [ ] **GitHub repos**: los repos actuales son de práctica (Kotlin, PHP, JS básico) — considerar pinear repos más relevantes en GitHub o filtrar por estrellas

## Routing

Usa `HashRouter` (requerido para GitHub Pages static hosting):
- `/#/home` → Index (portfolio completo)
- `/#/tools` → Tools (Signature Generator + QR Generator)

## Deploy

Repo: `git@github.com:devLeonMat/dev-leon-matias-profile.git`  
Branch: `main` → push directo despliega si hay CI configurado.
