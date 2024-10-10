import Head from "next/head";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Components
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import { Toaster } from "react-hot-toast";
import { Link } from "lucide-react";

// Font Setup
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

// Metadata object
export const metadata = {
  "title": "PrinceDev.in",
  "description": "Prince Jacob | Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        
      </Head>
      <body className={jetbrainsMono.variable}>
        <Header />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
        <Toaster />
      </body>
    </html>
  );
}
