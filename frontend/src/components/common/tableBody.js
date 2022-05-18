import React from "react";
import _ from "lodash";

import { numberFormat } from "../../utils/common";

const TableBody = ({ columnHeaders, datas, errorMessage }) => {
  // Generate Unique Key For Table Cell
  const createCellKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  // Get Object Values Based On Object Properties Name, In Common Way
  // For Example, value =  [propertyname] => From Table Header Path Properties
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    if (column.key === "date")
      return new Date(_.get(item, column.path)).toLocaleDateString();
    if (column.key === "currency")
      return numberFormat(_.get(item, column.path));
    return _.get(item, column.path);
  };

  return (
    <tbody>
      {datas.length > 0 ? (
        datas.map((item) => (
          <tr key={item._id}>
            {columnHeaders.map((column) => (
              <td
                key={createCellKey(item, column)}
                className={`${
                  column.key === "actions" ? "editable-column" : "non-editable"
                }`}
              >
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr key="empty-row">
          <td colSpan={columnHeaders.length} className="no-records">
            {errorMessage}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
