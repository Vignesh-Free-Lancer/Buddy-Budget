import React from "react";
import useTranslation from "../../hooks/translation";
import TableComponent from "../common/table";

const ExpenseLists = ({
  expenseLists,
  onEditExpense,
  onDeleteExpense,
  sortColumn,
  onSort,
  listErrorMessage = "",
}) => {
  const translation = useTranslation();

  // Custom Define The Table Header
  const headerColumns = [
    {
      path: "particular",
      label: translation.Particular,
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
    {
      key: "actions",
      content: (expense) => (
        <>
          <button
            className="btn btn-info me-3 edit-icon"
            onClick={() => onEditExpense(expense)}
            title={translation.Edit}
          >
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
          <button
            className="btn btn-danger delete-icon"
            onClick={() => onDeleteExpense(expense)}
            title={translation.Delete}
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </>
      ),
    },
  ];
  return (
    <TableComponent
      tableName="expense-info__expense-table"
      columnHeaders={headerColumns}
      dataLists={expenseLists}
      sortColumn={sortColumn}
      onSort={onSort}
      listErrorMessage={listErrorMessage}
    />
  );
};

export default ExpenseLists;
