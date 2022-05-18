import React, { lazy, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { passwordRequirements } from "../../utils/common";
import { passwordResetUser } from "../../redux/actions/userActions";

// import ErrorMessage from "../errorMessage/errorMessage";
const InputFormGroup = lazy(() => import("../common/inputFormGroup"));
const InputText = lazy(() => import("../common/inputText"));
const Loading = lazy(() => import("../loading/loading"));

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const passwordResponse = useSelector((state) => state.userPasswordReset);
  const { loading, error, userDatas } = passwordResponse;

  const { addToast } = useToasts();
  useEffect(() => {
    if (error) addToast(error, { appearance: "error" });

    if (userDatas && userDatas.message)
      addToast(userDatas.message, { appearance: "success" });

    return () => {
      delete passwordResponse.error;
      delete passwordResetUser.userDatas;
    };
  }, [passwordResponse, error, userDatas, addToast]);

  // State Object For Change Password Data
  const [userCredential, setUserCredential] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State Object For Password Icon Show & Hide
  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const handleOldPasswordVisibility = () => {
    setOldPasswordShown(!oldPasswordShown);
  };

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
    if (input.name === "oldPassword") {
      if (input.value.trim() === "") return "Please enter old password";
      return passwordRequirements(input.value.trim());
    }

    if (input.name === "newPassword") {
      if (input.value.trim() === "") return "Please enter new password";

      if (input.value.trim() !== "") {
        if (input.value === userCredential.oldPassword) {
          return "New password should not be equal to old password";
        }
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

    if (userCredential.oldPassword.trim() === "")
      errors.oldPassword = "Please enter old password";

    if (userCredential.newPassword.trim() === "")
      errors.newPassword = "Please enter new password";

    if (
      userCredential.confirmPassword === undefined ||
      userCredential.confirmPassword.trim() === ""
    )
      errors.confirmPassword = "Please enter confirm password";

    if (userCredential.oldPassword.trim() === userCredential.newPassword.trim())
      errors.newPassword = "New password should not be equal to old password";

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
      passwordResetUser(
        userId,
        userCredential.oldPassword,
        userCredential.newPassword
      )
    );

    ResetValues();
  };

  const ResetValues = () => {
    const userDetails = { ...userCredential };
    userDetails.oldPassword = "";
    userDetails.newPassword = "";
    userDetails.confirmPassword = "";
    setUserCredential(userDetails);
  };

  return (
    <Form className="reset-password__form" onSubmit={handleUpdatePassword}>
      {loading && <Loading />}
      <InputFormGroup inputLabel="Old Password" inputName="oldPassword">
        <InputText
          inputName="oldPassword"
          inputType={oldPasswordShown ? "type" : "password"}
          inputClassName="password-control"
          placeholderName="Enter old password"
          inputErrorMessage={userErrors.oldPassword}
          inputChange={handleInputChange}
          inputValue={userCredential.oldPassword}
        />
        <div
          className={`password-icon ${
            oldPasswordShown ? "show-password" : "hide-password"
          }`}
          onClick={handleOldPasswordVisibility}
        ></div>
      </InputFormGroup>

      <InputFormGroup inputLabel="New Password" inputName="newPassword">
        <InputText
          inputName="newPassword"
          inputType={newPasswordShown ? "type" : "password"}
          inputClassName="password-control"
          placeholderName="Enter new password"
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

      <InputFormGroup inputLabel="Confirm Password" inputName="confirmPassword">
        <InputText
          inputName="confirmPassword"
          inputType={confirmPasswordShown ? "type" : "password"}
          inputClassName="password-control"
          placeholderName="Enter confirm password"
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
          Reset Password
        </button>
      </div>

      <div className="form-group mt-4" style={{ textAlign: "right" }}>
        Back to dashboard ? <Link to="/buddy-budget/dashboard">Go</Link>
      </div>
    </Form>
  );
};

export default ResetPassword;
