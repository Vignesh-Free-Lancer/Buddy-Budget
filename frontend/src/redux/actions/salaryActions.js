import axios from "axios";
import {
  SALARY_DETAIL_CREATE_FAILURE,
  SALARY_DETAIL_CREATE_REQUEST,
  SALARY_DETAIL_CREATE_SUCCESS,
  SALARY_DETAIL_DELETE_FAILURE,
  SALARY_DETAIL_DELETE_REQUEST,
  SALARY_DETAIL_DELETE_SUCCESS,
  SALARY_DETAIL_LIST_FAILURE,
  SALARY_DETAIL_LIST_REQUEST,
  SALARY_DETAIL_LIST_SUCCESS,
  SALARY_DETAIL_UPDATE_FAILURE,
  SALARY_DETAIL_UPDATE_REQUEST,
  SALARY_DETAIL_UPDATE_SUCCESS,
} from "../constants/salaryConstants";

export const addSalaryDetails =
  (
    month,
    year,
    monthlySalary,
    bonusAmount,
    otherAllowance,
    totalCR,
    pf,
    incomeTax,
    professionalTax,
    otherDeductions,
    totalDR,
    netPayAmount
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SALARY_DETAIL_CREATE_REQUEST });

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
        "/houseBudget/salary",
        {
          month,
          year,
          monthlySalary,
          bonusAmount,
          otherAllowance,
          totalCR,
          pf,
          incomeTax,
          professionalTax,
          otherDeductions,
          totalDR,
          netPayAmount,
        },
        config
      );

      dispatch({ type: SALARY_DETAIL_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SALARY_DETAIL_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSalaryDetailListsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SALARY_DETAIL_LIST_REQUEST });

    const {
      userLogin: { userInfos },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfos.token}`,
      },
    };

    const { data } = await axios.get("/houseBudget/salary/lists", config);

    dispatch({ type: SALARY_DETAIL_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SALARY_DETAIL_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSalaryDataById =
  (
    salaryId,
    month,
    year,
    monthlySalary,
    bonusAmount,
    otherAllowance,
    totalCR,
    pf,
    incomeTax,
    professionalTax,
    otherDeductions,
    totalDR,
    netPayAmount
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SALARY_DETAIL_UPDATE_REQUEST });

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
        `/houseBudget/salary/${salaryId}`,
        {
          month,
          year,
          monthlySalary,
          bonusAmount,
          otherAllowance,
          totalCR,
          pf,
          incomeTax,
          professionalTax,
          otherDeductions,
          totalDR,
          netPayAmount,
        },
        config
      );

      dispatch({ type: SALARY_DETAIL_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SALARY_DETAIL_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteSalaryData = (salaryId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SALARY_DETAIL_DELETE_REQUEST });

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
      `/houseBudget/salary/${salaryId}`,
      config
    );

    dispatch({ type: SALARY_DETAIL_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SALARY_DETAIL_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
