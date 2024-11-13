import "./Filmpage.css"
import {useState } from "react";
import { Outlet,Link } from "react-router-dom";
const films = Array(33).fill();

const genres = Array(5).fill("Crime");

const decades = Array(10).fill(2020);

const ratings = Array(5).fill(0);

const allfilms = films.map((item) => <Link to= '/'className="film-page__child">{item}</Link>)

function Filmpage(){

    const [rating, setRating] = useState(0);
    const [genre, setGenre] = useState(0);
    const [Year,setYear] = useState(0);
    const [filmName,setFilmName] = useState("");

    const allgenres = genres.map((item) => 
        <>
        <div className="film-page-criteria-dropdown__element" onClick={() => setGenre(item)}>{item}</div>
        <hr></hr>
        </>
        )

    const alldecades = decades.map((item,index) => 
        <>
        <div className="film-page-criteria-dropdown__element" onClick={() => setYear(item - (index*10))}>{item - (index*10)}s</div>
        <hr></hr>
        </>
        )

    const allratings = ratings.map((_,index) => 
        <>
        <div className="film-page-criteria-dropdown__element" onClick={() => setRating(6-(index+1))}>{6-(index+1)}s</div>
        <hr></hr>
        </>)

    return(
        <>
        <form className="film-page-criteria-selectorbox" onSubmit={(event) => alert(filmName)}>
                <label className="film-page-criteria-selectorbox__element">Find a film</label>
                <div className="film-page-criteria-selectorbox__element film-page-search ">
                <input className="film-page-criteria-selectorbox__element film-page-search-bar" type="text" name="hello" onChange={(event) => setFilmName(event.target.value)}></input>
                <input type="submit" value="Search" className="film-page-criteria-selectorbox__element film-page-search-button"></input>
                </div>

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
                    <div className="film-page-criteria-dropdown__element" onClick={() =>console.log(genre + " " +Year + " " + rating)}>Highest</div>
                    <hr></hr>
                    {allratings}
                    <div className="film-page-criteria-dropdown__element">Lowest</div>
                    <hr></hr> 
                </div>
            </div>
        </form>

        <div className="film-page-outer-container">
            <span className="film-page-outer-heading"></span>
        <div className="film-page-container">
            {allfilms}
        </div>
        </div>
        </>
    )
}
export default Filmpage;