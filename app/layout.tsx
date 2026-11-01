import type { Metadata } from "next";
import { Caveat, Inter, JetBrains_Mono, Luckiest_Guy, Manrope, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"] });
const jetBrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
const luckiestGuy = Luckiest_Guy({ variable: "--font-luckiest-guy", weight: "400", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RabbitTheDesigner — Designer & Frontend Developer",
  description:
    "The portfolio of RabbitTheDesigner, blending thoughtful digital design with responsive frontend development.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    lang="en"
    className={`${inter.variable} ${manrope.variable} ${roboto.variable} ${jetBrainsMono.variable} ${luckiestGuy.variable} ${caveat.variable} h-full antialiased`}
  >
    <body className="min-h-full flex flex-col">{children}</body>
  </html>
);

export default RootLayout;
