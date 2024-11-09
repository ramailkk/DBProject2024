import "./Filmpage.css"
import {useState } from "react";
const films = Array(150).fill(0);

const allfilms = films.map((item) => <a href="www.google.com" className="film-page__child">{item}</a>

)

function Filmpage(){

    const [rating, setRating] = useState(0);
    const [genre, setGenre] = useState(0);
    const [released,setReleased] = useState(0);

    return(
        <>

        <div className="film-page-criteria-selectorbox">
            <h3 className="film-page-criteria-selectorbox__element">sort by</h3>
            <div className="film-page-criteria-selectorbox__element">Genre</div>
            <div className="film-page-criteria-selectorbox__element">Released</div>
            <div className="film-page-criteria-selectorbox__element">Rating</div>
        </div>
        <div className="film-page-container">
            {allfilms}
        </div>
        </>
    )
}
export default Filmpage;