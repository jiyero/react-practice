// src/hooks/useGenres.js
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const useGenres = () => {
  const [genresList, setGenresList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list",
          API_OPTIONS
        );
        const { genres } = await res.json();
        setGenresList(genres || []);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setError("Failed to fetch genres");
      }
    };

    fetchGenres();
  }, []);

  return { genresList, error };
};
