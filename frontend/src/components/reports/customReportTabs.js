import React, { lazy, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import useTranslation from "../../hooks/translation";

const SalaryReport = lazy(() => import("./salaryReports/salaryReport"));
const ExpenseReport = lazy(() => import("./expenseReports/expenseReport"));
const GroceryReport = lazy(() => import("./groceryReports/groceryReport"));

const CustomReports = () => {
  const translation = useTranslation();

  // State Object For Active Tab Control
  const [activeTab, setActiveTab] = useState("salary-tab");

  // Event For Handling Tab Selection
  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <div className="reports-section__custom-reports">
      <Tabs
        className="reports-section__custom-reports__tab"
        transition={true}
        id="custom-reports-tab"
        activeKey={activeTab}
        onSelect={handleTabSelect}
      >
        <Tab eventKey="salary-tab" title={translation.SalaryReport}>
          <SalaryReport />
        </Tab>
        <Tab eventKey="expense-tab" title={translation.ExpenseReport}>
          <ExpenseReport />
        </Tab>
        <Tab eventKey="grocery-tab" title={translation.GroceryReport}>
          <GroceryReport />
        </Tab>
      </Tabs>
    </div>
  );
};

export default CustomReports;
