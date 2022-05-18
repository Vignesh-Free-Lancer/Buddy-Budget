const asyncHandler = require("express-async-handler");
const Groceries = require("../models/groceryModel");

const addGroceryItem = asyncHandler(async (req, res) => {
  const { month, year, particulars, qty, unitPrice, totalPrice } = req.body;

  const groceryItem = new Groceries({
    userId: req.user._id,
    month,
    year,
    particulars,
    qty,
    unitPrice,
    totalPrice,
  });

  await groceryItem.save();

  res.status(201).json({
    message: `${particulars} item added successfully.`,
  });
});

const getGroceryItemLists = asyncHandler(async (req, res) => {
  const type = req.params.type;

  let groceryItems = await Groceries.find({
    userId: req.user._id,
    month: req.params.month,
    year: req.params.year,
  });

  let clonedArray = [];

  if (type === "new") {
    if (groceryItems.length > 0) {
      clonedArray = JSON.parse(JSON.stringify(groceryItems));
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
        totalGroceryItems: groceryItems.length,
        importMessage: "No grocery item on last month, Unable to import",
        message: "There is no data to display",
      });
      return;
    }
  }
  const bulkInsertedStatus = await Groceries.insertMany(clonedArray);

  type === "new" && bulkInsertedStatus.length > 0
    ? (groceryItems = JSON.parse(JSON.stringify(bulkInsertedStatus)))
    : null;

  if (groceryItems.length > 0) {
    res.status(201).json({
      totalGroceryItems: groceryItems.length,
      groceryItems,
      ...(bulkInsertedStatus.length > 0 && {
        importSuccessMessage: "Grocery items are imported successfully",
      }),
    });
  } else if (groceryItems.length === 0) {
    res.status(201).json({
      totalGroceryItems: groceryItems.length,
      message: "There is no data to display",
    });
  } else {
    res.status(400);
    throw new Error("Grocery records not available");
  }
});

const getGroceryItemById = asyncHandler(async (req, res) => {
  const groceryItem = await Groceries.findById(req.params.id, { __v: 0 });

  if (groceryItem) {
    res.status(201).json({
      groceryItem,
    });
  } else {
    res.status(401).json({
      message: "Item not available.",
    });
  }
});

const updateGroceryItemById = asyncHandler(async (req, res) => {
  const { month, year, particulars, qty, unitPrice, totalPrice } = req.body;

  const groceryItem = await Groceries.findById(req.params.id, { __v: 0 });

  if (groceryItem.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (groceryItem) {
    groceryItem.month = month || groceryItem.month;
    groceryItem.year = year || groceryItem.year;
    groceryItem.particulars = particulars || groceryItem.particulars;
    groceryItem.qty = qty || groceryItem.qty;
    groceryItem.unitPrice = unitPrice || groceryItem.unitPrice;
    groceryItem.totalPrice = totalPrice || groceryItem.totalPrice;

    await groceryItem.save();

    res.status(201).json({
      message: `${particulars} item update successfully.`,
    });
  } else {
    res.status(404).json({
      message: "Grocery item not yet added for this month.",
    });
  }
});

const deleteGroceryItemById = asyncHandler(async (req, res) => {
  const groceryItem = await Groceries.findById(req.params.id, { __v: 0 });

  if (groceryItem.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Access denied.");
  }

  if (groceryItem) {
    await groceryItem.remove();

    res.status(201).json({
      message: `${groceryItem.particulars} item deleted successfully.`,
    });
  } else {
    res.status(404).json({
      message: "Grocery item not yet added for this month.",
    });
  }
});

module.exports = {
  addGroceryItem,
  getGroceryItemLists,
  getGroceryItemById,
  updateGroceryItemById,
  deleteGroceryItemById,
};
