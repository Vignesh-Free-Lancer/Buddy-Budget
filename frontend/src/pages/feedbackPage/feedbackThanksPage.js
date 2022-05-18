import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./feedback-page.scss";

const FeedbackThanksPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="feedback-section__success">
            <p>
              Your feedback submitted successfully, Thanks for your valuable
              time with us.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FeedbackThanksPage;
