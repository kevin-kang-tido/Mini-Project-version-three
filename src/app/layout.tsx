import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CardComponent from "@/components/card/CardComponent";
import NavBarComponent from "@/components/layout/navbar/NavbarComponent";
import FooterComponent from "@/components/layout/footer/FooterComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cam Shop",
  description: "welcome to cam shop comapany",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarComponent></NavBarComponent>
        
            {children}
        
        <FooterComponent></FooterComponent>
        </body>
    </html>
  );
}
