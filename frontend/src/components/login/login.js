import React, { lazy, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { validateProperty } from "../../utils/common";

import { login } from "../../redux/actions/userActions";
import useTranslation from "../../hooks/translation";

const InputFormGroup = lazy(() => import("../common/inputFormGroup"));
const InputText = lazy(() => import("../common/inputText"));

const Loading = lazy(() => import("../loading/loading"));

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const translation = useTranslation();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // State Object For Password Icon Show & Hide
  const [passwordShown, setPasswordShown] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const [userErrors, setUserErrors] = useState({});

  const userDetails = useSelector((state) => state.userLogin, shallowEqual);
  const { loading, error, userInfos } = userDetails;

  const handleInputChange = ({ currentTarget: input }) => {
    // Validation
    const errors = { ...userErrors }; //First clone the existing errors
    const errorMessage = validateProperty(input, "", true);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setUserErrors(errors);

    // After Validation Success, Get Input Field Values
    const userDetail = { ...userData };
    userDetail[input.name] = input.value;
    setUserData(userDetail);
  };

  const validation = () => {
    const errors = {};

    if (userData.email.trim() === "") errors.email = "Please enter email";
    if (userData.password.trim() === "")
      errors.password = "Please enter password";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const errors = validation();
    setUserErrors(errors || {});
    if (errors) return;

    dispatch(login(userData.email, userData.password));
  };

  useEffect(() => {
    if (userInfos) {
      navigate("/buddy-budget/dashboard");
    }
  }, [navigate, userInfos]);

  const { addToast } = useToasts();
  useEffect(() => {
    if (error)
      addToast(error, { appearance: "error", autoDismissTimeout: "6000" });

    return () => {
      delete userDetails.error;
    };
  }, [userDetails, error, addToast]);

  return (
    <>
      <Form className="login-section__form" onSubmit={handleLogin}>
        {loading && <Loading />}
        <InputFormGroup inputLabel={translation.EmailAddress} inputName="email">
          <InputText
            inputName="email"
            inputType="email"
            placeholderName={translation.EnterEmailAddress}
            inputErrorMessage={userErrors.email}
            inputChange={handleInputChange}
          />
        </InputFormGroup>
        <InputFormGroup inputLabel={translation.Password} inputName="password">
          <InputText
            inputName="password"
            inputType={passwordShown ? "type" : "password"}
            inputClassName="password-control"
            placeholderName={translation.Enterpassword}
            inputErrorMessage={userErrors.password}
            inputChange={handleInputChange}
          />
          <span
            className={`password-icon ${
              passwordShown ? "show-password" : "hide-password"
            }`}
            onClick={handlePasswordVisibility}
          ></span>
        </InputFormGroup>
        <div className="form-group mt-5" style={{ textAlign: "right" }}>
          <button type="submit" className="btn btn-primary">
            {translation.Login}
          </button>
        </div>
        <div className="form-group mt-4" style={{ textAlign: "right" }}>
          <Link to="/buddy-budget/user/forgot-password">
            {translation.ForgotPassword}?
          </Link>
        </div>
        <div className="form-group mt-4" style={{ textAlign: "right" }}>
          {translation.NewUser} ?{" "}
          <Link to="/register">{translation.Register}</Link>
        </div>
      </Form>
    </>
  );
};

export default Login;
