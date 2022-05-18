const asyncHandler = require("express-async-handler");
const Expenses = require("../models/expensesModel");

const addExpense = asyncHandler(async (req, res) => {
  const {
    month,
    year,
    particular,
    particularsType,
    estimatedCost,
    actualCost,
    paymentType,
    paymentBank,
    paymentDate,
    description,
  } = req.body;

  const expenseDetails = new Expenses({
    userId: req.user._id,
    month,
    year,
    particular,
    particularsType,
    estimatedCost,
    actualCost,
    paymentType,
    paymentBank,
    paymentDate,
    description,
  });

  await expenseDetails.save();

  res.status(201).json({
    message: "Expense item added successfully.",
  });
});

const getExpenseDetails = asyncHandler(async (req, res) => {
  const type = req.params.type;

  let expenseDetails = await Expenses.find({
    userId: req.user._id,
    month: req.params.month,
    year: req.params.year,
  });

  let clonedArray = [];

  if (type === "new") {
    if (expenseDetails.length > 0) {
      clonedArray = JSON.parse(JSON.stringify(expenseDetails));
      clonedArray.forEach((data) => {
        data.userId = req.user._id;
        data.month = `${
          parseInt(req.params.month) === 12 ? 1 : parseInt(req.params.month) + 1
        }`;

        delete data._id;
        delete data.createdAt;
        delete data.updatedAt;
        delete data.__v;
        return data;
      });
    } else {
      res.status(201).json({
        totalExpenseCount: expenseDetails.length,
        currentMonthExpenseCost: 0,
        importMessage: "No expense data on last month, Unable to import",
        message: "There is no data to display",
      });
      return;
    }
  }
  const bulkInsertedStatus = await Expenses.insertMany(clonedArray);

  type === "new" && bulkInsertedStatus.length > 0
    ? (expenseDetails = JSON.parse(JSON.stringify(bulkInsertedStatus)))
    : null;

  const aggResponse = await Expenses.aggregate(
    [
      {
        $match: {
          month: req.params.month,
          year: parseInt(req.params.year),
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: "$particular",
          expenseCost: { $sum: "$actualCost" },
        },
      },
    ],
    function (err, data) {
      if (err) throw err;
      return data;
    }
  );

  var totalExpenseCost = 0;
  if (expenseDetails.length > 0) {
    for (const doc of aggResponse) {
      totalExpenseCost += doc.expenseCost;
    }
  }

  if (expenseDetails.length > 0) {
    res.status(201).json({
      totalExpenseCount: expenseDetails.length,
      currentMonthExpenseCost: totalExpenseCost,
      expenseDetails,
      ...(bulkInsertedStatus.length > 0 && {
        importSuccessMessage: "Expense details are imported successfully",
      }),
    });
  } else if (expenseDetails.length === 0) {
    res.status(201).json({
      totalExpenseCount: expenseDetails.length,
      currentMonthExpenseCost: totalExpenseCost,
      message: "There is no data to display",
    });
  } else {
    res.status(400);
    throw new Error("Expense records not available");
  }
});

const getExpenseDetailById = asyncHandler(async (req, res) => {
  const expenseDetail = await Expenses.findById(req.params.id, { __v: 0 });

  if (expenseDetail) {
    res.status(201).json({
      expenseDetail,
    });
  } else {
    res.status(401).json({
      message: "Information not available.",
    });
  }
});

const updateExpenseDetailById = asyncHandler(async (req, res) => {
  const {
    month,
    year,
    particular,
    particularsType,
    estimatedCost,
    actualCost,
    paymentType,
    paymentBank,
    paymentDate,
    description,
  } = req.body;

  const expense = await Expenses.findById(req.params.id, { __v: 0 });

  if (expense.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (expense) {
    expense.month = month || expense.month;
    expense.year = year || expense.year;
    expense.particular = particular || expense.particular;
    expense.particularsType = particularsType || expense.particularsType;
    expense.estimatedCost = estimatedCost || expense.estimatedCost;
    expense.actualCost = actualCost || expense.actualCost;
    expense.paymentType = paymentType || expense.paymentType;
    expense.paymentBank = paymentBank || expense.paymentBank;
    expense.paymentDate = paymentDate || expense.paymentDate;
    expense.description = description || expense.description;

    await expense.save();

    res.status(201).json({
      message: "Expense items updated successfully.",
    });
  } else {
    res.status(404).json({
      message: "Expense information not yet created for current user.",
    });
  }
});

const deleteExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expenses.findById(req.params.id, { __v: 0 });

  if (expense.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (expense) {
    await expense.remove();

    res.status(201).json({
      message: "Expense item deleted successfully.",
    });
  } else {
    res.status(404).json({
      message: "Expense information not yet created for current user.",
    });
  }
});

module.exports = {
  addExpense,
  getExpenseDetails,
  getExpenseDetailById,
  updateExpenseDetailById,
  deleteExpenseById,
};
