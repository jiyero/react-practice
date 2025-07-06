// src/hooks/useMovies.js
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const useMovies = ({ query, genreId, currentPage }) => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [noMovies, setNoMovies] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setErrorMessage("");
      setNoMovies("");

      try {
        const endpoint = query
          ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              query
            )}`
          : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${currentPage}&with_genres=${genreId}`;

        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok) throw new Error("Failed to fetch movies");

        const data = await response.json();

        if (data.results?.length === 0) {
          setNoMovies("No Movies");
        }

        setMovieList(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setErrorMessage("Error fetching movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query, genreId, currentPage]);

  return { movieList, isLoading, errorMessage, noMovies };
};
