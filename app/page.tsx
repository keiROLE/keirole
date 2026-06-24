"use client";

import GreetingCard from "@/components/home/GreetingCard";
import ClockCard from "@/components/home/ClockCard";
import HolidayCard from "@/components/home/HolidayCard";
import CalendarCard from "@/components/home/CalendarCard";
import LatestBlogCard from "@/components/home/LatestBlogCard";
import StopwatchDialog from "@/components/home/StopwatchDialog";
import { useState } from "react";

export default function Home() {
  const [stopwatchOpen, setStopwatchOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "720px" }}>
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

      <StopwatchDialog open={stopwatchOpen} onClose={() => setStopwatchOpen(false)} />
    </div>
  );
}
