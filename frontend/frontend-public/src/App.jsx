import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";

import Home from "./pages/Home";
import About from "./pages/About";
import Media from "./pages/Media";
import Service from "./pages/Service";
import Contact from "./pages/Contact";

import Footer from "./components/Footer";
import { LanguageProvider } from "./locales/language.jsx";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ThemeToggle />
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
    </LanguageProvider>
  );
}

export default App;
