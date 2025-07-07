// src/pages/admin/Monitoring.jsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js

const Monitoring = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Ref untuk menyimpan instance chart

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Hancurkan instance chart sebelumnya jika ada
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const labels = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
      const data = {
        labels: labels,
        datasets: [{
          label: 'Pengunjung Unik',
          data: [120, 190, 300, 500, 210, 330, 450],
          borderColor: 'rgb(59, 130, 246)', // blue-500
          backgroundColor: 'rgba(59, 130, 246, 0.1)', // blue-500 with transparency
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgb(59, 130, 246)',
          pointRadius: 5,
        }]
      };

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false, // Penting untuk responsivitas dalam container
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.parsed.y} pengunjung`;
                }
              }
            }
          },
          hover: {
            mode: 'nearest',
            intersect: true
          }
        }
      });
    }

    // Cleanup function untuk menghancurkan chart saat komponen unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Array dependensi kosong agar hanya berjalan sekali saat mount

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Monitoring Aktivitas</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Pengunjung Situs - 7 Hari Terakhir</h3>
        <div className="chart-container">
          <canvas id="monitoringChart" ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
