import React, { lazy } from "react";
import "./reports-page.scss";
import useTranslation from "../../hooks/translation";

const MainScreen = lazy(() => import("../../components/mainScreen/mainScreen"));
const CustomReports = lazy(() =>
  import("../../components/reports/customReportTabs")
);

const ReportsPage = () => {
  const translation = useTranslation();

  return (
    <MainScreen title={translation.CustomReports}>
      <div className="reports-section">
        <CustomReports />
      </div>
    </MainScreen>
  );
};

export default ReportsPage;
