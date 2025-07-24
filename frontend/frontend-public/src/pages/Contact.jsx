import { useEffect } from "react";
import { Hero, Kontak, Maps } from "../components/Contact";

const Contact = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <main>
        <Hero />
        <Kontak />
        <Maps />
      </main>
    </>
  );
};

export default Contact;
