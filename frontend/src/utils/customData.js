// export const monthsData = [
//   { value: "Jan", name: "January" },
//   { value: "Feb", name: "Feburary" },
//   { value: "Mar", name: "March" },
//   { value: "Apr", name: "April" },
//   { value: "May", name: "May" },
//   { value: "Jun", name: "June" },
//   { value: "Jul", name: "July" },
//   { value: "Aug", name: "August" },
//   { value: "Sep", name: "September" },
//   { value: "Oct", name: "October" },
//   { value: "Nov", name: "November" },
//   { value: "Dec", name: "December" },
// ];

export const monthsData = [
  { value: "1", name: "January" },
  { value: "2", name: "February" },
  { value: "3", name: "March" },
  { value: "4", name: "April" },
  { value: "5", name: "May" },
  { value: "6", name: "June" },
  { value: "7", name: "July" },
  { value: "8", name: "August" },
  { value: "9", name: "September" },
  { value: "10", name: "October" },
  { value: "11", name: "November" },
  { value: "12", name: "December" },
];

const baseyear = 2015;
const currentData = new Date();
let currentYear = currentData.getFullYear();

const getAllYear = () => {
  let allyear = [];
  for (let i = baseyear; i <= currentYear; i++) {
    allyear.push({ value: i, name: i });
  }
  allyear = allyear.sort(function (a, b) {
    return b.value - a.value;
  });
  return allyear;
};

export const yearsData = getAllYear();

export const fiscalYearType = [
  { value: "yearly", name: "Yearly" },
  // { value: "halfYearly", name: "Half Yearly" },
  // { value: "quaterly", name: "Quaterly" },
  { value: "monthly", name: "Monthly" },
  // { value: "specificPeriods", name: "Specific Periods" },
];

export const halfYearlyData = [
  { value: "firstHalf", name: "January - June" },
  { value: "secondHalf", name: "July - December" },
];

export const quaterlyData = [
  { value: "quarter1", name: "January - March" },
  { value: "quarter2", name: "April - June" },
  { value: "quarter3", name: "July - September" },
  { value: "quarter4", name: "October - December" },
];

export const particularType = [
  { value: "default", name: "Default" },
  { value: "custom", name: "Custom" },
];

export const paymentType = [
  { value: "cash", name: "Cash" },
  { value: "netbanking", name: "Net Banking" },
  { value: "creditcard", name: "Credit Card" },
  { value: "debitcard", name: "Debit Card" },
  { value: "upi", name: "UPI Pay" },
];

export const qtyType = [
  { value: "gms", name: "Grams" },
  { value: "kgms", name: "Kgms" },
  { value: "mltr", name: "M. Litere" },
  { value: "ltr", name: "Litere" },
  { value: "box", name: "Box" },
];
