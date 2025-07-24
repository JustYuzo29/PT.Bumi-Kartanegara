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

import MonitoringTitle from "../components/monitoring/MonitoringTitle";
import MonitoringStatsCard from "../components/monitoring/MonitoringStatsCard";
import MonitoringChart from "../components/monitoring/MonitoringChart";
import MonitoringTrafficChart from "../components/monitoring/MonitoringTrafficChart";
import MonitoringTable from "../components/monitoring/MonitoringTable";

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

  const generateVisitorData = (start, end) => {
    const data = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      data.push({
        date: new Date(currentDate).toISOString().split("T")[0],
        visitors: Math.floor(Math.random() * 200) + 50,
        pageViews: Math.floor(Math.random() * 500) + 100,
        bounceRate: parseFloat(
          (Math.random() * (0.8 - 0.2) + 0.2).toFixed(2)
        ),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
  };

  const [visitorData, setVisitorData] = useState([]);
  useEffect(() => {
    setVisitorData(generateVisitorData(startDate, endDate));
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

  const trafficSourceData = {
    labels: ["Organic Search", "Direct", "Referral", "Social Media", "Email"],
    datasets: [
      {
        label: "Sumber Lalu Lintas",
        data: [300, 150, 100, 200, 50],
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
  };

  const trafficSourceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "right", labels: { color: "#264653" } },
      title: { display: true, text: "Sumber Lalu Lintas", color: "#264653" },
    },
  };

  const totalVisitors = visitorData.reduce((s, i) => s + i.visitors, 0);
  const totalPageViews = visitorData.reduce((s, i) => s + i.pageViews, 0);
  const avgBounceRate =
    visitorData.length > 0
      ? (
          (visitorData.reduce((s, i) => s + i.bounceRate, 0) / visitorData.length) *
          100
        ).toFixed(0)
      : 0;

  const blogData = [
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
  ];

  const staffData = [
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
    { name: "lorem ipsum", datetime: "15-08-2025/14.00", country: "Indonesia" },
  ];

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
