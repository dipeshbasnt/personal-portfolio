export type NavigationItem = {
  label: string;
  href: string;
  active?: boolean;
};

export type HeroStat = {
  value: string;
  label: string;
};

export const siteIdentity = {
  name: "RabbitTheDesigner",
  monogram: "RB",
  homeLabel: "RabbitTheDesigner home",
  navigationLabel: "Main navigation",
};

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#home", active: true },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
];

export const heroContent = {
  role: "UI/UX designer & frontend developer",
  titleLines: ["I Design Digital", "Experiences That"],
  titleAccent: "People Remember.",
  description: "I combine design, code and a bit of curiosity to build modern, user-friendly web experiences that make an impact.",
  portraitAlt: "Illustrated portrait of Dipesh Basnet wearing headphones",
  workAction: "View My Work",
  talkAction: "Let's talk",
  talkLineOne: "Let's",
  talkLineTwo: "Talk",
  contactAction: "Contact",
  wordmark: "RABBIT",
  signature: "Dipesh Basnet",
  scrollLabel: "SCROLL",
};

export const heroStats: HeroStat[] = [
  { value: "10+", label: "Projects Completed" },
  { value: "3+", label: "Years Learning & Building" },
  { value: "5+", label: "Technologies & Tools" },
];

export const characterImage = "/images/character.PNG";

export const aboutContent = {
  eyebrow: "About me",
  titleLead: "Turning ideas into",
  titleAccent: "meaningful digital experiences.",
  summary:
    "Bridging the gap between human-centered UI/UX design and modern frontend engineering.",
  biography: [
    "I'm a UI/UX Designer and Frontend Developer who loves creating clean, modern, and user-friendly web experiences.",
    "I enjoy solving complex problems, building beautiful interfaces, and turning ideas into real, functional products that users love to interact with every day.",
  ],
  highlights: [
    { value: "3+", label: "Years Building & Learning" },
    { value: "10+", label: "Completed Projects" },
    { value: "BScIT", label: "ISMT Graduate in CS" },
  ],
  signature: "Dipesh Basnet",
  availabilityLabel: "I'm available for work",
  portraitAlt: "Two people collaborating over a laptop",
  portraitImage: "/images/about-workspace.jpg",
  location: "Kathmandu, Nepal",
  portraitCaption: "Design · Code · Solve",
  portraitNote: "Crafted with passion",
  journey: [
    {
      title: "UI/UX Designer & Frontend Developer Intern",
      period: "2024 — PRESENT",
      organization: "Web & Digital Experience Projects",
      description:
        "Contributed to building modern web applications, translating Figma design systems into responsive Next.js views with user-centered interactions.",
    },
    {
      title: "BSc (Hons) Computer Systems Engineering (BSc IT)",
      period: "GRADUATED",
      organization: "ISMT (with University of Sunderland, UK)",
      description:
        "Curriculum covers computing and IT with a focus on software engineering, networking, Data Technology, AI, Android Mobile Development and information systems — aimed at students with strong interests in information technology wishing to acquire knowledge in the application of computing and IT across industries and businesses.",
    },
  ],
  technologies: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Figma",
    "UI/UX Design",
    "JavaScript",
    "Git",
    "Responsive Design",
  ],
  interests: [
    "Design Systems",
    "Micro-Interactions",
    "AI & Developer Tools",
    "Open Source",
  ],
  closingQuote:
    "Bridging the gap between creative visual design and rock-solid code.",
} as const;

export const aboutPillars = [
  {
    step: "01 / INTERFACE",
    icon: "layout",
    title: "UI/UX Design",
    description:
      "Crafting intuitive user journeys, wireframes, and high-fidelity interactive prototypes focused on simplicity, emotion, and accessibility.",
    skills: ["Figma", "Wireframing", "Prototyping", "User Research", "Mobile & Web"],
  },
  {
    step: "02 / CODE",
    icon: "code",
    title: "Frontend Development",
    description:
      "Transforming design concepts into fast, responsive, and accessible web experiences with clean, modern, and scalable architecture.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Modern HTML/CSS", "Git"],
  },
  {
    step: "03 / STRATEGY",
    icon: "compass",
    title: "Product Thinking",
    description:
      "Connecting user needs with technical feasibility and business goals through iterative testing, problem solving, and refinement.",
    skills: ["Problem Solving", "User Centered", "Agile Workflow", "Design Systems"],
  },
] as const;

export const services = [
  {
    category: "Brand Design",
    title: "Brand Identity & Design System",
    description:
      "Creating a consistent visual foundation through logo direction, color, typography, guidelines, and reusable design assets.",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Vivid color and ink study for visual identity exploration",
  },
  {
    category: "Product Design",
    title: "UI/UX Design",
    description:
      "Designing clear user flows, wireframes, high-fidelity interfaces, prototypes, and scalable component systems in Figma.",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Interface sketches on a tablet during a product design session",
  },
  {
    category: "Frontend Development",
    title: "React Frontend Development",
    description:
      "Turning Figma designs into responsive, reusable, production-ready React and Next.js interfaces.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Laptop displaying code in a bright development workspace",
  },
] as const;
export const featuredWorkContent = {
  eyebrow: "FEATURED WORK",
  title: "Turning ideas into clean, functional and meaningful digital products.",
  summary:
    "A selected project where I worked on the complete product experience — from research and design to development and launch.",
  ctaLabel: "View case study",
  ctaUrl: "#",
  project: {
    title: "RatoPandaDigitals",
    tags: "FIGMA DESIGN · REACT · NEXT.JS",
    description:
      "An agency portfolio website designed in Figma and built with React and Next.js—my first complete Figma-to-code project.",
    imageSrc: "/images/featured-work.png",
    imageAlt: "RatoPandaDigitals agency portfolio website showcase",
  },
} as const;

export const projectsContent = {
  eyebrow: "MY WORK",
  title: "A collection of projects where design meets function.",
  summary:
    "Here are some of the projects I've worked on this from concept to clean, usable interfaces.",
  viewAllLabel: "View all projects",
  viewAllUrl: "/projects",
  projects: [
    {
      id: "freshbite",
      title: "FreshBite",
      description: "FreshBite is a restaurant and café ordering app where users can explore dishes, check menus, place quick orders, and track their delivery live. The goal was to create a clean and easy interface that helps users order without confusion.",
      tags: "MOBILE APP · UI/UX DESIGN · 2025",
      imageSrc: "/images/Freshbite.png",
      imageAlt: "FreshBite mobile app design showcase",
      link: "#",
    },
    {
      id: "thriftstore",
      title: "Thriftstore",
      description: "Thriftstore is an e-commerce platform for buying and selling second-hand clothing and accessories. The goal was to create a user-friendly interface that makes it easy for users to find unique items while providing a seamless shopping experience.",
      tags: "MOBILE APP · UI/UX DESIGN · 2025",
      imageSrc: "/images/Thriftstore.png",
      imageAlt: "Thriftstore e-commerce app project preview",
      link: "#",
    },
    {
      id: "freshsip",
      title: "freshsip",
      description: "FreshSip is a vibrant, health-focused landing page designed to provide a seamless user experience for a premium juice bar. This project explores high-energy branding, glass-morphism, and advanced Figma prototyping",
      tags: "BRANDING · VISUAL DESIGN · 2024",
      imageSrc: "/images/freshsip.png",
      imageAlt: "freshsip visual design and branding showcase",
      link: "#",
    },
  ],
} as const;

export const footerContent = {
  brand: "RabbitTheDesigner",
  copyright: `© ${new Date().getFullYear()} RabbitTheDesigner. All rights reserved.`,
  navLinks: [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X (Twitter)", href: "https://x.com" },
  ],
} as const;

export const contactContent = {
  title: "LET'S WORK TOGETHER",
  cardTitle: "Ready to start\nyour project?",
  cardDescription:
    "Share your goals and timeline, and I’ll send a tailored proposal.",
  ctaLabel: "GET IN TOUCH",
  submitLabel: "SEND MESSAGE",
  fields: {
    nameLabel: "Name",
    namePlaceholder: "Enter your full name",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email address",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your project...",
  },
} as const;