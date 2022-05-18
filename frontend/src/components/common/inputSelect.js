import React from "react";

const InputSelect = ({
  inputName,
  inputClassname = "",
  inputArray,
  inputDefaultValue,
  inputChange,
  inputErrorMessage,
  inputDisableOption = false,
}) => {
  return (
    <>
      <select
        name={inputName}
        className={`form-control ${inputClassname} ${
          inputErrorMessage ? "is-invalid" : ""
        }`}
        value={inputDefaultValue}
        onChange={inputChange}
      >
        <option value="select">Please select...</option>
        {inputArray.map((input, key) => {
          return (
            <option key={key} value={input.value}>
              {input.name}
            </option>
          );
        })}
      </select>
      <div className="invalid-feedback">{inputErrorMessage}</div>
    </>
  );
};

export default InputSelect;
