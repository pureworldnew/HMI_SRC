import React from "react";

const Table = ({ headers, spacing, data }) => {
    let idGenerator = () => {
        return Math.random().toString(36).slice(2);
    };

    return (
        <div className="table">
            <div className="table__wrapper">
                <table className="table__container">
                    <thead>
                        <tr style={{ gridTemplateColumns: spacing }}>
                            {headers.map(header => (
                                <td key={`${header}-${idGenerator()}`}>{header}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((eachRow, index) => (
                            <tr key={`${index}-row-${idGenerator()}`} style={{ gridTemplateColumns: spacing }}>
                            {eachRow.map((item, index) => (
                                <td key={`${item}-${idGenerator()}`}>
                                {index === 3 && (
                                    <div
                                    style={{
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "5px"
                                    }}
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
