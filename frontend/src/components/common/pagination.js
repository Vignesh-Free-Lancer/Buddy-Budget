import React from "react";
import { Col, Row } from "react-bootstrap";
import useTranslation from "../../hooks/translation";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({
  recordsCount,
  perPageSize,
  onPageChange,
  currentPage,
}) => {
  // Here Math.Ceil use for round up nearest integers
  const totalPages = Math.ceil(recordsCount / perPageSize);

  const pages = _.range(1, isFinite(totalPages) ? totalPages + 1 : 0); // StartRecord, EndRecord

  const url = "#";

  const translation = useTranslation();

  return (
    <div
      className="page-pagination pagination-list"
      style={{ display: recordsCount > 0 ? "block" : "none" }}
    >
      <Row>
        <Col xl={3} lg={3} md={3} sm={12} xs={12}>
          <div className="pagination-list__total-count">
            {translation.TotalRecords}: <span>{recordsCount}</span>
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
          <nav
            aria-label="Page navigation example"
            style={{ display: totalPages === 1 ? "none" : "block" }}
          >
            <ul className="pagination">
              {pages.map((page) => (
                <li
                  className={
                    page === currentPage ? "page-item active" : "page-item"
                  }
                  key={page}
                >
                  <a
                    className="page-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => onPageChange(page)}
                    href={url}
                  >
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Col>
        <Col xl={3} lg={3} md={3} sm={12} xs={12}>
          <div className="pagination-list__page-size">
            {translation.RecordPerPage}: <span>{perPageSize}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

// Here propTypes should be camel case
Pagination.propTypes = {
  recordsCount: PropTypes.number.isRequired,
  perPageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
