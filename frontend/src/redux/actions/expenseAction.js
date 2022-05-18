import axios from "axios";
import {
  EXPENSE_DETAIL_CREATE_FAILURE,
  EXPENSE_DETAIL_CREATE_REQUEST,
  EXPENSE_DETAIL_CREATE_SUCCESS,
  EXPENSE_DETAIL_DELETE_FAILURE,
  EXPENSE_DETAIL_DELETE_REQUEST,
  EXPENSE_DETAIL_DELETE_SUCCESS,
  EXPENSE_DETAIL_UPDATE_FAILURE,
  EXPENSE_DETAIL_UPDATE_REQUEST,
  EXPENSE_DETAIL_UPDATE_SUCCESS,
  EXPENSE_LISTS_CREATE_FAILURE,
  EXPENSE_LISTS_CREATE_REQUEST,
  EXPENSE_LISTS_CREATE_SUCCESS,
} from "../constants/expenseConstants";

export const addExpenseDetailAction =
  (
    month,
    year,
    particular,
    particularType,
    estimatedCost,
    actualCost,
    paymentType,
    paymentBank,
    paymentDate,
    description
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EXPENSE_DETAIL_CREATE_REQUEST });

      const {
        userLogin: { userInfos },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfos.token}`,
        },
      };

      const { data } = await axios.post(
        "/houseBudget/expense",
        {
          month,
          year,
          particular,
          particularType,
          estimatedCost,
          actualCost,
          paymentType,
          paymentBank,
          paymentDate,
          description,
        },
        config
      );

      dispatch({ type: EXPENSE_DETAIL_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXPENSE_DETAIL_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getExpenseListsAction =
  (type, month, year) => async (dispatch, getState) => {
    try {
      // let newDate = new Date();
      // if (month === "select" || month === "") month = newDate.getMonth() + 1;
      // // month = newDate.toLocaleString("en-us", { month: "short" });
      // if (year === "select" || year === "") year = newDate.getFullYear();

      let PreviousMonth = 0,
        previousYear = 0;

      if (type === "new") {
        PreviousMonth = month - 1 === 0 ? 12 : month - 1;
        previousYear = PreviousMonth === 12 ? year - 1 : year;

        month = PreviousMonth;
        year = previousYear;
      }

      dispatch({ type: EXPENSE_LISTS_CREATE_REQUEST });

      const {
        userLogin: { userInfos },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfos.token}`,
        },
      };

      const { data } = await axios.get(
        `/houseBudget/expense/lists/${type}/${year}/${month}`,
        config
      );

      dispatch({ type: EXPENSE_LISTS_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXPENSE_LISTS_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateExpenseDataById =
  (
    expenseId,
    month,
    year,
    particular,
    particularType,
    estimatedCost,
    actualCost,
    paymentType,
    paymentBank,
    paymentDate,
    description
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EXPENSE_DETAIL_UPDATE_REQUEST });

      const {
        userLogin: { userInfos },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfos.token}`,
        },
      };

      const { data } = await axios.put(
        `/houseBudget/expense/${expenseId}`,
        {
          month,
          year,
          particular,
          particularType,
          estimatedCost,
          actualCost,
          paymentType,
          paymentBank,
          paymentDate,
          description,
        },
        config
      );

      dispatch({ type: EXPENSE_DETAIL_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXPENSE_DETAIL_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteExpenseData = (expenseId) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_DETAIL_DELETE_REQUEST });

    const {
      userLogin: { userInfos },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfos.token}`,
      },
    };

    const { data } = await axios.delete(
      `/houseBudget/expense/${expenseId}`,
      config
    );

    dispatch({ type: EXPENSE_DETAIL_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXPENSE_DETAIL_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
