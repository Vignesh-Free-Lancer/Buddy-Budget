import React from "react";
import { Table } from "react-bootstrap";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const TableComponent = ({
  tableName = "",
  columnHeaders,
  dataLists = [],
  sortColumn,
  onSort,
  listErrorMessage,
}) => {
  return (
    <>
      <Table bordered responsive className={`custom-table ${tableName}`}>
        <TableHeader
          columnHeaders={columnHeaders}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        {dataLists && dataLists.length > 0 ? (
          <TableBody
            columnHeaders={columnHeaders}
            datas={dataLists}
            errorMessage={listErrorMessage}
          />
        ) : (
          <tbody style={{ height: "300px" }}>
            <tr key="empty-row">
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

export default TableComponent;
