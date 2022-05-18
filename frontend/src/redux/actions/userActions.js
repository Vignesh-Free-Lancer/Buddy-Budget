import axios from "axios";
import {
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_EMAIL_ACTIVATE_FAILURE,
  USER_EMAIL_ACTIVATE_REQUEST,
  USER_EMAIL_ACTIVATE_SUCCESS,
  USER_FORGOTPASSWORD_FAILURE,
  USER_FORGOTPASSWORD_REQUEST,
  USER_FORGOTPASSWORD_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PASSWORDRESET_FAILURE,
  USER_PASSWORDRESET_REQUEST,
  USER_PASSWORDRESET_SUCCESS,
  USER_REGISTRAION_FAILURE,
  USER_REGISTRAION_REQUEST,
  USER_REGISTRAION_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post("/login", { email, password }, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfos", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logOut = () => async (dispatch) => {
  localStorage.removeItem("userInfos");
  dispatch({ type: USER_LOGOUT });
};

export const registerUser =
  (userName, email, password, gender, dob, pic, isActive) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTRAION_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/user/profile",
        { userName, email, password, gender, dob, pic, isActive },
        config
      );

      dispatch({ type: USER_REGISTRAION_SUCCESS, payload: data });

      // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      // localStorage.setItem("userInfos", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTRAION_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userEmailAccountActivate = (token) => async (dispatch) => {
  try {
    dispatch({ type: USER_EMAIL_ACTIVATE_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(`/user/verify-email/${token}`, config);

    dispatch({ type: USER_EMAIL_ACTIVATE_SUCCESS, payload: data });
    localStorage.setItem("userInfos", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_EMAIL_ACTIVATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const passwordResetUser =
  (userId, oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: USER_PASSWORDRESET_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/user/reset-password/${userId}`,
        { oldPassword, newPassword },
        config
      );

      dispatch({ type: USER_PASSWORDRESET_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_PASSWORDRESET_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userForgotPasswordAction =
  (userEmail, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: USER_FORGOTPASSWORD_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/user/forgot-password/${userEmail}`,
        { newPassword },
        config
      );

      dispatch({ type: USER_FORGOTPASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_FORGOTPASSWORD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfos },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfos.token}`,
      },
    };

    const { data } = await axios.get("/user/lists", config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserById =
  (userId, userName, email, gender, dob, pic, isActive) => async (dispatch) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/user/${userId}`,
        { userName, email, gender, dob, pic, isActive },
        config
      );

      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.delete(`/user/${userId}`, config);

    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
