import React, { lazy } from "react";
import "./password-reset.scss";

const MainScreen = lazy(() => import("../../components/mainScreen/mainScreen"));
const ResetPassword = lazy(() =>
  import("../../components/resetPassword/resetPassword")
);

const PasswordResetPage = () => {
  return (
    <MainScreen title="Reset Password">
      <div className="reset-password__section">
        <ResetPassword />
      </div>
    </MainScreen>
  );
};

export default PasswordResetPage;
