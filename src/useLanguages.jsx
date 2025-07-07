import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const useLanguages = () => {
  const [languagesList, setLanguagesList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/configuration/languages",
          API_OPTIONS
        );
        const languages = await res.json();
        setLanguagesList(languages || []);
      } catch (err) {
        console.error("Error fetching languages:", err);
        setError("Failed to fetch languages");
      }
    };

    fetchLanguages();
  }, []);

  return { languagesList, error };
};
