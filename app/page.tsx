"use client";

import GreetingCard from "@/components/home/GreetingCard";
import ClockCard from "@/components/home/ClockCard";
import HolidayCard from "@/components/home/HolidayCard";
import CalendarCard from "@/components/home/CalendarCard";
import LatestBlogCard from "@/components/home/LatestBlogCard";
import ContactCard from "@/components/home/ContactCard";
import MiniMusicCard from "@/components/home/MiniMusicCard";
import StopwatchDialog from "@/components/home/StopwatchDialog";
import { useState } from "react";

export default function Home() {
  const [stopwatchOpen, setStopwatchOpen] = useState(false);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px", maxWidth: "720px" }}>
        {/* Row 1: Greeting + Clock (half width each) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <GreetingCard />
          <ClockCard onOpenStopwatch={() => setStopwatchOpen(true)} />
        </div>

        {/* Row 2: Holiday + Calendar (half width each) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <HolidayCard />
          <CalendarCard />
        </div>

        {/* Row 3: Latest Blog (full width) */}
        <LatestBlogCard />
      </div>

      {/* Right sidebar: Music player (always visible) */}
      <div style={{ width: "200px", flexShrink: 0 }}>
        <MiniMusicCard />
        <div style={{ marginTop: "20px" }}>
          <ContactCard compact />
        </div>
      </div>

      <StopwatchDialog open={stopwatchOpen} onClose={() => setStopwatchOpen(false)} />
    </div>
  );
}
