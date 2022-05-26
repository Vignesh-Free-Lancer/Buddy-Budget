import React, { lazy, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "./user-email-verification.scss";
import { useToasts } from "react-toast-notifications";
import useTranslation from "../../hooks/translation";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { userEmailAccountActivate } from "../../redux/actions/userActions";

const Loading = lazy(() => import("../../components/loading/loading"));

const UserVerifyEmailSuccess = () => {
  const { token } = useParams();

  const dispatch = useDispatch();

  const translation = useTranslation();

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
      {!error && (
        <div className="user-verify-email__success">
          <div className="container">
            <Row>
              <Col>
                <div className="user-verify-email__success__content">
                  <h1>{translation.EmailHasBeenVerified}</h1>
                  <div className="user-verify-email__success__content__icon"></div>
                  <p>{translation.YouCanNowLogIn}</p>
                  <div>
                    <Link to="/login">{translation.Login}</Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
      {error && (
        <div className="user-verify-email__error">
          {" "}
          <div className="container">
            <Row>
              <Col>
                <div className="user-verify-email__error__content">
                  <h1>{translation.YourAccoutHasBeenAlreadyActivated}</h1>
                  <p>( {translation.Or} )</p>
                  <h3>{translation.IfNotActivatedPleaseTrySomeTime}!</h3>
                  <div className="user-verify-email__error__content__icon"></div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default UserVerifyEmailSuccess;
