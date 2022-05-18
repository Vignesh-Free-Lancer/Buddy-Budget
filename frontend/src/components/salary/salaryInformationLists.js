import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useToasts } from "react-toast-notifications";
import useTranslation from "../../hooks/translation";

import { monthsData } from "../../utils/customData";
import { Paginate } from "../../utils/paginate";
import { numberFormat } from "../../utils/common";
import Pagination from "../common/pagination";

import { getSalaryDetailListsAction } from "../../redux/actions/salaryActions";

import Loading from "../loading/loading";

const SalaryInformationLists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translation = useTranslation();

  const salaryInsertResponse = useSelector((state) => state.salaryDetailData);
  const { salaryData } = salaryInsertResponse;

  const salaryDeleteResponse = useSelector((state) => state.salaryDeleteData);
  const { salaryDeleted } = salaryDeleteResponse;

  const salaryListResponse = useSelector((state) => state.salaryDetailLists);
  const { loading, salaryLists, error } = salaryListResponse;

  const { addToast } = useToasts();

  useEffect(() => {
    if (error) addToast(error, { appearance: "error" });

    return () => {
      delete salaryListResponse.error;
    };
  }, [salaryListResponse, error, addToast]);

  useEffect(() => {
    if (salaryData && salaryData.message)
      addToast(salaryData.message, { appearance: "success" });

    return () => {
      if (salaryData) delete salaryData.message;
    };
  }, [salaryData, addToast]);

  useEffect(() => {
    if (salaryDeleted && salaryDeleted.message)
      addToast(salaryDeleted.message, { appearance: "success" });

    return () => {
      delete salaryDeleteResponse.salaryDeleted;
    };
  }, [salaryDeleteResponse, salaryDeleted, addToast]);

  const handleSeletectItem = (salary) => {
    navigate(`/buddy-budget/salary/${salary._id}`);
  };

  useEffect(() => {
    dispatch(getSalaryDetailListsAction());
  }, [dispatch, navigate]);

  // For Pagination State
  const [pageSize, setPageSize] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Set Default Pagesize On Component Mount
  useEffect(() => {
    setPageSize(5);
  }, []);

  // Pagination Number Click Event
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPagedData = () => {
    // Get Data Based On Pagination, Sorted Records
    const salaryRecords = Paginate(
      salaryLists && salaryLists.totalLength > 0
        ? salaryLists.salaryDetailLists
        : 0,
      currentPage,
      pageSize
    );

    // Get Count Of Total Records After Filtering, Sorting, Paginating
    const totalRecordsCount =
      salaryLists && salaryLists.totalLength ? salaryLists.totalLength : 0;

    return { salaryRecords, totalRecordsCount };
  };

  const { salaryRecords, totalRecordsCount } = getPagedData();

  return (
    <>
      <Row>
        <Col>
          <ButtonGroup className="form-navigation-group">
            <Link to="/buddy-budget/salary">
              <Button
                variant="secondary"
                className="me-1"
                title={translation.AddNew}
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </Button>
            </Link>
          </ButtonGroup>
        </Col>
      </Row>
      {loading && <Loading />}
      <Row>
        <Col>
          {salaryRecords && totalRecordsCount > 0 ? (
            <ListGroup>
              {salaryRecords.map((salary) => (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between"
                  key={salary._id}
                >
                  <Col
                    xl={1}
                    lg={1}
                    md={1}
                    sm={1}
                    xs={2}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="chkSelect"
                        name="chkSelect"
                        disabled={true}
                      />
                    </div>
                  </Col>
                  <Col
                    xl={11}
                    lg={11}
                    md={11}
                    sm={11}
                    xs={10}
                    style={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => handleSeletectItem(salary)}
                  >
                    <Row className="align-items-center salary-listview__main-content">
                      <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                        <div title="Month" style={{ display: "inline-block" }}>
                          {/* {salary.month} */}
                          {monthsData.map(
                            (item, i) =>
                              parseInt(item.value) === parseInt(salary.month) &&
                              item.name
                          )}
                        </div>
                      </Col>
                      <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                        <div title="Year" style={{ display: "inline-block" }}>
                          {salary.year}
                        </div>
                      </Col>
                      <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                        <div
                          title="Monthly Salary"
                          style={{ display: "inline-block" }}
                        >
                          {numberFormat(salary.monthlySalary)}
                        </div>
                      </Col>
                      <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                        <div
                          title="Total CR"
                          style={{ display: "inline-block" }}
                        >
                          {numberFormat(salary.totalCR)}
                        </div>
                      </Col>
                      <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                        <div
                          title="Total DR"
                          style={{ display: "inline-block" }}
                        >
                          {numberFormat(salary.totalDR)}
                        </div>
                      </Col>
                      <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                        <div
                          title="Net Pay"
                          style={{ display: "inline-block" }}
                        >
                          {numberFormat(salary.netPayAmount)}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div className="salary-listview__no-records">
              <p>{salaryLists && salaryLists.message}</p>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination
            recordsCount={totalRecordsCount > 0 ? totalRecordsCount : 0}
            perPageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </Col>
      </Row>
    </>
  );
};

export default SalaryInformationLists;
