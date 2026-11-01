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
