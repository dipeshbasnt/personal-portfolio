import type { Metadata } from "next";
import { Caveat, Inter, JetBrains_Mono, Luckiest_Guy } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
const luckiestGuy = Luckiest_Guy({ variable: "--font-luckiest-guy", weight: "400", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RabbitTheDesigner — Designer & Frontend Developer",
  description:
    "The portfolio of RabbitTheDesigner, blending thoughtful digital design with responsive frontend development.",
  openGraph: {
    title: "RabbitTheDesigner — Designer & Frontend Developer",
    description:
      "The portfolio of RabbitTheDesigner, blending thoughtful digital design with responsive frontend development.",
    type: "website",
  },
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    lang="en"
    data-scroll-behavior="smooth"
    className={`${inter.variable} ${jetBrainsMono.variable} ${luckiestGuy.variable} ${caveat.variable} h-full antialiased`}
  >
    <body className="min-h-full flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      {children}
    </body>
  </html>
);

export default RootLayout;
