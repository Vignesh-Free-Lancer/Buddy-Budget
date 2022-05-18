import React, { useState } from "react";
import "./report-charts.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

import { monthsData } from "../../utils/customData";
import { Button, ButtonGroup } from "react-bootstrap";

const CustomChart = (props) => {
  const { customClassName, chartData } = props;

  const [chartType, setChartType] = useState("bar");

  chartType === "bar"
    ? ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      )
    : ChartJS.register(ArcElement, Tooltip, Legend);

  const labels = monthsData.map(({ name }) => name);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display:
          chartType === "bar"
            ? false
            : chartData && chartData.length > 0
            ? true
            : false,
        position: "top",
      },
      title: {
        display: true,
        text: "",
        fontSize: "42",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: chartData ? chartData : [],
        backgroundColor: [
          "#F2CC59",
          "#BA68C8",
          "#407BFF",
          "#E6E5E6",
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderColor: [
          "#F2CC59",
          "#BA68C8",
          "#407BFF",
          "#E6E5E6",
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`report-charts ${customClassName}`}>
      <ButtonGroup className="report-charts__icon-group">
        <Button
          className="report-charts__bar-chart"
          title="Bar Chart"
          onClick={() => setChartType("bar")}
        >
          <span className="report-charts__bar-chart__icon"></span>
        </Button>
        <Button
          className="report-charts__doughnut-chart"
          title="Doughnut Chart"
          onClick={() => setChartType("doughnut")}
        >
          <span className="report-charts__doughnut-chart__icon"></span>
        </Button>
      </ButtonGroup>

      {chartType === "bar" ? (
        <Bar options={options} data={data} />
      ) : (
        <Doughnut options={options} data={data} />
      )}
    </div>
  );
};

export default CustomChart;
