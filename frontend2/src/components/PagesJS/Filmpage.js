import "../StyleCSS/Filmpage.css";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";


async function getgenre(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/moviegenre/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}


const films = Array(33).fill();
const genres = Array(5).fill("Crime");
const decades = Array(10).fill(2020);
const ratings = Array(5).fill(0);
const allfilms = films.map((item, index) => (
  <Link
    to="/"
    className="film-page__child"
    key={index}
  >
    <div className="film-card">
      <h3 className="film-card__title">Film {index + 1}</h3>
      <p className="film-card__info">Genre: {genres[index % genres.length]}</p>
      <p className="film-card__info">Year: {decades[index % decades.length]}</p>
      <p className="film-card__info">Rating: {ratings[index % ratings.length]}</p>
    </div>
  </Link>
));

function Filmpage() {
  const [rating, setRating] = useState(0);
  const [genre, setGenre] = useState(0);
  const [year, setYear] = useState(0);
  const [filmName, setFilmName] = useState("");

  const allgenres = genres.map((item, index) => (
    <div
      className="film-page-criteria-dropdown__element"
      onClick={() => console.log(getgenre(23))}
      key={index}
    >
      {item}
    </div>
  ));

  const alldecades = decades.map((item, index) => (
    <div
      className="film-page-criteria-dropdown__element"
      onClick={() => setYear(item - index * 10)}
      key={index}
    >
      {item - index * 10}s
    </div>
  ));

  const allratings = ratings.map((_, index) => (
    <div
      className="film-page-criteria-dropdown__element"
      onClick={() => setRating(6 - (index + 1))}
      key={index}
    >
      {6 - (index + 1)} stars
    </div>
  ));

  return (
    <>
      <form
        className="film-page-criteria-selectorbox"
        onSubmit={(event) => alert(filmName)}
      >
        <label className="film-page-criteria-selectorbox__element">Find a film</label>
        <div className="film-page-criteria-selectorbox__element film-page-search">
          <input
            className="film-page-criteria-selectorbox__element film-page-search-bar"
            type="text"
            name="hello"
            onChange={(event) => setFilmName(event.target.value)}
          />
          <input
            type="submit"
            value="Search"
            className="film-page-criteria-selectorbox__element film-page-search-button"
          />
        </div>
        <div className="film-page-criteria-selectorbox__element">
          <button className="film-page-criteria-dropdown__button film-page-genre-criteria">
            Genre
          </button>
          <div className="film-age-criteria-dropdown">{allgenres}</div>
        </div>
        <div className="film-page-criteria-selectorbox__element">
          <button className="film-page-criteria-dropdown__button film-page-genre-criteria">
            Year
          </button>
          <div className="film-age-criteria-dropdown">{alldecades}</div>
        </div>
        <div className="film-page-criteria-selectorbox__element">
          <button className="film-page-criteria-dropdown__button film-page-genre-criteria">
            Rating
          </button>
          <div className="film-age-criteria-dropdown">
            <div
              className="film-page-criteria-dropdown__element"
              onClick={() => console.log(genre + " " + year + " " + rating)}
            >
              Highest
            </div>
            {allratings}
            <div className="film-page-criteria-dropdown__element">Lowest</div>
          </div>
        </div>
      </form>
      <div className="film-page-outer-container">
        <h2 className="film-page-outer-heading">All Films</h2>
        <div className="film-page-container">{allfilms}</div>
      </div>
    </>
  );
}

export default Filmpage;