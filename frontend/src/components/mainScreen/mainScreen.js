import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import useTranslation from "../../hooks/translation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./main-screen.scss";

const MainScreen = ({ title, children }) => {
  const navigate = useNavigate();
  const translation = useTranslation();

  const userDetails = useSelector((state) => state.userLogin);
  const { userInfos } = userDetails;

  const handleNavigateFeedback = () => {
    navigate(`/buddy-budget/feedback`);
  };

  return (
    <React.Fragment>
      <Container className="main-screen">
        <Row className="main-screen__title-section">
          <Col>
            <h2>{title}</h2>
          </Col>
        </Row>
        <Row className="main-screen__body-section">
          <Col>{children}</Col>
        </Row>
      </Container>
      {userInfos && (
        <div className="main-screen__feedback">
          <Button variant="info" onClick={handleNavigateFeedback}>
            {translation.Feedback}
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default MainScreen;
