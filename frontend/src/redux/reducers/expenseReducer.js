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

// Reducer For Add Expense Detail
export const addExpenseDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_DETAIL_CREATE_REQUEST:
      return {
        loading: true,
      };
    case EXPENSE_DETAIL_CREATE_SUCCESS:
      return {
        loading: false,
        expenseInfos: action.payload,
      };
    case EXPENSE_DETAIL_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer For Get Expense Detail Lists
export const expenseDetailListsReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_LISTS_CREATE_REQUEST:
      return {
        loading: true,
      };
    case EXPENSE_LISTS_CREATE_SUCCESS:
      return {
        loading: false,
        expenseLists: action.payload,
      };
    case EXPENSE_LISTS_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer For Update Expense Datas
export const expenseDataUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_DETAIL_UPDATE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case EXPENSE_DETAIL_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        expenseUpdate: action.payload,
      };
    case EXPENSE_DETAIL_UPDATE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer For Delete Expense Data
export const expenseDataDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_DETAIL_DELETE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case EXPENSE_DETAIL_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        expenseDelete: action.payload,
      };
    case EXPENSE_DETAIL_DELETE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
