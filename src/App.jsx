// src/App.jsx
import React, { useState } from "react";
import { useDebounce } from "react-use";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import Dropdown from "./components/Dropdown";

import { useGenres } from "./useGenres";
import { useMovies } from "./useMovies";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [genreId, setGenreId] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const { genresList } = useGenres();
  const { movieList, isLoading, errorMessage, noMovies } = useMovies({
    query: debouncedSearchTerm,
    genreId,
    currentPage,
  });

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper flex justify-center items-center">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies </span>You'll enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <Dropdown setGenreId={setGenreId} genresList={genresList} />

        <section className="all-movies ">
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : noMovies ? (
            <p className="text-white">{noMovies}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>

        <div className="text-white flex p-5">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <p className="mx-10 border rounded-sm p-3"> {currentPage} </p>
          <button onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
        </div>
      </div>
    </main>
  );
};

export default App;
