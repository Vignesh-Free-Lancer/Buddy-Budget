const users = [
  {
    _id: "1",
    username: "Vignesh",
    email: "vignesh@gmail.com",
    gender: "Male",
    dob: "25/05/1990",
  },
  {
    _id: "2",
    username: "Revathi",
    email: "revathi@gmial.com",
    gender: "FeMale",
    dob: "31/07/1990",
  },
  {
    _id: "3",
    username: "Vimal",
    email: "vimal@gmail.com",
    gender: "Male",
    dob: "29/09/1996",
  },
];

const expenses = [
  {
    _id: "622f5014f640da4ce5a63521",
    userId: "622792f0f8333e729cba60fa",
    month: "Mar",
    year: 2022,
    particular: "Milk",
    particularType: "custom",
    estimatedCost: 1000,
    actualCost: 716,
    paymentType: "cash",
    paymentBank: "",
    paymentDate: "2022-03-06T18:30:00.000Z",
    description: "Amount paid fully. Per Ltr Rs.30, total ltr is 19.4.",
    createdAt: "2022-03-14T14:24:20.212Z",
    updatedAt: "2022-03-14T14:24:20.212Z",
    __v: 0,
  },
  {
    _id: "622f562e17f53aebc86a0fdd",
    userId: "622792f0f8333e729cba60fa",
    month: "Feb",
    year: 2022,
    particular: "Gas",
    particularType: "custom",
    estimatedCost: 1000,
    actualCost: 925,
    paymentType: "cash",
    paymentBank: "Axis",
    paymentDate: "2022-03-02T18:30:00.000Z",
    description: "Amount paid to service employer.",
    createdAt: "2022-03-14T14:50:22.128Z",
    updatedAt: "2022-03-14T14:50:22.128Z",
    __v: 0,
  },
];

module.exports = { users, expenses };
