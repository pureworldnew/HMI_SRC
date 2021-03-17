import React, { useState } from "react";
import StatCard from "../../Dashboard/StatCard/index";

const Teams = () => {

  const [page, setPage] = useState(0);

  // const noOfDatasInTable = 9;
  // const noOfPages = parseInt(dataTable.length / noOfDatasInTable);
  const noOfPages = 1;

  const paginationComponent = () => {
    return (<div className="pagination" style={{ flex: "auto" }}>
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
    )
  }

  return (
    <div>
      <div className="revenue-insights__statsGrid adminTeams">
        <StatCard
          title="Managed Revenue"
          main={21}
          grid={1}
          page="adminTeamsCard"
        />
        <StatCard
          title="2019 Q1 Team"
          main={6}
          grid={2}
          page="adminTeamsCard"
        />
        <StatCard
          title="2019 Q2 Team"
          main={6}
          grid={3}
          page="adminTeamsCard"
        />
        <StatCard
          title="2019 Q3 Team"
          main={25}
          grid={4}
          page="adminTeamsCard"
        />
        <StatCard
          title="2019 Q4 Team"
          main={9}
          grid={5}
          page="adminTeamsCard"
        />
      </div>
      {noOfPages > 1 ? paginationComponent() : null}
      {/* {paginationComponent()} */}
    </div>
  );
};

export default Teams;
