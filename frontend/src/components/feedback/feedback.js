import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import InputFormGroup from "../common/inputFormGroup";
import InputRadio from "../common/inputRadio";

import useTranslation from "../../hooks/translation";
import { validateProperty } from "../../utils/common";

import { addFeedbackDataActions } from "../../redux/actions/feedbackActions";

const Feedback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const translation = useTranslation();

  const userDetails = useSelector((state) => state.userLogin);
  const { userInfos } = userDetails;

  const [feedbackInfo, setFeedbackInfo] = useState({
    satisfication: "",
    usageDuration: "",
    usageTime: "",
    usageInFuture: "",
    referral: "",
    feedbackComments: "",
  });
  const [feedbackErrors, setFeedbackErrors] = useState({});

  // Input Field On Change Function
  const handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...feedbackErrors }; //First clone the existing errors
    const errorMessage = validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setFeedbackErrors(errors);

    // After Input Field Validation Success, Assign Input Value To State Object
    const feedbackDetails = { ...feedbackInfo };
    feedbackDetails[input.name] = input.value;
    setFeedbackInfo(feedbackDetails);
  };

  // Validate The Field On Button Click
  const validation = () => {
    const errors = {};

    if (feedbackInfo.satisfication.trim() === "")
      errors.satisfication = "Please select your option";

    if (feedbackInfo.usageDuration.trim() === "")
      errors.usageDuration = "Please select your option";

    if (feedbackInfo.usageTime.trim() === "")
      errors.usageTime = "Please select your option";

    if (feedbackInfo.usageInFuture.trim() === "")
      errors.usageInFuture = "Please select your option";

    if (feedbackInfo.referral.trim() === "")
      errors.referral = "Please select your option";

    if (feedbackInfo.feedbackComments.trim() === "")
      errors.feedbackComments = "Please enter your comments";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Submit Feedback data
  const handleFeedback = (e) => {
    e.preventDefault();

    const errors = validation();
    setFeedbackErrors(errors || {});
    if (errors) return;

    // const data = localStorage.getItem("expiredData");

    dispatch(
      addFeedbackDataActions(
        feedbackInfo.satisfication,
        feedbackInfo.usageDuration,
        feedbackInfo.usageTime,
        feedbackInfo.usageInFuture,
        feedbackInfo.referral,
        feedbackInfo.feedbackComments
      )
    );

    navigate("/buddy-budget/feedback/success");
  };

  return (
    <>
      <Form className="feedback-section__form" onSubmit={handleFeedback}>
        {/* Satisfication Survey */}
        <InputFormGroup
          inputCustomClasses="mb-4"
          inputLabel={`${translation.HowSatisfiedWithThisSite}?`}
          inputName="satisfication"
        >
          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.VerySatisfied}
            inputName="satisfication"
            inputId="rdVerySatisfied"
            inputErroMessage={feedbackErrors.satisfication}
            inputValue="VerySatisfied"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.satisfication}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.Satisfied}
            inputName="satisfication"
            inputId="rdSatisfied"
            inputErroMessage={feedbackErrors.satisfication}
            inputValue="Satisfied"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.satisfication}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.Neutral}
            inputName="satisfication"
            inputId="rdNeutral"
            inputErroMessage={feedbackErrors.satisfication}
            inputValue="Neutral"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.satisfication}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.UnSatisfied}
            inputName="satisfication"
            inputId="rdUnSatisfied"
            inputErroMessage={feedbackErrors.satisfication}
            inputValue="UnSatisfied"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.satisfication}
          />
          <div
            className="invalid-feedback"
            style={{ display: feedbackErrors.satisfication ? "block" : "none" }}
          >
            {feedbackErrors.satisfication}
          </div>
        </InputFormGroup>

        {/* Usage Duration Survey */}
        <InputFormGroup
          inputCustomClasses="mb-4"
          inputLabel={`${translation.HowLongHaveYouUsedOurSite}?`}
          inputName="usageDuration"
        >
          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.LessThanMonth}
            inputName="usageDuration"
            inputId="rdLessThanMonth"
            inputErroMessage={feedbackErrors.usageDuration}
            inputValue="LessThanMonth"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.usageDuration}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={`1-6 ${translation.Months}`}
            inputName="usageDuration"
            inputId="rdMonthsDuration"
            inputErroMessage={feedbackErrors.usageDuration}
            inputValue="1-6Months"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.usageDuration}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={`1-3 ${translation.Years}`}
            inputName="usageDuration"
            inputId="rdYearsDuration"
            inputErroMessage={feedbackErrors.usageDuration}
            inputValue="1-3Years"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.usageDuration}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.OverThreeYears}
            inputName="usageDuration"
            inputId="rdThreeYears"
            inputErroMessage={feedbackErrors.usageDuration}
            inputValue="OverThreeYears"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.usageDuration}
          />
          <div
            className="invalid-feedback"
            style={{ display: feedbackErrors.usageDuration ? "block" : "none" }}
          >
            {feedbackErrors.usageDuration}
          </div>
        </InputFormGroup>

        {/* Usage Time Survey */}
        <InputFormGroup
          inputCustomClasses="mb-4"
          inputLabel={`${translation.HowOftenDoYouUseSite}?`}
          inputName="usageTime"
        >
          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.OnceAWeek}
            inputName="usageTime"
            inputId="rdOnceAWeek"
            inputErroMessage={feedbackErrors.usageTime}
            inputValue="OnceAWeek"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.usageTime}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.TwoThreeTimesMonth}
            inputName="usageTime"
            inputId="rdFewTimesAMonth"
            inputErroMessage={feedbackErrors.usageTime}
            inputValue="FewTimesAMonth"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.usageTime}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.OnceAMonth}
            inputName="usageTime"
            inputId="rdOnceAMonth"
            inputErroMessage={feedbackErrors.usageTime}
            inputValue="OnceAMonth"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.usageTime}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.LessThanOnceAMonth}
            inputName="usageTime"
            inputId="rdLessThanOnceAMonth"
            inputErroMessage={feedbackErrors.usageTime}
            inputValue="LessThanOnceAMonth"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.usageTime}
          />
          <div
            className="invalid-feedback"
            style={{ display: feedbackErrors.usageTime ? "block" : "none" }}
          >
            {feedbackErrors.usageTime}
          </div>
        </InputFormGroup>

        {/* Usage In Future */}
        <InputFormGroup
          inputCustomClasses="mb-4"
          inputLabel={`${translation.WouldYouUseOurSiteInFuture}?`}
          inputName="usageInFuture"
        >
          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.Definitely}
            inputName="usageInFuture"
            inputId="rdDefinitely"
            inputErroMessage={feedbackErrors.usageInFuture}
            inputValue="Definitely"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.usageInFuture}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.Probably}
            inputName="usageInFuture"
            inputId="rdProbably"
            inputErroMessage={feedbackErrors.usageInFuture}
            inputValue="Probably"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.usageInFuture}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.NotSure}
            inputName="usageInFuture"
            inputId="rdNotSure"
            inputErroMessage={feedbackErrors.usageInFuture}
            inputValue="NotSure"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.usageInFuture}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.ProbablyNot}
            inputName="usageInFuture"
            inputId="rdProbablyNot"
            inputErroMessage={feedbackErrors.usageInFuture}
            inputValue="ProbablyNot"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.usageInFuture}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.DefinitelyNot}
            inputName="usageInFuture"
            inputId="rdDefinitelyNot"
            inputErroMessage={feedbackErrors.usageInFuture}
            inputValue="DefinitelyNot"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.usageInFuture}
          />
          <div
            className="invalid-feedback"
            style={{ display: feedbackErrors.usageInFuture ? "block" : "none" }}
          >
            {feedbackErrors.usageInFuture}
          </div>
        </InputFormGroup>

        {/* Referral To Contacts */}
        <InputFormGroup
          inputCustomClasses="mb-4"
          inputLabel={`${translation.WouldYouRecommendOurSiteToColleagues}?`}
          inputName="referral"
        >
          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.Definitely}
            inputName="referral"
            inputId="rdRefDefinitely"
            inputErroMessage={feedbackErrors.referral}
            inputValue="Definitely"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.referral}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.Probably}
            inputName="referral"
            inputId="rdRefProbably"
            inputErroMessage={feedbackErrors.referral}
            inputValue="Probably"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.referral}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.NotSure}
            inputName="referral"
            inputId="rdRefNotSure"
            inputErroMessage={feedbackErrors.referral}
            inputValue="NotSure"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.referral}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.ProbablyNot}
            inputName="referral"
            inputId="rdRefProbablyNot"
            inputErroMessage={feedbackErrors.referral}
            inputValue="ProbablyNot"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.referral}
          />

          <InputRadio
            inputRadioType="mb-2"
            inputLabel={translation.DefinitelyNot}
            inputName="referral"
            inputId="rdRefDefinitelyNot"
            inputErroMessage={feedbackErrors.referral}
            inputValue="DefinitelyNot"
            inputChange={handleInputChange}
            inputDataValue={feedbackInfo.referral}
          />
          <div
            className="invalid-feedback"
            style={{ display: feedbackErrors.usageInFuture ? "block" : "none" }}
          >
            {feedbackErrors.usageInFuture}
          </div>
        </InputFormGroup>

        {/* Feedback Comments */}
        <InputFormGroup
          inputCustomClasses="mb-4"
          inputLabel={`${translation.HowCanWeImproveOurService}?`}
          inputName="feedbackComments"
        >
          <textarea
            className="form-control"
            placeholder="Leave a comment here..."
            name="feedbackComments"
            style={{ height: "100px" }}
            onChange={handleInputChange}
            value={feedbackInfo.feedbackComments}
          ></textarea>
          <div
            className="invalid-feedback"
            style={{
              display: feedbackErrors.feedbackComments ? "block" : "none",
            }}
          >
            {feedbackErrors.feedbackComments}
          </div>
        </InputFormGroup>

        <div className="form-group mt-5" style={{ textAlign: "right" }}>
          <button type="submit" className="btn btn-primary mb-3">
            {translation.Submit}
          </button>
          {userInfos && (
            <p className="mt-2 feedback-section__back-to-page">
              {`(${translation.Or})`} {translation.BackTo}{" "}
              <Link to="/buddy-budget/dashboard">{translation.MainPage}</Link>
            </p>
          )}
        </div>
      </Form>
    </>
  );
};

export default Feedback;
