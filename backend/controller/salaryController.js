const asyncHandler = require("express-async-handler");
const Salary = require("../models/salaryModel");

const addSalaryDetails = asyncHandler(async (req, res) => {
  const {
    month,
    year,
    monthlySalary,
    bonusAmount,
    otherAllowance,
    totalCR,
    pf,
    incomeTax,
    professionalTax,
    otherDeductions,
    totalDR,
    netPayAmount,
  } = req.body;

  const salaryDetail = new Salary({
    userId: req.user._id,
    month,
    year,
    monthlySalary,
    bonusAmount,
    otherAllowance,
    totalCR,
    pf,
    incomeTax,
    professionalTax,
    otherDeductions,
    totalDR,
    netPayAmount,
  });

  await salaryDetail.save();

  res.status(201).json({
    newSalaryId: salaryDetail._id,
    message: `Your salary information created successfully.`,
  });
});

const getSalaryDetailLists = asyncHandler(async (req, res) => {
  const salaryDetailLists = await Salary.find({ userId: req.user._id }).sort({
    year: -1,
    month: 1,
  });

  let currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const previousMonth = currentDate.getMonth();

  // currentDate.setMonth(currentDate.getMonth() - 1);
  // const previousMonth = currentDate.toLocaleString("default", {
  //   month: "short",
  // });

  const lastMonthSalary = await Salary.find({
    userId: req.user._id,
    month: previousMonth,
    year: currentYear,
  });

  if (salaryDetailLists.length > 0) {
    res.status(201).json({
      totalLength: salaryDetailLists.length,
      lastMonthSalary: lastMonthSalary,
      salaryDetailLists,
    });
  } else if (salaryDetailLists.length === 0) {
    res.status(201).json({
      totalLength: salaryDetailLists.length,
      message: "There is no data to display",
    });
  } else {
    res.status(400);
    throw new Error("Salary records not available");
  }
});

const getSalaryDetailById = asyncHandler(async (req, res) => {
  const salaryDetail = await Salary.findById(req.params.id, { __v: 0 });

  if (salaryDetail) {
    res.status(201).json({
      salaryDetail,
    });
  } else {
    res.status(401).json({
      message: "Salary information not yet created for current user.",
    });
  }
});

const updateSalaryDetailById = asyncHandler(async (req, res) => {
  const {
    month,
    year,
    monthlySalary,
    bonusAmount,
    otherAllowance,
    totalCR,
    pf,
    incomeTax,
    professionalTax,
    otherDeductions,
    totalDR,
    netPayAmount,
    isSalaryActive,
  } = req.body;

  const salary = await Salary.findById(req.params.id, { __v: 0 });

  if (salary.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (salary) {
    salary.month = month || salary.month;
    salary.year = year || salary.year;
    salary.monthlySalary = monthlySalary || salary.monthlySalary;
    salary.bonusAmount = bonusAmount || salary.bonusAmount;
    salary.otherAllowance = otherAllowance || salary.otherAllowance;
    salary.totalCR = totalCR || salary.totalCR;
    salary.pf = pf || salary.pf;
    salary.incomeTax = incomeTax || salary.incomeTax;
    salary.professionalTax = professionalTax || salary.professionalTax;
    salary.otherDeductions = otherDeductions || salary.otherDeductions;
    salary.totalDR = totalDR || salary.totalDR;
    salary.netPayAmount = netPayAmount || salary.netPayAmount;
    salary.isSalaryActive = isSalaryActive || salary.isSalaryActive;

    await salary.save();

    res.status(201).json({
      message: `Your salary information updated successfully.`,
    });
  } else {
    res.status(404).json({
      message: "Salary information not yet created for current user.",
    });
  }
});

const deleteSalaryDetailById = asyncHandler(async (req, res) => {
  const salary = await Salary.findById(req.params.id, { __v: 0 });

  if (salary.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (salary) {
    await salary.remove();

    res.status(201).json({
      message: "Your salary information deleted successfully.",
    });
  } else {
    res.status(404).json({
      message: "Salary information not yet created for current user.",
    });
  }
});

module.exports = {
  addSalaryDetails,
  getSalaryDetailLists,
  getSalaryDetailById,
  updateSalaryDetailById,
  deleteSalaryDetailById,
};
