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
      "An agency portfolio website designed in Figma and built with React and Next.js ,this is my first complete Figma-to-code project.",
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

export const howItWorksContent = {
  eyebrow: "MY PROCESS",
  title: "How It Works",
  steps: [
    {
      id: "step-01",
      number: "01",
      title: "Project Brief",
      description:
        "Every project begins with understanding the product, defining requirements, identifying the target users, and documenting the scope before any design starts.",
      tags: ["Project Brief", "Goals", "Targeted User"],
      align: "right",
      imageSrc:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&auto=format&fit=crop&q=85",
      imageAlt: "Project brief contract and scope document review",
    },
    {
      id: "step-02",
      number: "02",
      title: "Research & Inspiration",
      description:
        "I analyze similar products, explore design patterns, and collect inspiration to understand industry standards before defining the solution.",
      tags: ["Competitor Analysis", "Best Practices", "UI Inspiration"],
      align: "left",
      imageSrc: "/images/Research.webp",
      imageAlt: "Research and inspiration phase for visual identity exploration",
    },
    {
      id: "step-03",
      number: "03",
      title: "Product Planning",
      description:
        "I translate ideas into a clear product plan by defining features, project scope, and user requirements through a structured PRD.",
      tags: ["PRD", "Scope", "Features"],
      align: "right",
      imageSrc:"/images/product.webp",
      imageAlt: "Product roadmap and feature planning board",
    },
    {
      id: "step-04",
      number: "04",
      title: "UX Architecture",
      description:
        "I organize the product through information architecture, sitemaps, and user flows to create a clear and intuitive user experience.",
      tags: [
        "Information Architecture",
        "SiteMap",
        "Userflow",
        "Targeted User",
      ],
      align: "left",
      imageSrc:"/images/architecture.webp",
      imageAlt: "UX sitemap and information architecture diagram",
    },
    {
      id: "step-05",
      number: "05",
      title: "Wireframe",
      description:
        "I explore layouts, navigation, and content hierarchy with low-fidelity wireframes before moving into visual design.",
      tags: ["Low-fidelity", "Layout", "Hierarchy"],
      align: "right",
      imageSrc:
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&auto=format&fit=crop&q=85",
      imageAlt: "Low-fidelity wireframe sketches on tablet",
    },
    {
      id: "step-06",
      number: "06",
      title: "Design System",
      description:
        "I create reusable foundations including typography, colors, components, variables, and Auto Layout to ensure consistency across every screen.",
      tags: ["Components", "Variants", "Property"],
      align: "left",
      imageSrc: "/images/design-system.webp",
      imageAlt: "Design system with typography, colors, and component library",
    },
    {
      id: "step-07",
      number: "07",
      title: "UI Design",
      description:
        "I transform wireframes into polished, responsive interfaces with a strong focus on usability, accessibility, and visual consistency.",
      tags: ["Usability", "Responsive", "Accessibility"],
      align: "right",
      imageSrc: "/images/ui-design.webp",
      imageAlt: "UI design with polished responsive interfaces and visual consistency",
    },
    {
      id: "step-08",
      number: "08",
      title: "Prototype & Refine",
      description:
        "I connect interactions, review user flows, gather feedback, and refine the experience until it feels intuitive and ready for development.",
      tags: ["Figma Link", "Feedback", "Iteration"],
      align: "left",
      imageSrc: "/images/interactiveprototype.webp",
      imageAlt: "Interactive prototype refinement with user flow connections",
    },
    {
      id: "step-09",
      number: "09",
      title: "Frontend Build",
      description:
        "I translate approved designs into responsive React interfaces, ensuring the final product remains faithful to the original design.",
      tags: ["React", "Next.js Integration"],
      align: "right",
      imageSrc: "/images/front.webp",
      imageAlt: "Frontend build with responsive React interface code on screen",
    },
  ],
} as const;

// export const journeyContent = {
//   services: {
//     eyebrow: "WHAT I BRING",
//     items: [
//       {
//         id: "ui-ux",
//         title: "UI/UX Design",
//         skills: "Research · Wireframes · Prototypes · UI Design",
//       },
//       {
//         id: "frontend",
//         title: "Frontend Development",
//         skills: "HTML · CSS · JavaScript · React · Next.js",
//       },
//       {
//         id: "problem-solving",
//         title: "Problem Solving",
//         skills: "User Focused · Detail Oriented · Always Learning",
//       },
//     ],
//   },
//   journey: {
//     eyebrow: "MY JOURNEY",
//     title: "I started my journey with curiosity and a love for technology.",
//     body: "Over time, I explored design, learned to code, and found my passion in building web experiences that people enjoy and remember.",
//   },
//   education: {
//     eyebrow: "EDUCATION",
//     degree: "B.Sc. in Computer Engineering",
//     status: "(Ongoing)",
//     institution: "Faculty of Engineering & Technology",
//     description: "Focusing on software architecture, user interface systems, and modern web application development.",
//   },
//   beyondWork: {
//     eyebrow: "BEYOND WORK",
//     body: "When I’m not designing or coding, you’ll find me exploring new tech, listening to music, or just enjoying a good cup of coffee.",
//     interests: [
//       { label: "Tech", type: "tech" },
//       { label: "Music", type: "music" },
//       { label: "Travel", type: "travel" },
//       { label: "Coffee", type: "coffee" },
//     ],
//   },
// } as const;

export const metricsVendoContent = {
  stats: [
    {
      id: "projects-completed",
      value: 10,
      suffix: "+",
      decimals: 0,
      caption: {
        line1: "Completed projects",
        preHighlight: "from concept to ",
        highlight: "launch",
      },
      maxWidth: "max-w-[200px]",
    },
    {
      id: "years-building",
      value: 3,
      suffix: "+",
      decimals: 0,
      caption: {
        line1: "Years learning & building",
        preHighlight: "focused on ",
        highlight: "design and code",
      },
      maxWidth: "max-w-[240px]",
    },
    {
      id: "technologies-tools",
      value: 5,
      suffix: "+",
      decimals: 0,
      caption: {
        line1: "Technologies & tools",
        preHighlight: "used to build ",
        highlight: "digital experiences",
      },
      maxWidth: "max-w-[260px]",
    },
  ],
} as const;

// Add or replace in @/data/portfolio.ts

export interface TestimonialItem {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}

export const testimonialsContent = {
  eyebrow: "TESTIMONIALS",
  title: "Client Testimonials",
  items: [
    {
      id: "rahul-vohra",
      name: "Rahul Vohra",
      title: "CEO, Superhuman",
      description:
        "The tracking tools and progress insights inside Goodwell keep me accountable. The engineering quality and attention to design detail exceeded our expectations.",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      linkedinUrl: "#",
      twitterUrl: "#",
    },
    {
      id: "tara-tan",
      name: "Tara Tan",
      title: "Founding Partner at Strange Ventures",
      description:
        "The guidance is practical, clear, and backed by real expertise. Building responsive, high-performance web products with this team has been a seamless process.",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      linkedinUrl: "#",
      twitterUrl: "#",
    },
    {
      id: "suzanne-xie",
      name: "Suzanne Xie",
      title: "Partner, Neo",
      description:
        "Goodwell keeps me accountable. Seeing measurable improvements in energy, weight, and consistency keeps me motivated. It feels like a premium nutrition platform.",
      imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
      linkedinUrl: "#",
      githubUrl: "#",
    },
    {
      id: "shashank-vemuri",
      name: "Shashank Vemuri",
      title: "Scout at Soma Capital",
      description:
        "The data tracking and progress insights helped me stay accountable. Seeing measurable improvements in energy, weight, and consistency kept me motivated. It feels like a professional-grade nutrition system.",
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      linkedinUrl: "#",
      twitterUrl: "#",
    },
  ] as TestimonialItem[],
} as const;

export interface ServiceItem {
  id: string;
  title: string;
  skills: string;
}

export interface InterestItem {
  type: "tech" | "music" | "travel" | "coffee" | string;
  label: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  skills: string;
}

export interface InterestItem {
  type: "tech" | "music" | "travel" | "coffee" | string;
  label: string;
}

export const journeyContent = {
  services: {
    eyebrow: "WHAT I BRING",
    items: [
      {
        id: "ui-ux-design",
        title: "UI/UX Design",
        skills: "Research · Wireframes · Prototypes · UI Design",
      },
      {
        id: "frontend-development",
        title: "Frontend Development",
        skills: "HTML · CSS · JavaScript · React",
      },
      {
        id: "problem-solving",
        title: "Problem Solving",
        skills: "User Focused · Detail Oriented · Always Learning",
      },
    ] as ServiceItem[],
  },
  journey: {
    eyebrow: "MY JOURNEY",
    title: "I started my journey with curiosity and a love for technology.",
    body: "Over time, I explored design, learned to code, and found my passion in building web experiences that people enjoy and remember.",
  },
  education: {
    eyebrow: "EDUCATION",
    degree: "B.Sc. in Computer Engineering",
    status: "(Ongoing)",
  },
  beyondWork: {
    eyebrow: "BEYOND WORK",
    body: "When I’m not designing or coding, you’ll find me exploring new tech, listening to music, or just enjoying a good cup of coffee.",
    interests: [
      { type: "tech", label: "Tech" },
      { type: "music", label: "Music" },
      { type: "travel", label: "Travel" },
      { type: "coffee", label: "Coffee" },
    ] as InterestItem[],
  },
} as const;