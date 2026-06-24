import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import MiniMusicCard from "@/components/home/MiniMusicCard";
import ContactCard from "@/components/home/ContactCard";
import { DialogProvider } from "@/components/home/StopwatchDialog";

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
          <DialogProvider>
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                {children}
                <Footer />
              </div>

              {/* Right sidebar: always visible on every page */}
              <div style={{ width: "200px", flexShrink: 0 }}>
                <MiniMusicCard />
                <div style={{ marginTop: "20px" }}>
                  <ContactCard compact />
                </div>
              </div>
            </div>
          </DialogProvider>
        </main>
      </body>
    </html>
  );
}
