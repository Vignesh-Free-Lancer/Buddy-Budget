import React, { lazy, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import useTranslation from "../../hooks/translation";

import FormNavigation from "../common/formNavigation";
import InputFormGroup from "../common/inputFormGroup";
import InputSelect from "../common/inputSelect";
import InputText from "../common/inputText";

import { monthsData, yearsData } from "../../utils/customData";
import { isAllowDecimalNumber } from "../../utils/common";

import {
  addSalaryDetails,
  deleteSalaryData,
  updateSalaryDataById,
} from "../../redux/actions/salaryActions";

const Loading = lazy(() => import("../loading/loading"));
const ConfirmationWindow = lazy(() => import("../common/confirmationWindow"));

//import { numberFormat } from "../common/common";

const SalaryInformation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translation = useTranslation();

  const { salaryId } = useParams();

  const [selectedMonth, setSelectedMonth] = useState("select");
  const [selectedYear, setSelectedYear] = useState("select");

  const [salaryDetails, setSalaryDetails] = useState({
    monthlySalary: 0,
    bonusAmount: 0,
    otherAllowance: 0,
    totalCR: 0,
    pf: 0,
    incomeTax: 0,
    professionalTax: 0,
    otherDeductions: 0,
    totalDR: 0,
    netPayAmount: 0,
    isSalaryActive: true,
  });

  const [salaryErrors, setSalaryErrors] = useState({});

  const salaryUpdateResponse = useSelector((state) => state.salaryUpdatedData);
  const { loading, error, salaryUpdated } = salaryUpdateResponse;

  const { addToast } = useToasts();
  useEffect(() => {
    if (error) addToast(error, { appearance: "error" });

    if (salaryUpdated && salaryUpdated.message)
      addToast(salaryUpdated.message, { appearance: "success" });

    return () => {
      delete salaryUpdateResponse.error;
      delete salaryUpdateResponse.salaryUpdated;
    };
  }, [error, salaryUpdateResponse, salaryUpdated, addToast]);

  useEffect(() => {
    const fetchSalary = async (id) => {
      const {
        data: { salaryDetail },
      } = await axios.get(`/houseBudget/salary/${id}`);
      setSelectedMonth(salaryDetail.month);
      setSelectedYear(salaryDetail.year);
      setSalaryDetails(salaryDetail);
    };
    if (salaryId) {
      fetchSalary(salaryId);
    } else {
      setSelectedMonth("select");
      setSelectedYear("select");
      salaryDetails.monthlySalary = 0;
      salaryDetails.bonusAmount = 0;
      salaryDetails.otherAllowance = 0;
      salaryDetails.totalCR = 0;
      salaryDetails.pf = 0;
      salaryDetails.incomeTax = 0;
      salaryDetails.professionalTax = 0;
      salaryDetails.otherDeductions = 0;
      salaryDetails.totalDR = 0;
      salaryDetails.netPayAmount = 0;
    }
  }, [salaryId]);

  const validateProperty = (input) => {
    let stateSalary =
      parseFloat(salaryDetails.monthlySalary) > 0
        ? parseFloat(salaryDetails.monthlySalary)
        : 0;

    let stateBonus =
      parseFloat(salaryDetails.bonusAmount) > 0
        ? isNaN(salaryDetails.bonusAmount)
          ? 0
          : parseFloat(salaryDetails.bonusAmount)
        : 0;

    let stateAllowance =
      parseFloat(salaryDetails.otherAllowance) > 0
        ? isNaN(salaryDetails.otherAllowance)
          ? 0
          : parseFloat(salaryDetails.otherAllowance)
        : 0;

    let statePF =
      parseFloat(salaryDetails.pf) > 0
        ? isNaN(salaryDetails.pf)
          ? 0
          : parseFloat(salaryDetails.pf)
        : 0;

    let stateIncomeTax =
      parseFloat(salaryDetails.incomeTax) > 0
        ? isNaN(salaryDetails.incomeTax)
          ? 0
          : parseFloat(salaryDetails.incomeTax)
        : 0;

    let stateProfessionalTax =
      parseFloat(salaryDetails.professionalTax) > 0
        ? isNaN(salaryDetails.professionalTax)
          ? 0
          : parseFloat(salaryDetails.professionalTax)
        : 0;

    let stateOtherDeduction =
      parseFloat(salaryDetails.otherDeductions) > 0
        ? isNaN(salaryDetails.otherDeductions)
          ? 0
          : parseFloat(salaryDetails.otherDeductions)
        : 0;

    if (input.name === "monthlySalary") {
      if (parseFloat(input.value) === 0 || input.value === "") {
        salaryDetails.totalCR =
          parseFloat(stateBonus) + parseFloat(stateAllowance);

        return "Please enter your monthly salary amount";
      } else {
        salaryDetails.totalCR = isNaN(
          input.value + parseFloat(stateBonus) + parseFloat(stateAllowance)
        )
          ? parseFloat(0) + parseFloat(stateBonus) + parseFloat(stateAllowance)
          : parseFloat(input.value) +
            parseFloat(stateBonus) +
            parseFloat(stateAllowance);

        return isAllowDecimalNumber(input.value);
      }
    }

    if (input.name === "bonusAmount") {
      if (parseFloat(input.value) === 0 || input.value === "") {
        salaryDetails.totalCR =
          parseFloat(stateSalary) + parseFloat(stateAllowance);
      } else {
        salaryDetails.totalCR = isNaN(
          input.value + parseFloat(stateSalary) + parseFloat(stateAllowance)
        )
          ? parseFloat(0) + parseFloat(stateSalary) + parseFloat(stateAllowance)
          : parseFloat(input.value) +
            parseFloat(stateSalary) +
            parseFloat(stateAllowance);

        return isAllowDecimalNumber(input.value);
      }
    }

    if (input.name === "otherAllowance") {
      if (parseFloat(input.value) === 0 || input.value === "") {
        salaryDetails.totalCR =
          parseFloat(stateSalary) + parseFloat(stateBonus);
      } else {
        salaryDetails.totalCR = isNaN(
          input.value + parseFloat(stateSalary) + parseFloat(stateBonus)
        )
          ? parseFloat(0) + parseFloat(stateSalary) + parseFloat(stateBonus)
          : parseFloat(input.value) +
            parseFloat(stateSalary) +
            parseFloat(stateBonus);

        return isAllowDecimalNumber(input.value);
      }
    }

    if (input.name === "pf") {
      if (parseFloat(input.value) === 0 || input.value === "") {
        salaryDetails.totalDR =
          parseFloat(stateIncomeTax) +
          parseFloat(stateProfessionalTax) +
          parseFloat(stateOtherDeduction);
      } else {
        salaryDetails.totalDR = isNaN(
          input.value +
            parseFloat(stateIncomeTax) +
            parseFloat(stateProfessionalTax) +
            parseFloat(stateOtherDeduction)
        )
          ? parseFloat(0) +
            parseFloat(stateIncomeTax) +
            parseFloat(stateProfessionalTax) +
            parseFloat(stateOtherDeduction)
          : parseFloat(input.value) +
            parseFloat(stateIncomeTax) +
            parseFloat(stateProfessionalTax) +
            parseFloat(stateOtherDeduction);

        return isAllowDecimalNumber(input.value);
      }
    }

    if (input.name === "incomeTax") {
      if (parseFloat(input.value) === 0 || input.value === "") {
        salaryDetails.totalDR =
          parseFloat(statePF) +
          parseFloat(stateProfessionalTax) +
          parseFloat(stateOtherDeduction);
      } else {
        salaryDetails.totalDR = isNaN(
          input.value +
            parseFloat(statePF) +
            parseFloat(stateProfessionalTax) +
            parseFloat(stateOtherDeduction)
        )
          ? parseFloat(0) +
            parseFloat(statePF) +
            parseFloat(stateProfessionalTax) +
            parseFloat(stateOtherDeduction)
          : parseFloat(input.value) +
            parseFloat(statePF) +
            parseFloat(stateProfessionalTax) +
            parseFloat(stateOtherDeduction);

        return isAllowDecimalNumber(input.value);
      }
    }

    if (input.name === "professionalTax") {
      if (parseFloat(input.value) === 0 || input.value === "") {
        salaryDetails.totalDR =
          parseFloat(statePF) +
          parseFloat(stateIncomeTax) +
          parseFloat(stateOtherDeduction);
      } else {
        salaryDetails.totalDR = isNaN(
          input.value +
            parseFloat(statePF) +
            parseFloat(stateIncomeTax) +
            parseFloat(stateOtherDeduction)
        )
          ? parseFloat(0) +
            parseFloat(statePF) +
            parseFloat(stateIncomeTax) +
            parseFloat(stateOtherDeduction)
          : parseFloat(input.value) +
            parseFloat(statePF) +
            parseFloat(stateIncomeTax) +
            parseFloat(stateOtherDeduction);

        return isAllowDecimalNumber(input.value);
      }
    }

    if (input.name === "otherDeductions") {
      if (parseFloat(input.value) === 0 || input.value === "") {
        salaryDetails.totalDR =
          parseFloat(statePF) +
          parseFloat(stateIncomeTax) +
          parseFloat(stateProfessionalTax);
      } else {
        salaryDetails.totalDR = isNaN(
          input.value +
            parseFloat(statePF) +
            parseFloat(stateIncomeTax) +
            parseFloat(stateProfessionalTax)
        )
          ? parseFloat(0) +
            parseFloat(statePF) +
            parseFloat(stateIncomeTax) +
            parseFloat(stateProfessionalTax)
          : parseFloat(input.value) +
            parseFloat(statePF) +
            parseFloat(stateIncomeTax) +
            parseFloat(stateProfessionalTax);

        return isAllowDecimalNumber(input.value);
      }
    }
  };

  const handleInputChange = ({ currentTarget: input }) => {
    // Validation
    const errors = { ...salaryErrors }; //First clone the existing errors
    const errorMessage = validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setSalaryErrors(errors);

    let stateTotalCR =
      parseFloat(salaryDetails.totalCR) > 0
        ? parseFloat(salaryDetails.totalCR)
        : 0;

    let stateTotalDR =
      parseFloat(salaryDetails.totalDR) > 0
        ? parseFloat(salaryDetails.totalDR)
        : 0;

    salaryDetails.netPayAmount =
      parseFloat(stateTotalCR) - parseFloat(stateTotalDR);

    // After Validation Success, Get Input Field Values
    const salaryInfos = { ...salaryDetails };
    salaryInfos[input.name] = input.value;
    setSalaryDetails(salaryInfos);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    e.target.value === "select"
      ? (salaryErrors.selectedMonth = "Please select month")
      : delete salaryErrors.selectedMonth;
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    e.target.value === "select"
      ? (salaryErrors.selectedYear = "Please select month")
      : delete salaryErrors.selectedYear;
  };

  const validation = () => {
    const errors = {};

    if (selectedMonth === "select")
      errors.selectedMonth = "Please select month";

    if (selectedYear === "select") errors.selectedYear = "Please select year";

    if (
      parseInt(salaryDetails.monthlySalary) === 0 ||
      salaryDetails.monthlySalary === ""
    ) {
      errors.monthlySalary = "Please enter your monthly salary amount";
    } else if (isAllowDecimalNumber(salaryDetails.monthlySalary) !== "") {
      errors.monthlySalary = isAllowDecimalNumber(salaryDetails.monthlySalary);
    }

    if (isAllowDecimalNumber(salaryDetails.bonusAmount, false) !== "") {
      errors.bonusAmount = isAllowDecimalNumber(
        salaryDetails.bonusAmount,
        false
      );
    }

    if (isAllowDecimalNumber(salaryDetails.otherAllowance, false) !== "") {
      errors.otherAllowance = isAllowDecimalNumber(
        salaryDetails.otherAllowance,
        false
      );
    }

    if (isAllowDecimalNumber(salaryDetails.pf, false) !== "") {
      errors.pf = isAllowDecimalNumber(salaryDetails.pf, false);
    }

    if (isAllowDecimalNumber(salaryDetails.incomeTax, false) !== "") {
      errors.incomeTax = isAllowDecimalNumber(salaryDetails.incomeTax, false);
    }

    if (isAllowDecimalNumber(salaryDetails.professionalTax, false) !== "") {
      errors.professionalTax = isAllowDecimalNumber(
        salaryDetails.professionalTax,
        false
      );
    }

    if (isAllowDecimalNumber(salaryDetails.otherDeductions, false) !== "") {
      errors.otherDeductions = isAllowDecimalNumber(
        salaryDetails.otherDeductions,
        false
      );
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSalaryData = (e) => {
    e.preventDefault();

    const errors = validation();
    setSalaryErrors(errors || {});
    if (errors) {
      addToast("Please fill/correct all required fields", {
        appearance: "error",
      });
      return;
    }

    if (!salaryId) {
      dispatch(
        addSalaryDetails(
          selectedMonth,
          selectedYear,
          salaryDetails.monthlySalary,
          salaryDetails.bonusAmount,
          salaryDetails.otherAllowance,
          salaryDetails.totalCR,
          salaryDetails.pf,
          salaryDetails.incomeTax,
          salaryDetails.professionalTax,
          salaryDetails.otherDeductions,
          salaryDetails.totalDR,
          salaryDetails.netPayAmount
        )
      );

      navigate("/buddy-budget/salary/lists");
    } else {
      dispatch(
        updateSalaryDataById(
          salaryId,
          selectedMonth,
          selectedYear,
          salaryDetails.monthlySalary,
          salaryDetails.bonusAmount,
          salaryDetails.otherAllowance,
          salaryDetails.totalCR,
          salaryDetails.pf,
          salaryDetails.incomeTax,
          salaryDetails.professionalTax,
          salaryDetails.otherDeductions,
          salaryDetails.totalDR,
          salaryDetails.netPayAmount
        )
      );
    }
  };

  // State Object For Delete Pop-Up
  const [openModal, setOpenModal] = useState(false);

  const openModalWindow = () => {
    setOpenModal(true);
  };

  const closeModalWindow = () => {
    setOpenModal(false);
  };

  const confirmedDelete = () => {
    setOpenModal(false);
    if (salaryId) {
      dispatch(deleteSalaryData(salaryId));
      navigate("/buddy-budget/salary/lists");
    }
  };

  // const handleDeleteSalaryData = (e) => {
  //   e.preventDefault();

  //   setOpenModal(true);

  //   if (window.confirm("Are you sure want to delete?")) {
  //     if (salaryId) {
  //       dispatch(deleteSalaryData(salaryId));
  //       navigate("/buddy-budget/salary/lists");
  //     }
  //   }
  // };

  const resetInput = (e) => {
    // e.target.value = "";
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

  return (
    <>
      <FormNavigation
        module="other"
        newNavLink="/buddy-budget/salary"
        listviewLink="/buddy-budget/salary/lists"
      />
      {loading && <Loading />}
      <Row>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <InputFormGroup inputLabel={translation.Month} inputName="ddlMonth">
            <InputSelect
              inputName="ddlMonth"
              inputArray={monthsData}
              inputDefaultValue={selectedMonth}
              inputChange={handleMonthChange}
              inputErrorMessage={salaryErrors.selectedMonth}
            />
          </InputFormGroup>
        </Col>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <InputFormGroup inputLabel={translation.Year} inputName="ddlYear">
            <InputSelect
              inputName="ddlYear"
              inputArray={yearsData}
              inputDefaultValue={selectedYear}
              inputChange={handleYearChange}
              inputErrorMessage={salaryErrors.selectedYear}
            />
          </InputFormGroup>
        </Col>
      </Row>
      <Row>
        <h6 className="salary-info__sub-title mt-3 mb-3">
          {translation.SalaryCreditDetails}:
        </h6>
        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
          <InputFormGroup
            inputLabel={translation.MonthlySalary}
            inputName="monthlySalary"
          >
            <InputText
              inputName="monthlySalary"
              inputType="text"
              placeholderName={translation.EnterMonthlySalaryAmount}
              inputAlignment="right"
              inputErrorMessage={salaryErrors.monthlySalary}
              inputChange={handleInputChange}
              inputBlur={resetDefaultValue}
              inputFocus={resetInput}
              inputValue={salaryDetails.monthlySalary}
            />
            <div className="salary-info__section-salary-hints">
              <p>
                <span>{translation.Note}:</span>{" "}
                {translation.EnterYourTotalEarningSalaryAmount}.
              </p>
            </div>
          </InputFormGroup>
        </Col>
        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
          <InputFormGroup
            inputLabel={translation.BonusAmount}
            inputName="bonusAmount"
          >
            <InputText
              inputName="bonusAmount"
              inputType="text"
              placeholderName={translation.EnterBonusAmount}
              inputAlignment="right"
              inputErrorMessage={salaryErrors.bonusAmount}
              inputChange={handleInputChange}
              inputBlur={resetDefaultValue}
              inputFocus={resetInput}
              inputValue={salaryDetails.bonusAmount}
            />
          </InputFormGroup>

          <InputFormGroup
            inputLabel={translation.OtherAllowance}
            inputName="otherAllowance"
          >
            <InputText
              inputName="otherAllowance"
              inputType="text"
              placeholderName={translation.EnterOtherExtraAllowance}
              inputAlignment="right"
              inputErrorMessage={salaryErrors.otherAllowance}
              inputChange={handleInputChange}
              inputBlur={resetDefaultValue}
              inputFocus={resetInput}
              inputValue={salaryDetails.otherAllowance}
            />
            <div className="salary-info__section-salary-hints">
              <p>
                <span>{translation.Note}:</span>{" "}
                {translation.EnterYourAllOtherExtraAllowance}.
              </p>
            </div>
          </InputFormGroup>

          <div className="form-group mb-3 mt-4 salary-info__total-value total-cr">
            <label htmlFor="totalCR" className="form-label">
              {translation.TotalCreditAmount}:
            </label>
            <span>{salaryDetails.totalCR}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <h6 className="salary-info__sub-title mt-3 mb-3">
          {translation.SalaryDebitDetails}:
        </h6>
        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
          <InputFormGroup inputLabel={translation.PF} inputName="pf">
            <InputText
              inputName="pf"
              inputType="text"
              placeholderName={translation.EnterPFAmount}
              inputAlignment="right"
              inputErrorMessage={salaryErrors.pf}
              inputChange={handleInputChange}
              inputBlur={resetDefaultValue}
              inputFocus={resetInput}
              inputValue={salaryDetails.pf}
            />
          </InputFormGroup>

          <InputFormGroup
            inputLabel={translation.ProfessionalTax}
            inputName="professionalTax"
          >
            <InputText
              inputName="professionalTax"
              inputType="text"
              placeholderName={translation.EnterProfessionalTaxAmount}
              inputAlignment="right"
              inputErrorMessage={salaryErrors.professionalTax}
              inputChange={handleInputChange}
              inputBlur={resetDefaultValue}
              inputFocus={resetInput}
              inputValue={salaryDetails.professionalTax}
            />
          </InputFormGroup>
        </Col>
        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
          <InputFormGroup
            inputLabel={translation.IncomeTax}
            inputName="incomeTax"
          >
            <InputText
              inputName="incomeTax"
              inputType="text"
              placeholderName={translation.EnterIncomeTaxAmount}
              inputAlignment="right"
              inputErrorMessage={salaryErrors.incomeTax}
              inputChange={handleInputChange}
              inputBlur={resetDefaultValue}
              inputFocus={resetInput}
              inputValue={salaryDetails.incomeTax}
            />
          </InputFormGroup>

          <InputFormGroup
            inputLabel={translation.OtherDeductions}
            inputName="otherDeductions"
          >
            <InputText
              inputName="otherDeductions"
              inputType="text"
              placeholderName={translation.EnterOtherDebitedAmount}
              inputAlignment="right"
              inputErrorMessage={salaryErrors.otherDeductions}
              inputChange={handleInputChange}
              inputBlur={resetDefaultValue}
              inputFocus={resetInput}
              inputValue={salaryDetails.otherDeductions}
            />
            <div className="salary-info__section-salary-hints">
              <p>
                <span>{translation.Note}:</span>{" "}
                {translation.EnterYourAllSeductionAmountPfTax}.
              </p>
            </div>
          </InputFormGroup>

          <div className="form-group mb-3 mt-4 salary-info__total-value total-dr">
            <label htmlFor="totalDR" className="form-label">
              {translation.TotalDebitAmount}:
            </label>
            <span>{salaryDetails.totalDR}</span>
          </div>

          <div className="form-group mb-3 mt-3 salary-info__total-value total-cr">
            <label htmlFor="netPay" className="form-label">
              {translation.NetPay}:
            </label>
            <span>{salaryDetails.netPayAmount}</span>
          </div>
        </Col>
      </Row>
      <div className="form-group mt-3 mb-5" style={{ textAlign: "right" }}>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSalaryData}
        >
          {salaryId ? translation.Update : translation.Save}
        </button>

        <button
          type="button"
          className="btn btn-danger"
          style={{
            display: salaryId ? "inline-block" : "none",
            marginLeft: "15px",
          }}
          // onClick={handleDeleteSalaryData}
          onClick={openModalWindow}
        >
          {translation.Delete}
        </button>
      </div>

      <ConfirmationWindow
        showModal={openModal}
        closeModal={closeModalWindow}
        confirmDelete={confirmedDelete}
        confirmMessage={`Are you sure you want to delete the salary information on`}
        confirmMessageValue={`${
          selectedMonth !== "select" && monthsData[selectedMonth - 1].name
        } - ${selectedYear && selectedYear}`}
      />
    </>
  );
};

export default SalaryInformation;
