import Headerbox from "./Headerbox";
import "./Filmpage.css"
import {useState } from "react";
const watchlist_films_of_user = Array(19).fill(0);
const allfilms = watchlist_films_of_user.map((item) => <a href="www.google.com" className="childfilm">{item}</a>)
const username = "{insert_user}";

function Watchlist(){

    const [rating, setRating] = useState(0);
    const [genre, setGenre] = useState(0);
    const [released,setReleased] = useState(0);
    

    return(
        <>
        <div className="criteraselectorbox">
            <div className="userheading">Movies {username} wants to watch</div>
            <div className="rightsideflex">
            <h3 className="criteriachild">sort by</h3>
            <div className="criteriachild">Genre</div>
            <div className="criteriachild">Released</div>
            <div className="criteriachild">Rating</div>
            </div>
        </div>
        <div className="filmcontainer">
            {allfilms}
        </div>
        </>
    )
}
export default Watchlist;