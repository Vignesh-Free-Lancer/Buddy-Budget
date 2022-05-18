import React, { lazy } from "react";
import { Table } from "react-bootstrap";

const TableCollapseHeader = lazy(() => import("./tableCollapseHeader"));
const TableCollapseRow = lazy(() => import("./tableCollapseBody"));

const TableCollapse = ({
  tableName = "",
  columnHeaders,
  dataLists,
  footerContent = "",
  listErrorMessage,
}) => {
  return (
    <>
      <Table
        bordered
        responsive
        className={`custom-table custom-table__collapsable ${tableName}`}
      >
        <TableCollapseHeader columnHeaders={columnHeaders} />
        {dataLists && dataLists.length > 0 ? (
          <tbody>
            {dataLists &&
              dataLists.map((data, index) => (
                <TableCollapseRow
                  key={index}
                  index={index + 1}
                  columnWrap={columnHeaders.length}
                  month={data.month}
                  reportsData={data.reportItems}
                  columnHeaders={columnHeaders}
                  footerData={data.monthlyAmount}
                  footerContent={footerContent}
                />
              ))}
          </tbody>
        ) : (
          <tbody style={{ height: "300px" }}>
            <tr key="emptyrow">
              <td colSpan={columnHeaders.length} className="no-records">
                {listErrorMessage}
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </>
  );
};

export default TableCollapse;
