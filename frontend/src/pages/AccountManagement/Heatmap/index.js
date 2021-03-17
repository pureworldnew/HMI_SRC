import React from "react";
import Header from "../../Dashboard/Header";
import { HeatMapComponent, Inject, Legend, Tooltip } from '@syncfusion/ej2-react-heatmap';

const heatmapData = [
  [73, 39, 26, 39, 94],
  [93, 58, 53, 38, 26],
  [99, 28, 22, 4, 66],
  [14, 26, 97, 69, 69],
  [7, 46, 47, 47, 88],
  [41, 55, 73, 23, 3],
  [56, 69, 21, 86, 3]
];

const x_label = [
  'Deal > 90% Close in Quarter', 'Contract Signed', 'Customer Onboarding', 'QBR', 'On-Site Exec Visit', '91 Days Before Renewal', 'Renewal'
];

const y_label = ['Northwest Co', 'Balenciaga', 'Apple', 'Bose', '45 RPM'];

const Heatmap = () => {

  return (
    <div className="dashboard customers">
      <Header
        title="Account Management"
        subTitle="Heatmap"
        type={"account-management-heatmap"}
      />
      <HeatMapComponent 
        dataSource={heatmapData}
        xAxis={{
          labels: x_label,
        }} 
        yAxis={{
          labels: y_label,
        }}
      >
        <Inject services={[Legend, Tooltip]}/>
      </HeatMapComponent>
    </div>
  );
};

export default Heatmap;
