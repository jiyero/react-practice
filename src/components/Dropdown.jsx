import React from "react";

const Dropdown = ({ setGenreId, genresList }) => {
  const changeFunc = (e) => {
    setGenreId(e.target.value);
  };
  return (
    <>
      {/* <select id="genreDropdown" className="text-white" onChange={changeFunc}>
        <option value=""> Select Genre</option>
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="35">Comedy</option>
        <option value="80">Crime</option>
      </select> */}

      <select id="genreDropdown" className="text-white" onChange={changeFunc}>
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
