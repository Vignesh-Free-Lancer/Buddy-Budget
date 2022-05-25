import React, { lazy, useEffect, useState } from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useTranslation from "../../hooks/translation";

// Input Custom Component
import InputFormGroup from "../common/inputFormGroup";
import InputText from "../common/inputText";
import InputSelect from "../common/inputSelect";

// Get Dropdown Items
import {
  monthsData,
  yearsData,
  particularType,
  paymentType,
  qtyType,
} from "../../utils/customData";

// Import Child Component
import ExpenseLists from "./expenseLists";
import GroceryLists from "./groceryLists";
import Pagination from "../common/pagination";

// For Pagination
import { Paginate } from "../../utils/paginate";

// For Input Field Validation
import {
  isAllowIntegerNumber,
  isAllowDecimalNumber,
  validateProperty,
  getStartEndDate,
} from "../../utils/common";

import _ from "lodash";
import axios from "axios";

// Import Dispatch Redux Actions
import {
  addExpenseDetailAction,
  deleteExpenseData,
  getExpenseListsAction,
  updateExpenseDataById,
} from "../../redux/actions/expenseAction";

import {
  addGroceryItemAction,
  getGroceryItemListsAction,
  updateGroceryItemById,
  deleteGroceryItemById,
} from "../../redux/actions/groceryAction";

import Loading from "../loading/loading";

const ConfirmationWindow = lazy(() => import("../common/confirmationWindow"));

const Expenses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const translation = useTranslation();

  /* ===================== Common State and Function Start ============================== */

  // State Object For Month and Year
  const [selectedMonth, setSelectedMonth] = useState("select");
  const [selectedYear, setSelectedYear] = useState("select");

  // Dropdown On Change Event
  const handleSelectChange = (e) => {
    if (e.target.name === "ddlYear") {
      setSelectedYear(e.target.value);
      e.target.value === "select"
        ? (expenseErrors.selectedYear = "Please select year")
        : delete expenseErrors.selectedYear;
    }

    if (e.target.name === "ddlMonth") {
      setSelectedMonth(e.target.value);
      e.target.value === "select"
        ? (expenseErrors.selectedMonth = "Please select month")
        : delete expenseErrors.selectedMonth;
    }

    if (e.target.name === "ddlParticularType") {
      setSelectedParticularType(e.target.value);
      e.target.value === "select"
        ? (expenseErrors.selectedParticularType =
            "Please select particular type")
        : delete expenseErrors.selectedParticularType;
    }

    if (e.target.name === "ddlPaymentType") {
      setSelectedPaymentType(e.target.value);
      e.target.value === "select"
        ? (expenseErrors.selectedPaymentType = "Please select payment type")
        : delete expenseErrors.selectedPaymentType;

      if (e.target.value === "cash") {
        delete expenseErrors.paymentBank;
        expenseData.paymentBank = "";
      }
    }

    if (e.target.name === "ddlQtyType") {
      setSelectedQtyType(e.target.value);
      setSelectedQtyTypeText(e.target.selectedOptions[0].text);
      groceryData.qty = parseInt(0);
      groceryData.totalPrice = parseInt(0);

      e.target.value === "select"
        ? (groceryErrors.selectedQtyType = "Please select type")
        : delete groceryErrors.selectedQtyType;
    }
  };

  // Validate The Month & Year Before Add Expense & Grocery
  const validateRange = () => {
    const errors = {};

    if (selectedMonth === "select")
      errors.selectedMonth = "Please select month";

    if (selectedYear === "select") errors.selectedYear = "Please select year";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const resetInput = (e) => {
    e.target.value =
      e.target.value > 0
        ? e.target.value
        : isNaN(e.target.value)
        ? e.target.value
        : "";
  };

  const resetDefaultValue = (e) => {
    e.target.value =
      e.target.value === 0 || e.target.value === "" ? 0 : e.target.value;
  };

  /* ===================== Common State and Function End ================================ */

  /* ===================== Pagination Related State and Function End ==================== */

  // For Expense Pagination State
  const [expensePageSize, setExpensePageSize] = useState(0);
  const [expenseCurrentPage, setExpenseCurrentPage] = useState(1);

  // For Grocery Pagination State
  const [groceryPageSize, setGroceryPageSize] = useState(0);
  const [groceryCurrentPage, setGroceryCurrentPage] = useState(1);

  // Expense Table Sort Order
  const [expenseSortColumn, setExpenseSortColumn] = useState({
    path: "particular",
    order: "asc",
  });

  // Grocery Table Sort Order
  const [grocerySortColumn, setGrocerySortColumn] = useState({
    path: "particulars",
    order: "asc",
  });

  // Set Default Pagesize On Component Mount
  useEffect(() => {
    setExpensePageSize(5);
    setGroceryPageSize(5);
  }, []);

  // Expense Pagination Number Click Event
  const handleExpensePageChange = (pageNumber) => {
    setExpenseCurrentPage(pageNumber);
  };

  // Expense Grocery Number Click Event
  const handleGroceryPageChange = (pageNumber) => {
    setGroceryCurrentPage(pageNumber);
  };

  /* ===================== Pagination Related State and Function End ==================== */

  /* ===================== Expense Related State and Function Start ===================== */

  // State Object For Expense Data Insert/Update
  const [customExpenseId, setCustomExpenseId] = useState("");

  // State Object For Add New Expense
  const [expenseData, SetExpenseData] = useState({
    particular: "",
    estimatedCost: 0,
    actualCost: 0,
    paymentBank: "",
    description: "",
  });

  // State Object For Payment Date Field
  const [paymentDate, setPaymentDate] = useState("");

  // State Object For Month Start & End Date
  const [monthStartDate, setMonthStartDate] = useState("");
  const [monthEndDate, setMonthEndDate] = useState("");

  // State Object For Particulars Type
  const [selectedParticularType, setSelectedParticularType] =
    useState("select");

  // State Object For Payment Type
  const [selectedPaymentType, setSelectedPaymentType] = useState("select");

  // State Object For Handling Expense Error Message Based On Field Name
  const [expenseErrors, setExpenseErrors] = useState({});

  // State Object For Show / Hide Expenses PopUp
  const [expensesShow, setExpensesShow] = useState(false);

  // Handle Expense Input Field Validation On Change
  const handleExpenseInputChange = ({ currentTarget: input }) => {
    // Validation
    const errors = { ...expenseErrors }; //First clone the existing errors
    const errorMessage = validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setExpenseErrors(errors);

    // After Validation Success, Get Input Field Values
    const expenseInfo = { ...expenseData };
    expenseInfo[input.name] = input.value;
    SetExpenseData(expenseInfo);
  };

  // Handle The Date Field On Change Function
  const handleDateChange = (date) => {
    setPaymentDate(date);
    date === null
      ? (expenseErrors.paymentDate = "Please select date")
      : delete expenseErrors.paymentDate;
  };

  // Validate Each Field For Expense Items On Click
  const expenseValidation = () => {
    const errors = {};

    if (expenseData.particular.trim() === "")
      errors.particular = "Please enter particular";

    if (selectedParticularType === "select")
      errors.selectedParticularType = "Please select particular type";

    if (
      parseInt(expenseData.estimatedCost) === 0 ||
      expenseData.estimatedCost === ""
    ) {
      errors.estimatedCost = "Please enter estimate cost";
    } else if (isAllowDecimalNumber(expenseData.estimatedCost) !== "") {
      errors.estimatedCost = isAllowDecimalNumber(expenseData.estimatedCost);
    }

    if (
      parseInt(expenseData.actualCost) === 0 ||
      expenseData.actualCost === ""
    ) {
      errors.actualCost = "Please enter actual cost";
    } else if (isAllowDecimalNumber(expenseData.actualCost) !== "") {
      errors.actualCost = isAllowDecimalNumber(expenseData.actualCost);
    }

    if (selectedPaymentType === "select")
      errors.selectedPaymentType = "Please select payment type";

    if (selectedPaymentType !== "cash" && selectedPaymentType !== "select") {
      if (expenseData.paymentBank.trim() === "")
        errors.paymentBank = "Please enter bank name";
    }

    if (paymentDate === null || paymentDate === "" || paymentDate === undefined)
      errors.paymentDate = "Please select date";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Open Expense Pop-Up Window
  const addNewExpense = (e) => {
    e.preventDefault();

    const errors = validateRange();
    setExpenseErrors(errors || {});
    // if (errors) return;
    if (errors) {
      addToast(
        selectedMonth === "select" && selectedYear === "select"
          ? "Please select month & year"
          : selectedMonth === "select"
          ? "Please select month"
          : selectedYear === "select"
          ? "Please select year"
          : "",
        {
          appearance: "error",
        }
      );
      return;
    }

    setCustomExpenseId("");
    expenseData.particular = "";
    setSelectedParticularType("select");
    expenseData.estimatedCost = 0;
    expenseData.actualCost = 0;
    setSelectedPaymentType("select");
    expenseData.paymentBank = "";
    setPaymentDate("");
    expenseData.description = "";

    const days = getStartEndDate(selectedMonth, selectedYear);
    setMonthStartDate(days.firstDay);
    setMonthEndDate(days.lastDay);

    setExpensesShow(true);
  };

  // Event For Add/Update Expense Data
  const handleExpenseData = (e) => {
    e.preventDefault();

    const errors = expenseValidation();
    setExpenseErrors(errors || {});
    if (errors) return;

    if (customExpenseId === "" || customExpenseId === undefined) {
      // dispatch(
      //   addExpenseDetailAction(
      //     selectedMonth,
      //     selectedYear,
      //     expenseData.particular,
      //     selectedParticularType,
      //     expenseData.estimatedCost,
      //     expenseData.actualCost,
      //     selectedPaymentType,
      //     expenseData.paymentBank,
      //     paymentDate,
      //     expenseData.description
      //   )
      // );
    } else {
      dispatch(
        updateExpenseDataById(
          expenseData._id,
          expenseData.month,
          expenseData.year,
          expenseData.particular,
          selectedParticularType,
          expenseData.estimatedCost,
          expenseData.actualCost,
          selectedPaymentType,
          expenseData.paymentBank,
          paymentDate,
          expenseData.description
        )
      );
    }

    setExpensesShow(false);
  };

  // Update Expense
  const handleEditExpense = async (expense) => {
    if (expense) {
      const {
        data: { expenseDetail },
      } = await axios.get(`/houseBudget/expense/${expense._id}`);

      setExpenseErrors({});

      setCustomExpenseId(expenseDetail._id);
      SetExpenseData(expenseDetail);
      setSelectedParticularType(expenseDetail.particularType);
      setSelectedPaymentType(expenseDetail.paymentType);
      setPaymentDate(new Date(expenseDetail.paymentDate));

      setExpensesShow(true);
    }
  };

  // Delete Expense
  // const handleDeleteExpense = (expense) => {
  //   if (expense) {
  //     if (window.confirm("Are you sure want to delete?")) {
  //       if (expense) {
  //         dispatch(deleteExpenseData(expense._id));
  //       }
  //     }
  //   }
  // };

  // State Object For Delete Pop-Up
  const [openExpenseDeleteModal, setOpenExpenseDeleteModal] = useState(false);
  const [deletedExpenseItem, setDeletedExpenseItem] = useState({});

  const openExpenseModalWindow = (expenseItem) => {
    setDeletedExpenseItem(expenseItem);
    setOpenExpenseDeleteModal(true);
  };

  const closeExpenseModalWindow = () => {
    setOpenExpenseDeleteModal(false);
  };

  const confirmedExpenseDelete = () => {
    if (deletedExpenseItem) {
      dispatch(deleteExpenseData(deletedExpenseItem._id));
    }
    setExpenseCurrentPage(1);
    setOpenExpenseDeleteModal(false);
    setDeletedExpenseItem({});
  };

  // Expense Table Sort Method
  const handleExpenseTableSort = (sortHeader) => {
    setExpenseSortColumn(sortHeader);
  };

  // Get Response For New Expense Data
  const insertedExpense = useSelector((state) => state.expenseDetailData);
  const { expenseInfos, error: insertExpenseError } = insertedExpense;

  // Get Response For Get Expense Data
  const expenseListItems = useSelector((state) => state.expenseDetailLists);
  const {
    expenseLists,
    error: expenseListError,
    loading: expenseLoading,
  } = expenseListItems;

  // Get Response For Update Expense Data
  const updatedExpense = useSelector((state) => state.expenseUpdateData);
  const { expenseUpdate, error: updateExpenseError } = updatedExpense;

  // Get Response For Delete Expense Data
  const deletedExpense = useSelector((state) => state.expenseDeleteData);
  const {
    expenseDelete,
    error: expenseDeleteError,
    loading: expenseDeleteLoading,
  } = deletedExpense;

  const { addToast } = useToasts();
  useEffect(() => {
    if (expenseInfos && expenseInfos.message)
      addToast(expenseInfos.message, { appearance: "success" });

    return () => {
      if (expenseInfos) delete expenseInfos.message;
    };
  }, [expenseInfos, addToast]);

  useEffect(() => {
    if (expenseUpdate && expenseUpdate.message)
      addToast(expenseUpdate.message, { appearance: "success" });

    return () => {
      if (expenseUpdate) delete expenseUpdate.message;
    };
  }, [expenseUpdate, addToast]);

  useEffect(() => {
    if (expenseDelete && expenseDelete.message)
      addToast(expenseDelete.message, { appearance: "success" });

    return () => {
      if (expenseDelete) delete expenseDelete.message;
    };
  }, [expenseDelete, addToast]);

  useEffect(() => {
    if (insertExpenseError)
      addToast(insertExpenseError, { appearance: "error" });

    if (expenseListError) addToast(expenseListError, { appearance: "error" });

    if (updateExpenseError)
      addToast(updateExpenseError, { appearance: "error" });

    if (expenseDeleteError)
      addToast(expenseDeleteError, { appearance: "error" });

    if (
      expenseLists &&
      expenseLists.totalExpenseCount === 0 &&
      expenseLists.importMessage
    )
      addToast(expenseLists.importMessage, { appearance: "info" });

    if (expenseLists && expenseLists.importSuccessMessage)
      addToast(expenseLists.importSuccessMessage, { appearance: "success" });

    return () => {
      delete insertedExpense.error;
      delete expenseListItems.error;
      delete expenseListItems.expenseLists;
      if (expenseLists) delete expenseLists.importMessage;
      if (expenseLists) delete expenseLists.importSuccessMessage;
      delete updatedExpense.error;
      delete deletedExpense.error;
    };
  }, [
    insertedExpense,
    insertExpenseError,
    expenseListItems,
    expenseListError,
    expenseLists,
    updatedExpense,
    updateExpenseError,
    deletedExpense,
    expenseDeleteError,
    addToast,
  ]);

  const importExpenseData = () => {
    const importExpenseLists = (month, year) => {
      dispatch(getExpenseListsAction("new", month, year));
    };

    if (selectedMonth !== "select" && selectedYear !== "select") {
      importExpenseLists(selectedMonth, selectedYear);
    }
  };

  // Get Expense List Based On Array Dependencies
  useEffect(() => {
    const getExpenseLists = (month, year) => {
      dispatch(getExpenseListsAction("exist", month, year));
    };

    if (selectedMonth !== "select" && selectedYear !== "select") {
      getExpenseLists(selectedMonth, selectedYear);
    } else {
      getExpenseLists(0, 0);
    }
  }, [
    dispatch,
    navigate,
    expensesShow,
    expenseDelete,
    selectedMonth,
    selectedYear,
  ]);

  const getExpensePagedData = () => {
    // Here Sorting Table Based on Header(Path) with the use of lodash
    const sortedTable =
      expenseLists &&
      _.orderBy(
        expenseLists.expenseDetails,
        [expenseSortColumn.path],
        [expenseSortColumn.order]
      );

    // Get Data Based On Pagination, Sorted Records
    const expenseRecords = Paginate(
      sortedTable,
      expenseCurrentPage,
      expensePageSize
    );

    // Get Count Of Total Records After Filtering, Sorting, Paginating
    const totalExpenseRecordsCount =
      expenseLists && expenseLists.totalExpenseCount
        ? expenseLists.totalExpenseCount
        : 0;

    return { expenseRecords, totalExpenseRecordsCount };
  };

  const { expenseRecords, totalExpenseRecordsCount } = getExpensePagedData();

  /* ===================== Expense Related State and Function End ======================= */

  /* ===================== Grocery Related State and Function Start ===================== */

  // State Object For Grocery Data Insert/Update
  const [customGroceryId, setCustomGroceryId] = useState("");

  // State Object For Add New Grocery
  const [groceryData, SetGroceryData] = useState({
    particulars: "",
    qty: 0,
    unitPrice: 0,
    totalPrice: 0,
  });

  // State Object For Quantity Type
  const [selectedQtyType, setSelectedQtyType] = useState("select");
  const [selectedQtyTypeText, setSelectedQtyTypeText] = useState("");

  // State Object For Handling Grocery Error Message Based On Field Name
  const [groceryErrors, setGroceryErrors] = useState({});

  // State Object For Show / Hide Grocery PopUp
  const [groceryShow, setGroceryShow] = useState(false);

  // Validate Grocery Input Field On Change
  const validateGroceryInput = (input) => {
    let stateQty =
      parseFloat(groceryData.qty) > 0
        ? isNaN(groceryData.qty)
          ? 0
          : parseFloat(groceryData.qty)
        : 0;

    let stateUnitPrice =
      parseFloat(groceryData.unitPrice) > 0
        ? isNaN(groceryData.unitPrice)
          ? 0
          : parseFloat(groceryData.unitPrice)
        : 0;

    if (input.name === "particulars") {
      if (input.value.trim() === "") return "Please enter particular";
    }

    if (input.name === "qty") {
      if (parseFloat(input.value) === 0 || input.value === "") {
        groceryData.totalPrice = parseInt(0);
        return "Please enter quantity";
      } else {
        if (selectedQtyType === "gms" || selectedQtyType === "mltr") {
          let rate = isNaN(input.value) ? 0 : parseFloat(input.value) / 1000;

          groceryData.totalPrice = isNaN(
            parseFloat(stateUnitPrice) * parseFloat(rate)
          )
            ? 0
            : parseFloat(stateUnitPrice) * parseFloat(rate);
        } else if (
          selectedQtyType === "kgms" ||
          selectedQtyType === "ltr" ||
          selectedQtyType === "box"
        ) {
          groceryData.totalPrice = isNaN(input.value)
            ? 0
            : parseFloat(stateUnitPrice) * parseFloat(input.value);
        }
        return isAllowIntegerNumber(input.value);
      }
    }

    if (input.name === "unitPrice") {
      if (selectedQtyType === "gms" || selectedQtyType === "mltr") {
        let rate = isNaN(input.value) ? 0 : parseFloat(input.value) / 1000;

        groceryData.totalPrice = isNaN(parseFloat(stateQty) * parseFloat(rate))
          ? 0
          : parseFloat(stateQty) * parseFloat(rate);
      } else if (
        selectedQtyType === "kgms" ||
        selectedQtyType === "ltr" ||
        selectedQtyType === "box"
      ) {
        groceryData.totalPrice = isNaN(input.value)
          ? 0
          : parseFloat(stateQty) * parseFloat(input.value);
      }

      return isAllowDecimalNumber(input.value);
    }
  };

  // Handle Grocery Input Field Validation On Change
  const handleGroceryInputChange = ({ currentTarget: input }) => {
    // Validation
    const errors = { ...groceryErrors }; //First clone the existing errors
    const errorMessage = validateGroceryInput(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setGroceryErrors(errors);

    // After Validation Success, Get Input Field Values
    const groceryInfo = { ...groceryData };
    groceryInfo[input.name] = input.value;
    SetGroceryData(groceryInfo);
  };

  // Validate Each Field For Grocery Items
  const groceryValidation = () => {
    const errors = {};

    if (groceryData.particulars.trim() === "")
      errors.particulars = "Please enter particular";

    if (selectedQtyType === "select")
      errors.selectedQtyType = "Please select type";

    if (parseInt(groceryData.qty) === 0 || groceryData.qty === "") {
      errors.qty = "Please enter quantity";
    } else if (isAllowDecimalNumber(groceryData.qty) !== "") {
      errors.qty = isAllowDecimalNumber(groceryData.qty);
    }

    if (isAllowDecimalNumber(groceryData.unitPrice, false) !== "") {
      errors.unitPrice = isAllowDecimalNumber(groceryData.unitPrice, false);
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Open Grocery Pop-Up Window
  const addNewGrocery = (e) => {
    e.preventDefault();

    const errors = validateRange();
    setExpenseErrors(errors || {});
    // if (errors) return;
    if (errors) {
      addToast(
        selectedMonth === "select" && selectedYear === "select"
          ? "Please select month & year"
          : selectedMonth === "select"
          ? "Please select month"
          : selectedYear === "select"
          ? "Please select year"
          : "",
        {
          appearance: "error",
        }
      );
      return;
    }

    setCustomGroceryId("");
    groceryData.particulars = "";
    groceryData.qty = 0;
    setSelectedQtyType("select");
    groceryData.unitPrice = 0;
    groceryData.totalPrice = 0;

    setGroceryShow(true);
  };

  // Event For Add/Update Grocery Data
  const handleGroceryData = (e) => {
    e.preventDefault();

    const errors = groceryValidation();
    setGroceryErrors(errors || {});
    if (errors) return;

    if (customGroceryId === "" || customGroceryId === undefined) {
      dispatch(
        addGroceryItemAction(
          selectedMonth,
          selectedYear,
          groceryData.particulars,
          groceryData.qty + selectedQtyType,
          groceryData.unitPrice,
          groceryData.totalPrice
        )
      );
    } else {
      dispatch(
        updateGroceryItemById(
          groceryData._id,
          groceryData.month,
          groceryData.year,
          groceryData.particulars,
          groceryData.qty + selectedQtyType,
          groceryData.unitPrice,
          groceryData.totalPrice
        )
      );
    }

    setGroceryShow(false);
  };

  // Update Grocery
  const handleEditGrocery = async (grocery) => {
    if (grocery) {
      const {
        data: { groceryItem },
      } = await axios.get(`/houseBudget/grocery/${grocery._id}`);

      setGroceryErrors({});

      const getResponseData = { ...groceryItem };

      const getQtyValue = groceryItem.qty.match(/\d+/g)[0];
      const getQtyTpe = groceryItem.qty.match(/[a-zA-Z]+/g)[0];

      getResponseData.qty = getQtyValue;

      setCustomGroceryId(groceryItem._id);
      SetGroceryData(getResponseData);
      setSelectedQtyType(getQtyTpe);
      groceryData.qty = getQtyValue;
      setGroceryShow(true);
    }
  };

  // Delete Grocery
  // const handleDeleteGrocery = (grocery) => {
  //   if (grocery) {
  //     if (window.confirm("Are you sure want to delete?")) {
  //       if (grocery) {
  //         dispatch(deleteGroceryItemById(grocery._id));
  //       }
  //     }
  //   }
  // };

  // State Object For Delete Pop-Up
  const [openGroceryDeleteModal, setOpenGroceryDeleteModal] = useState(false);
  const [deletedGroceryItem, setDeletedGroceryItem] = useState({});

  const openGroceryModalWindow = (expenseItem) => {
    setDeletedGroceryItem(expenseItem);
    setOpenGroceryDeleteModal(true);
  };

  const closeGroceryModalWindow = () => {
    setOpenGroceryDeleteModal(false);
  };

  const confirmedGroceryDelete = () => {
    if (deletedGroceryItem) {
      dispatch(deleteGroceryItemById(deletedGroceryItem._id));
    }
    setGroceryCurrentPage(1);
    setOpenGroceryDeleteModal(false);
    setDeletedGroceryItem({});
  };

  // Grocery Table Sort Method
  const handleGroceryTableSort = (sortHeader) => {
    setGrocerySortColumn(sortHeader);
  };

  // Get Response For New Grocery Data
  const insertedGrocery = useSelector((state) => state.groceryItemData);
  const { groceryInfo, error: insertGroceryError } = insertedGrocery;

  // Get Response For Get Grocery Data
  const groceryListItems = useSelector((state) => state.groceryItemLists);
  const {
    groceryItemLists,
    error: groceryListError,
    loading: groceryLoading,
  } = groceryListItems;

  // Get Response For Update Grocery Data
  const updatedGrocery = useSelector((state) => state.groceryItemUpdateData);
  const { groceryItemUpdate, error: updateGroceryError } = updatedGrocery;

  // Get Response For Delete Grocery Data
  const deletedGrocery = useSelector((state) => state.groceryItemDeleteData);
  const {
    groceryItemDelete,
    error: groceryDeleteError,
    loading: groceryDeleteLoading,
  } = deletedGrocery;

  useEffect(() => {
    if (groceryInfo && groceryInfo.message)
      addToast(groceryInfo.message, { appearance: "success" });

    return () => {
      if (groceryInfo) delete groceryInfo.message;
    };
  }, [groceryInfo, addToast]);

  useEffect(() => {
    if (groceryItemUpdate && groceryItemUpdate.message)
      addToast(groceryItemUpdate.message, { appearance: "success" });

    return () => {
      if (groceryItemUpdate) delete groceryItemUpdate.message;
    };
  }, [groceryItemUpdate, addToast]);

  useEffect(() => {
    if (groceryItemDelete && groceryItemDelete.message)
      addToast(groceryItemDelete.message, { appearance: "success" });

    return () => {
      if (groceryItemDelete) delete groceryItemDelete.message;
    };
  }, [groceryItemDelete, addToast]);

  useEffect(() => {
    if (insertGroceryError)
      addToast(insertGroceryError, { appearance: "error" });

    if (groceryListError) addToast(groceryListError, { appearance: "error" });

    if (updateGroceryError)
      addToast(updateGroceryError, { appearance: "error" });

    if (groceryDeleteError)
      addToast(groceryDeleteError, { appearance: "error" });

    if (
      groceryItemLists &&
      groceryItemLists.totalGroceryItems === 0 &&
      groceryItemLists.importMessage
    )
      addToast(groceryItemLists.importMessage, { appearance: "info" });

    if (groceryItemLists && groceryItemLists.importSuccessMessage)
      addToast(groceryItemLists.importSuccessMessage, {
        appearance: "success",
      });

    return () => {
      delete insertedGrocery.error;
      delete groceryListItems.error;
      delete groceryListItems.groceryItemLists;
      if (groceryItemLists) delete groceryItemLists.importMessage;
      if (groceryItemLists) delete groceryItemLists.importSuccessMessage;
      delete updatedGrocery.error;
      delete deletedGrocery.error;
    };
  }, [
    insertedGrocery,
    insertGroceryError,
    groceryListItems,
    groceryListError,
    groceryItemLists,
    updatedGrocery,
    updateGroceryError,
    deletedGrocery,
    groceryDeleteError,
    addToast,
  ]);

  const importGroceriesData = () => {
    const importGroceryLists = (month, year) => {
      dispatch(getGroceryItemListsAction("new", month, year));
    };

    if (selectedMonth !== "select" && selectedYear !== "select") {
      importGroceryLists(selectedMonth, selectedYear);
    }
  };

  // Get Grocery List Based On Array Dependencies
  useEffect(() => {
    const getGroceryItemLists = (month, year) => {
      dispatch(getGroceryItemListsAction("exist", month, year));
    };

    if (selectedMonth !== "select" && selectedYear !== "select") {
      getGroceryItemLists(selectedMonth, selectedYear);
    } else {
      getGroceryItemLists(0, 0);
    }
  }, [
    dispatch,
    navigate,
    groceryShow,
    groceryItemDelete,
    selectedMonth,
    selectedYear,
  ]);

  const getGroceryItemListsData = () => {
    // Here Sorting Table Based on Header(Path) with the use of lodash
    const sortedTable =
      groceryItemLists &&
      _.orderBy(
        groceryItemLists.groceryItems,
        [grocerySortColumn.path],
        [grocerySortColumn.order]
      );

    // Get Data Based On Pagination, Sorted Records
    const groceryRecords = Paginate(
      sortedTable,
      groceryCurrentPage,
      groceryPageSize
    );

    // Get Count Of Total Records After Filtering, Sorting, Paginating
    const totalGroceryRecordsCount =
      groceryItemLists && groceryItemLists.totalGroceryItems
        ? groceryItemLists.totalGroceryItems
        : 0;

    return { groceryRecords, totalGroceryRecordsCount };
  };

  const { groceryRecords, totalGroceryRecordsCount } =
    getGroceryItemListsData();

  /* ===================== Grocery Related State and Function End ======================= */

  return (
    <>
      {(expenseListItems && expenseLoading && <Loading />) ||
        (groceryListItems && groceryLoading && <Loading />)}
      {expenseListItems && expenseDeleteLoading && <Loading />}
      {groceryListItems && groceryDeleteLoading && <Loading />}
      <Row className="mb-3">
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <InputFormGroup inputLabel={translation.Month} inputName="ddlMonth">
            <InputSelect
              inputName="ddlMonth"
              inputArray={monthsData}
              inputDefaultValue={selectedMonth}
              inputChange={handleSelectChange}
              inputErrorMessage={expenseErrors.selectedMonth}
            />
          </InputFormGroup>
          <div className="expense-info__expense-hints mb-3">
            <p>
              <span>{translation.Note}:</span>
              {translation.PleaseSelectMonthYear}.
            </p>
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <InputFormGroup inputLabel={translation.Year} inputName="ddlYear">
            <InputSelect
              inputName="ddlYear"
              inputArray={yearsData}
              inputDefaultValue={selectedYear}
              inputChange={handleSelectChange}
              inputErrorMessage={expenseErrors.selectedYear}
            />
          </InputFormGroup>
        </Col>
      </Row>

      <Row>
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className="expense-info__expense-category"
        >
          <h6 className="mb-3">{translation.ExpenseLists}:</h6>
          <div className="expense-info__expense-section">
            <div className="expense-info__expense-section__add-expense">
              <div className="new-expense">
                <button
                  className="btn btn-primary import-item"
                  title="Import Expenses"
                  disabled={expenseLists && expenseLists.expenseDetails}
                  onClick={importExpenseData}
                >
                  {translation.ImportLastMonthExpenses}
                </button>

                <button
                  className="btn btn-info add-new-item"
                  title="Add New Expense"
                  onClick={addNewExpense}
                >
                  {translation.AddNew}
                </button>
                {/* <button
                  className="btn btn-add-item"
                  title="Add New Expense"
                  onClick={addNewExpense}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button> */}
              </div>
            </div>
          </div>
          <div className="expense-info__expense-results mt-3">
            <div className="expense-info__expense-hints">
              <p className="mb-1">
                <span>{translation.Note}:</span>{" "}
                {translation.AddYourDailyExpenses}.
              </p>
            </div>
            {expenseRecords && (
              <ExpenseLists
                expenseLists={expenseRecords}
                onEditExpense={handleEditExpense}
                // onDeleteExpense={handleDeleteExpense}
                onDeleteExpense={openExpenseModalWindow}
                sortColumn={expenseSortColumn}
                onSort={handleExpenseTableSort}
                listErrorMessage={
                  expenseLists && expenseLists.totalExpenseCount === 0
                    ? expenseLists.message
                    : "There is no data to display"
                }
              />
            )}
            <Pagination
              recordsCount={
                totalExpenseRecordsCount > 0
                  ? totalExpenseRecordsCount
                  : Math.max(0, 0)
              }
              perPageSize={expensePageSize}
              onPageChange={handleExpensePageChange}
              currentPage={expenseCurrentPage}
            />
          </div>
        </Col>
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className="expense-info__grocery-category mt-5 mb-5"
        >
          <h6 className="mb-3">{translation.GrocessaryLists}:</h6>
          <div className="expense-info__grocessary-section">
            {/* <div className="expense-info__grocessary-section__filter-grocery">
              <div className="filter-button">
                <button
                  className="btn"
                  title="Filter Grocery"
                  onClick={handleFilterGrocery}
                >
                  <i className="fa fa-filter" aria-hidden="true"></i>
                </button>
              </div>
            </div> */}
            <div className="expense-info__grocessary-section__add-grocery">
              <div className="new-grocessary">
                <button
                  className="btn btn-primary import-item"
                  title="Import Grocery"
                  disabled={groceryItemLists && groceryItemLists.groceryItems}
                  onClick={importGroceriesData}
                >
                  {translation.ImportLastMonthItems}
                </button>

                <button
                  className="btn btn-info add-new-item"
                  title="Add New Grocery"
                  onClick={addNewGrocery}
                >
                  {translation.AddNew}
                </button>
              </div>
            </div>
          </div>
          <div className="expense-info__grocery-results mt-3">
            <div className="expense-info__expense-hints">
              <p className="mb-1">
                <span>{translation.Note}:</span>{" "}
                {translation.AddYourEntireMonthGroceryItems}.
              </p>
            </div>
            {groceryRecords && (
              <GroceryLists
                groceryLists={groceryRecords}
                onEditGrocery={handleEditGrocery}
                // onDeleteGrocery={handleDeleteGrocery}
                onDeleteGrocery={openGroceryModalWindow}
                sortColumn={grocerySortColumn}
                onSort={handleGroceryTableSort}
                listErrorMessage={
                  groceryItemLists && groceryItemLists.totalGroceryItems === 0
                    ? groceryItemLists.message
                    : "There is no data to display"
                }
              />
            )}
            <Pagination
              recordsCount={
                totalGroceryRecordsCount > 0
                  ? totalGroceryRecordsCount
                  : Math.max(0, 0)
              }
              perPageSize={groceryPageSize}
              onPageChange={handleGroceryPageChange}
              currentPage={groceryCurrentPage}
            />
          </div>
        </Col>
      </Row>

      {/* Expense Modal Pop-Up Window */}
      <Modal
        show={expensesShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {translation.AddNewExpense}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <InputFormGroup
                inputLabel={translation.Particular}
                inputName="particular"
              >
                <InputText
                  inputName="particular"
                  inputType="text"
                  placeholderName={translation.EnterParticular}
                  inputErrorMessage={expenseErrors.particular}
                  inputChange={handleExpenseInputChange}
                  inputValue={expenseData.particular}
                />
              </InputFormGroup>

              <InputFormGroup
                inputLabel={translation.EstimatedCost}
                inputName="estimatedCost"
              >
                <InputText
                  inputName="estimatedCost"
                  inputType="text"
                  placeholderName={translation.EnterEstimatedCost}
                  inputAlignment="right"
                  inputErrorMessage={expenseErrors.estimatedCost}
                  inputChange={handleExpenseInputChange}
                  inputBlur={resetDefaultValue}
                  inputFocus={resetInput}
                  inputValue={expenseData.estimatedCost}
                />
              </InputFormGroup>

              <InputFormGroup
                inputLabel={translation.PaymentType}
                inputName="ddlPaymentType"
              >
                <InputSelect
                  inputName="ddlPaymentType"
                  inputArray={paymentType}
                  inputDefaultValue={selectedPaymentType}
                  inputChange={handleSelectChange}
                  inputErrorMessage={expenseErrors.selectedPaymentType}
                />
              </InputFormGroup>

              <InputFormGroup
                inputLabel={translation.PaymentDate}
                inputName="paymentDate"
              >
                <DatePicker
                  name="paymentDate"
                  dateFormat="dd/MM/yyyy"
                  className={`form-control ${
                    expenseErrors.paymentDate ? "is-invalid" : ""
                  }`}
                  placeholderText={translation.PleaseSelectDate}
                  selected={paymentDate}
                  onChange={handleDateChange}
                  minDate={monthStartDate}
                  maxDate={monthEndDate}
                  showDisabledMonthNavigation
                  value={paymentDate}
                />
                <div
                  className="invalid-feedback"
                  style={{
                    display: expenseErrors.paymentDate ? "block" : "none",
                  }}
                >
                  {expenseErrors.paymentDate}
                </div>
              </InputFormGroup>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <InputFormGroup
                inputLabel={translation.ParticularType}
                inputName="ddlParticularType"
              >
                <InputSelect
                  inputName="ddlParticularType"
                  inputArray={particularType}
                  inputDefaultValue={selectedParticularType}
                  inputChange={handleSelectChange}
                  inputErrorMessage={expenseErrors.selectedParticularType}
                />
              </InputFormGroup>

              <InputFormGroup
                inputLabel={translation.ActualCost}
                inputName="actualCost"
              >
                <InputText
                  inputName="actualCost"
                  inputType="text"
                  placeholderName={translation.EnterActualCost}
                  inputAlignment="right"
                  inputErrorMessage={expenseErrors.actualCost}
                  inputChange={handleExpenseInputChange}
                  inputBlur={resetDefaultValue}
                  inputFocus={resetInput}
                  inputValue={expenseData.actualCost}
                />
              </InputFormGroup>

              <InputFormGroup
                inputLabel={translation.PaymentBank}
                inputName="paymentBank"
              >
                <InputText
                  inputName="paymentBank"
                  inputType="text"
                  placeholderName={translation.EnterPaymentBankName}
                  inputErrorMessage={expenseErrors.paymentBank}
                  inputChange={handleExpenseInputChange}
                  inputValue={expenseData.paymentBank}
                />
              </InputFormGroup>

              <InputFormGroup
                inputLabel={translation.Description}
                inputName="description"
              >
                <textarea
                  className="form-control"
                  placeholder={translation.EnterYourHintsHere}
                  name="description"
                  style={{ height: "70px" }}
                  onChange={handleExpenseInputChange}
                  value={expenseData.description}
                ></textarea>
              </InputFormGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={`btn  ${
              customExpenseId !== "" && customExpenseId !== undefined
                ? "btn-success"
                : "btn-primary"
            }`}
            onClick={handleExpenseData}
          >
            {customExpenseId !== "" && customExpenseId !== undefined
              ? translation.Update
              : translation.Save}
          </Button>
          <Button
            className="btn btn-default"
            onClick={() => setExpensesShow(false)}
          >
            {translation.Close}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Expense Delete Modal Window */}
      <ConfirmationWindow
        showModal={openExpenseDeleteModal}
        closeModal={closeExpenseModalWindow}
        confirmDelete={confirmedExpenseDelete}
        confirmMessage={`${translation.AreYouSureYouWantToDeleteExpenseItem} - `}
        confirmMessageValue={`${deletedExpenseItem.particular}`}
      />

      {/* Grocery Modal Pop-Up Window */}
      <Modal
        show={groceryShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="grocery-modal"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {translation.AddNewGroceryItem}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <InputFormGroup
                inputLabel={translation.Particular}
                inputName="particulars"
              >
                <InputText
                  inputName="particulars"
                  inputType="text"
                  placeholderName={translation.EnterParticular}
                  inputErrorMessage={groceryErrors.particulars}
                  inputChange={handleGroceryInputChange}
                  inputValue={groceryData.particulars}
                />
              </InputFormGroup>

              <InputFormGroup inputLabel={translation.Quantity} inputName="qty">
                <div className="grocery-modal__quantity-section">
                  <div className="grocery-modal__quantity-section__qty-type">
                    <InputSelect
                      inputName="ddlQtyType"
                      inputArray={qtyType}
                      inputDefaultValue={selectedQtyType}
                      inputChange={handleSelectChange}
                      inputErrorMessage={groceryErrors.selectedQtyType}
                    />
                  </div>
                  <div className="grocery-modal__quantity-section__qty-value">
                    <InputText
                      inputName="qty"
                      inputType="text"
                      placeholderName={translation.EnterQuantity}
                      inputAlignment="right"
                      inputErrorMessage={groceryErrors.qty}
                      inputChange={handleGroceryInputChange}
                      inputBlur={resetDefaultValue}
                      inputFocus={resetInput}
                      inputValue={groceryData.qty}
                    />
                  </div>
                </div>
              </InputFormGroup>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
              <InputFormGroup
                inputLabel={translation.UnitPrice}
                inputName="unitPrice"
              >
                <div className="grocery-modal__unit-section">
                  <div className="grocery-modal__unit-section__unit-text">
                    <InputText
                      inputName="unitPrice"
                      inputType="text"
                      placeholderName={translation.EnterUnitPrice}
                      inputAlignment="right"
                      inputErrorMessage={groceryErrors.unitPrice}
                      inputChange={handleGroceryInputChange}
                      inputBlur={resetDefaultValue}
                      inputFocus={resetInput}
                      inputValue={groceryData.unitPrice}
                    />
                  </div>
                  <div className="grocery-modal__unit-section__unit-type">
                    <span className="input-group-text">
                      {`${translation.Per} ${
                        selectedQtyType === "select"
                          ? ` ${translation.Kgms}`
                          : selectedQtyTypeText === "Grams"
                          ? ` ${translation.Kgms}`
                          : selectedQtyTypeText === "M. Litere"
                          ? ` ${translation.Litere}`
                          : selectedQtyTypeText
                      }`}
                      {/* Per Kgms */}
                    </span>
                  </div>
                </div>
              </InputFormGroup>

              <InputFormGroup
                inputLabel={translation.TotalPrice}
                inputName="totalPrice"
              >
                <InputText
                  inputName="totalPrice"
                  inputType="text"
                  placeholderName={translation.EnterTotalPrice}
                  inputAlignment="right"
                  inputErrorMessage={groceryErrors.totalPrice}
                  inputChange={handleGroceryInputChange}
                  inputValue={groceryData.totalPrice}
                  inputDisableOption={true}
                />
              </InputFormGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={`btn  ${
              customGroceryId !== "" && customGroceryId !== undefined
                ? "btn-success"
                : "btn-primary"
            }`}
            onClick={handleGroceryData}
          >
            {customGroceryId !== "" && customGroceryId !== undefined
              ? translation.Update
              : translation.Save}
          </Button>
          <Button
            className="btn btn-default"
            onClick={() => setGroceryShow(false)}
          >
            {translation.Close}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Grocery Delete Modal Window */}
      <ConfirmationWindow
        showModal={openGroceryDeleteModal}
        closeModal={closeGroceryModalWindow}
        confirmDelete={confirmedGroceryDelete}
        confirmMessage={`${translation.AreYouSureYouWantToDeleteTheGroceryItem} - `}
        confirmMessageValue={`${deletedGroceryItem.particulars}`}
      />
    </>
  );
};

export default Expenses;
