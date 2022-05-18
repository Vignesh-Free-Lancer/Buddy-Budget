import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { monthsData } from "../../../utils/customData";
import { numberFormat } from "../../../utils/common";

import CustomChart from "../../reportCharts/customChart";

import { getSalaryReportAction } from "../../../redux/actions/reportAction";
import { useToasts } from "react-toast-notifications";
import useTranslation from "../../../hooks/translation";

const FilterReports = lazy(() => import("../filterReports"));
const SalaryReportResults = lazy(() => import("./salaryReportResults"));

const Loading = lazy(() => import("../../loading/loading"));

const SalaryReport = () => {
  // Declare Redux-Dispatch Method
  const dispatch = useDispatch();
  const translation = useTranslation();

  // Table Sort Order
  const [salaryReportSortColumn, setsalaryReportSortColumn] = useState({
    path: "month",
    order: "asc",
  });

  const callbackGetReport = (selectedType, year, month) => {
    dispatch(getSalaryReportAction(selectedType, year, month));
  };

  const [showTable, setShowTable] = useState(true);
  const [showChart, setShowChart] = useState(false);

  const displayReportTpe = (type) => {
    if (type === "table") {
      setShowChart(false);
      setShowTable(true);
    } else if (type === "chart") {
      setShowTable(false);
      setShowChart(true);
    } else {
      setShowTable(false);
      setShowChart(false);
    }
  };

  // Table Sort Method
  const handleSalaryReportTableSort = (sortHeader) => {
    setsalaryReportSortColumn(sortHeader);
  };

  // Get Reports Data From Redux State
  const salaryReportsResponse = useSelector((state) => state.salaryReportsData);
  const { loading, error, salaryReports } = salaryReportsResponse;

  const { addToast } = useToasts();
  useEffect(() => {
    if (error) addToast(error, { appearance: "error" });

    if (salaryReports && salaryReports.totalReportsLength > 0)
      addToast(salaryReports.message, { appearance: "success" });

    if (salaryReports && salaryReports.totalReportsLength === 0)
      addToast(salaryReports.message, { appearance: "info" });

    return () => {
      delete salaryReportsResponse.error;
      delete salaryReportsResponse.salaryReports;
    };
  }, [salaryReportsResponse, error, salaryReports, addToast]);

  const getSalaryReportsData = () => {
    // Here Sorting Table Based on Header(Path) with the use of lodash
    // const sortedSalaryReportDatas =
    //   salaryReports &&
    //   _.orderBy(
    //     salaryReports.salaryReportResults,
    //     [salaryReportSortColumn.path],
    //     [salaryReportSortColumn.order]
    //   );

    const sortedSalaryReportDatas =
      salaryReports && salaryReports.salaryReportResults;

    sortedSalaryReportDatas &&
      monthsData.map((month, i) =>
        sortedSalaryReportDatas.map((data, j) =>
          parseInt(month.value) === parseInt(data.month)
            ? (data.month = month.name)
            : data.month
        )
      );

    return { sortedSalaryReportDatas };
  };

  const { sortedSalaryReportDatas } = getSalaryReportsData();

  // Heading Object For Export Property
  const headerColumns = [
    {
      key: "month",
      label: translation.Month,
    },
    {
      key: "monthlySalary",
      label: translation.Salary,
    },
    {
      key: "bonusAmount",
      label: translation.Bonus,
    },
    {
      key: "otherAllowance",
      label: translation.ExtraAllowance,
    },
    {
      key: "totalCR",
      label: translation.TotalCR,
    },
    {
      key: "pf",
      label: translation.PF,
    },
    {
      key: "incomeTax",
      label: translation.IncomeTax,
    },
    {
      key: "professionalTax",
      label: translation.ProfessionalTax,
    },
    {
      key: "otherDeductions",
      label: translation.OtherDeductions,
    },
    {
      key: "totalDR",
      label: translation.TotalDR,
    },
    {
      key: "netPayAmount",
      label: translation.NetAmount,
    },
  ];

  return (
    <>
      <FilterReports
        reportsType="Salary_Report"
        reportCallback={callbackGetReport}
        reportDisplayType={displayReportTpe}
        exportHeader={headerColumns}
        exportDatas={sortedSalaryReportDatas}
      />
      {loading && <Loading />}
      {showTable && (
        <div className="tab-content__salary-content__results mt-4">
          <SalaryReportResults
            reportLists={sortedSalaryReportDatas}
            sortColumn={salaryReportSortColumn}
            onSort={handleSalaryReportTableSort}
            listErrorMessage={
              salaryReports && salaryReports.totalReportLength === 0
                ? salaryReports.message
                : "There is no data to display"
            }
          />
          {salaryReports && salaryReports.sumOfSalaryReportData && (
            <div className="total-summary-report">
              {salaryReports.sumOfSalaryReportData.map((data) => (
                <>
                  <div className="total-summary-report__sub-head">
                    <p className="total-summary-report__title">
                      {translation.TotalCreditedAmount}:{" "}
                    </p>
                    <p className="total-summary-report__results total-summary-report__results-plus">
                      {numberFormat(data.totalCRAmount)}
                    </p>
                  </div>
                  <div className="total-summary-report__sub-head">
                    <p className="total-summary-report__title">
                      {translation.TotalDebitedAmount}:{" "}
                    </p>
                    <p className="total-summary-report__results total-summary-report__results-minus">
                      {numberFormat(data.totalDRAmount)}
                    </p>
                  </div>
                  <div className="total-summary-report__sub-head">
                    <p className="total-summary-report__title">
                      {translation.TotalNetAmount}:{" "}
                    </p>
                    <p className="total-summary-report__results total-summary-report__results-plus">
                      {numberFormat(data.totalNetPayAmount)}
                    </p>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      )}

      {showChart && (
        <CustomChart
          customClassName="report-charts__salary-chart"
          chartTitle="Salary Report"
          chartData={salaryReports && salaryReports.chartData}
        />
      )}
    </>
  );
};

export default SalaryReport;
