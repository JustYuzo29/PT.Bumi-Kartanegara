import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MonitoringStatsCard = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  totalVisitors,
  totalPageViews,
  avgBounceRate,
}) => {
  return (
    <div className="rounded-xl shadow-lg p-4 sm:p-6 md:p-10 bg-[var(--color-white)] dark:bg-[var(--color-ocean)]">
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
          <h2 className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">
            {totalVisitors}
          </h2>
        </div>
        <div>
          <p>Total Halaman</p>
          <h2 className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">
            {totalPageViews}
          </h2>
        </div>
        <div>
          <p>Bounce Rate Rata-rata</p>
          <h2 className="text-2xl font-bold text-[var(--color-navy)] dark:text-white">
            {avgBounceRate}%
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MonitoringStatsCard;
