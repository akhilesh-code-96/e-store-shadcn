import React from "react";
import DailyUpdateChart from "./Charts/DailyUpdateChart";
import CategoryChart from "./Charts/CategoryChart";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <DailyUpdateChart />
      <CategoryChart />
    </div>
  );
};

export default Dashboard;
