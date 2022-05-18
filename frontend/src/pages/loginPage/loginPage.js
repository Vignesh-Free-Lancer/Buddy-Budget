import React, { lazy } from "react";
import "./login-page.scss";
import useTranslation from "../../hooks/translation";

const MainScreen = lazy(() => import("../../components/mainScreen/mainScreen"));
const Login = lazy(() => import("../../components/login/login"));

const LoginPage = () => {
  const translation = useTranslation();

  return (
    <MainScreen title={translation.Login}>
      <div className="login-section">
        <Login />
      </div>
    </MainScreen>
  );
};

export default LoginPage;
