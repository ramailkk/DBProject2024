import "../StyleCSS/Memberonly.css";
import { useSelectedMember } from './SelectedMemberContext.js';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
const popularMovies = Array(4).fill(0); // Replace with actual data if available
const newMovies = Array(4).fill(0); // Replace with actual data if available
import { useFilm } from './FilmContext.js' ;

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

    const { setSelectedFilm } = useFilm();
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


      const [current_member, setCurrent_Member] = useState([]);
      function fetchMemberDetails(get_api, critera, setArray) {


        let customApi = get_api + "" + critera;
          fetch(customApi, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setArray(data);
            })
            .catch((error) => console.error("Error fetching search results:", error));
        }
        
      useEffect(() => {
        fetchMemberDetails("http://localhost:3001/api/singlemember", `?id=${selectedMember?.userId}`, setCurrent_Member);
      }, []);



      useEffect(() => {
        fetch(`http://localhost:3001/api/movies/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.data);
            setFilms(data.data);
          })
          .catch((error) => console.error("Error fetching search results:", error));
      }, [selectedMember]);

      const filmer = (category) => {
        const allfilms = category?.map((item, index) => (
            <Link 
              to={`/filmonly`} 
              key={item.movieID} 
              onClick={() => setSelectedFilm(item)} 
              className="film-page__child"
              style={{
                backgroundImage: `url(data:image/jpeg;base64,${item.moviePicture})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '300px',  // Adjust height as needed
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                textDecoration: 'none'
              }}
            >
              <div className="film-card__info">
                <h3>{item.title}</h3>
                <p>{new Date(item.releaseDate).getFullYear()}</p>
                <p>{item.averageRating}</p>
              </div>
            </Link>
          ));
      }
      
    return(
        
    <div>

<div className="member-information-userbox">
    <div className="member-information-userbox-left">
        <div className="member-information-profile single-member-picture"></div>
        <div className="member-information-profile single-member-name">
            {current_member[0] ? current_member[0][0] : "Loading..."}
        </div>
    </div>
    <div className="member-information-userbox-right">
        <div className="member-information-profile single-member-watchedcount">
            {current_member[0] ? current_member[0][1] : "Loading..."}
        </div>
        <div className="member-information-profile single-member-reviewcount">
            {current_member[0] ? current_member[0][2] : "Loading..."}
        </div>
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
    <div className='member-information-left-side__grid single-popular-grid'>{filmer()}</div>

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