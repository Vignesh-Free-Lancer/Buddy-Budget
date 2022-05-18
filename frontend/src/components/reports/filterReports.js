import React, { lazy, useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

import { fiscalYearType, yearsData, monthsData } from "../../utils/customData";
import { useToasts } from "react-toast-notifications";
import useTranslation from "../../hooks/translation";

const InputFormGroup = lazy(() => import("../common/inputFormGroup"));
const InputSelect = lazy(() => import("../common/inputSelect"));

const FilterReports = ({
  reportsType = "",
  reportCallback = () => {},
  reportDisplayType = () => {},
  exportHeader = [],
  exportDatas = [],
}) => {
  const translation = useTranslation();

  // Export Data To CSV Format Ref
  const csvLink = useRef();

  // State Object For Custom Report Dropdown
  const [selectedFiscalYearType, setSelectedFiscalYearType] =
    useState("select");

  // State Object For Year Dropdown
  const [selectedYear, setSelectedYear] = useState("select");

  // State Object For Half Yearly Dropdown
  const [selectedHalfYearly, setSelectedHalfYearly] = useState("select");

  // State Object For Quaterly Dropdown
  const [selectedQuaterlyType, setSelectedQuaterlyType] = useState("select");

  // State Object For Month Dropdown
  const [selectedMonth, setSelectedMonth] = useState("select");

  // State Object For Start Month Dropdown
  const [selectedStartMonth, setSelectedStartMonth] = useState("select");

  // State Object For End Month Dropdown
  const [selectedEndMonth, setSelectedEndMonth] = useState("select");

  // State Object For Salary Reports
  const [reportsError, setReportsError] = useState({});

  useEffect(() => {
    let today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    setFileFormat(date + "_" + time);
  }, []);

  // State Object For Export File Name
  const [fileFormat, setFileFormat] = useState("");

  const handleReportsChange = (e) => {
    if (e.target.name === "ddlFiscalYearType") {
      delete reportsError.selectedYear;
      delete reportsError.selectedHalfYearly;
      delete reportsError.selectedQuaterlyType;
      delete reportsError.selectedMonth;
      delete reportsError.selectedStartMonth;
      delete reportsError.selectedEndMonth;

      setSelectedYear("select");
      setSelectedHalfYearly("select");
      setSelectedQuaterlyType("select");
      setSelectedMonth("select");
      setSelectedStartMonth("select");
      setSelectedEndMonth("select");

      setSelectedFiscalYearType(e.target.value);
      e.target.value === "select"
        ? (reportsError.selectedFiscalYearType = "Please select filter type")
        : delete reportsError.selectedFiscalYearType;
    }

    if (e.target.name === "ddlYear") {
      setSelectedYear(e.target.value);
      e.target.value === "select"
        ? (reportsError.selectedYear = "Please select year")
        : delete reportsError.selectedYear;
    }

    if (e.target.name === "ddlHalfYearly") {
      setSelectedHalfYearly(e.target.value);
      e.target.value === "select"
        ? (reportsError.selectedHalfYearly = "Please select half-yearly")
        : delete reportsError.selectedHalfYearly;
    }

    if (e.target.name === "ddlQuaterly") {
      setSelectedQuaterlyType(e.target.value);
      e.target.value === "select"
        ? (reportsError.selectedQuaterlyType = "Please select quaterly type")
        : delete reportsError.selectedQuaterlyType;
    }

    if (e.target.name === "ddlMonth") {
      setSelectedMonth(e.target.value);
      e.target.value === "select"
        ? (reportsError.selectedMonth = "Please select month")
        : delete reportsError.selectedMonth;
    }

    if (e.target.name === "ddlStartMonth") {
      setSelectedStartMonth(e.target.value);
      e.target.value === "select"
        ? (reportsError.selectedStartMonth = "Please select start month")
        : delete reportsError.selectedStartMonth;
    }

    if (e.target.name === "ddlEndMonth") {
      setSelectedEndMonth(e.target.value);
      e.target.value === "select"
        ? (reportsError.selectedEndMonth = "Please select end month")
        : delete reportsError.selectedEndMonth;
    }
  };

  const validateFilterType = () => {
    const errors = {};

    if (selectedFiscalYearType === "select")
      errors.selectedFiscalYearType = "Please select filter type";

    if (
      selectedYear === "select" &&
      (selectedFiscalYearType === "yearly" ||
        selectedFiscalYearType === "monthly" ||
        selectedFiscalYearType === "specificPeriods")
    )
      errors.selectedYear = "Please select year";

    if (
      selectedHalfYearly === "select" &&
      selectedFiscalYearType === "halfYearly"
    )
      errors.selectedHalfYearly = "Please select half-yearly";

    if (
      selectedQuaterlyType === "select" &&
      selectedFiscalYearType === "quaterly"
    )
      errors.selectedQuaterlyType = "Please select quterly type";

    if (selectedMonth === "select" && selectedFiscalYearType === "monthly")
      errors.selectedMonth = "Please select month";

    if (
      selectedStartMonth === "select" &&
      selectedFiscalYearType === "specificPeriods"
    )
      errors.selectedStartMonth = "Please select start month";

    if (
      selectedEndMonth === "select" &&
      selectedFiscalYearType === "specificPeriods"
    )
      errors.selectedEndMonth = "Please select end month";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleGenerateReports = (e) => {
    e.preventDefault();

    const errors = validateFilterType();
    setReportsError(errors || {});
    if (errors) return;

    // const newURL =
    //   selectedFiscalYearType === "yearly"
    //     ? (selectedFiscalYearType, selectedYear)
    //     : selectedFiscalYearType === "halfYearly"
    //     ? `halfYearly=${selectedHalfYearly}`
    //     : selectedFiscalYearType === "quaterly"
    //     ? `quaterly=${selectedQuaterlyType}`
    //     : selectedFiscalYearType === "monthly"
    //     ? (selectedFiscalYearType, selectedYear, selectedMonth)
    //     : selectedFiscalYearType === "specificPeriods"
    //     ? `year=${selectedYear}&startMonth=${selectedStartMonth}&endMonth=${selectedEndMonth}`
    // : "";

    reportCallback(selectedFiscalYearType, selectedYear, selectedMonth);
  };

  const displayTable = (e) => {
    e.preventDefault();
    reportDisplayType("table");
  };

  const displayChart = (e) => {
    e.preventDefault();
    reportDisplayType("chart");
  };

  const csvReport = {
    data: exportDatas,
    headers: exportHeader,
    filename: `${reportsType}_${fileFormat}.csv`,
  };

  const { addToast } = useToasts();

  const handleExportReports = (e) => {
    e.preventDefault();

    if (exportDatas.length === 0) {
      addToast("There is no data to export.", { appearance: "info" });
    } else {
      exportDatas && exportDatas.length > 0 && csvLink.current.link.click();
    }
  };

  return (
    <>
      <div className="tab-content__filter-content">
        <div className="tab-content__filter-content__filter-section">
          <Row>
            {/* Customize Report Section */}
            <Col xl={2} lg={3} md={3} sm={12} xs={12}>
              <InputFormGroup
                inputLabel={translation.CustomizeReports}
                inputName="ddlFiscalYearType"
              >
                <InputSelect
                  inputName="ddlFiscalYearType"
                  inputArray={fiscalYearType}
                  inputDefaultValue={selectedFiscalYearType}
                  inputChange={handleReportsChange}
                  inputErrorMessage={reportsError.selectedFiscalYearType}
                />
              </InputFormGroup>
            </Col>
            <Col
              xl={10}
              lg={9}
              md={9}
              sm={12}
              xs={12}
              // style={{ display: "flex" }}
            >
              <Row>
                {/* Year Dropdown */}
                <Col
                  xl={3}
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  style={{
                    display:
                      selectedFiscalYearType === "yearly" ||
                      selectedFiscalYearType === "monthly" ||
                      selectedFiscalYearType === "specificPeriods"
                        ? "block"
                        : "none",
                  }}
                >
                  <div className="tab-content__filter-content__yearly-section ">
                    <InputFormGroup
                      inputLabel={translation.Year}
                      inputName="ddlYear"
                    >
                      <InputSelect
                        inputName="ddlYear"
                        inputArray={yearsData}
                        inputDefaultValue={selectedYear}
                        inputChange={handleReportsChange}
                        inputErrorMessage={reportsError.selectedYear}
                      />
                    </InputFormGroup>
                  </div>
                </Col>

                {/* Monthly Dropdown */}
                <Col
                  xl={3}
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  style={{
                    display:
                      selectedFiscalYearType === "monthly" ? "block" : "none",
                  }}
                >
                  <div className="tab-content__filter-content__monthly-section">
                    <InputFormGroup
                      inputLabel={translation.Month}
                      inputName="ddlMonth"
                    >
                      <InputSelect
                        inputName="ddlMonth"
                        inputArray={monthsData}
                        inputDefaultValue={selectedMonth}
                        inputChange={handleReportsChange}
                        inputErrorMessage={reportsError.selectedMonth}
                      />
                    </InputFormGroup>
                  </div>
                </Col>

                {/* Genereate Report Section */}
                <Col
                  xl={3}
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  className="generate-report"
                >
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleGenerateReports}
                  >
                    {translation.GenerateReports}{" "}
                  </button>
                </Col>
              </Row>
              <Row>
                <Col
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className="export-reports reports-category"
                >
                  {exportDatas && (
                    <CSVLink
                      {...csvReport}
                      ref={csvLink}
                      target="_blank"
                    ></CSVLink>
                  )}
                  {/* <button type="button" className="btn btn-primary ">
                    Export Reports
                  </button> */}
                  <ButtonGroup className="reports-category__icon-group">
                    {reportsType !== "Grocery_Report" && (
                      <>
                        <Button
                          className="reports-category__table"
                          title="Table"
                          onClick={displayTable}
                        >
                          <span className="reports-category__table__icon"></span>
                        </Button>
                        <Button
                          className="reports-category__graph"
                          title="Chart"
                          onClick={displayChart}
                        >
                          <span className="reports-category__graph__icon"></span>
                        </Button>
                      </>
                    )}

                    <Button
                      className="reports-category__export"
                      title="Export File"
                      onClick={handleExportReports}
                    >
                      <span className="reports-category__export__icon"></span>
                    </Button>
                  </ButtonGroup>
                  <br />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default FilterReports;
