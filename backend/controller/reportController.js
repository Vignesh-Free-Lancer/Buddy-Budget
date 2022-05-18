const asyncHandler = require("express-async-handler");
const Salary = require("../models/salaryModel");
const Expenses = require("../models/expensesModel");
const Groceries = require("../models/groceryModel");
const { getYearGroupByData, getMonthGroupByData } = require("../utils/common");

const url = require("url");

// Get Salary Reports
const getSalaryReportResultLists = asyncHandler(async (req, res) => {
  let salaryReportResults = [],
    chartReportsData = [],
    sumOfSalaryReports;

  if (req.headers.selectedtype === "yearly") {
    salaryReportResults = await Salary.find({
      userId: req.user._id,
      year: parseInt(req.headers.inputyear),
    }).sort({
      month: 1,
    });

    sumOfSalaryReports = await Salary.aggregate(
      [
        {
          $match: {
            userId: req.user._id,
            year: parseInt(req.headers.inputyear),
          },
        },
        {
          $group: {
            _id: "$userId",
            totalCRAmount: { $sum: "$totalCR" },
            totalDRAmount: { $sum: "$totalDR" },
            totalNetPayAmount: { $sum: "$netPayAmount" },
          },
        },
      ],
      function (err, data) {
        if (err) throw err;
        return data;
      }
    );
  }

  if (req.headers.selectedtype === "monthly") {
    salaryReportResults = await Salary.find({
      userId: req.user._id,
      year: parseInt(req.headers.inputyear),
      month: req.headers.inputmonth,
    });
  }

  for (let i = 1; i < 13; i++) {
    let count = 0;
    for (let j = 0; j < salaryReportResults.length; j++) {
      if (salaryReportResults[j].month === i) {
        chartReportsData.push(salaryReportResults[j].netPayAmount);
        count++;
      }
    }
    if (count === 0) chartReportsData.push(0);
  }

  if (salaryReportResults.length > 0) {
    res.status(201).json({
      totalReportsLength: salaryReportResults.length,
      salaryReportResults,
      sumOfSalaryReportData: sumOfSalaryReports,
      chartData: chartReportsData,
      message: `Your salary reports searched successfully.`,
    });
  } else if (salaryReportResults.length === 0) {
    res.status(201).json({
      totalReportsLength: salaryReportResults.length,
      message: "There is no data to display",
    });
  } else {
    res.status(400);
    throw new Error("Salary records not available");
  }
});

// Get Expense Reports
const getExpenseReportResultLists = asyncHandler(async (req, res) => {
  let expenseReportResults = [],
    groupedExpenseData,
    sumOfYearlyExpenseReports = [],
    sumOfMonthlyExpenseReports = [],
    chartReportsData = [];

  if (req.headers.selectedtype === "yearly") {
    expenseReportResults = await Expenses.find({
      userId: req.user._id,
      year: parseInt(req.headers.inputyear),
    });

    groupedExpenseData = await Expenses.aggregate([
      {
        $match: {
          userId: req.user._id,
          year: parseInt(req.headers.inputyear),
        },
      },
      {
        $group: {
          _id: "$month",
          reportItems: {
            $push: "$$ROOT",
          },
          monthlyAmount: { $sum: "$actualCost" },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          month: "$_id",
          reportItems: 1,
          monthlyAmount: "$monthlyAmount",
        },
      },
      {
        $project: {
          _id: 0,
          "reportItems.month": 0,
        },
      },
    ]);

    sumOfYearlyExpenseReports = await Expenses.aggregate(
      [
        {
          $match: {
            userId: req.user._id,
            year: parseInt(req.headers.inputyear),
          },
        },
        {
          $group: {
            _id: "$userId",
            totalYearlyExpenseAmount: { $sum: "$actualCost" },
          },
        },
      ],
      function (err, data) {
        if (err) throw err;
        return data;
      }
    );
  }

  if (req.headers.selectedtype === "monthly") {
    expenseReportResults = await Expenses.find({
      userId: req.user._id,
      year: parseInt(req.headers.inputyear),
      month: req.headers.inputmonth,
    });

    groupedExpenseData = await Expenses.aggregate([
      {
        $match: {
          userId: req.user._id,
          year: parseInt(req.headers.inputyear),
          month: req.headers.inputmonth,
        },
      },
      {
        $group: {
          _id: "$month",
          reportItems: {
            $push: "$$ROOT",
          },
          monthlyAmount: { $sum: "$actualCost" },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          month: "$_id",
          reportItems: 1,
          monthlyAmount: "$monthlyAmount",
        },
      },
      {
        $project: {
          _id: 0,
          "reportItems.month": 0,
        },
      },
    ]);

    sumOfMonthlyExpenseReports = await Expenses.aggregate(
      [
        {
          $match: {
            userId: req.user._id,
            year: parseInt(req.headers.inputyear),
            month: req.headers.inputmonth,
          },
        },
        {
          $group: {
            _id: "$month",
            totalMonthlyExpenseAmount: { $sum: "$actualCost" },
          },
        },
        { $sort: { _id: 1 } },
      ],
      function (err, data) {
        if (err) throw err;
        return data;
      }
    );
  }

  for (let i = 1; i < 13; i++) {
    let count = 0;
    for (let j = 0; j < groupedExpenseData.length; j++) {
      if (parseInt(groupedExpenseData[j].month) === i) {
        chartReportsData.push(groupedExpenseData[j].monthlyAmount);
        count++;
      }
    }
    if (count === 0) chartReportsData.push(0);
  }

  if (expenseReportResults.length > 0) {
    res.status(201).json({
      totalReportLength: expenseReportResults.length,
      groupedExpenseData,
      expenseReportResults,
      yearlyExpensesReport: sumOfYearlyExpenseReports,
      monthlyExpensesReport: sumOfMonthlyExpenseReports,
      chartData: chartReportsData,
      message: `Your expense reports searched successfully.`,
    });
  } else if (expenseReportResults.length === 0) {
    res.status(201).json({
      totalReportLength: expenseReportResults.length,
      message: "There is no data to display",
    });
  } else {
    res.status(400);
    throw new Error("Expense records not available");
  }
});

// Get Grocery Reports
const getGroceryReportResultLists = asyncHandler(async (req, res) => {
  let groceryReportResults = [],
    groupedGroceryData,
    sumOfYearlyGroceryReports = [],
    sumOfMonthlyGroceryReports = [];

  if (req.headers.selectedtype === "yearly") {
    groceryReportResults = await Groceries.find({
      userId: req.user._id,
      year: parseInt(req.headers.inputyear),
    });

    groupedGroceryData = await Groceries.aggregate([
      {
        $match: {
          userId: req.user._id,
          year: parseInt(req.headers.inputyear),
        },
      },
      {
        $group: {
          _id: "$month",
          reportItems: {
            $push: "$$ROOT",
          },
          monthlyAmount: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          month: "$_id",
          reportItems: 1,
          monthlyAmount: "$monthlyAmount",
        },
      },
      {
        $project: {
          _id: 0,
          "reportItems.month": 0,
        },
      },
    ]);

    sumOfYearlyGroceryReports = await Groceries.aggregate(
      [
        {
          $match: {
            userId: req.user._id,
            year: parseInt(req.headers.inputyear),
          },
        },
        {
          $group: {
            _id: "$userId",
            totalYearlyGroceryAmount: { $sum: "$totalPrice" },
          },
        },
      ],
      function (err, data) {
        if (err) throw err;
        return data;
      }
    );
  }

  if (req.headers.selectedtype === "monthly") {
    groceryReportResults = await Groceries.find({
      userId: req.user._id,
      year: parseInt(req.headers.inputyear),
      month: req.headers.inputmonth,
    });

    groupedGroceryData = await Groceries.aggregate([
      {
        $match: {
          userId: req.user._id,
          year: parseInt(req.headers.inputyear),
          month: req.headers.inputmonth,
        },
      },
      {
        $group: {
          _id: "$month",
          reportItems: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $project: {
          month: "$_id",
          reportItems: 1,
        },
      },
      {
        $project: {
          _id: 0,
          "reportItems.month": 0,
        },
      },
    ]);

    sumOfMonthlyGroceryReports = await Groceries.aggregate(
      [
        {
          $match: {
            userId: req.user._id,
            year: parseInt(req.headers.inputyear),
            month: req.headers.inputmonth,
          },
        },
        {
          $group: {
            _id: "$month",
            totalMonthlyGroceryAmount: { $sum: "$totalPrice" },
          },
        },
        { $sort: { _id: 1 } },
      ],
      function (err, data) {
        if (err) throw err;
        return data;
      }
    );
  }

  if (groceryReportResults.length > 0) {
    res.status(201).json({
      totalReportLength: groceryReportResults.length,
      groupedGroceryData,
      groceryReportResults,
      yearlyGroceryReport: sumOfYearlyGroceryReports,
      monthlyGroceryReport: sumOfMonthlyGroceryReports,
      message: `Your grocery reports searched successfully.`,
    });
  } else if (groceryReportResults.length === 0) {
    res.status(201).json({
      totalReportLength: groceryReportResults.length,
      message: "There is no data to display",
    });
  } else {
    res.status(400);
    throw new Error("Expense records not available");
  }
});

module.exports = {
  getSalaryReportResultLists,
  getExpenseReportResultLists,
  getGroceryReportResultLists,
};
