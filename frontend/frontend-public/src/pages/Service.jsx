import { useEffect } from "react";
import { Hero, OurService, Tools } from "../components/Service";

const Service = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <main>
        <Hero />
        <OurService />
        <Tools />
      </main>
    </>
  );
};

export default Service;
