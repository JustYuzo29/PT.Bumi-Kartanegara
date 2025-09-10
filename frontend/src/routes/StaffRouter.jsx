import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AboutUs from "../Pages/staff/induk/AboutUs";
import Contacts from "../Pages/staff/induk/Contacts";
import Home from "../Pages/staff/induk/Home";
import Media from "../Pages/staff/induk/Media";
import Service from "../Pages/staff/induk/Service";
import Halaman from "../Pages/staff/induk/Halaman";

const StaffRouter = () => (
  <Routes>
    {/* Default redirect ke halaman utama */}
    <Route index element={<Navigate to="halaman" replace />} />
    
    {/* Halaman utama staff yang menampilkan daftar halaman */}
    <Route path="halaman" element={<Halaman />} />
    
    {/* Halaman-halaman untuk editing konten */}
    <Route path="home" element={<Home />} />
    <Route path="aboutus" element={<AboutUs />} />
    <Route path="contacts" element={<Contacts />} />
    <Route path="media" element={<Media />} />
    <Route path="service" element={<Service />} />
    
    {/* Fallback untuk route yang tidak dikenal */}
    <Route path="*" element={<div className="text-center py-10"><h2>404 - Halaman Tidak Ditemukan</h2></div>} />
  </Routes>
);

export default StaffRouter;
