import React from "react";

const InputText = ({
  inputName,
  inputType = "text",
  inputClassName = "",
  placeholderName,
  inputAlignment = "",
  inputErrorMessage,
  inputChange = () => {},
  inputBlur = () => {},
  inputFocus = () => {},
  inputValue,
  inputDisableOption = false,
}) => {
  return (
    <>
      <input
        name={inputName}
        type={inputType}
        className={`form-control ${inputClassName} ${
          inputErrorMessage ? "is-invalid" : ""
        }`}
        placeholder={placeholderName}
        onChange={inputChange}
        onBlur={inputBlur}
        onFocus={inputFocus}
        value={inputValue}
        style={{ textAlign: inputAlignment }}
        disabled={inputDisableOption}
      />
      {inputErrorMessage && (
        <div className="invalid-feedback">{inputErrorMessage}</div>
      )}
    </>
  );
};

export default InputText;
