import React from "react";
import useTranslation from "../../hooks/translation";
import TableComponent from "../common/table";

const GroceryLists = ({
  groceryLists = {},
  onEditGrocery,
  onDeleteGrocery,
  sortColumn,
  onSort,
  listErrorMessage = "",
}) => {
  const translation = useTranslation();

  //Custom Define Table Header
  const headerColumns = [
    {
      path: "particulars",
      label: translation.Particulars,
    },
    {
      path: "unitPrice",
      label: translation.UnitPrice,
      key: "currency",
    },
    {
      path: "qty",
      label: translation.Quantity,
    },
    {
      path: "totalPrice",
      label: translation.TotalPrice,
      key: "currency",
    },
    {
      key: "actions",
      content: (grocery) => (
        <>
          <button
            className="btn btn-info me-3 edit-icon"
            title={translation.Edit}
            onClick={() => onEditGrocery(grocery)}
          >
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
          <button
            className="btn btn-danger delete-icon"
            title={translation.Delete}
            onClick={() => onDeleteGrocery(grocery)}
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <TableComponent
      tableName="expense-info__grocery-table"
      columnHeaders={headerColumns}
      dataLists={groceryLists}
      sortColumn={sortColumn}
      onSort={onSort}
      listErrorMessage={listErrorMessage}
    />
  );
};

export default GroceryLists;
