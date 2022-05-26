import React, { lazy, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import useTranslation from "../../hooks/translation";

import {
  validateProperty,
  validateAllField,
  minAge,
  maxAge,
} from "../../utils/common";

import { deleteUser, updateUserById } from "../../redux/actions/userActions";

const FormNavigation = lazy(() => import("../common/formNavigation"));
const InputFormGroup = lazy(() => import("../common/inputFormGroup"));
const InputText = lazy(() => import("../common/inputText"));
const InputRadio = lazy(() => import("../common/inputRadio"));
const InputCheckbox = lazy(() => import("../common/inputCheckbox"));

const Loading = lazy(() => import("../loading/loading"));
const ConfirmationWindow = lazy(() => import("../common/confirmationWindow"));

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translation = useTranslation();

  const { userId } = useParams();

  const { userInfos } = useSelector((state) => state.userLogin);

  const updatedUserData = useSelector((state) => state.userUpdate);
  const { loading, error, updateUser } = updatedUserData;

  const { addToast } = useToasts();
  useEffect(() => {
    if (error) addToast(error, { appearance: "error" });

    if (updateUser && updateUser.message)
      addToast(updateUser.message, { appearance: "success" });

    return () => {
      delete updatedUserData.error;
      delete updatedUserData.updateUser;
    };
  }, [updatedUserData, error, updateUser, addToast]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/user/${userId}`);
      setUserData(data.user);
      setUserDob(new Date(data.user.dob));
    };
    fetchUser();
  }, [userId]);

  // State Object For User Profile Data
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    gender: "",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    isActive: true,
  });

  // State Object For DOB Field
  const [userDob, setUserDob] = useState("");

  // State Object For Image Upload Status
  const [uploadStatus, setUploadStatus] = useState("");

  // State Object For Handling Error Message Based On Field Name
  const [userErrors, setUserErrors] = useState({});

  // Input Field On Change Function
  const handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...userErrors }; //First clone the existing errors
    const errorMessage = validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setUserErrors(errors);

    // After Input Field Validation Success, Assign Input Value To State Object
    const userDetail = { ...userData };
    userDetail[input.name] = input.value;
    setUserData(userDetail);
  };

  const fileUploadChange = (pic) => {
    const errors = { ...userErrors }; //First clone the existing errors
    if (pic !== undefined && pic) {
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
          .then((response) => response.json())
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
      delete errors.pic;
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

  // Update Existing User Data When Click On Update Button (Form Submit)
  const handleUpdateUser = (e) => {
    e.preventDefault();
    let profileImage = "optional";

    const errors = validateAllField(
      userData,
      userDob,
      profileImage,
      uploadStatus
    );
    setUserErrors(errors || {});
    if (errors) return;

    dispatch(
      updateUserById(
        userId,
        userData.userName,
        userData.email,
        userData.gender,
        userDob,
        userData.pic,
        userData.isActive
      )
    );

    // navigate("/buddy-budget/user/lists");
  };

  // const handleDeleteUser = (e) => {
  //   e.preventDefault();

  //   if (window.confirm("Are you sure want to delete?")) {
  //     if (userId.toString() !== (userInfos && userInfos.userId.toString())) {
  //       dispatch(deleteUser(userId, !userData.isActive));
  //       navigate("/buddy-budget/user/lists");
  //     } else {
  //       if (userInfos.isAdmin) {
  //         alert("Logged in user account, Not able to perform");
  //       } else {
  //         dispatch(deleteUser(userId, !userData.isActive));
  //         // localStorage.setItem("expiredData", JSON.stringify(userInfos));
  //         dispatch(logOut());
  //         navigate(`/buddy-budget/thanks`);
  //       }
  //     }
  //   }
  // };

  // State Object For Delete Pop-Up
  const [openModal, setOpenModal] = useState(false);

  const openModalWindow = () => {
    setOpenModal(true);
  };

  const closeModalWindow = () => {
    setOpenModal(false);
  };

  const confirmedDelete = () => {
    setOpenModal(false);
    if (userId.toString() !== (userInfos && userInfos.userId.toString())) {
      dispatch(deleteUser(userId, !userData.isActive));
      navigate("/buddy-budget/user/lists");
    } else {
      if (userInfos.isAdmin) {
        alert("Logged in user account, Not able to perform");
      } else {
        dispatch(deleteUser(userId));
        navigate(`/buddy-budget/thanks`);
        // dispatch(logOut());
      }
    }
  };

  return (
    <>
      <div className="user-profile__section">
        {loading && <Loading />}

        <FormNavigation
          module="user"
          newNavLink="/register"
          listviewLink="/buddy-budget/user/lists"
        />
        <Row>
          <Col xl={9} lg={9} md={8} sm={12} xs={12}>
            <Form className="user-profile__form" onSubmit={handleUpdateUser}>
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
                  inputValue={userData.email}
                  inputDisableOption="true"
                />
              </InputFormGroup>

              <InputFormGroup
                inputLabel={translation.Gender}
                inputName="gender"
              >
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
                  className={`form-control ${
                    userErrors.dob ? "is-invalid" : ""
                  }`}
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
                  inputDisabled={!userInfos.isAdmin}
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

              <div className="form-group mt-5" style={{ textAlign: "right" }}>
                <button type="submit" className="btn btn-success me-3">
                  {translation.Update}
                </button>
                <button
                  type="button"
                  className="btn btn-danger float-right"
                  style={{
                    display: userInfos.isAdmin ? "inline-block" : "none",
                  }}
                  // onClick={handleDeleteUser}
                  onClick={openModalWindow}
                >
                  {translation.Delete}
                </button>
                <span
                  className="mt-3 image-status"
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
            </Form>
          </Col>
          <Col xl={3} lg={3} md={4} sm={12} xs={12}>
            <div className="user-profile__pic">
              <h6>{translation.ProfilePicture}</h6>
              <img src={userData.pic} alt="Profile Pic" />
              <span className="user-profile__upload-status mt-3">
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
              <span className="user-profile__error-message mt-3">
                {userErrors.pic}
              </span>
            </div>
            <div className="user-profile__reset-password">
              {translation.DoYouWantTo}{" "}
              <Link to={`/buddy-budget/user/reset-password/${userId}`}>
                {translation.ChangePassword}
              </Link>{" "}
              ?
            </div>
            <div
              className="user-profile__delete-account"
              style={{ display: userInfos.isAdmin ? "none" : "block" }}
            >
              <button
                type="button"
                className="btn btn-danger me-3"
                // onClick={handleDeleteUser}
                onClick={openModalWindow}
              >
                Delete Account
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <ConfirmationWindow
        showModal={openModal}
        closeModal={closeModalWindow}
        confirmDelete={confirmedDelete}
        confirmMessage={`${translation.AreYouSureYouWantDeleteUser} -`}
        confirmMessageValue={`${userInfos && userInfos.userName}`}
      />
    </>
  );
};

export default Profile;
