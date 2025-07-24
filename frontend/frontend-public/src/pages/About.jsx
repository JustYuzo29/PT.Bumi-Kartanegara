import React from "react";
import { Hero, Tentang, VM, Struktur, Partner } from "../components/About";

const About = () => {
  return (
    <>
      <main>
        <Hero />
        <Tentang />
        <VM />
        <Struktur />
        <Partner />
      </main>
    </>
  );
};

export default About;