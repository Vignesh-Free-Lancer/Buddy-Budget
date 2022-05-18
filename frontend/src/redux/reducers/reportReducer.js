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

// Reducer For Get Salary Reports
export const getSalaryReportsReducer = (state = {}, action) => {
  switch (action.type) {
    case SALARY_REPORTS_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SALARY_REPORTS_CREATE_SUCCESS:
      return {
        loading: false,
        salaryReports: action.payload,
      };
    case SALARY_REPORTS_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer For Get Expense Reports
export const getExpenseReportsReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_REPORTS_CREATE_REQUEST:
      return {
        loading: true,
      };
    case EXPENSE_REPORTS_CREATE_SUCCESS:
      return {
        loading: false,
        expenseReports: action.payload,
      };
    case EXPENSE_REPORTS_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer For Get Grocery Reports
export const getGroceryReportsReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERY_REPORTS_CREATE_REQUEST:
      return {
        loading: true,
      };
    case GROCERY_REPORTS_CREATE_SUCCESS:
      return {
        loading: false,
        groceryReports: action.payload,
      };
    case GROCERY_REPORTS_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
