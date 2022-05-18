import React from "react";

const TableCollapseHeader = ({ columnHeaders }) => {
  return (
    <thead>
      <tr>
        {columnHeaders.map((header) => (
          <th key={header.path || header.key}>{header.label}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableCollapseHeader;
