import React, { lazy } from "react";
import { Container } from "react-bootstrap";
import "./feedback-page.scss";
import useTranslation from "../../hooks/translation";

const Feedback = lazy(() => import("../../components/feedback/feedback"));

const FeedbackPage = () => {
  const translation = useTranslation();

  return (
    <Container>
      <div className="feedback-section mt-5 mb-5">
        <div className="feedback-section__header">
          <h2>{translation.CustomerSatisfactionSurvey}</h2>
          <h6>{translation.PleaseTakeMmomentToFill}</h6>
        </div>
        <Feedback />
      </div>
    </Container>
  );
};

export default FeedbackPage;
