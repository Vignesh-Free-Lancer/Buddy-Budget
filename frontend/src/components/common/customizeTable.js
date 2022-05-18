import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";

const CustomizeTable = ({ columns, dataLists, defaultSort }) => {
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "15",
        value: 15,
      },
      {
        text: "20",
        value: 20,
      },
      {
        text: "All",
        value: dataLists && dataLists.length,
      },
    ],
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {},
    onSizePerPageChange: function (page, sizePerPage) {},
  });

  const setPagination = () => {
    return dataLists.length > 1 || dataLists.length === 0 ? pagination : null;
  };

  return (
    <div className="table-responsive">
      {
        <BootstrapTable
          bootstrap4
          striped
          hover
          condensed
          keyField="_id"
          data={dataLists && dataLists}
          columns={columns}
          pagination={setPagination()}
          defaultSorted={defaultSort}
          noDataIndication="There is no data to display"
        />
      }
    </div>
  );
};

export default CustomizeTable;
