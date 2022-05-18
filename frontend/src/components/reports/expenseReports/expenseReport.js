import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { monthsData } from "../../../utils/customData";
import { numberFormat } from "../../../utils/common";

import CustomChart from "../../reportCharts/customChart";

import { getExpenseReportAction } from "../../../redux/actions/reportAction";
import { useToasts } from "react-toast-notifications";
import useTranslation from "../../../hooks/translation";

const FilterReports = lazy(() => import("../filterReports"));
const ExpenseReportDatas = lazy(() => import("./expenseReportTable"));

const Loading = lazy(() => import("../../loading/loading"));

const ExpenseReport = () => {
  // Declare Redux-Dispatch Method
  const dispatch = useDispatch();
  const translation = useTranslation();

  const callbackGetReport = (selectedType, year, month) => {
    dispatch(getExpenseReportAction(selectedType, year, month));
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

  // Get Reports Data From Redux State
  const expenseReportResponse = useSelector(
    (state) => state.expenseReportsData
  );
  const { loading, error, expenseReports } = expenseReportResponse;

  const { addToast } = useToasts();
  useEffect(() => {
    if (error) addToast(error, { appearance: "error" });

    if (expenseReports && expenseReports.totalReportLength > 0)
      addToast(expenseReports.message, { appearance: "success" });

    if (expenseReports && expenseReports.totalReportLength === 0)
      addToast(expenseReports.message, { appearance: "info" });

    return () => {
      delete expenseReportResponse.error;
      delete expenseReportResponse.expenseReports;
    };
  }, [expenseReportResponse, error, expenseReports, addToast]);

  const getExpenseReportsData = () => {
    const exportExpenseReportDatas =
      expenseReports && expenseReports.expenseReportResults;

    exportExpenseReportDatas &&
      monthsData.map((month, i) =>
        exportExpenseReportDatas.map((data, j) =>
          parseInt(month.value) === parseInt(data.month)
            ? (data.month = month.name)
            : data.month
        )
      );

    const expenseDatas = expenseReports && expenseReports.groupedExpenseData;

    expenseDatas &&
      monthsData.map((month, i) =>
        expenseDatas.map((data, j) =>
          parseInt(month.value) === parseInt(data.month)
            ? (data.month = month.name)
            : data.month
        )
      );

    // Get Count Of Total Records After Filtering, Sorting, Paginating
    const totalExpenseReportRecordsCount =
      expenseReports && expenseReports.totalReportLength
        ? expenseReports.totalReportLength
        : 0;

    return {
      exportExpenseReportDatas,
      expenseDatas,
      totalExpenseReportRecordsCount,
    };
  };

  const { exportExpenseReportDatas, expenseDatas } = getExpenseReportsData();

  // Heading Object For Export Property
  const headerColumns = [
    {
      key: "month",
      label: translation.Month,
    },
    {
      key: "particular",
      label: translation.Particulars,
    },
    {
      key: "estimatedCost",
      label: translation.EstimatedCost,
    },
    {
      key: "actualCost",
      label: translation.ActualCost,
    },
    {
      key: "paymentType",
      label: translation.PaymentType,
    },
    {
      key: "paymentBank",
      label: translation.PaymentBank,
    },
    {
      key: "paymentDate",
      label: translation.PaymentDate,
    },
    {
      key: "description",
      label: translation.Description,
    },
  ];

  return (
    <>
      <FilterReports
        reportsType="Expense_Report"
        reportCallback={callbackGetReport}
        reportDisplayType={displayReportTpe}
        exportHeader={headerColumns}
        exportDatas={exportExpenseReportDatas}
      />
      {loading && <Loading />}
      {showTable && (
        <div className="tab-content__expense-content__results mt-4">
          <ExpenseReportDatas
            reportLists={expenseDatas}
            listErrorMessage={
              expenseReports && expenseReports.totalReportLength === 0
                ? expenseReports.message
                : "There is no data to display"
            }
          />
          {expenseReports && expenseReports.yearlyExpensesReport && (
            <div className="total-summary-report">
              {expenseReports.yearlyExpensesReport.map((data) => (
                <>
                  <div className="total-summary-report__sub-head">
                    <p className="total-summary-report__title">
                      {translation.TotalExpenseAmount}:{"   "}
                    </p>
                    <p className="total-summary-report__results total-summary-report__results-minus">
                      {" "}
                      {numberFormat(data.totalYearlyExpenseAmount)}
                    </p>
                  </div>
                </>
              ))}
            </div>
          )}
          {expenseReports &&
            expenseReports.monthlyExpensesReport &&
            expenseReports.monthlyExpensesReport.length === 1 && (
              <div className="total-summary-report">
                {expenseReports.monthlyExpensesReport.map((data) => (
                  <>
                    <div className="total-summary-report__sub-head">
                      <p className="total-summary-report__title">
                        {translation.TotalExpenseAmount}:{" "}
                      </p>
                      <p className="total-summary-report__results total-summary-report__results-minus">
                        {numberFormat(data.totalMonthlyExpenseAmount)}
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
          customClassName="report-charts__expense-chart"
          chartTitle="Expense Report"
          chartData={expenseReports && expenseReports.chartData}
        />
      )}
    </>
  );
};

export default ExpenseReport;
