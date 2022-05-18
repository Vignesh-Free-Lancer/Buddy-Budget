import React, { lazy } from "react";
import "./salary-list.scss";
import useTranslation from "../../hooks/translation";

const MainScreen = lazy(() => import("../../components/mainScreen/mainScreen"));
const SalaryInformationLists = lazy(() =>
  import("../../components/salary/salaryInformationLists")
);

const SalaryListviewPage = () => {
  const translation = useTranslation();

  return (
    <MainScreen title={translation.SalaryInformationLists}>
      <div className="salary-listview__section">
        <SalaryInformationLists />
      </div>
    </MainScreen>
  );
};

export default SalaryListviewPage;
