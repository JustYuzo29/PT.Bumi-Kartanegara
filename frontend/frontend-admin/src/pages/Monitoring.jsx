import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend,
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend
);

const Monitoring = () => {
  // ...logic sama seperti sebelumnya...
  const [chartType] = useState('line');
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const generateVisitorData = (start, end) => {
    const data = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      data.push({
        date: new Date(currentDate).toISOString().split('T')[0],
        visitors: Math.floor(Math.random() * 200) + 50,
        pageViews: Math.floor(Math.random() * 500) + 100,
        bounceRate: parseFloat((Math.random() * (0.8 - 0.2) + 0.2).toFixed(2)),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
  };
  const [visitorData, setVisitorData] = useState([]);
  useEffect(() => { setVisitorData(generateVisitorData(startDate, endDate)); }, [startDate, endDate]);
  const visitorsChartData = {
    labels: visitorData.map((d) => d.date),
    datasets: [
      {
        label: 'Jumlah Pengunjung',
        data: visitorData.map((d) => d.visitors),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        fill: true,
      },
    ],
  };
  const visitorsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#264653' } },
      title: { display: true, text: 'Tren Pengunjung Situs', color: '#264653' },
    },
    scales: {
      x: { ticks: { color: '#264653' }, grid: { color: 'rgba(0,0,0,0.04)' } },
      y: { ticks: { color: '#264653' }, grid: { color: 'rgba(0,0,0,0.04)' } },
    },
  };
  const trafficSourceData = {
    labels: ['Organic Search', 'Direct', 'Referral', 'Social Media', 'Email'],
    datasets: [
      {
        label: 'Sumber Lalu Lintas',
        data: [300, 150, 100, 200, 50],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const trafficSourceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { color: '#264653' } },
      title: { display: true, text: 'Sumber Lalu Lintas', color: '#264653' },
    },
  };
  const totalVisitors = visitorData.reduce((sum, item) => sum + item.visitors, 0);
  const totalPageViews = visitorData.reduce((sum, item) => sum + item.pageViews, 0);
  const avgBounceRate =
    visitorData.length > 0
      ? ((visitorData.reduce((sum, item) => sum + item.bounceRate, 0) / visitorData.length) * 100).toFixed(0)
      : 0;
  const blogData = [
    { name: 'lorem ipsum', datetime: '15-08-2025/14.00', country: 'Indonesia' },
    { name: 'lorem ipsum', datetime: '15-08-2025/14.00', country: 'Indonesia' },
    { name: 'lorem ipsum', datetime: '15-08-2025/14.00', country: 'Indonesia' },
    { name: 'lorem ipsum', datetime: '15-08-2025/14.00', country: 'Indonesia' },
    { name: 'lorem ipsum', datetime: '15-08-2025/14.00', country: 'Indonesia' },
  ];
  const staffData = [
    { name: 'lorem ipsum', datetime: '15-08-2025/14.00', country: 'Indonesia' },
    { name: 'lorem ipsum', datetime: '15-08-2025/14.00', country: 'Indonesia' },
    { name: 'lorem ipsum', datetime: '15-08-2025/14.00', country: 'Indonesia' },
  ];

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 py-6 space-y-10">
      {/* Card Statistik Pengunjung */}
      <div className="rounded-xl shadow-lg p-4 sm:p-6 md:p-10 bg-[var(--color-white)] dark:bg-[var(--color-ocean)]">
        <h1 className="text-2xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
          Statistik Pengunjung
        </h1>
        <div className="flex flex-wrap gap-8 mb-4">
          <div className="text-sm text-[var(--color-carbon)] dark:text-white flex items-center">
            Dari:
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="ml-2 p-1 rounded border border-gray-300"
            />
          </div>
          <div className="text-sm text-[var(--color-carbon)] dark:text-white flex items-center">
            Sampai:
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="ml-2 p-1 rounded border border-gray-300"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p>Total Pengunjung</p>
            <h2 className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">{totalVisitors}</h2>
          </div>
          <div>
            <p>Total Halaman</p>
            <h2 className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">{totalPageViews}</h2>
          </div>
          <div>
            <p>Bounce Rate Rata-rata</p>
            <h2 className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">{avgBounceRate}%</h2>
          </div>
        </div>
        {/* Grafik */}
        <div className="w-full max-w-2xl md:max-w-3xl mx-auto h-60 sm:h-72 md:h-96">
          <Line data={visitorsChartData} options={visitorsChartOptions} />
        </div>
      </div>

      {/* Card Sumber Lalu Lintas */}
      <div className="rounded-xl shadow-lg p-4 sm:p-6 md:p-10 bg-[var(--color-white)] dark:bg-[var(--color-ocean)]">
        <h1 className="text-xl font-bold text-[var(--color-navy)] dark:text-white pb-4">
          Sumber Lalu Lintas
        </h1>
        <div className="w-full max-w-lg mx-auto h-60 sm:h-72 md:h-80 flex items-center">
          <Doughnut data={trafficSourceData} options={trafficSourceOptions} />
        </div>
      </div>

      {/* Monitoring Blog & Staff */}
      {[{ title: 'WEB BLOG MONITORING', data: blogData }, { title: 'STAFF MONITORING', data: staffData }].map((section, idx) => (
        <div key={idx} className="rounded-xl shadow-lg p-4 sm:p-6 md:p-10 bg-[var(--color-white)] dark:bg-[var(--color-ocean)]">
          <h2 className="text-xl font-bold text-[var(--color-navy)] dark:text-white pt-2">
            {section.title}
          </h2>
          <p className="text-sm mb-6 text-[var(--color-carbon)] dark:text-white">
            Berikut adalah beberapa riwayat monitoring terbaru yang telah dilakukan pada situs ini.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-separate border-spacing-y-2">
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
