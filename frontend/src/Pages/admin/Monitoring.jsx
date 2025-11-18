import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import MonitoringTitle from "../../components/admin/monitoring/MonitoringTitle";
import MonitoringStatsCard from "../../components/admin/monitoring/MonitoringStatsCard";
import MonitoringChart from "../../components/admin/monitoring/MonitoringChart";
import MonitoringTrafficChart from "../../components/admin/monitoring/MonitoringTrafficChart";
import MonitoringTable from "../../components/admin/monitoring/MonitoringTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Monitoring = () => {
  const [chartType] = useState("line");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState(new Date());

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  const [visitorData, setVisitorData] = useState([]);
  useEffect(() => {
    // Mock visitor data - generate data berdasarkan range tanggal
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const mockData = Array.from({ length: days }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      return {
        date: formatDate(date),
        visitors: Math.floor(Math.random() * 200) + 100,
        page_views: Math.floor(Math.random() * 500) + 300,
        bounce_rate: (Math.random() * 0.4 + 0.3), // 30-70%
      };
    });
    setVisitorData(mockData);
  }, [startDate, endDate]);

  const visitorsChartData = {
    labels: visitorData.map((d) => d.date),
    datasets: [
      {
        label: "Jumlah Pengunjung",
        data: visitorData.map((d) => d.visitors),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const visitorsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { color: "#264653" } },
      title: { display: true, text: "Tren Pengunjung Situs", color: "#264653" },
    },
    scales: {
      x: { ticks: { color: "#264653" }, grid: { color: "rgba(0,0,0,0.04)" } },
      y: { ticks: { color: "#264653" }, grid: { color: "rgba(0,0,0,0.04)" } },
    },
  };

  const [trafficSourceData, setTrafficSourceData] = useState({ labels: [], datasets: [] });
  useEffect(() => {
    // Mock traffic source data
    const mockTrafficData = [
      { source: "Direct", count: 450 },
      { source: "Search Engine", count: 780 },
      { source: "Social Media", count: 320 },
      { source: "Referral", count: 150 },
      { source: "Email", count: 90 },
    ];
    const labels = mockTrafficData.map((d) => d.source);
    const counts = mockTrafficData.map((d) => d.count);
    setTrafficSourceData({
      labels,
      datasets: [
        {
          label: "Sumber Lalu Lintas",
          data: counts,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [startDate, endDate]);

  const trafficSourceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "right", labels: { color: "#264653" } },
      title: { display: true, text: "Sumber Lalu Lintas", color: "#264653" },
    },
  };

  const totalVisitors = visitorData.reduce((s, i) => s + i.visitors, 0);
  const totalPageViews = visitorData.reduce((s, i) => s + i.page_views, 0);
  const avgBounceRate =
    visitorData.length > 0
      ? (
          (visitorData.reduce((s, i) => s + i.bounce_rate, 0) / visitorData.length) *
          100
        ).toFixed(0)
      : 0;

  const [blogData, setBlogData] = useState([]);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    // Mock blog monitoring data
    const mockBlogData = [
      { id: 1, title: "Latest News Update", author: "Admin", date: "2025-11-15", views: 245 },
      { id: 2, title: "Company Announcement", author: "Staff 1", date: "2025-11-10", views: 189 },
      { id: 3, title: "Product Launch", author: "Admin", date: "2025-11-05", views: 567 },
    ];
    setBlogData(mockBlogData);

    // Mock staff monitoring data
    const mockStaffData = [
      { id: 1, name: "Admin User", role: "Administrator", lastActive: "2 minutes ago", status: "Online" },
      { id: 2, name: "Staff One", role: "Staff", lastActive: "15 minutes ago", status: "Online" },
      { id: 3, name: "Staff Two", role: "Staff", lastActive: "1 hour ago", status: "Offline" },
    ];
    setStaffData(mockStaffData);
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 py-6 space-y-10">
      <h1 className="text-2xl font-extrabold text-[var(--color-navy)] dark:text-white">
        Statistik Pengunjung
      </h1>

      <MonitoringStatsCard
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        totalVisitors={totalVisitors}
        totalPageViews={totalPageViews}
        avgBounceRate={avgBounceRate}
      />

      <MonitoringChart
        data={visitorsChartData}
        options={visitorsChartOptions}
      />

      <MonitoringTitle title="Sumber Lalu Lintas" />
      <div className="rounded-xl shadow-lg p-4 sm:p-6 md:p-10 bg-[var(--color-white)] dark:bg-[var(--color-ocean)]">
        <MonitoringTrafficChart
          data={trafficSourceData}
          options={trafficSourceOptions}
        />
      </div>

      <MonitoringTable
        title="WEB BLOG MONITORING"
        subtitle="Berikut adalah beberapa riwayat monitoring terbaru yang telah dilakukan pada situs ini."
        data={blogData}
      />

      <MonitoringTable
        title="STAFF MONITORING"
        subtitle="Berikut adalah beberapa riwayat monitoring terbaru yang telah dilakukan pada situs ini."
        data={staffData}
      />
    </div>
  );
};

export default Monitoring;
