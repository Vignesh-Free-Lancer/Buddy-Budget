import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = ({ size = 50 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // width: "100%",
        // height: "100%",
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "30em",
        height: "18em",
        marginTop: "-9em",
        marginLeft: "-15em",
      }}
    >
      <Spinner
        style={{ width: size, height: size }}
        animation="border"
        variant="info"
      />
    </div>
  );
};

export default Loading;
