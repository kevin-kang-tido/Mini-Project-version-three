import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CardComponent from "@/components/card/CardComponent";
import NavBarComponent from "@/components/layout/navbar/NavbarComponent";
import FooterComponent from "@/components/layout/footer/FooterComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - CAM SHOP",
    default: "CAM SHOP",
  },
  description: "This is description cam shop",
  keywords: ["shop", "ecommerce", "sell"],
  openGraph: {
    title: {
      template: "%s - MyShop",
      default: "MyShop",
    },
    description: "This is description shop",
    images: [
      "https://i.pinimg.com/564x/1b/59/6c/1b596cad48dcf9804be7e0ac90b0693f.jpg",
    ],
  },
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
