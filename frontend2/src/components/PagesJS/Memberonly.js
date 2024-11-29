import "../StyleCSS/Memberonly.css";
import { useSelectedMember } from './SelectedMemberContext.js';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

    const { selectedMember } = useSelectedMember();
    console.log(selectedMember?.userId); // Safely log userId
    const { setSelectedMember } = useSelectedMember();
    const navigate = useNavigate();
  
    const handleSelectMemberLists = (userId,listId,event) => {
        event.preventDefault();
        setSelectedMember({ userId, listId });
        setTimeout(() => {
          navigate("/films");
        }, 0);
      };
      const handleSelectMemberReviews = (userId) => {
        setSelectedMember({ userId }); // Set the userId in the context as an object
        navigate('/reviews');
      };

    return(
    <div>

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
        <Link to={'/films'} className="member-information-connectionbox__element watched" onClick={(event) => handleSelectMemberLists(selectedMember.userId,1,event)}>Watched</Link>
        <Link to={'/films'}className="member-information-connectionbox__element watched" onClick={(event) => handleSelectMemberLists(selectedMember.userId,2,event)}>WatchList</Link>
        <Link to={'/films'}className="member-information-connectionbox__element watched" onClick={(event) => handleSelectMemberLists(selectedMember.userId,3,event)}>Favorites</Link>
        <Link  to={'/reviews'}className="member-information-connectionbox__element watched" onClick={() => handleSelectMemberReviews(selectedMember.userId)}>Reviews</Link>
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

    </div>   
    )
}
export default Memberonly