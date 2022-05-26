import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import "./user-email-verification.scss";
import useTranslation from "../../hooks/translation";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserVerifyEmail = (props) => {
  const { verificationEmail } = useParams();

  const navigate = useNavigate();

  const translation = useTranslation();

  const userDetails = useSelector((state) => state.userData);
  const { userDatas } = userDetails;

  const { addToast } = useToasts();
  useEffect(() => {
    if (userDatas && userDatas.message)
      addToast(userDatas.message, { appearance: "success" });

    return () => {
      if (userDatas) delete userDatas.message;
    };
  }, [userDatas, addToast]);

  const handleProceed = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="user-verify-email">
        <div className="container">
          <Row>
            <Col>
              <div className="user-verify-email__Content">
                <h1>{translation.AccountConfirmation}</h1>
                <p>
                  {translation.AnEmailLinkHasBeenSent}:{" "}
                  <span>{verificationEmail}</span>
                </p>
                <p>{translation.CheckYourEmailAndProceed}!</p>
                {/* <p>
                  If you did not receive your email verification link,
                  <br />
                  <span
                    style={{
                      color: "#0dcaf0",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Please click here
                  </span>
                  .
                </p> */}
                <Button type="button" className="btn" onClick={handleProceed}>
                  <span>{translation.Proceed}</span>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default UserVerifyEmail;
