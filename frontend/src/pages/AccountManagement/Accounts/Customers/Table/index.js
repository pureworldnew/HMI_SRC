import React from "react";

const Table = ({ headers, spacing, data }) => {
  return (
    <div className="table">
      <div className="table__wrapper">
        <table className="table__container">
          <thead>
            <tr style={{ gridTemplateColumns: spacing }}>
              {headers.map(header => (
                <td key={header + "t"}>{header}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((eachRow, index) => (
              <tr key={index + "row"} style={{ gridTemplateColumns: spacing }}>
                {eachRow.map((item, index) => (
                  <td key={item + "d"}>
                    {index === 3 && (
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "5px"
                        }}
                        className={
                          item.indexOf("Active") !== -1 ? "active" : "inactive"
                        }
                      ></div>
                    )}
                    {item}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
