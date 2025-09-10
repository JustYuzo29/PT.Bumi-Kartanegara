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
    fetch(`http://localhost:8000/api/visitor-stats/?start=${formatDate(startDate)}&end=${formatDate(endDate)}`)
      .then((res) => res.json())
      .then((data) => setVisitorData(data))
      .catch(() => setVisitorData([]));
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
    fetch(`http://localhost:8000/api/traffic-source/?start=${formatDate(startDate)}&end=${formatDate(endDate)}`)
      .then((res) => res.json())
      .then((data) => {
        // data: [{source, count}]
        const labels = data.map((d) => d.source);
        const counts = data.map((d) => d.count);
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
      })
      .catch(() => setTrafficSourceData({ labels: [], datasets: [] }));
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
    fetch("http://localhost:8000/api/blog-monitoring/")
      .then((res) => res.json())
      .then((data) => setBlogData(data))
      .catch(() => setBlogData([]));

    fetch("http://localhost:8000/api/staff-monitoring/")
      .then((res) => res.json())
      .then((data) => setStaffData(data))
      .catch(() => setStaffData([]));
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
