import Headerbox from "./Headerbox";
import "./Filmpage.css"
import {useState } from "react";
const films = Array(150).fill(0);
const allfilms = films.map((item) => <a href="www.google.com" className="childfilm">{item}</a>
)

function Filmpage(){

    const [rating, setRating] = useState(0);
    const [genre, setGenre] = useState(0);
    const [released,setReleased] = useState(0);
    

    return(
        <>
        <Headerbox></Headerbox>
        <div className="criteraselectorbox">
            <h3 className="criterachild">sort by</h3>
            <div className="criterachild">Genre</div>
            <div className="criterachild">Released</div>
            <div className="criterachild">Rating</div>
        </div>
        <div className="filmcontainer">
            {allfilms}
        </div>
        </>
    )
}
export default Filmpage;