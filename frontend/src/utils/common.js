// Validation Field For Password Creation
const uppercaseRegExp = /(?=.*?[A-Z])/;
const lowercaseRegExp = /(?=.*?[a-z])/;
const digitsRegExp = /(?=.*?[0-9])/;
const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
const minLengthRegExp = /.{8,}/;

export const passwordRequirements = (inputValue) => {
  const minLengthPassword = minLengthRegExp.test(inputValue);
  const uppercasePassword = uppercaseRegExp.test(inputValue);
  const lowercasePassword = lowercaseRegExp.test(inputValue);
  const specialCharPassword = specialCharRegExp.test(inputValue);
  const digitsPassword = digitsRegExp.test(inputValue);

  if (!minLengthPassword) return "At least minumum 8 characters";
  if (!uppercasePassword) return "At least one Uppercase";
  if (!lowercasePassword) return "At least one Lowercase";
  if (!specialCharPassword) return "At least one Special Characters";
  if (!digitsPassword) return "At least one digit";
};

// Convert Values Into Currency Format
export const numberFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

// User Email Field Validation
export const emailValidation = (email) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email || regex.test(email) === false) {
    return "Enter valid email";
  }
  return "";
};

// Allow Integer Number Only In Textbox
export const isAllowIntegerNumber = (number) => {
  const regNumber = /^[0-9\b]+$/;
  if (number !== "" && number !== 0 && regNumber.test(number)) {
    return "";
  } else {
    return "Please enter valid number";
  }
};

// Allow Decimal Number Only In Textbox
export const isAllowDecimalNumber = (number, isMandatory = true) => {
  const regDecimalNumber = /^[+-]?\d*(?:[.,]\d*)?$/;
  if (
    number !== "" &&
    number !== 0 &&
    isMandatory &&
    regDecimalNumber.test(number)
  ) {
    return "";
  } else if (number !== "" && !isMandatory && regDecimalNumber.test(number)) {
    return "";
  } else {
    return "Please enter valid number";
  }
};

// Validate Input Fields On Change
export const validateProperty = (
  input,
  matPassword = "",
  enabledPage = false
) => {
  // User Realted Input Fields
  if (input.name === "userName") {
    // Here we can pass name parameter instead of input.name
    if (input.value.trim() === "") return "Please enter username"; // Here we can pass value parameter instead of input.value
  }

  if (input.name === "email") {
    if (input.value.trim() === "") return "Please enter email";
    if (input.value.trim() !== "") return emailValidation(input.value);
  }

  if (input.name === "password" && !enabledPage) {
    if (input.value.trim() === "") return "Please enter password";

    return passwordRequirements(input.value.trim());
  }

  if (input.name === "confirmPassword") {
    if (input.value.trim() === "") return "Please enter confirm password";
    if (input.value.trim() !== "") {
      if (input.value !== matPassword) return "Please did not match";
    }
  }

  if (input.name === "gender") {
    if (input.value.trim() === "") return "Please select gender";
  }

  // Expense Related Input Fields
  if (input.name === "particular") {
    if (input.value.trim() === "") return "Please enter particular";
  }

  if (input.name === "estimatedCost") {
    if (parseFloat(input.value) === 0 || input.value === "")
      return "Please enter estimated cost";
    else return isAllowDecimalNumber(input.value);
  }

  if (input.name === "actualCost") {
    if (parseFloat(input.value) === 0 || input.value === "")
      return "Please enter actual cost";
    else return isAllowDecimalNumber(input.value);
  }

  // Feedback Related Input Fields
  if (input.name === "satisfication") {
    if (input.value.trim() === "") return "Please select your option";
  }

  if (input.name === "usageDuration") {
    if (input.value.trim() === "") return "Please select your option";
  }

  if (input.name === "usageTime") {
    if (input.value.trim() === "") return "Please select your option";
  }

  if (input.name === "usageInFuture") {
    if (input.value.trim() === "") return "Please select your option";
  }

  if (input.name === "referral") {
    if (input.value.trim() === "") return "Please select your option";
  }
};

// Validate Select Fields On Change
export const handleDropdownChange = (e, ddlErrors) => {
  console.log("Common", e, ddlErrors);
};

// Validate Fields When Click On Button
export const validateAllField = (
  stateData,
  stateDOB = "",
  userImage = "",
  userImageStatus = ""
) => {
  const errors = {};

  // User Related Datas
  if (stateData.userName.trim() === "")
    errors.userName = "Please enter username";

  if (stateData.email.trim() === "") errors.email = "Please enter email";

  if (stateData.password.trim() === "")
    errors.password = "Please enter password";

  if (stateData.confirmPassword && stateData.confirmPassword.trim() === "")
    errors.confirmPassword = "Please enter confirm password";

  if (stateData.gender.trim() === "") errors.gender = "Please select gender";

  if (stateDOB === null || stateDOB === "" || stateDOB === undefined)
    errors.dob = "Please select dob";

  if (
    stateData.password &&
    stateData.confirmPassword &&
    stateData.password.trim() !== stateData.confirmPassword.trim()
  )
    errors.confirmPassword = "Password did not match";

  if (!stateData.isActive) errors.isActive = "Please select status";

  if (userImage === "" || userImage === undefined || userImage === null) {
    errors.pic = "Please select image upload option";
  } else if (userImage === "new-image") {
    if (
      stateData.pic ===
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" &&
      userImageStatus === ""
    ) {
      errors.pic = "Please upload profile picture";
    } else if (
      userImageStatus !== "" &&
      userImageStatus !== "Image uploaded successfully"
    ) {
      errors.uploadMessage =
        "You can't register your account, Still image is uploading...";
    }
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

// Convert Month Number Into Month String
export const monthName = (monthNumber) => {
  const curDate = new Date();
  curDate.setMonth(monthNumber - 1);
  return curDate.toLocaleString("en-US", { month: "short" });
};

// Get Month Start And End Date Based On Month & Year
export const getStartEndDate = (month, year) => {
  const currentMonthDate = "1-" + monthName(month) + "-" + year;
  const date = new Date(currentMonthDate);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { firstDay, lastDay };
};

// Restrict DOB Min 18 Years & Max 75 Years
export const minAge = new Date().setFullYear(new Date().getFullYear() - 18);
export const maxAge = new Date().setFullYear(new Date().getFullYear() - 75);
