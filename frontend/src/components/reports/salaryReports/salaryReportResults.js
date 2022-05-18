import React, { lazy } from "react";
import useTranslation from "../../../hooks/translation";

const TableComponent = lazy(() => import("../../common/table"));

const SalaryReportResults = ({
  reportLists = [],
  sortColumn,
  onSort,
  listErrorMessage = "",
}) => {
  const translation = useTranslation();

  // Custom Define The Table Header
  const headerColumns = [
    {
      path: "month",
      label: translation.Month,
    },
    {
      path: "monthlySalary",
      label: translation.Salary,
      key: "currency",
    },
    {
      path: "bonusAmount",
      label: translation.Bonus,
      key: "currency",
    },
    {
      path: "otherAllowance",
      label: translation.ExtraAllowance,
      key: "currency",
    },
    {
      path: "totalCR",
      label: translation.TotalCR,
      key: "currency",
    },
    {
      path: "pf",
      label: translation.PF,
      key: "currency",
    },
    {
      path: "incomeTax",
      label: translation.IncomeTax,
      key: "currency",
    },
    {
      path: "professionalTax",
      label: translation.ProfessionalTax,
      key: "currency",
    },
    {
      path: "otherDeductions",
      label: translation.OtherDeductions,
      key: "currency",
    },
    {
      path: "totalDR",
      label: translation.TotalDR,
      key: "currency",
    },
    {
      path: "netPayAmount",
      label: translation.NetAmount,
      key: "currency",
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
    </>
  );
};

export default SalaryReportResults;
