import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import Features from "@/components/home/Features";
import Location from "@/components/home/Location";
import Reviews from "@/components/home/Reviews";

export default function Home() {
  return (
    <>
      <Hero />
      <SearchBar />
      <Features />
      <Location />
      <Reviews />
    </>
  );
}
