import React from "react";

const StatisticsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-3xl">{value}</p>
      </div>
      <div className="text-4xl text-blue-600">{icon}</div>
    </div>
  );
};

export default StatisticsCard;
