import React from "react";
import { Doughnut } from "react-chartjs-2";

const MonitoringTrafficChart = ({ data, options }) => {
  return (
    <div className="w-full max-w-lg mx-auto h-60 sm:h-72 md:h-80 flex items-center">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default MonitoringTrafficChart;
