import Headerbox from "./Headerbox";
import "./Memberonly.css"

const popularMovies = Array(4).fill(0); // Replace with actual data if available
const newMovies = Array(4).fill(0); // Replace with actual data if available

function getgridMovies(array) {
    return array.map((_, index) => (
        <div key={index} className="child">Movie {index + 1}</div>
    ));
}

function Memberonly(){
    return(
    <>
    <Headerbox></Headerbox>    
    <div className="memberinformation">
        <div className="children leftside">
        <div className="picture"></div>
        <div className="profile name">Name</div>
        </div>
        <div className="children rightside">
        <div className="profile watched">0123<br></br>Films</div>
        <div className="profile reviewed">312<br></br>Reviews</div>
        </div>
    </div>




    <div className="connectionbox">
        <a href="google.com" className="link user_profile">Profile</a>
        <a href="google.com" className="link watched">Watched</a>
        <a href="google.com" className="link watchlist">Watchlist</a>
        <a href="google.com" className="link lists">Lists</a>
        <a href="google.com" className="link reviews">Reviews</a>
    </div>
    
   
   
    <div className="sidebyside">

    <div className='grid_container'>
    <h1 className='heading'>Favourites</h1>
    <hr></hr>
    <div className='grid popular_movie'>{getgridMovies(popularMovies)}</div>
    <h1 className='heading'>Recently Watched</h1>
    <hr></hr>
    <div className='grid new_movie'>{getgridMovies(newMovies)}</div>
    </div>



    <div className="reviewcontainer">
        <h1 className="heading">Recent Reviews</h1>
        <div className="review one">
            <div className="rev poster"></div>
            {/* <div className="rev rating">4/5</div> */}
            <div className="rev comment">This movie sucks big dodo ass like holy shit</div>
            
    </div>
    <div className="review one">
            <div className="rev poster"></div>
            {/* <div className="rev rating">4/5</div> */}
            <div className="rev comment">This movie sucks big dodo ass like holy shit</div>
            
    </div>
    <div className="review one">
            <div className="rev poster"></div>
            {/* <div className="rev rating">4/5</div> */}
            <div className="rev comment">This movie sucks big dodo ass like holy shit</div>
            
    </div>
    </div>
    </div>

    </>   
    )
}
export default Memberonly