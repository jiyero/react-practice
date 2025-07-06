import React from "react";

const Dropdown = ({ setGenreId, genresList }) => {
  const changeFunc = (e) => {
    setGenreId(e.target.value);
  };
  return (
    <>
      <select id="genreDropdown" className="text-white " onChange={changeFunc}>
        <option value=""> Select Genre</option>
        {genresList.map((genres) => (
          <option key={genres.id} value={genres.id}>
            {genres.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
