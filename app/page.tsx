"use client";

import GreetingCard from "@/components/home/GreetingCard";
import ClockCard from "@/components/home/ClockCard";
import HolidayCard from "@/components/home/HolidayCard";
import LatestBlogCard from "@/components/home/LatestBlogCard";
import ContactCard from "@/components/home/ContactCard";
import MiniMusicCard from "@/components/home/MiniMusicCard";
import StopwatchDialog from "@/components/home/StopwatchDialog";
import { useState } from "react";

export default function Home() {
  const [stopwatchOpen, setStopwatchOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "720px" }}>
      <GreetingCard />
      <ClockCard onOpenStopwatch={() => setStopwatchOpen(true)} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <HolidayCard />
        <MiniMusicCard />
      </div>
      <LatestBlogCard />
      <ContactCard />
      <StopwatchDialog open={stopwatchOpen} onClose={() => setStopwatchOpen(false)} />
    </div>
  );
}
