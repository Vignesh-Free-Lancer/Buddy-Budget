import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";

import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import "./thanks-page.scss";

import { logOut } from "../../redux/actions/userActions";

const ThanksPage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const deletedUser = useSelector((state) => state.userDeleteData);
  const { userDeleted } = deletedUser;

  // const handleFeedback = () => {
  //   navigate("/buddy-budget/feedback");
  // };

  const { addToast } = useToasts();
  useEffect(() => {
    if (userDeleted && userDeleted.message)
      addToast(userDeleted.message, { appearance: "success" });

    dispatch(logOut());

    return () => {
      if (userDeleted) delete userDeleted.message;
    };
  }, [userDeleted, addToast, dispatch]);

  return (
    <React.Fragment>
      <div className="container thanks__section">
        <Row>
          <Col>
            <div className="thanks__content mt-5 mb-5">
              <h1 className="mb-4">
                Thanks for your support, to utilized our site.
              </h1>
              <h4>We hope, you gave your feedback to improve our site.</h4>
              <h4 className="mt-2">
                In Feature, refer our site to your colleagues or contacts within
                your industry.
              </h4>
              <h1>Welcome back again!</h1>
              {/* <h4 className="mb-4">
                If you wish, We recommend to use our site in the future.
              </h4>
              <h6>
                Please spend few minutes, to provide your feedback. <br /> It
                will helpful for us to improve our site.
              </h6>
              <Button
                type="button"
                className="mt-5 btn"
                onClick={handleFeedback}
              >
                <span>Feedback</span>
              </Button> */}
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ThanksPage;
