import React, { lazy } from "react";
import "./forgot-password.scss";
import useTranslation from "../../hooks/translation";

const MainScreen = lazy(() => import("../../components/mainScreen/mainScreen"));
const ForgotPassword = lazy(() =>
  import("../../components/forgotPassword/forgotPassword")
);

const ForgotPasswordPage = () => {
  const translation = useTranslation();

  return (
    <MainScreen title={translation.ForgotPassword}>
      <div className="forgot-password__section">
        <ForgotPassword />
      </div>
    </MainScreen>
  );
};

export default ForgotPasswordPage;
