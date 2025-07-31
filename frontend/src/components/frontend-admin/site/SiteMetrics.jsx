// components/site/SiteMetrics.jsx
import React from "react";

const SiteMetrics = ({ metrics }) => (
  <section>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="w-full bg-white dark:bg-[var(--color-midnight)] p-4 rounded-xl shadow-md">
          <h3 className="text-sm font-semibold text-[var(--color-navy)] dark:text-white">{metric.title}</h3>
          <p className="text-2xl font-bold text-[var(--color-carbon)] dark:text-white mt-1">{metric.value}</p>
          <p className="text-sm mt-1">
            <span className={`${metric.trendColor} font-semibold`}>{metric.trend}</span> {metric.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default SiteMetrics;