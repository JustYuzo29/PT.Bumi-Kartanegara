import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Hero, Service, AboutUs, OurJourney } from "../components/home";

const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, 100);

    AOS.init({ once: false, duration: 800, offset: 200 });
  }, []);

  return (
    <main className="font-body text-carbon bg-white dark:bg-[var(--color-background)]">
      <Hero />
      <Service />
      <AboutUs />
      <OurJourney />
    </main>
  );
};

export default Home;