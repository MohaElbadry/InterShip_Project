import React from "react";

const StatisticsCard = ({ bgColor, borderColor, icon, value, label }) => {
  return (
    <div
      className={`bg-${bgColor}  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-t-2  border-${borderColor}  text-blue-700 font-medium group`}
    >
      <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
        {icon}
      </div>
      <div className="text-right">
        <p className="text-2xl">{value}</p>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
