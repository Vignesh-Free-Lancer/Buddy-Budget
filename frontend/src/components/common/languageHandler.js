import React from "react";
import { useLanguageContext } from "../../context/languageContext";

const LanguageHandler = () => {
  const { language, changeLanguage } = useLanguageContext();

  return (
    <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
      <option value="en">En- English</option>
      <option value="hi">Hn- Hindi</option>
    </select>
  );
};

export default LanguageHandler;
