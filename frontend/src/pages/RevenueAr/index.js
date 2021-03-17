import React from "react";
import Header from "../Dashboard/Header";
import Overview from "./Overview";

const RevenueAr = () => {

  return (
    <div className="dashboard revenue-insights">
      <Header
        title="Revenue Management"
        subTitle="A/R"
        type="Revenue-Ar"
      />
      <Overview />
    </div>
  );
};

export default RevenueAr;
