// src/pages/Monitoring.jsx

import React, { useState, useEffect } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Monitoring = () => {
  // Data dummy untuk tabel
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

  // State & helpers untuk grafik pengunjung
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState(new Date());
  const [visitorData, setVisitorData] = useState([]);

  const generateVisitorData = (start, end) => {
    const data = [];
    let d = new Date(start);
    while (d <= end) {
      data.push({
        date: d.toISOString().split("T")[0],
        visitors: Math.floor(Math.random() * 200) + 50,
        pageViews: Math.floor(Math.random() * 500) + 100,
        bounceRate: parseFloat(
          (Math.random() * (0.8 - 0.2) + 0.2).toFixed(2)
        ),
      });
      d.setDate(d.getDate() + 1);
    }
    return data;
  };

  useEffect(() => {
    setVisitorData(generateVisitorData(startDate, endDate));
  }, [startDate, endDate]);

  // Chart data & options
  const visitorsChartData = {
    labels: visitorData.map((d) => d.date),
    datasets: [
      {
        label: "Jumlah Pengunjung",
        data: visitorData.map((d) => d.visitors),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.1,
        fill: true,
      },
    ],
  };
  const visitorsChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2, // lebar 2x tinggi
    plugins: {
      legend: { position: "top", labels: { color: "#213547" } },
      title: {
        display: true,
        text: "Tren Pengunjung Situs",
        color: "#213547",
      },
    },
    scales: {
      x: {
        ticks: { color: "#213547", autoSkip: true, maxTicksLimit: 6 },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#213547" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  const trafficSourceData = {
    labels: [
      "Organic Search",
      "Direct",
      "Referral",
      "Social Media",
      "Email",
    ],
    datasets: [
      {
        data: [300, 150, 100, 200, 50],
        backgroundColor: [
          "rgba(255,99,132,0.6)",
          "rgba(54,162,235,0.6)",
          "rgba(255,206,86,0.6)",
          "rgba(75,192,192,0.6)",
          "rgba(153,102,255,0.6)",
        ],
      },
    ],
  };
  const trafficSourceOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: { position: "right", labels: { color: "#213547" } },
      title: {
        display: true,
        text: "Sumber Lalu Lintas",
        color: "#213547",
      },
    },
  };

  // Hitung summary
  const totalVisitors = visitorData.reduce((sum, d) => sum + d.visitors, 0);
  const totalPageViews = visitorData.reduce((sum, d) => sum + d.pageViews, 0);
  const avgBounceRate =
    visitorData.length > 0
      ? (
          (visitorData.reduce((sum, d) => sum + d.bounceRate, 0) /
            visitorData.length) *
          100
        ).toFixed(0)
      : 0;

  return (
    <div className="space-y-10">
      {/* Statistik Pengunjung */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] p-6 rounded-xl shadow-lg w-full max-w-screen-xl mx-auto">
        <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white mb-4">
          Statistik Pengunjung
        </h2>

        <div className="flex flex-wrap gap-3 text-sm text-[var(--color-carbon)] dark:text-white">
          <div>
            Dari:{" "}
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            Sampai:{" "}
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              className="border rounded px-2 py-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-[var(--color-carbon)] dark:text-white">
          <div>
            <p>Total Pengunjung</p>
            <p className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">
              {totalVisitors}
            </p>
          </div>
          <div>
            <p>Total Halaman</p>
            <p className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">
              {totalPageViews}
            </p>
          </div>
          <div>
            <p>Bounce Rate Rata-rata</p>
            <p className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">
              {avgBounceRate}%
            </p>
          </div>
        </div>

        <div className="mt-6 w-full overflow-hidden">
          <Line data={visitorsChartData} options={visitorsChartOptions} />
        </div>
      </div>

      {/* Diagram Sumber Lalu Lintas */}
      <div className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] p-6 rounded-xl shadow-lg w-full max-w-screen-xl mx-auto">
        <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white mb-4">
          Sumber Lalu Lintas
        </h2>
        <div className="w-full overflow-hidden">
          <Doughnut data={trafficSourceData} options={trafficSourceOptions} />
        </div>
      </div>

      {/* Tabel Monitoring */}
      {[{ title: "WEB BLOG MONITORING", data: blogData },
      { title: "STAFF MONITORING", data: staffData }].map((section, idx) => (
        <div
          key={idx}
          className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] p-6 rounded-xl shadow-lg w-full max-w-screen-xl mx-auto"
        >
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white mb-4">
            {section.title}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-[var(--color-navy)] dark:text-white font-semibold border-b border-[var(--color-carbon)] dark:border-white">
                  <th className="py-2 px-4">No.</th>
                  <th className="py-2 px-4">Nama</th>
                  <th className="py-2 px-4">Tanggal/Waktu</th>
                  <th className="py-2 px-4">Negara</th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-carbon)] dark:text-white">
                {section.data.map((item, i) => (
                  <tr
                    key={i}
                    className="bg-[var(--color-snow)] dark:bg-[var(--color-midnight)] rounded-lg shadow"
                  >
                    <td className="py-2 px-4">{i + 1}.</td>
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.datetime}</td>
                    <td className="py-2 px-4">{item.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Monitoring;
