import axios from "axios";

import {
  FEEDBACK_CREATE_REQUEST,
  FEEDBACK_CREATE_SUCCESS,
  FEEDBACK_CREATE_FAILURE,
  FEEDBACK_LISTS_REQUEST,
  FEEDBACK_LISTS_SUCCESS,
  FEEDBACK_LISTS_FAILURE,
} from "../../redux/constants/feedbackConstants";

export const addFeedbackDataActions =
  (
    satisfication,
    usageDuration,
    usageTime,
    usageInFuture,
    referral,
    feedbackComments
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: FEEDBACK_CREATE_REQUEST });

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
        "/houseBudget/feedback",
        {
          satisfication,
          usageDuration,
          usageTime,
          usageInFuture,
          referral,
          feedbackComments,
        },
        config
      );

      dispatch({ type: FEEDBACK_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FEEDBACK_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getFeedbackListsAction = () => async (dispatch) => {
  try {
    dispatch({ type: FEEDBACK_LISTS_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get("/houseBudget/feedback/lists", config);

    dispatch({ type: FEEDBACK_LISTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FEEDBACK_LISTS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
