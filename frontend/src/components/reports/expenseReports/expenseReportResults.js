import React, { lazy } from "react";

const TableComponent = lazy(() => import("../../common/table"));

const ExpenseReportResults = ({
  reportLists = [],
  sortColumn,
  onSort,
  listErrorMessage = "",
}) => {
  // Custom Define The Table Header
  const headerColumns = [
    {
      path: "month",
      label: "Month",
    },
    {
      path: "particular",
      label: "Particular",
    },
    {
      path: "estimatedCost",
      label: "Estimated Cost",
      key: "currency",
    },
    {
      path: "actualCost",
      label: "Actual Cost",
      key: "currency",
    },
    {
      path: "paymentType",
      label: "Payment Type",
    },
    {
      path: "paymentBank",
      label: "Payment Bank",
    },
    {
      path: "paymentDate",
      label: "Payment Date",
      key: "date",
    },
    {
      path: "description",
      label: "Description",
    },
  ];

  return (
    <>
      {reportLists && (
        <TableComponent
          tableName="salary-report-table"
          columnHeaders={headerColumns}
          dataLists={reportLists}
          sortColumn={sortColumn}
          onSort={onSort}
          listErrorMessage={listErrorMessage}
        />
      )}
      {/* <TableCollapse
        tableName="grocery-report-table"
        columnHeaders={headerColumns}
        dataLists={reportLists}
        listErrorMessage={listErrorMessage}
      /> */}
    </>
  );
};

export default ExpenseReportResults;
