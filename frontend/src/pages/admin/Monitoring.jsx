// src/pages/admin/Monitoring.jsx
import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // Untuk Doughnut chart
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import DatePicker from 'react-datepicker'; // Anda perlu menginstal: npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS untuk datepicker

// Register Chart.js components
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

const Monitoring = ({ isDarkMode }) => {
  const [chartType, setChartType] = useState('line'); // 'line' atau 'bar'
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1))); // Default 1 bulan lalu
  const [endDate, setEndDate] = useState(new Date()); // Default hari ini

  // Data dummy untuk grafik pengunjung (akan disaring berdasarkan rentang tanggal)
  // Data ini perlu lebih realistis atau diambil dari backend
  const generateVisitorData = (start, end) => {
    const data = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      data.push({
        date: new Date(currentDate).toISOString().split('T')[0],
        visitors: Math.floor(Math.random() * 200) + 50, // Antara 50-250 pengunjung
        pageViews: Math.floor(Math.random() * 500) + 100, // Antara 100-600 page views
        bounceRate: parseFloat((Math.random() * (0.8 - 0.2) + 0.2).toFixed(2)) // Antara 20-80%
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
  };

  const [visitorData, setVisitorData] = useState([]);

  useEffect(() => {
    setVisitorData(generateVisitorData(startDate, endDate));
  }, [startDate, endDate]);


  // Kelas CSS dinamis berdasarkan prop isDarkMode
  const contentBgClass = isDarkMode ? 'bg-card-dark-bg' : 'bg-card-light-bg';
  const textColorClass = isDarkMode ? 'text-primary-text-dark' : 'text-primary-text-light';
  const subtitleColorClass = isDarkMode ? 'text-secondary-text-dark' : 'text-secondary-text-light';
  const chartBorderColor = isDarkMode ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)';
  const chartBgColor = isDarkMode ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)';
  const tableHeaderBgClass = isDarkMode ? 'bg-gray-600' : 'bg-gray-50';
  const tableHeaderTextColorClass = isDarkMode ? 'text-gray-200' : 'text-gray-500';
  const tableRowBgClass = isDarkMode ? 'bg-card-dark-bg' : 'bg-card-light-bg';
  const tableRowTextColorClass = isDarkMode ? 'text-primary-text-dark' : 'text-primary-text-light';
  const tableDivideColorClass = isDarkMode ? 'divide-gray-600' : 'divide-gray-200';
  const tableHoverClass = isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50';

  // Chart data for visitors
  const visitorsChartData = {
    labels: visitorData.map(d => d.date),
    datasets: [
      {
        label: 'Jumlah Pengunjung',
        data: visitorData.map(d => d.visitors),
        borderColor: chartBorderColor,
        backgroundColor: chartBgColor,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const visitorsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColorClass.includes('dark') ? 'white' : 'black',
        },
      },
      title: {
        display: true,
        text: 'Tren Pengunjung Situs',
        color: textColorClass.includes('dark') ? 'white' : 'black',
      },
      tooltip: {
        callbacks: {
            label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += context.parsed.y.toLocaleString();
                }
                return label;
            }
        }
    }
    },
    scales: {
      x: {
        ticks: {
          color: textColorClass.includes('dark') ? 'white' : 'black',
        },
        grid: {
          color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
      y: {
        ticks: {
          color: textColorClass.includes('dark') ? 'white' : 'black',
        },
        grid: {
          color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
      },
    },
  };

  // Dummy data for Traffic Sources
  const trafficSourceData = {
    labels: ['Organic Search', 'Direct', 'Referral', 'Social Media', 'Email'],
    datasets: [
      {
        label: 'Sumber Lalu Lintas',
        data: [300, 150, 100, 200, 50],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(75, 192, 192, 0.6)', // Green
          'rgba(153, 102, 255, 0.6)', // Purple
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
      legend: {
        position: 'right',
        labels: {
          color: textColorClass.includes('dark') ? 'white' : 'black',
        },
      },
      title: {
        display: true,
        text: 'Sumber Lalu Lintas',
        color: textColorClass.includes('dark') ? 'white' : 'black',
      },
    },
  };

  // Calculate summary metrics for the selected date range
  const totalVisitors = visitorData.reduce((sum, item) => sum + item.visitors, 0);
  const totalPageViews = visitorData.reduce((sum, item) => sum + item.pageViews, 0);
  const avgBounceRate = visitorData.length > 0
    ? (visitorData.reduce((sum, item) => sum + item.bounceRate, 0) / visitorData.length).toFixed(2) * 100
    : 0;

  // Placeholder for calculating trend (e.g., compare with previous period)
  const visitorsTrend = '+10%'; // Dummy value
  const pageViewsTrend = '+5%'; // Dummy value
  const bounceRateTrend = '-2%'; // Dummy value (lower is better)

  return (
    <div className="p-8">
      <h1 className={`text-3xl font-bold mb-6 ${textColorClass}`}>Monitoring Situs</h1>

      {/* Date Range Picker */}
      <div className={`mb-8 p-6 rounded-lg shadow-lg ${contentBgClass} flex flex-wrap items-center gap-4`}>
        <h2 className={`text-xl font-semibold ${textColorClass}`}>Pilih Rentang Tanggal:</h2>
        <div className="flex items-center gap-2">
          <label className={subtitleColorClass}>Dari:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            className={`p-2 rounded-md border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className={subtitleColorClass}>Sampai:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="dd/MM/yyyy"
            className={`p-2 rounded-md border ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
          />
        </div>
      </div>

      {/* Section: Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Total Visitors Card */}
        <div className={`p-6 rounded-lg shadow-md ${contentBgClass}`}>
          <h3 className={`text-lg font-semibold ${subtitleColorClass}`}>Total Pengunjung</h3>
          <p className={`text-4xl font-bold ${textColorClass} mt-2`}>
            {totalVisitors.toLocaleString()}
          </p>
          <p className={`text-sm ${subtitleColorClass} mt-1`}>
            <span className="text-green-500">{visitorsTrend}</span> dari periode sebelumnya
          </p>
        </div>

        {/* Total Page Views Card */}
        <div className={`p-6 rounded-lg shadow-md ${contentBgClass}`}>
          <h3 className={`text-lg font-semibold ${subtitleColorClass}`}>Total Tampilan Halaman</h3>
          <p className={`text-4xl font-bold ${textColorClass} mt-2`}>
            {totalPageViews.toLocaleString()}
          </p>
          <p className={`text-sm ${subtitleColorClass} mt-1`}>
            <span className="text-green-500">{pageViewsTrend}</span> dari periode sebelumnya
          </p>
        </div>

        {/* Average Bounce Rate Card */}
        <div className={`p-6 rounded-lg shadow-md ${contentBgClass}`}>
          <h3 className={`text-lg font-semibold ${subtitleColorClass}`}>Rata-rata Rasio Pentalan</h3>
          <p className={`text-4xl font-bold ${textColorClass} mt-2`}>
            {avgBounceRate}%
          </p>
          <p className={`text-sm ${subtitleColorClass} mt-1`}>
            <span className="text-red-500">{bounceRateTrend}</span> dari periode sebelumnya
          </p>
        </div>
      </div>

      {/* Section: Visitor Charts */}
      <div className={`mb-8 p-6 rounded-lg shadow-lg ${contentBgClass}`}>
        <h2 className={`text-xl font-semibold mb-4 ${textColorClass}`}>Grafik Pengunjung</h2>

        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setChartType('line')}
            className={`py-2 px-4 rounded-md transition duration-300 ${chartType === 'line' ? 'bg-blue-600 text-white' : (isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300')}`}
          >
            Line Chart
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`py-2 px-4 rounded-md transition duration-300 ${chartType === 'bar' ? 'bg-blue-600 text-white' : (isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300')}`}
          >
            Bar Chart
          </button>
        </div>

        <div className="h-96"> {/* Tinggi tetap untuk grafik */}
          {chartType === 'line' ? (
            <Line data={visitorsChartData} options={visitorsChartOptions} />
          ) : (
            <Bar data={visitorsChartData} options={visitorsChartOptions} />
          )}
        </div>
      </div>

      {/* Section: Other Charts (e.g., Traffic Sources) */}
      <div className={`mb-8 p-6 rounded-lg shadow-lg ${contentBgClass}`}>
        <h2 className={`text-xl font-semibold mb-4 ${textColorClass}`}>Sumber Lalu Lintas</h2>
        <div className="h-80 flex justify-center items-center"> {/* Tinggi tetap untuk grafik Doughnut */}
          <Doughnut data={trafficSourceData} options={trafficSourceOptions} />
        </div>
      </div>

      {/* Section: Detailed Data Table */}
      <div className={`p-6 rounded-lg shadow-lg ${contentBgClass}`}>
        <h2 className={`text-xl font-semibold mb-4 ${textColorClass}`}>Data Detail Pengunjung</h2>
        <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'border border-gray-600' : ''}`}>
          <table className={`min-w-full divide-y ${tableDivideColorClass}`}>
            <thead className={tableHeaderBgClass}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Tanggal</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Pengunjung</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Tampilan Halaman</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${tableHeaderTextColorClass} uppercase tracking-wider`}>Rasio Pentalan</th>
              </tr>
            </thead>
            <tbody className={`${tableRowBgClass} divide-y ${tableDivideColorClass}`}>
              {visitorData.map((data, index) => (
                <tr key={index} className={tableHoverClass}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{data.date}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{data.visitors}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{data.pageViews}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableRowTextColorClass}`}>{`${(data.bounceRate * 100).toFixed(0)}%`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;