import React, { useState } from "react";
import StatCard from "../../../Dashboard/StatCard";
import Table from "./Table";

const dataTable = [
  [
    "NorthWest Co.",
    "Pam Beesley",
    "24m",
    "7/12 Active Users",
    "$734",
    "SMB",
    "16 Jun, 2020",
    "-120"
  ],
  [
    "Southwest Co.",
    "Michael Scott",
    "14h 51m",
    "4/6 Active Users",
    "$78,712",
    "Enterprise",
    "16 Jun, 2020",
    "-120"
  ],
  [
    "Winery. Inc",
    "Kevin Malone",
    "36h 12m",
    "8/16 Active Users",
    "$107,568",
    "Mid",
    "16 Jun, 2020",
    "-120"
  ],
  [
    "Snickers Ltd.",
    "Angela Martin",
    "18h 41m",
    "24/54 Active Users",
    "$3,093,992",
    "Enterprise",
    "16 Jun, 2020",
    "-120"
  ],
  [
    "Balenciaga Co.",
    "Andrew Bernard",
    "82h 11m",
    "14/79 Active Users",
    "$490,213",
    "Enterprise",
    "16 Jun, 2020",
    "-120"
  ],
  [
    "Bose",
    "Dwighit Schrute",
    "8h 58m",
    "6/8 Active Users",
    "$55,976",
    "SMB",
    "16 Jun, 2020",
    "-120"
  ],
  [
    "Leafers Ltd.",
    "Jim Halpert",
    "102h 46m",
    "45/84 Inactive Users",
    "$734",
    "SMB",
    "16 Jun, 2020",
    "-120"
  ],
  [
    "NorthWest Co.",
    "Pam Beesley",
    "24m",
    "7/12 Active Users",
    "$734",
    "SMB",
    "16 Jun, 2020",
    "-120"
  ],
  [
    "Southwest Co.",
    "Michael Scott",
    "14h 51m",
    "4/6 Active Users",
    "$78,712",
    "Enterprise",
    "16 Jun, 2020",
    "-120"
  ],
  [
    "Winery. Inc",
    "Kevin Malone",
    "36h 12m",
    "8/16 Active Users",
    "$107,568",
    "Mid",
    "16 Jun, 2020",
    "-120"
  ],
  [
    "Snickers Ltd.",
    "Angela Martin",
    "18h 41m",
    "24/54 Active Users",
    "$3,093,992",
    "Enterprise",
    "16 Jun, 2020",
    "-120"
  ],
  [
    "Balenciaga Co.",
    "Andrew Bernard",
    "82h 11m",
    "14/79 Active Users",
    "$490,213",
    "Enterprise",
    "16 Jun, 2020",
    "-120"
  ],
  [
    "Bose",
    "Dwighit Schrute",
    "8h 58m",
    "6/8 Active Users",
    "$55,976",
    "SMB",
    "16 Jun, 2020",
    "-120"
  ],
  [
    "Leafers Ltd.",
    "Jim Halpert",
    "102h 46m",
    "45/84 Inactive Users",
    "$734",
    "SMB",
    "16 Jun, 2020",
    "-120"
  ]
];

const data = {
  annualRecurringRevenue: 23400000,
  annualRecurringRevenuePrev: 22493048,
  customers: 24,
  customersPrev: 28,
  netRevenueRetention: 107,
  netRevenueRetentionPrev: 92,
  logoRetentionRate: 26,
  logoRetentionRatePrev: 22
};

const Customers = () => {
  const noOfDatasInTable = 5;
  const noOfPages = parseInt(dataTable.length / noOfDatasInTable);

  const [page, setPage] = useState(1);

  const dataInTable = dataTable.slice(
    page * noOfDatasInTable,
    page * noOfDatasInTable + 5
  );

  return (
    <div className="annual-recurring-revenue">
      {/* <div className="revenue-insights__statsGrid">
        <StatCard
          title="Annual Recurring Revenue (ARR)"
          main={data.annualRecurringRevenue}
          reduceToMillion={true}
          bottom={data.annualRecurringRevenuePrev}
          unit="dollar"
          grid={1}
        />
        <StatCard
          title="Customers"
          main={data.customers}
          bottom={data.customersPrev}
          grid={2}
        />
        <StatCard
          title="Net Revenue Retention (NRR)"
          main={data.netRevenueRetention}
          bottom={data.netRevenueRetentionPrev}
          unit="percentage"
          grid={3}
        />
        <StatCard
          title="Logo Retention Rate (LRR)"
          main={data.logoRetentionRate}
          bottom={data.logoRetentionRatePrev}
          unit="percentage"
          grid={4}
        />
      </div> */}
      <div className="contracts-water-fall">
        <div className="table-header">
          
          <div className="table-name">Contract List</div>
          <div className="table-toolbar">
            
          </div>
        </div>
        <Table
          headers={[
            "Company",
            "CSM",
            "Time",
            "Status",
            "ARR",
            "Segment",
            "Renewal Date",
            "Days Until Renewal"
          ]}
          spacing="1.75fr 2fr 1fr 2fr 1fr 1fr 1fr 2fr"
          data={dataInTable}
        />
        <div className="pagination">
          <div
            className="pagination__prev"
            onClick={() => {
              if (page > 0) {
                setPage(page - 1);
              }
            }}
          >
            Previous
          </div>
          <div className="pagination__pages">
            <ul>
              {Array(noOfPages + 1)
                .fill("")
                .map((d, index) => (
                  <li
                    key={index + "sjlk"}
                    className={`pagination__page ${
                      index === page ? `pagination__page--active` : null
                    }`}
                    onClick={() => {
                      setPage(index);
                    }}
                  >
                    {index + 1}
                  </li>
                ))}
            </ul>
          </div>
          <div
            className="pagination__next"
            onClick={() => {
              if (page < noOfPages) {
                setPage(page + 1);
              }
            }}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
