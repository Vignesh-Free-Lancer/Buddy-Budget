import React, { lazy } from "react";
import useTranslation from "../../../hooks/translation";

const TableCollapse = lazy(() => import("../../common/tableCollapse"));

const GroceryReportDatas = ({ reportLists, listErrorMessage = "" }) => {
  const translation = useTranslation();

  const headerColumns = [
    {
      path: "month",
      label: translation.Month,
    },
    {
      path: "particulars",
      label: translation.Particulars,
    },
    {
      path: "qty",
      label: translation.Quantity,
    },
    {
      path: "unitPrice",
      label: translation.UnitPrice,
      key: "currency",
    },
    {
      path: "totalPrice",
      label: translation.TotalPrice,
      key: "currency",
    },
  ];
  return (
    <>
      <TableCollapse
        tableName="grocery-report-table"
        columnHeaders={headerColumns}
        dataLists={reportLists}
        footerContent={`${translation.GroceryAmount}: `}
        listErrorMessage={listErrorMessage}
      />
    </>
  );
};

export default GroceryReportDatas;
