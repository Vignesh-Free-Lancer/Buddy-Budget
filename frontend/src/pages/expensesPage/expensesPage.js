import React, { lazy } from "react";
import "./expense-page.scss";
import useTranslation from "../../hooks/translation";

const MainScreen = lazy(() => import("../../components/mainScreen/mainScreen"));
const Expenses = lazy(() => import("../../components/expesnes/expenses"));

const ExpensesPage = () => {
  const translation = useTranslation();

  return (
    <MainScreen title={translation.Expenses}>
      <div className="expense-info__section">
        <Expenses />
      </div>
    </MainScreen>
  );
};

export default ExpensesPage;
