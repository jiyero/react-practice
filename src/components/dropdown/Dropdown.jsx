import React from "react";

const Dropdown = ({ options, onChange }) => {
  return (
    <>
      <select id="genreDropdown" className="text-white " onChange={onChange}>
        {options}
      </select>
    </>
  );
};

export default Dropdown;
