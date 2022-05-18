import React from "react";

const InputFormGroup = ({
  inputCustomClasses = "mb-3",
  inputLabel,
  inputName,
  children,
}) => {
  return (
    <div className={`form-group ${inputCustomClasses}`}>
      <label
        htmlFor={inputName}
        className="form-label"
        style={{ display: "block" }}
      >
        {inputLabel}
      </label>
      {children}
    </div>
  );
};

export default InputFormGroup;
