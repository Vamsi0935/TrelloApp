import React from "react";

const TableComponent = () => {
  return (
    <div>
      <h3>Table</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Card</th>
            <th>List</th>
            <th>Labels</th>
            <th>Members</th>
            <th>Due date</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default TableComponent;
