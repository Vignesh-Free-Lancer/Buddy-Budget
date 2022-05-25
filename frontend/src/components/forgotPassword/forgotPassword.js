import React, { lazy, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { passwordRequirements, emailValidation } from "../../utils/common";
import { userForgotPasswordAction } from "../../redux/actions/userActions";
import useTranslation from "../../hooks/translation";

const InputFormGroup = lazy(() => import("../common/inputFormGroup"));
const InputText = lazy(() => import("../common/inputText"));
const Loading = lazy(() => import("../loading/loading"));

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const translation = useTranslation();

  const forgotPasswordResponse = useSelector(
    (state) => state.userForgotPassword
  );
  const { loading, error, userForgotPassword } = forgotPasswordResponse;

  const { addToast } = useToasts();
  useEffect(() => {
    if (error) addToast(error, { appearance: "error" });

    return () => {
      delete forgotPasswordResponse.error;
    };
  }, [forgotPasswordResponse, error, addToast]);

  useEffect(() => {
    if (userForgotPassword && userForgotPassword.message)
      addToast(userForgotPassword.message, { appearance: "success" });

    return () => {
      if (userForgotPassword) delete userForgotPassword.message;
    };
  }, [userForgotPassword, addToast]);

  // State Object For Change Password Data
  const [userCredential, setUserCredential] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State Object For Password Icon Show & Hide
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const handleNewPasswordVisibility = () => {
    setNewPasswordShown(!newPasswordShown);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  // State Object For Handling Error Message Based On Field Name
  const [userErrors, setUserErrors] = useState({});

  // Validate Input Field Values, When OnChange Event Fired
  const validateProperty = (input) => {
    if (input.name === "email") {
      if (input.value.trim() === "") return "Please enter email";
      if (input.value.trim() !== "") return emailValidation(input.value);
    }

    if (input.name === "newPassword") {
      if (input.value.trim() === "") return "Please enter new password";

      if (input.value.trim() !== "") {
        return passwordRequirements(input.value.trim());
      }
    }

    if (input.name === "confirmPassword") {
      if (input.value.trim() === "") return "Please enter confirm password";
      if (input.value.trim() !== "") {
        if (input.value !== userCredential.newPassword)
          return "Please did not match";
      }
    }
  };

  // Input Field On Change Function
  const handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...userErrors }; //First clone the existing errors
    const errorMessage = validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setUserErrors(errors);

    // After Input Field Validation Success, Assign Input Value To State Object
    const userPwdDetail = { ...userCredential };
    userPwdDetail[input.name] = input.value;
    setUserCredential(userPwdDetail);
  };

  // Validate Fields When Click On Update Button
  const validation = () => {
    const errors = {};

    if (userCredential.email.trim() === "")
      errors.email = "Please enter email address";

    if (userCredential.newPassword.trim() === "")
      errors.newPassword = "Please enter new password";

    if (
      userCredential.confirmPassword === undefined ||
      userCredential.confirmPassword.trim() === ""
    )
      errors.confirmPassword = "Please enter confirm password";

    if (
      userCredential.newPassword.trim() !==
      (userCredential.confirmPassword && userCredential.confirmPassword.trim())
    )
      errors.confirmPassword = "Password did not match";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Update Existing User Password When Click On Reset Button (Form Submit)
  const handleUpdatePassword = (e) => {
    e.preventDefault();

    const errors = validation();
    setUserErrors(errors || {});
    if (errors) return;

    dispatch(
      userForgotPasswordAction(userCredential.email, userCredential.newPassword)
    );

    ResetValues();
  };

  const ResetValues = () => {
    const userDetails = { ...userCredential };
    userDetails.email = "";
    userDetails.newPassword = "";
    userDetails.confirmPassword = "";
    setUserCredential(userDetails);
  };

  return (
    <Form className="forgot-password__form" onSubmit={handleUpdatePassword}>
      {loading && <Loading />}
      <InputFormGroup inputLabel={translation.EmailAddress} inputName="email">
        <InputText
          inputName="email"
          inputType="email"
          placeholderName={translation.EnterEmailAddress}
          inputErrorMessage={userErrors.email}
          inputChange={handleInputChange}
          inputValue={userCredential.email}
        />
      </InputFormGroup>

      <InputFormGroup
        inputLabel={translation.NewPassword}
        inputName="newPassword"
      >
        <InputText
          inputName="newPassword"
          inputType={newPasswordShown ? "type" : "password"}
          inputClassName="password-control"
          placeholderName={translation.EnterNewPassword}
          inputErrorMessage={userErrors.newPassword}
          inputChange={handleInputChange}
          inputValue={userCredential.newPassword}
        />
        <div
          className={`password-icon ${
            newPasswordShown ? "show-password" : "hide-password"
          }`}
          onClick={handleNewPasswordVisibility}
        ></div>
      </InputFormGroup>

      <InputFormGroup
        inputLabel={translation.ConfirmPassword}
        inputName="confirmPassword"
      >
        <InputText
          inputName="confirmPassword"
          inputType={confirmPasswordShown ? "type" : "password"}
          inputClassName="password-control"
          placeholderName={translation.EnterConfirmPassword}
          inputErrorMessage={userErrors.confirmPassword}
          inputChange={handleInputChange}
          inputValue={userCredential.confirmPassword}
        />
        <div
          className={`password-icon ${
            confirmPasswordShown ? "show-password" : "hide-password"
          }`}
          onClick={handleConfirmPasswordVisibility}
        ></div>
      </InputFormGroup>

      <div className="form-group mt-5" style={{ textAlign: "right" }}>
        <button type="submit" className="btn btn-primary">
          {translation.ChangePassword}
        </button>
      </div>

      <div className="form-group mt-4" style={{ textAlign: "right" }}>
        {translation.BackToLogin} ? <Link to="/login">{translation.Go}</Link>
      </div>
    </Form>
  );
};

export default ForgotPassword;
