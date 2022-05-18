import React, { lazy } from "react";
import "./salary-page.scss";
import useTranslation from "../../hooks/translation";

const MainScreen = lazy(() => import("../../components/mainScreen/mainScreen"));
const SalaryInformation = lazy(() =>
  import("../../components/salary/salaryInformation")
);

const SalaryPage = () => {
  const translation = useTranslation();

  return (
    <MainScreen title={translation.SalaryInformation}>
      <div className="salary-info__section">
        <SalaryInformation />
      </div>
    </MainScreen>
  );
};

export default SalaryPage;
