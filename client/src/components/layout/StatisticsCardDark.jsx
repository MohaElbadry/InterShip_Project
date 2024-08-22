import React from "react";

const StatisticsCardDark = ({ icon, value, label }) => {
  return (
    <div className="bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-gray-600 text-white font-medium group">
      <div className="flex justify-center items-center w-14 h-14 bg-gray-800 rounded-full transition-all duration-300 transform group-hover:rotate-12">
        <div className="transform transition-transform duration-500 ease-in-out text-gray-800">
          {icon}
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl">{value}</p>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default StatisticsCardDark;
