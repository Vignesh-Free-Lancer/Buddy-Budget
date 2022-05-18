import React, { lazy, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./user-email-verification.scss";

import { userEmailAccountActivate } from "../../redux/actions/userActions";

const Loading = lazy(() => import("../../components/loading/loading"));

const UserVerifyEmailSuccess = () => {
  const { token } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const activateUserAccount = () => {
      dispatch(userEmailAccountActivate(token));
    };
    if (token) activateUserAccount();
  }, [token, dispatch]);

  const emailActivateConfirmation = useSelector(
    (state) => state.userEmailAccountActivate
  );
  const { loading, error } = emailActivateConfirmation;

  const { addToast } = useToasts();

  useEffect(() => {
    if (error) addToast(error, { appearance: "error" });

    return () => {
      delete emailActivateConfirmation.error;
    };
  }, [emailActivateConfirmation, error, addToast]);

  return (
    <>
      {loading && <Loading />}
      <div className="user-verify-email__success">
        <div className="container">
          <Row>
            <Col>
              <div className="user-verify-email__success__content">
                <h1>Email has been verified</h1>
                <div className="user-verify-email__success__content__icon"></div>
                <p>You can now log in</p>
                <div>
                  <Link to="/login">Login</Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default UserVerifyEmailSuccess;
