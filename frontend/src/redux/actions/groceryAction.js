import axios from "axios";
import {
  GROCERY_ITEM_CREATE_REQUEST,
  GROCERY_ITEM_CREATE_SUCCESS,
  GROCERY_ITEM_CREATE_FAILURE,
  GROCERY_LISTS_CREATE_REQUEST,
  GROCERY_LISTS_CREATE_SUCCESS,
  GROCERY_LISTS_CREATE_FAILURE,
  GROCERY_ITEM_UPDATE_REQUEST,
  GROCERY_ITEM_UPDATE_SUCCESS,
  GROCERY_ITEM_UPDATE_FAILURE,
  GROCERY_ITEM_DELETE_REQUEST,
  GROCERY_ITEM_DELETE_SUCCESS,
  GROCERY_ITEM_DELETE_FAILURE,
} from "../constants/groceryConstants";

export const addGroceryItemAction =
  (month, year, particulars, qty, unitPrice, totalPrice) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GROCERY_ITEM_CREATE_REQUEST });

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
        "/houseBudget/grocery",
        {
          month,
          year,
          particulars,
          qty,
          unitPrice,
          totalPrice,
        },
        config
      );

      dispatch({ type: GROCERY_ITEM_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GROCERY_ITEM_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getGroceryItemListsAction =
  (type, month, year) => async (dispatch, getState) => {
    try {
      // let newDate = new Date();
      // if (month === "select" || month === "")
      //   month = newDate.toLocaleString("en-us", { month: "short" });
      // if (year === "select" || year === "") year = newDate.getFullYear();

      let PreviousMonth = 0,
        previousYear = 0;

      if (type === "new") {
        PreviousMonth = month - 1 === 0 ? 12 : month - 1;
        previousYear = PreviousMonth === 12 ? year - 1 : year;

        month = PreviousMonth;
        year = previousYear;
      }

      dispatch({ type: GROCERY_LISTS_CREATE_REQUEST });

      const {
        userLogin: { userInfos },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfos.token}`,
          inputType: type,
          inputMonth: month,
          inputYear: year,
        },
      };

      const { data } = await axios.get(
        `/houseBudget/grocery/lists/${type}/${year}/${month}`,
        config
      );

      dispatch({ type: GROCERY_LISTS_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GROCERY_LISTS_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateGroceryItemById =
  (groceryId, month, year, particulars, qty, unitPrice, totalPrice) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GROCERY_ITEM_UPDATE_REQUEST });

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
        `/houseBudget/grocery/${groceryId}`,
        {
          month,
          year,
          particulars,
          qty,
          unitPrice,
          totalPrice,
        },
        config
      );

      dispatch({ type: GROCERY_ITEM_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GROCERY_ITEM_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteGroceryItemById =
  (groceryId) => async (dispatch, getState) => {
    try {
      dispatch({ type: GROCERY_ITEM_DELETE_REQUEST });

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
        `/houseBudget/grocery/${groceryId}`,
        config
      );

      dispatch({ type: GROCERY_ITEM_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GROCERY_ITEM_DELETE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
