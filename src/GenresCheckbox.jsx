import React, { useState } from "react";

const GenresCheckbox = ({ genresList, setGenreId, genreId }) => {
  const handleChange = (e) => {
    if (e.target.checked === true) {
      setGenreId(e.target.value + "," + genreId);
    } else {
      setGenreId("");
    }
  };

  return (
    <div>
      <form>
        <div>
          {genresList.map((genres) => (
            <>
              <input
                type="checkbox"
                value={genres.id}
                id={genres.name}
                onChange={handleChange}
              />
              <label for={genres.name} className="text-white">
                {genres.name}
              </label>
            </>
          ))}
        </div>
      </form>
    </div>
  );
};

export default GenresCheckbox;
