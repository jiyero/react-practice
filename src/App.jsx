import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import Dropdown from "./components/Dropdown";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [noMovies, setNoMovies] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [genreId, setGenreId] = useState("");
  const [genresList, setGenresList] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${currentPage}&with_genres=${genreId}`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
      }
      setMovieList(data.results || []);

      if (data.results.length === 0) {
        setNoMovies("No Movies");
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const genreAPI = "https://api.themoviedb.org/3/genre/movie/list";
      const response = await fetch(genreAPI, API_OPTIONS);
      const { genres } = await response.json();
      setGenresList(genres);
    } catch (error) {
      console.error(`Error fetching genres: ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, currentPage, genreId]);

  useEffect(() => {
    fetchGenres();
  }, []);
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
            <Spinner className="" />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : noMovies ? (
            <p className="text-white">{noMovies}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </ul>
          )}
        </section>
        <div className="text-white flex p-5">
          <button
            type="button"
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          >
            &lt;
          </button>
          <p className="mx-10 border rounded-sm p-3"> {currentPage} </p>
          <button
            type="button"
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            {" "}
            &gt;
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
