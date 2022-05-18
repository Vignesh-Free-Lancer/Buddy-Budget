import React, { lazy } from "react";
import "./user-profile.scss";
import useTranslation from "../../hooks/translation";

const MainScreen = lazy(() => import("../../components/mainScreen/mainScreen"));
const Profile = lazy(() => import("../../components/profile/userProfile"));

const UserProfile = () => {
  const translation = useTranslation();

  return (
    <MainScreen title={translation.UserProfile}>
      <Profile />
    </MainScreen>
  );
};

export default UserProfile;
