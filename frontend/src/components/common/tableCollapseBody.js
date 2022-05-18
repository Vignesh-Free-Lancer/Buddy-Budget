import React from "react";
import _ from "lodash";

import { numberFormat } from "../../utils/common";

class TableCollapseRow extends React.Component {
  state = { expanded: false };

  toggleExpander = (e) => {
    if (!this.state.expanded) {
      this.setState({ expanded: true });
    } else {
      this.setState({ expanded: false });
    }
  };

  // Generate Unique Key For Table Cell
  createCellKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  // Get Object Values Based On Object Properties Name, In Common Way
  // For Example, value =  [propertyname] => From Table Header Path Properties
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    if (column.key === "date")
      return new Date(_.get(item, column.path)).toLocaleDateString();
    if (column.key === "currency")
      return numberFormat(_.get(item, column.path));
    return _.get(item, column.path);
  };

  render() {
    const {
      columnWrap,
      month,
      reportsData,
      columnHeaders,
      footerData,
      footerContent,
    } = this.props;

    return [
      <tr
        className={`parent-row ${
          this.state.expanded ? "row-expanded" : "row-collapsed"
        }`}
        key="main"
        onClick={this.toggleExpander}
      >
        <td colSpan={columnWrap}>{month}</td>
      </tr>,
      this.state.expanded && (
        <>
          {/* {reportsData.map((item, i) => (
            <tr className="expandable-row" key={i}>
              <td></td>
              <td>{item.particulars}</td>
              <td>{item.qty}</td>
              <td>{item.unitPrice}</td>
              <td>{item.totalPrice}</td>
            </tr>
          ))} */}
          {reportsData.map((item, i) => (
            <tr className="expandable-row" key={i}>
              {columnHeaders.map((column) => (
                <td key={this.createCellKey(item, column)}>
                  {this.renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
          {footerData && (
            <tr className="footer-row" key="footerRow">
              <td colSpan={columnWrap}>
                <span className="footer-content">{`${month} - ${footerContent} `}</span>
                <span className="footer-values">
                  {numberFormat(footerData)}
                </span>
              </td>
            </tr>
          )}
        </>
      ),
    ];
  }
}

export default TableCollapseRow;
