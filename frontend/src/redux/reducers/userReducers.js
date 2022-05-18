import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  USER_REGISTRAION_REQUEST,
  USER_REGISTRAION_SUCCESS,
  USER_REGISTRAION_FAILURE,
  USER_PASSWORDRESET_REQUEST,
  USER_PASSWORDRESET_SUCCESS,
  USER_PASSWORDRESET_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_EMAIL_ACTIVATE_REQUEST,
  USER_EMAIL_ACTIVATE_SUCCESS,
  USER_EMAIL_ACTIVATE_FAILURE,
  USER_FORGOTPASSWORD_REQUEST,
  USER_FORGOTPASSWORD_SUCCESS,
  USER_FORGOTPASSWORD_FAILURE,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfos: action.payload,
      };
    case USER_LOGIN_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTRAION_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTRAION_SUCCESS:
      return {
        loading: false,
        userDatas: action.payload,
      };
    case USER_REGISTRAION_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userEmailAccountActivateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EMAIL_ACTIVATE_REQUEST:
      return {
        loading: true,
      };
    case USER_EMAIL_ACTIVATE_SUCCESS:
      return {
        loading: false,
        userInfos: action.payload,
      };
    case USER_EMAIL_ACTIVATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userPasswordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORDRESET_REQUEST:
      return {
        loading: true,
      };
    case USER_PASSWORDRESET_SUCCESS:
      return {
        loading: false,
        userDatas: action.payload,
      };
    case USER_PASSWORDRESET_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOTPASSWORD_REQUEST:
      return {
        loading: true,
      };
    case USER_FORGOTPASSWORD_SUCCESS:
      return {
        loading: false,
        userForgotPassword: action.payload,
      };
    case USER_FORGOTPASSWORD_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userListsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USER_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        updateUser: action.payload,
      };
    case USER_UPDATE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        userDeleted: action.payload,
      };
    case USER_DELETE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
