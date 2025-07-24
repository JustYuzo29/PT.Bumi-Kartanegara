import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Media from "./pages/Media";
import Service from "./pages/Service";
import Contact from "./pages/Contact";

import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = (e) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    updateTheme(mq);
    mq.addEventListener("change", updateTheme);

    return () => mq.removeEventListener("change", updateTheme);
  }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/media" element={<Media />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;