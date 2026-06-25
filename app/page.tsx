"use client";

import GreetingCard from "@/components/home/GreetingCard";
import ClockCard from "@/components/home/ClockCard";
import HolidayCard from "@/components/home/HolidayCard";
import CalendarCard from "@/components/home/CalendarCard";
import LatestBlogCard from "@/components/home/LatestBlogCard";
import MingYanCard from "@/components/home/MingYanCard";
import PageTransition from "@/components/PageTransition";
import { useStopwatch } from "@/components/home/StopwatchDialog";

export default function Home() {
  const stopwatch = useStopwatch();

  return (
    <PageTransition>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "720px" }}>
        {/* Row 1: Greeting + Clock (half width each) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <GreetingCard />
          <ClockCard onOpenStopwatch={stopwatch.open} />
        </div>

        {/* Row 2: Holiday + Calendar (half width each) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <HolidayCard />
          <CalendarCard />
        </div>

        {/* Row 3: Latest Blog (full width) */}
        <LatestBlogCard />

        {/* Row 4: MingYan (full width) */}
        <MingYanCard />
      </div>
    </PageTransition>
  );
}
