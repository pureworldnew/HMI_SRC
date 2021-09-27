import React from "react";
import useSortableData from './SortablTable';
import PopoverItem from '../PopOverComponent/PopOverComponent';

const CompanyUserTable = (props) => {

  const page = props.page; // page number
  const noOfDatasInTable = props.noOfDatasInTable;

  const header = props.header[0];
  let keys = Object.keys(header);

  let datas = props.data;
  let ndata = datas.map(data =>
    data = data.role ? { ...data, roleName: data.role.roleName } : data
  )

  const { items, requestSort, sortConfig } = useSortableData(ndata);

  const dataInTable = items.slice(
    page * noOfDatasInTable,
    page * noOfDatasInTable + noOfDatasInTable
  );

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table className="UserTable">
      <thead>
        <tr>
          {keys.map(key => (
            <th key={key}>
              <button
                type="button"
                onClick={() => requestSort(key)}
                className={getClassNamesFor(key)}
              >
                {header[key]}
              </button>
            </th>
          ))}
          <th>OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {dataInTable.map((item) => (
          <tr key={item.id}>
            <td>
              <div>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="18" fill="black" />
                </svg>
                <span>{item.fullName}</span>
              </div>
            </td>
            <td>{item.emailAddress}</td>
            <td>{item.userId}</td>
            <td>{item.lastLogin}</td>
            <td>{item.createdAt}</td>
            <td>{item.roleName}</td>
            <td>
              <PopoverItem key={item.id} placement="left" id={item.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompanyUserTable;
