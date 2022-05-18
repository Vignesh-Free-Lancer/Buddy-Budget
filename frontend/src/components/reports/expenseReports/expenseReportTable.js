import React, { lazy } from "react";
import useTranslation from "../../../hooks/translation";

const TableCollapse = lazy(() => import("../../common/tableCollapse"));

const ExpenseReportDatas = ({ reportLists, listErrorMessage = "" }) => {
  const translation = useTranslation();

  // Custom Define The Table Header
  const headerColumns = [
    {
      path: "month",
      label: translation.Month,
    },
    {
      path: "particular",
      label: translation.Particulars,
    },
    {
      path: "estimatedCost",
      label: translation.EstimatedCost,
      key: "currency",
    },
    {
      path: "actualCost",
      label: translation.ActualCost,
      key: "currency",
    },
    {
      path: "paymentType",
      label: translation.PaymentType,
    },
    {
      path: "paymentBank",
      label: translation.PaymentBank,
    },
    {
      path: "paymentDate",
      label: translation.PaymentDate,
      key: "date",
    },
    {
      path: "description",
      label: translation.Description,
    },
  ];
  return (
    <>
      <TableCollapse
        tableName="expense-report-table"
        columnHeaders={headerColumns}
        dataLists={reportLists}
        footerContent={`${translation.ExpenseAmount}: `}
        listErrorMessage={listErrorMessage}
      />
    </>
  );
};

export default ExpenseReportDatas;
