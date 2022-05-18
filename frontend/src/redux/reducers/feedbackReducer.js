import {
  FEEDBACK_CREATE_REQUEST,
  FEEDBACK_CREATE_SUCCESS,
  FEEDBACK_CREATE_FAILURE,
  FEEDBACK_LISTS_REQUEST,
  FEEDBACK_LISTS_FAILURE,
  FEEDBACK_LISTS_SUCCESS,
} from "../../redux/constants/feedbackConstants";

// Reducer For Add Feedback Data
export const addFeedbackDataReducer = (state = {}, action) => {
  switch (action.type) {
    case FEEDBACK_CREATE_REQUEST:
      return {
        loading: true,
      };
    case FEEDBACK_CREATE_SUCCESS:
      return {
        loading: false,
        feedbackData: action.payload,
      };
    case FEEDBACK_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer For Get Feedback Data Lists
export const feedbackDataListsReducer = (state = {}, action) => {
  switch (action.type) {
    case FEEDBACK_LISTS_REQUEST:
      return {
        loading: true,
      };
    case FEEDBACK_LISTS_SUCCESS:
      return {
        loading: false,
        feedbackLists: action.payload,
      };
    case FEEDBACK_LISTS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
