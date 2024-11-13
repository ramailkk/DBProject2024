import "./Memberonly.css"

const popularMovies = Array(4).fill(0); // Replace with actual data if available
const newMovies = Array(4).fill(0); // Replace with actual data if available


function getgridMovies(array) {
    return array.map((_, index) => (
        <div key={index} className="member-information-grid__element">Movie {index + 1}</div>
    ));
}

const recentReviews = Array(3).fill("");
// index.picture
// index.description
// index.review

function getrecentReviews(array) {
    return array.map((_, index) => (
        <div key={index} className="member-information-review__element">
        <div className="member-information-review-poster"></div>
        {/* <div className="rev rating">4/5</div> */}
        <div className="member-information-review-comment">This movie sucks big dodo ass like holy shit</div>
    </div>
    ));
}

function Memberonly(){
    return(
    <>

    {/* Topmost bar with user information */}
    <div className="member-information-userbox">
        <div className="member-information-userbox-left">
        <div className="member-information-profile single-member-picture"></div>
        <div className="member-information-profile single-member-name">Name</div>
        </div>
        <div className="member-information-userbox-right">
        <div className="member-information-profile single-member-watchedcount">0123</div>
        <div className="member-information-profile single-member-reviewcount">312</div>
        </div>
    </div>


{/* Below the top bar which contains links to other user specific pages */}
    <div className="member-information-connectionbox">
        <a href="google.com" className="member-information-connectionbox__element user_profile">Profile</a>
        <a href="google.com" className="member-information-connectionbox__element watched">Watched</a>
        <a href="google.com" className="member-information-connectionbox__element watchlist">Watchlist</a>
        <a href="google.com" className="member-information-connectionbox__element lists">Lists</a>
        <a href="google.com" className="member-information-connectionbox__element reviews">Reviews</a>
    </div>


    {/* two-structure-row-flex which seperates movies and reviews of a user */}
    <div className="member-information-two-structure-row-flex">


    {/*left side of the flex: movie-portion */}
    
    <div className='member-information-left-side-container'>
    
    {/* Favourite movies of a user */}
    <h1 className='member-information-left-side__heading'>Favourites</h1>
    <hr className="member-information-left-side__headingline"></hr>
    <div className='member-information-left-side__grid single-popular-grid'>{getgridMovies(popularMovies)}</div>

    {/* Recent movies of a user */}
    <h1 className='member-information-left-side__heading'>Recently Watched</h1>
    <hr className="member-information-left-side__headingline"></hr>
    <div className='member-information-left-side__grid single-recent-grid'>{getgridMovies(newMovies)}</div>
    
    </div>

    {/* right side of the flex: review-portion */}
    <div className="member-information-review-container">
        {getrecentReviews(recentReviews)}
    </div>
    </div>

    </>   
    )
}
export default Memberonly