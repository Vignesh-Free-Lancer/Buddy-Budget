const Groceries = require("../models/groceryModel");

// Get Month Start And End Date Based On Month & Year
const getStartEndDate = (month, year) => {
  var currentMonthDate = "1-" + month + "-" + year;
  var date = new Date(currentMonthDate);
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { firstDay, lastDay };
};

// Remove Particular Property From Array Of Object
const removeSelectedProperty = (sourceObject, removeKeys = []) => {
  const sourceKeys = Object.keys(sourceObject);
  const returnKeys = sourceKeys.filter((k) => !removeKeys.includes(k));
  let returnObject = {};
  returnKeys.forEach((k) => {
    returnObject[k] = sourceObject[k];
  });
  return returnObject;
};

const getYearGroupByData = async (userId, year = 0) => {
  const groupedData = await Groceries.aggregate([
    {
      $match: {
        userId: userId,
        year: parseInt(year),
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
  ])
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  // return groupedData;
};

const getMonthGroupByData = async (userId, year = 0, month = 0) => {
  const groupedData = await Groceries.aggregate([
    {
      $match: {
        userId: userId,
        year: parseInt(year),
        month: month,
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

  return groupedData;
};

module.exports = {
  getStartEndDate,
  removeSelectedProperty,
  getYearGroupByData,
  getMonthGroupByData,
};
