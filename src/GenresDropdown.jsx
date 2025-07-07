import React from "react";
import Dropdown from "./components/dropdown/Dropdown";

const GenresDropdown = ({ genresList, setGenreId }) => {
  const options = (
    <>
      <option value=""> Select Genre</option>
      {genresList.map((genres) => (
        <option key={genres.id} value={genres.id}>
          {genres.name}
        </option>
      ))}
    </>
  );

  return (
    <Dropdown options={options} onChange={(e) => setGenreId(e.target.value)} />
  );
};

export default GenresDropdown;
