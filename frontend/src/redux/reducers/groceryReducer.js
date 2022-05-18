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

// Reducer For Add Grocery Item
export const addGroceryItemReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERY_ITEM_CREATE_REQUEST:
      return {
        loading: true,
      };
    case GROCERY_ITEM_CREATE_SUCCESS:
      return {
        loading: false,
        groceryInfo: action.payload,
      };
    case GROCERY_ITEM_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer For Get Grocery Item Lists
export const groceryItemListsReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERY_LISTS_CREATE_REQUEST:
      return {
        loading: true,
      };
    case GROCERY_LISTS_CREATE_SUCCESS:
      return {
        loading: false,
        groceryItemLists: action.payload,
      };
    case GROCERY_LISTS_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer For Update Grocery Item
export const groceryItemUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERY_ITEM_UPDATE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case GROCERY_ITEM_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        groceryItemUpdate: action.payload,
      };
    case GROCERY_ITEM_UPDATE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer For Delete Grocery Item
export const groceryItemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERY_ITEM_DELETE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case GROCERY_ITEM_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        groceryItemDelete: action.payload,
      };
    case GROCERY_ITEM_DELETE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
