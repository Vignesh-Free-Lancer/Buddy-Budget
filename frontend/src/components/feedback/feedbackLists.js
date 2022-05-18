import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbackListsAction } from "../../redux/actions/feedbackActions";

const FeedbackLists = () => {
  const dispatch = useDispatch();
  const { feedbackLists, loading } = useSelector(
    (state) => state.feedbackLists
  );
  console.log("List ", loading, feedbackLists);

  useEffect(() => {
    dispatch(getFeedbackListsAction());
  }, [dispatch]);

  return (
    <div
      className="feedback-list-section"
      style={{
        display:
          feedbackLists && feedbackLists.totalLength === 0 ? "none" : "block",
      }}
    >
      <h6>Customers feedback:</h6>
      {feedbackLists && feedbackLists.totalLength === 0 ? (
        <div className="feedback-no-records">
          Waiting for customers reposne...
          {feedbackLists.message}
        </div>
      ) : (
        <Row>
          <Col>
            <div className="feedback-result mt-5">
              <div className="feedback-result-left">
                <span>Jan-2022</span>
                <span>Feb-2022</span>
                <span>Mar-2022</span>
              </div>
              <div className="feedback-result-right">
                <span>Good us</span>
                <span>Need UI Improvement</span>
                <span>Need more functionality</span>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FeedbackLists;
