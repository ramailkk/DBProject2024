import React, { createContext, useContext, useState } from 'react';

const FilmContext = createContext();

export const FilmProvider = ({ children }) => {
  const [selectedFilm, setSelectedFilm] = useState(null);

  return (
    <FilmContext.Provider value={{ selectedFilm, setSelectedFilm }}>
      {children}
    </FilmContext.Provider>
  );
};

export const useFilm = () => useContext(FilmContext);