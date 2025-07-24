import React, { useEffect } from "react";
import { Hero, Gallery } from "../components/Media";

const Media = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Hero />
      <Gallery />
    </>
  );
};

export default Media;
