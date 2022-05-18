import React, { lazy } from "react";
import "./dashboard-page.scss";
import useTranslation from "../../hooks/translation";

const MainScreen = lazy(() => import("../../components/mainScreen/mainScreen"));
const Dashboard = lazy(() => import("../../components/dashboard/dashboard"));

const DashboardPage = () => {
  const translation = useTranslation();

  return (
    <MainScreen title={translation.Dashboard}>
      <div className="dashboard-section">
        <Dashboard />
      </div>
    </MainScreen>
  );
};

export default DashboardPage;
