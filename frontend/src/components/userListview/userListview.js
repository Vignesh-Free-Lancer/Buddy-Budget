import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, ListGroup, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import useTranslation from "../../hooks/translation";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";

import { getAllUsers, logOut } from "../../redux/actions/userActions";

import Loading from "../loading/loading";
// import { transform } from "lodash";

const Listview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translation = useTranslation();

  const { userInfos } = useSelector((state) => state.userLogin);

  const userListsResponse = useSelector((state) => state.userLists);
  const { loading, users, error } = userListsResponse;

  const userDeleteResponse = useSelector((state) => state.userDeleteData);
  const { userDeleted } = userDeleteResponse;

  const { addToast } = useToasts();

  useEffect(() => {
    if (error) addToast(error, { appearance: "error" });

    return () => {
      delete userListsResponse.error;
    };
  }, [userListsResponse, error, addToast]);

  useEffect(() => {
    if (userDeleted && userDeleted.message)
      addToast(userDeleted.message, { appearance: "success" });

    return () => {
      if (userDeleted) delete userDeleted.message;
    };
  }, [userDeleted, addToast]);

  const handleSeletectItem = (user) => {
    navigate(`/buddy-budget/user/profile/${user._id}`);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users && users.totalLength === 0) {
      dispatch(logOut());
      navigate("/");
    }
  }, [dispatch, navigate, users]);

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
    const userRecords = Paginate(
      users && users.totalLength > 0 ? users.users : 0,
      currentPage,
      pageSize
    );

    // Get Count Of Total Records After Filtering, Sorting, Paginating
    const totalRecordsCount =
      users && users.totalLength ? users.totalLength : 0;

    return { userRecords, totalRecordsCount };
  };

  const { userRecords, totalRecordsCount } = getPagedData();

  return (
    <React.Fragment>
      <Row style={{ display: userInfos.isAdmin ? "flex" : "none" }}>
        <Col>
          <ButtonGroup className="form-navigation-group">
            <Button
              variant="secondary"
              className="me-1"
              title={translation.AddNew}
            >
              <Link to="/register">
                <i className="fa fa-plus" aria-hidden="true"></i>
              </Link>
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      {loading && <Loading />}
      <Row>
        <Col>
          {userRecords && totalRecordsCount > 0 ? (
            <ListGroup>
              {userRecords.map((user) => (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between"
                  key={user._id}
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
                    onClick={() => handleSeletectItem(user)}
                  >
                    <Row className="align-items-center user-listview__main-content">
                      <Col xl={1} lg={1} md={2}>
                        <img src={user.pic} alt={user.userName} />
                      </Col>
                      <Col xl={3} lg={3} md={2}>
                        <div
                          title="Username"
                          style={{ display: "inline-block" }}
                        >
                          {user.userName}
                        </div>
                      </Col>
                      <Col xl={3} lg={3} md={3}>
                        <div title="Email" style={{ display: "inline-block" }}>
                          {user.email}
                        </div>
                      </Col>
                      <Col xl={2} lg={2} md={2}>
                        <div title="Gender" style={{ display: "inline-block" }}>
                          {user.gender}
                        </div>
                      </Col>
                      <Col xl={2} lg={2} md={2}>
                        <div title="DOB" style={{ display: "inline-block" }}>
                          {new Date(user.dob).toLocaleDateString()}
                        </div>
                      </Col>
                      <Col xl={1} lg={1} md={1}>
                        <div
                          title="User Status"
                          style={{ display: "inline-block" }}
                        >
                          <i
                            className="fa fa-heart"
                            aria-hidden="true"
                            style={{
                              fontSize: "20px",
                              color: user.isActive ? "green" : "red",
                            }}
                          ></i>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div className="user-listview__no-records">
              <p>{users && users.message}</p>
            </div>
          )}
        </Col>
      </Row>
      <Row style={{ display: userInfos.isAdmin ? "block" : "none" }}>
        <Col>
          <Pagination
            recordsCount={totalRecordsCount > 0 ? totalRecordsCount : 0}
            perPageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Listview;
