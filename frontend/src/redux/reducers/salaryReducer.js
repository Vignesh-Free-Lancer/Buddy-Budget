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

// Reducer For Add Salary Detail
export const addSalaryDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case SALARY_DETAIL_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SALARY_DETAIL_CREATE_SUCCESS:
      return {
        loading: false,
        salaryData: action.payload,
      };
    case SALARY_DETAIL_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer For Get Salary Detail Lists
export const salaryDetailListsReducer = (state = {}, action) => {
  switch (action.type) {
    case SALARY_DETAIL_LIST_REQUEST:
      return {
        loading: true,
      };
    case SALARY_DETAIL_LIST_SUCCESS:
      return {
        loading: false,
        salaryLists: action.payload,
      };
    case SALARY_DETAIL_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer For Update Salary Detail Lists
export const salaryDataUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SALARY_DETAIL_UPDATE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case SALARY_DETAIL_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        salaryUpdated: action.payload,
      };
    case SALARY_DETAIL_UPDATE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer For Delete Salary Detail Lists
export const salaryDataDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SALARY_DETAIL_DELETE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case SALARY_DETAIL_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        salaryDeleted: action.payload,
      };
    case SALARY_DETAIL_DELETE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
