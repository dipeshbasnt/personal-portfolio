import type { Metadata } from "next";
import { Caveat, Inter, JetBrains_Mono, Luckiest_Guy } from "next/font/google";
import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
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
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    lang="en"
    className={`${inter.variable} ${jetBrainsMono.variable} ${luckiestGuy.variable} ${caveat.variable} h-full antialiased`}
  >
    <body className="min-h-full flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </body>
  </html>
);

export default RootLayout;
