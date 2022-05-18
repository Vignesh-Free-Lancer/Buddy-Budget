import React from "react";

const InputCheckbox = ({
  inputCheckboxType = "",
  inputName,
  inputId,
  inputErrorMessage,
  inputValue,
  inputChange,
  inputDisabled,
}) => {
  return (
    <div
      className={`form-check ${inputCheckboxType} user-status`}
      style={{ display: "inline-block" }}
    >
      <input
        className={`form-check-input ${inputErrorMessage ? "is-invalid" : ""}`}
        type="checkbox"
        role="switch"
        id={inputId}
        name={inputName}
        checked={inputValue ? true : false}
        onChange={inputChange}
        disabled={inputDisabled}
      />
    </div>
  );
};

export default InputCheckbox;
