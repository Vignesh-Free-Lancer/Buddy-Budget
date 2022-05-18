import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiAlertTriangle, FiInfo } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";

import "../toast/toast-style.scss";

const CustomToastComponent = (props) => {
  const { appearance, children } = props;

  const [hideToast, setHideToast] = useState(false);

  // useEffect(() => {
  //   setTimeout(function () {
  //     setHideToast(true);
  //   }, 4000);
  // }, []);

  return (
    <>
      {(() => {
        if (appearance === "warning") {
          return (
            <div
              className="r-toast-container warning"
              style={{ display: hideToast ? "none" : "flex" }}
            >
              <div className="r-toast-container__icon">
                <FiAlertTriangle
                  onClick={() => setHideToast(true)}
                  style={{ cursor: "pointer" }}
                ></FiAlertTriangle>
              </div>
              <div className="r-toast-container__toast-content">{children}</div>
            </div>
          );
        } else if (appearance === "success") {
          return (
            <div
              className="r-toast-container success"
              style={{ display: hideToast ? "none" : "flex" }}
            >
              <div className="r-toast-container__icon">
                <FiCheckCircle
                  onClick={() => setHideToast(true)}
                  style={{ cursor: "pointer" }}
                ></FiCheckCircle>
              </div>
              <div className="r-toast-container__toast-content">{children}</div>
            </div>
          );
        } else if (appearance === "error") {
          return (
            <div
              className="r-toast-container error"
              style={{ display: hideToast ? "none" : "flex" }}
            >
              <div className="r-toast-container__icon">
                <RiCloseCircleLine
                  onClick={() => setHideToast(true)}
                  style={{ cursor: "pointer" }}
                ></RiCloseCircleLine>
              </div>
              <div className="r-toast-container__toast-content">{children}</div>
            </div>
          );
        } else if (appearance === "info") {
          return (
            <div
              className="r-toast-container info"
              style={{ display: hideToast ? "none" : "flex" }}
            >
              <div className="r-toast-container__icon">
                <FiInfo
                  onClick={() => setHideToast(true)}
                  style={{ cursor: "pointer" }}
                ></FiInfo>
              </div>
              <div className="r-toast-container__toast-content">{children}</div>
            </div>
          );
        }
      })()}
    </>
  );
};

export default CustomToastComponent;
