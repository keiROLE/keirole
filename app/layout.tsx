import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import MiniMusicCard from "@/components/home/MiniMusicCard";
import { DialogProvider } from "@/components/home/StopwatchDialog";
import BlogSidebarSlot from "@/components/BlogSidebarSlot";
import AuroraBackground from "@/components/AuroraBackground";

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
        <main className="p-8 main-content" style={{ marginLeft: "272px", marginRight: "220px" }}>
          <DialogProvider>
            {children}
            <Footer />
          </DialogProvider>
        </main>

        {/* Right sidebar: fixed, always visible on every page */}
        <div
          style={{
            position: "fixed",
            right: "20px",
            top: "20px",
            width: "200px",
            zIndex: 50,
          }}
        >
          <MiniMusicCard />
          <div style={{ marginTop: "20px" }}>
            <BlogSidebarSlot />
          </div>
        </div>

        {/* Aurora background — always at bottom layer */}
        <AuroraBackground />
      </body>
    </html>
  );
}
