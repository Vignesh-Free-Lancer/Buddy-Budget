import React from "react";

const InputRadio = ({
  inputRadioType = "",
  inputLabel,
  inputName,
  inputId,
  inputErrorMessage,
  inputValue,
  inputChange = () => {},
  inputDataValue,
  inputDisableOption = false,
}) => {
  return (
    <div className={`form-check ${inputRadioType}`}>
      <input
        className={`form-check-input ${inputErrorMessage ? "is-invalid" : ""}`}
        type="radio"
        name={inputName}
        id={inputId}
        value={inputValue}
        onChange={inputChange}
        checked={inputDataValue === inputValue ? true : false}
      />
      <label className="form-check-label" htmlFor={inputName}>
        {inputLabel}
      </label>
    </div>
  );
};

export default InputRadio;
