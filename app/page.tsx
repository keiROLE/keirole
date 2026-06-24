import GreetingCard from "@/components/home/GreetingCard";
import ClockCard from "@/components/home/ClockCard";
import CalendarCard from "@/components/home/CalendarCard";
import HolidayCard from "@/components/home/HolidayCard";
import LatestBlogCard from "@/components/home/LatestBlogCard";
import ContactCard from "@/components/home/ContactCard";
import MiniMusicCard from "@/components/home/MiniMusicCard";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "720px" }}>
      <GreetingCard />
      <ClockCard />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <CalendarCard />
        <HolidayCard />
      </div>
      <LatestBlogCard />
      <ContactCard />
      <MiniMusicCard />
    </div>
  );
}
