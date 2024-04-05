import DasboardSlideBar from "@/components/dasbaord/slidebar/DasboardSlideBar";

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