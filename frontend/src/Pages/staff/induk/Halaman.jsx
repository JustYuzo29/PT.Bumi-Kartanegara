import React from "react";
import SectionHomeHalaman from "../../../components/staff/Halaman/SectionHomeHalaman";
import SectionAboutUsHalaman from "../../../components/staff/Halaman/SectionAboutUsHalaman";
import SectionMediaHalaman from "../../../components/staff/Halaman/SectionMediaHalaman";
import SectionServiceHalaman from "../../../components/staff/Halaman/SectionServiceHalaman";
import SectionContactHalaman from "../../../components/staff/Halaman/SectionContactHalaman";

const Halaman = () => {
  return (
    <div className="space-y-6">
      <SectionHomeHalaman />
      <SectionAboutUsHalaman />
      <SectionMediaHalaman />
      <SectionServiceHalaman />
      <SectionContactHalaman />
      {/* Tambahkan AboutUsSection, OurJourneySection, dst di sini */}
    </div>
  );
};

export default Halaman;
