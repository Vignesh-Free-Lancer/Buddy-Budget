import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";

const Landing = () => {
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userLogin);
  const { userInfos } = userDetails;

  useEffect(() => {
    if (userInfos) {
      navigate("/dashboard");
    }
  }, [navigate, userInfos]);

  return (
    <div className="landing-page-container">
      <Container>
        <Row>
          <Col>
            <div className="intro-text">
              <h1>Welcome to Family Budget</h1>
              <p>One safe place to all your budgets</p>
              <div className="button-container">
                <Link to="/login">
                  <Button size="lg">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline-primary">
                    Signup
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

export default Landing;
