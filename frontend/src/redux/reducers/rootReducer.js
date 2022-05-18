import { combineReducers } from "redux";
import { USER_LOGOUT } from "../constants/userConstants";

// Import User Reducer
import {
  userLoginReducer,
  userRegisterReducer,
  userEmailAccountActivateReducer,
  userPasswordResetReducer,
  userForgotPasswordReducer,
  userListsReducer,
  userUpdateReducer,
  userDeleteReducer,
} from "../reducers/userReducers";

// Import Salary Reducer
import {
  addSalaryDetailReducer,
  salaryDetailListsReducer,
  salaryDataUpdateReducer,
  salaryDataDeleteReducer,
} from "../reducers/salaryReducer";

// Import Expense Reducer
import {
  addExpenseDetailReducer,
  expenseDataDeleteReducer,
  expenseDataUpdateReducer,
  expenseDetailListsReducer,
} from "./expenseReducer";

// Import Grocery Reducer
import {
  addGroceryItemReducer,
  groceryItemUpdateReducer,
  groceryItemDeleteReducer,
  groceryItemListsReducer,
} from "./groceryReducer";

// Import Reports Reducer
import {
  getExpenseReportsReducer,
  getGroceryReportsReducer,
  getSalaryReportsReducer,
} from "./reportReducer";

// Import Feedback Reducer
import {
  addFeedbackDataReducer,
  feedbackDataListsReducer,
} from "../reducers/feedbackReducer";

const appReducer = combineReducers({
  userLogin: userLoginReducer,
  userData: userRegisterReducer,
  userEmailAccountActivate: userEmailAccountActivateReducer,
  userPasswordReset: userPasswordResetReducer,
  userForgotPassword: userForgotPasswordReducer,
  userLists: userListsReducer,
  userUpdate: userUpdateReducer,
  userDeleteData: userDeleteReducer,

  salaryDetailData: addSalaryDetailReducer,
  salaryDetailLists: salaryDetailListsReducer,
  salaryUpdatedData: salaryDataUpdateReducer,
  salaryDeleteData: salaryDataDeleteReducer,

  expenseDetailData: addExpenseDetailReducer,
  expenseDetailLists: expenseDetailListsReducer,
  expenseUpdateData: expenseDataUpdateReducer,
  expenseDeleteData: expenseDataDeleteReducer,

  groceryItemData: addGroceryItemReducer,
  groceryItemUpdateData: groceryItemUpdateReducer,
  groceryItemDeleteData: groceryItemDeleteReducer,
  groceryItemLists: groceryItemListsReducer,

  salaryReportsData: getSalaryReportsReducer,
  expenseReportsData: getExpenseReportsReducer,
  groceryReportsData: getGroceryReportsReducer,

  feedbackData: addFeedbackDataReducer,
  feedbackLists: feedbackDataListsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
