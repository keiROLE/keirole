import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "keiROLE",
  description: "keiROLE personal site — keiROLE.pages.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        <Sidebar />
        <main className="ml-[272px] p-8">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
