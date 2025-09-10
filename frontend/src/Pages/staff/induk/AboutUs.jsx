// src/Pages/staff/induk/AboutUs.jsx
import AboutUsSection from "../../../components/staff/AboutUs/BannerSection";
import BannerSection from "../../../components/staff/AboutUs/AboutUsSection";
import VisiMisiSection from "../../../components/staff/AboutUs/VisiMisiSection";
import DirectorCommissionerSection from "../../../components/staff/AboutUs/DirectorCommissionerSection";

export default function AboutUs() {
  return (
    <main>
      <AboutUsSection />
      <BannerSection />
      <VisiMisiSection />
      <DirectorCommissionerSection />
      {/* Tambahkan komponen lain yang diperlukan di sini */}
    </main>
  );
}
