import React, { lazy, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { monthsData } from "../../../utils/customData";
import { numberFormat } from "../../../utils/common";

import { getGroceryReportAction } from "../../../redux/actions/reportAction";
import { useToasts } from "react-toast-notifications";
import useTranslation from "../../../hooks/translation";

const FilterReports = lazy(() => import("../filterReports"));
const GroceryReportDatas = lazy(() => import("./groceryReportTable"));

const Loading = lazy(() => import("../../loading/loading"));

const GroceryReport = () => {
  // Declare Redux-Dispatch Method
  const dispatch = useDispatch();
  const translation = useTranslation();

  // Declare React-Router History
  // const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(getGroceryReportAction());
  // }, [navigate, dispatch]);

  const callbackGetReport = (selectedType, year, month) => {
    dispatch(getGroceryReportAction(selectedType, year, month));
  };

  // Get Reports Data From Redux State
  const groceryReportResponse = useSelector(
    (state) => state.groceryReportsData
  );
  const { loading, error, groceryReports } = groceryReportResponse;

  const { addToast } = useToasts();
  useEffect(() => {
    if (error) addToast(error, { appearance: "error" });

    if (groceryReports && groceryReports.totalReportLength > 0)
      addToast(groceryReports.message, { appearance: "success" });

    if (groceryReports && groceryReports.totalReportLength === 0)
      addToast(groceryReports.message, { appearance: "info" });

    return () => {
      delete groceryReportResponse.error;
      delete groceryReportResponse.groceryReports;
    };
  }, [groceryReportResponse, error, groceryReports, addToast]);

  const getGroceryReportsData = () => {
    const exportGroceryReportDatas =
      groceryReports && groceryReports.groceryReportResults;

    exportGroceryReportDatas &&
      monthsData.map((month, i) =>
        exportGroceryReportDatas.map((data, j) =>
          parseInt(month.value) === parseInt(data.month)
            ? (data.month = month.name)
            : data.month
        )
      );

    const groceryDatas = groceryReports && groceryReports.groupedGroceryData;

    groceryDatas &&
      monthsData.map((month, i) =>
        groceryDatas.map((data, j) =>
          parseInt(month.value) === parseInt(data.month)
            ? (data.month = month.name)
            : data.month
        )
      );

    // Get Count Of Total Records After Filtering, Sorting, Paginating
    const totalGroceryReportRecordsCount =
      groceryReports && groceryReports.totalReportLength
        ? groceryReports.totalReportLength
        : 0;

    return {
      exportGroceryReportDatas,
      groceryDatas,
      totalGroceryReportRecordsCount,
    };
  };

  const { exportGroceryReportDatas, groceryDatas } = getGroceryReportsData();

  // Heading Object For Export Property
  const headerColumns = [
    {
      key: "month",
      label: translation.Month,
    },
    {
      key: "particulars",
      label: translation.Particulars,
    },
    {
      key: "qty",
      label: translation.Quantity,
    },
    {
      key: "unitPrice",
      label: translation.UnitPrice,
    },
    {
      key: "totalPrice",
      label: translation.TotalPrice,
    },
  ];

  return (
    <>
      <FilterReports
        reportsType="Grocery_Report"
        reportCallback={callbackGetReport}
        exportHeader={headerColumns}
        exportDatas={exportGroceryReportDatas}
      />
      {loading && <Loading />}
      <div className="tab-content__grocery-content__results mt-4">
        <GroceryReportDatas
          reportLists={groceryDatas}
          listErrorMessage={
            groceryReports && groceryReports.totalReportLength === 0
              ? groceryReports.message
              : "There is no data to display"
          }
        />
        {groceryReports && groceryReports.yearlyGroceryReport && (
          <div className="total-summary-report">
            {groceryReports.yearlyGroceryReport.map((data) => (
              <>
                <div className="total-summary-report__sub-head">
                  <p className="total-summary-report__title">
                    {translation.TotalGroceryAmount}:{"   "}
                  </p>
                  <p className="total-summary-report__results total-summary-report__results-minus">
                    {" "}
                    {numberFormat(data.totalYearlyGroceryAmount)}
                  </p>
                </div>
              </>
            ))}
          </div>
        )}
        {groceryReports &&
          groceryReports.monthlyGroceryReport &&
          groceryReports.monthlyGroceryReport.length === 1 && (
            <div className="total-summary-report">
              {groceryReports.monthlyGroceryReport.map((data) => (
                <>
                  <div className="total-summary-report__sub-head">
                    <p className="total-summary-report__title">
                      {translation.TotalGroceryAmount}:{" "}
                    </p>
                    <p className="total-summary-report__results total-summary-report__results-minus">
                      {numberFormat(data.totalMonthlyGroceryAmount)}
                    </p>
                  </div>
                </>
              ))}
            </div>
          )}
      </div>
    </>
  );
};

export default GroceryReport;
