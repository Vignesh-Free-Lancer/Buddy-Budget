import React from "react";

const TableHeader = ({ columnHeaders, sortColumn, onSort }) => {
  // Sort Method On Table Header, Based On
  const raiseSort = (path) => {
    const sortHeader = { ...sortColumn };

    if (sortHeader.path === path) {
      sortHeader.order = sortHeader.order === "asc" ? "desc" : "asc";
    } else {
      sortHeader.path = path;
      sortHeader.order = "asc";
    }

    onSort(sortHeader);
  };

  // Set Sort Icon In Header
  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  return (
    <thead>
      <tr>
        {columnHeaders.map((header) => (
          <th
            key={header.path || header.key}
            onClick={() => raiseSort(header.path)}
          >
            {header.label} {renderSortIcon(header)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
