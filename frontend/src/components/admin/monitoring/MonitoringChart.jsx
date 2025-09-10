import React from "react";
import { Line } from "react-chartjs-2";
import ChartContainer from "./ChartContainer";

const MonitoringChart = ({ data, options }) => (
  <ChartContainer>
    <Line data={data} options={options} />
  </ChartContainer>
);

export default MonitoringChart;
