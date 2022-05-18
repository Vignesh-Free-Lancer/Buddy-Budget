import React, { lazy, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import InputFormGroup from "../common/inputFormGroup";
import InputText from "../common/inputText";
import InputRadio from "../common/inputRadio";
import InputCheckbox from "../common/inputCheckbox";

import useTranslation from "../../hooks/translation";
import {
  validateProperty,
  validateAllField,
  minAge,
  maxAge,
} from "../../utils/common";

import { registerUser } from "../../redux/actions/userActions";

const Loading = lazy(() => import("../loading/loading"));

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translation = useTranslation();

  // const { userInfos } = useSelector((state) => state.userLogin);
  const userDetails = useSelector((state) => state.userData);
  const { loading, error, userDatas } = userDetails;
  // const { loading, error, userDatas } = useSelector((state) => state.userData);

  // useEffect(() => {
  //   if (userInfos === null || userInfos === undefined) {
  //     navigate("/register");
  //   } else {
  //     userInfos.isAdmin
  //       ? navigate("/register")
  //       : navigate("/buddy-budget/dashboard");
  //   }
  // }, [navigate, userInfos]);

  useEffect(() => {
    if (userDatas && !userDatas.isEmailVerified) {
      navigate(`/buddy-budget/user/verify-email/${userDatas.email}`);
    }
  }, [userDatas, navigate]);

  // State Object For Registration Data
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    isActive: true,
  });

  // State Object For DOB Field
  const [userDob, setUserDob] = useState("");

  // State Object Profile Image Upload Option
  const [profileImage, setProfileImage] = useState("");

  // State Object For Image Upload Status
  const [uploadStatus, setUploadStatus] = useState("");

  // State Object For Password Icon Show & Hide
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  // State Object For Handling Error Message Based On Field Name
  const [userErrors, setUserErrors] = useState({});

  // Input Field On Change Function
  const handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...userErrors }; //First clone the existing errors
    const errorMessage = validateProperty(input, userData.password);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setUserErrors(errors);

    // After Input Field Validation Success, Assign Input Value To State Object
    const userDetail = { ...userData };
    userDetail[input.name] = input.value;
    setUserData(userDetail);
  };

  const fileUploadChange = async (pic) => {
    const errors = { ...userErrors }; //First clone the existing errors
    if (
      pic !== undefined &&
      pic &&
      userData.pic ===
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      if (pic.type === "image/jpeg" || pic.type === "image/png") {
        delete errors["pic"];
        setUserErrors(errors);
        setUploadStatus(translation.PleaseWaitImageUploading);

        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "house-budget");
        data.append("cloud_name", "silentkiller");

        fetch("https://api.cloudinary.com/v1_1/silentkiller/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            const userDetail = { ...userData };
            userDetail.pic = data.url.toString();
            setUserData(userDetail);
            setUploadStatus(translation.ImageUploadedSuccessfully);
          })
          .catch((error) => {
            setUploadStatus("");
            const errors = { ...userErrors };
            const errorMessage = translation.ServerErrorImageUpload;
            if (errorMessage) errors["pic"] = errorMessage;
            setUserErrors(errors);
            if (errors) return;
          });
      } else {
        setUploadStatus("");
        const errorMessage = translation.PleaseSelectAnImage;

        if (errorMessage) errors["pic"] = errorMessage;
        setUserErrors(errors);
        if (errors) return;
      }
    } else {
      setUploadStatus("");
      const errorMessage = translation.PleaseUploadProfilePicture;

      if (errorMessage) errors["pic"] = errorMessage;
      setUserErrors(errors);
    }
  };

  // Handle The Date Field On Change Function
  const handleDateChange = (date) => {
    setUserDob(date);
    date === null
      ? (userErrors.dob = "Please select dob")
      : delete userErrors.dob;
  };

  // Handle User Status On Change Funciton
  const handleStatusChange = (e) => {
    const userDetail = { ...userData };
    userDetail[e.target.name] = e.target.checked;
    setUserData(userDetail);
    delete userErrors.isActive;
  };

  // Register New User When Click On Register Button (Form Submit)
  const handleRegisterUser = async (e) => {
    e.preventDefault();

    const errors = validateAllField(
      userData,
      userDob,
      profileImage,
      uploadStatus
    );
    setUserErrors(errors || {});
    if (errors) return;

    dispatch(
      registerUser(
        userData.userName,
        userData.email,
        userData.password,
        userData.gender,
        userDob,
        userData.pic,
        userData.isActive
      )
    );
  };

  const { addToast } = useToasts();
  useEffect(() => {
    if (error)
      addToast(error, { appearance: "error", autoDismissTimeout: "5000" });

    return () => {
      delete userDetails.error;
    };
  }, [userDetails, error, addToast]);

  return (
    <div className="registration-section">
      {loading && <Loading />}
      {/* {error && (
        <CustomToastComponent appearance="error">{error}</CustomToastComponent>
      )} */}

      <Row>
        <Col xl={9} lg={9} md={8} sm={12} xs={12}>
          <Form
            className="registration-section__form"
            onSubmit={handleRegisterUser}
          >
            <InputFormGroup
              inputLabel={translation.Username}
              inputName="userName"
            >
              <InputText
                inputName="userName"
                inputType="text"
                placeholderName={translation.EnterUsername}
                inputErrorMessage={userErrors.userName}
                inputChange={handleInputChange}
                inputValue={userData.userName}
              />
            </InputFormGroup>

            <InputFormGroup
              inputLabel={translation.EmailAddress}
              inputName="email"
            >
              <InputText
                inputName="email"
                inputType="email"
                placeholderName={translation.EnterEmailAddress}
                inputErrorMessage={userErrors.email}
                inputChange={handleInputChange}
              />
            </InputFormGroup>

            <InputFormGroup
              inputLabel={translation.Password}
              inputName="password"
            >
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
              />
              <span
                className={`password-icon ${
                  confirmPasswordShown ? "show-password" : "hide-password"
                }`}
                onClick={handleConfirmPasswordVisibility}
              ></span>
            </InputFormGroup>

            <InputFormGroup inputLabel={translation.Gender} inputName="gender">
              <InputRadio
                inputRadioType="form-check-inline"
                inputLabel={translation.Male}
                inputName="gender"
                inputId="rdMale"
                inputErrorMessage={userErrors.gender}
                inputValue="Male"
                inputChange={handleInputChange}
                inputDataValue={userData.gender}
              />
              <InputRadio
                inputRadioType="form-check-inline"
                inputLabel={translation.Female}
                inputName="gender"
                inputId="rdFemale"
                inputErrorMessage={userErrors.gender}
                inputValue="Female"
                inputChange={handleInputChange}
                inputDataValue={userData.gender}
              />
              <div
                className="invalid-feedback"
                style={{ display: userErrors.gender ? "block" : "none" }}
              >
                {userErrors.gender}
              </div>
            </InputFormGroup>

            <InputFormGroup inputLabel={translation.DOB} inputName="dob">
              <DatePicker
                name="dob"
                dateFormat="dd/MM/yyyy"
                className={`form-control ${userErrors.dob ? "is-invalid" : ""}`}
                placeholderText={translation.PleaseSelectDob}
                selected={userDob}
                onChange={handleDateChange}
                minDate={maxAge}
                maxDate={minAge}
                showDisabledMonthNavigation
                value={userDob}
              />
              <div
                className="invalid-feedback"
                style={{ display: userErrors.dob ? "block" : "none" }}
              >
                {userErrors.dob}
              </div>
            </InputFormGroup>

            <InputFormGroup
              inputLabel={translation.Status}
              inputName="isActive"
            >
              <InputCheckbox
                inputCheckboxType="form-switch"
                inputName="isActive"
                inputId="chkUserStatus"
                inputErrorMessage={userErrors.isActive}
                inputValue={userData.isActive}
                inputChange={handleStatusChange}
                inputDisabled={true}
              />
              <div
                className="invalid-feedback"
                style={{
                  display: userErrors.isActive ? "inline-block" : "none",
                }}
              >
                {userErrors.isActive}
              </div>
            </InputFormGroup>

            <div className="form-group mt-4" style={{ textAlign: "right" }}>
              <button type="submit" className="btn btn-primary">
                {translation.Register}
              </button>
              <span
                className="mt-3 registration-section__profile-image-status"
                style={{
                  display:
                    uploadStatus === "Image uploaded successfully"
                      ? "none"
                      : "block",
                }}
              >
                {userErrors.uploadMessage}
              </span>
            </div>

            <div className="form-group mt-4" style={{ textAlign: "right" }}>
              {translation.HaveAnAccount} ?{" "}
              <Link to="/login">{translation.Login}</Link>
            </div>
          </Form>
        </Col>
        <Col xl={3} lg={3} md={4} sm={12} xs={12}>
          <div className="registration-section__profile-pic">
            <h6>{translation.ProfilePicture}</h6>
            <img src={userData.pic} alt="Profile Pic" />
            <div className="mt-3 registration-section__profile-button">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className="btn default-img"
                  style={{
                    background:
                      profileImage === "default-image" ? "#ced4da" : "#ffffff",
                  }}
                  onClick={() => {
                    setProfileImage("default-image");
                    delete userErrors.pic;
                  }}
                >
                  {translation.DefaultImage}
                </button>
                <button
                  type="button"
                  className="btn upload-img"
                  style={{
                    background:
                      profileImage === "new-image" ? "#0dcaf0" : "#ffffff",
                  }}
                  onClick={() => {
                    setProfileImage("new-image");
                    delete userErrors.pic;
                  }}
                >
                  {translation.UploadNew}
                </button>
              </div>
              <span className="registration-section__profile-error-message mt-3">
                {userErrors.pic}
              </span>
            </div>
            <div
              className="mt-3"
              style={{
                display: profileImage === "new-image" ? "block" : "none",
              }}
            >
              <span className="registration-section__profile-upload-status">
                {uploadStatus}
              </span>
              <div className="upload-img-sec mt-3">
                <input
                  className="form-control"
                  type="file"
                  id="userImage"
                  name="userImage"
                  onChange={(e) => fileUploadChange(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Registration;
