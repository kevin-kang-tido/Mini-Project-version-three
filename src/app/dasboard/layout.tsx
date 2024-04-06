import DasboardSlideBar from "@/components/dasbaord/slidebar/DasboardSlideBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dasboard",
  description: "This is about dasborad page",
  keywords: ['shop', 'ecommerce', 'sell']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <aside className="flex">
    <DasboardSlideBar/>
    {children}
   </aside>
  );
}