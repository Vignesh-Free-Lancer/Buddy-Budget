import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./landing-page.scss";
import { Link } from "react-router-dom";
import useTranslation from "../../hooks/translation";

const LandingPage = () => {
  const translation = useTranslation();

  return (
    <div className="landing-page-section">
      <Container>
        <Row>
          <Col>
            <div className="landing-page-section__content">
              <h1>{translation.WelcomeToBuddyBudget}</h1>
              <p>{translation.OneSafe}</p>
              <div className="landing-page-section__button-container">
                <Link to="/login">
                  <Button size="md" variant="primary" className="me-5">
                    {translation.Login}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="md" variant="outline-primary">
                    {translation.Signup}
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
