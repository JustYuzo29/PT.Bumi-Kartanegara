import React from "react";
import BannerSection from "../../../components/staff/Home/BannerSection";
import ServiceSection from "../../../components/staff/Home/ServiceSection";
import AboutUsSection from "../../../components/staff/Home/AboutUsSection";
import OurJourneySection from "../../../components/staff/Home/OurJourneySection";
// ...import section lain kalau ada

const Home = () => {
  return (
    <div className="space-y-6">
      <BannerSection />
      <ServiceSection />
      <AboutUsSection />
      <OurJourneySection />
      {/* Tambahkan AboutUsSection, OurJourneySection, dst di sini */}
    </div>
  );
};

export default Home;
