import React, { useEffect } from "react";
import { Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import useTranslation from "../../hooks/translation";
import DashboardCard from "../common/dashboardCard";
import { numberFormat } from "../../utils/common";

import { getAllUsers } from "../../redux/actions/userActions";
import { getSalaryDetailListsAction } from "../../redux/actions/salaryActions";
import { getExpenseListsAction } from "../../redux/actions/expenseAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const translation = useTranslation();

  const userDetails = useSelector((state) => state.userLogin);
  const { userInfos } = userDetails;

  // Get User Records
  const { users } = useSelector((state) => state.userLists);

  // Get Salary Records
  const { salaryLists } = useSelector((state) => state.salaryDetailLists);

  // Get Expense Records
  const { expenseLists } = useSelector((state) => state.expenseDetailLists);

  // Get Method For User Records
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, userInfos]);

  // Get Method For Salary Records
  useEffect(() => {
    dispatch(getSalaryDetailListsAction());
  }, [dispatch]);

  // Get Method For Expense Records
  useEffect(() => {
    const getExpenseLists = (month, year) => {
      dispatch(getExpenseListsAction("exist", month, year));
    };

    const currDate = new Date();
    const lastMonth = currDate.getMonth();
    const currYear = currDate.getFullYear();

    getExpenseLists(lastMonth, currYear);
  }, [dispatch]);

  return (
    <>
      <Row>
        <DashboardCard
          linkAddr="/buddy-budget/user/lists"
          dashboardCategory="user-card"
          dashboardTitle={translation.User}
          dashboardLabel={translation.ActiveUsers}
          dashboardValues={users && users.totalLength}
        />

        <DashboardCard
          linkAddr="/buddy-budget/salary/lists"
          dashboardCategory="salary-card"
          dashboardTitle={translation.Salary}
          dashboardLabel={translation.LastMonthSalary}
          dashboardValues={
            salaryLists && salaryLists.totalLength > 0
              ? numberFormat(
                  salaryLists.lastMonthSalary.map((item) => item.netPayAmount)
                )
              : numberFormat(0)
          }
        />

        <DashboardCard
          linkAddr="/buddy-budget/expenses"
          dashboardCategory="expense-card"
          dashboardTitle={translation.Expenses}
          dashboardLabel={translation.LastMonthExpense}
          dashboardValues={
            expenseLists && numberFormat(expenseLists.currentMonthExpenseCost)
          }
        />

        <DashboardCard
          linkAddr="/buddy-budget/reports"
          dashboardCategory="reports-card"
          dashboardTitle={translation.Reports}
          dashboardLabel={translation.GetCustomReports}
        />
      </Row>
    </>
  );
};

export default Dashboard;
