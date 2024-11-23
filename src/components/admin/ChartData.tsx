import React from "react";
import { UserChart } from "./chart/UserChart";
import { VisiterData } from "./chart/VisiterData";
import { SchoolData } from "./chart/SchoolData";
import { LiveChart } from "./chart/LiveChart";

const ChartData = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 py-6 ">
        <UserChart />
        <VisiterData />
        <SchoolData />
      </div>
      <LiveChart />
    </div>
  );
};

export default ChartData;
