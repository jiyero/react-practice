import React from "react";
import Dropdown from "./components/dropdown/Dropdown";

const LangguageDropdown = ({ setLanguage, languagesList }) => {
  const options = (
    <>
      <option value="">Select Language</option>
      {languagesList.map((languages) => (
        <option key={languages.iso_639_1} value={languages.iso_639_1}>
          {languages.english_name}
        </option>
      ))}
    </>
  );

  return (
    <Dropdown options={options} onChange={(e) => setLanguage(e.target.value)} />
  );
};

export default LangguageDropdown;
