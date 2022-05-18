import React, { lazy } from "react";
import "./registration.scss";
import useTranslation from "../../hooks/translation";

const MainScreen = lazy(() => import("../../components/mainScreen/mainScreen"));
const Registration = lazy(() =>
  import("../../components/registration/registration")
);

const RegistrationPage = () => {
  const translation = useTranslation();

  return (
    <MainScreen title={translation.Registration}>
      <Registration />
    </MainScreen>
  );
};

export default RegistrationPage;
