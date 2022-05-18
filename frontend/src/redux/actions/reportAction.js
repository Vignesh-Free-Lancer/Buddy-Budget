import axios from "axios";
import {
  SALARY_REPORTS_CREATE_REQUEST,
  SALARY_REPORTS_CREATE_SUCCESS,
  SALARY_REPORTS_CREATE_FAILURE,
  EXPENSE_REPORTS_CREATE_REQUEST,
  EXPENSE_REPORTS_CREATE_SUCCESS,
  EXPENSE_REPORTS_CREATE_FAILURE,
  GROCERY_REPORTS_CREATE_REQUEST,
  GROCERY_REPORTS_CREATE_SUCCESS,
  GROCERY_REPORTS_CREATE_FAILURE,
} from "../constants/reportConstants";

// Get Salary Report Action
export const getSalaryReportAction =
  (selectedType = "select", year = "", month = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SALARY_REPORTS_CREATE_REQUEST });

      const {
        userLogin: { userInfos },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfos.token}`,
          selectedType: selectedType,
          inputYear: year,
          inputMonth: month,
        },
      };

      const { data } = await axios.get(`/houseBudget/reports/salary`, config);

      dispatch({ type: SALARY_REPORTS_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SALARY_REPORTS_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Get Expense Report Action
export const getExpenseReportAction =
  (selectedType = "select", year = "", month = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EXPENSE_REPORTS_CREATE_REQUEST });

      const {
        userLogin: { userInfos },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfos.token}`,
          selectedType: selectedType,
          inputYear: year,
          inputMonth: month,
        },
      };

      const { data } = await axios.get(`/houseBudget/reports/expense`, config);

      dispatch({ type: EXPENSE_REPORTS_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXPENSE_REPORTS_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Get Grocery Report Action
export const getGroceryReportAction =
  (selectedType = "select", year = "", month = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GROCERY_REPORTS_CREATE_REQUEST });

      const {
        userLogin: { userInfos },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfos.token}`,
          selectedType: selectedType,
          inputYear: year,
          inputMonth: month,
        },
      };

      const { data } = await axios.get(`/houseBudget/reports/grocery`, config);

      dispatch({ type: GROCERY_REPORTS_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GROCERY_REPORTS_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
