import "./Filmpage.css"
import {useState } from "react";
const films = Array(33).fill();
const genres = Array(5).fill("Crime");
const decades = Array(10).fill(2020);
const ratings = Array(5).fill(0);
const allfilms = films.map((item) => <a href="www.google.com" className="film-page__child">{item}</a>)

function Filmpage(){

    const [rating, setRating] = useState(0);
    const [genre, setGenre] = useState(0);
    const [Year,setYear] = useState(0);

    const allgenres = genres.map((item) => 
        <div className="film-page-criteria-dropdown__element" onClick={() => setGenre(item)}>{item}</div>)

    const alldecades = decades.map((item,index) => 
        <div className="film-page-criteria-dropdown__element" onClick={() => setYear(item - (index*10))}>{item - (index*10)}s</div>)

    const allratings = ratings.map((_,index) => 
        <div className="film-page-criteria-dropdown__element" onClick={() => setRating(6-(index+1))}>{6-(index+1)}s</div>)

    return(
        <>
        <form className="film-page-criteria-selectorbox">
            <div className="film-page-criteria-selectorbox__element">
                <button className="film-page-criteria-dropdown__button film-page-genre-criteria">Genre</button>
                <div className="film-age-criteria-dropdown">
                    {allgenres}
                </div>
            </div>
            <div className="film-page-criteria-selectorbox__element">
            <button className="film-page-criteria-dropdown__button film-page-genre-criteria">Year</button>
                <div className="film-age-criteria-dropdown">
                    {alldecades}
                </div>
            </div>
            
            <div className="film-page-criteria-selectorbox__element">
            <button className="film-page-criteria-dropdown__button film-page-genre-criteria">Rating</button>
                <div className="film-age-criteria-dropdown">
                    <div className="film-page-criteria-dropdown__element" onClick={() =>console.log(genre + " " +Year + " " + rating)}>Highest Rating</div>
                    {allratings}
                    <div className="film-page-criteria-dropdown__element">Lowest Rating</div>
                </div>
            </div>
        </form>

        <div className="film-page-outer-container">
        <div className="film-page-container">
            {allfilms}
        </div>
        </div>
        </>
    )
}
export default Filmpage;