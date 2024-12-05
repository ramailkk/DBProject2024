import "../StyleCSS/Memberonly.css";
import { useSelectedMember } from './SelectedMemberContext.js';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { useFilm } from './FilmContext.js';
import eyeImage from "../Styleicons/eye2.png";
import listImage from "../Styleicons/windows.png";
import reviewImage from "../Styleicons/review.png";
import sampleAvatar from "../Styleicons/avatar.png";

function Memberonly(){

    const { setSelectedFilm } = useFilm();
    const { selectedMember } = useSelectedMember();
    console.log(selectedMember?.userId); // Safely log userId
    const { setSelectedMember } = useSelectedMember();
    const navigate = useNavigate();


    function getgridMovies(array) {
      console.log(array);
      return array?.map((item, index) => (
          <Link
              to={`/filmonly`}
              key={item.movieID}
              onClick={() => setSelectedFilm(item)}
              className="member-information-grid__element"
              style={{
                backgroundImage: `url(data:image/jpeg;base64,${item.moviePicture})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '300px',  // Adjust height as needed
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                textDecoration: 'none',
              }}
            ></Link>
      ));
  }
  
    
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
        type_Movies(`userrecentmovies?id=${selectedMember?.userId}`,setRecent_movies);
        type_Movies(`userfavmovies?id=${selectedMember?.userId}`,setFavourite_movies);
      }, []);


    const [recent_movies, setRecent_movies] = useState([]);
    const [favourite_movies,setFavourite_movies] = useState([]);

    function type_Movies(api,setArray){
        fetch(`http://localhost:3001/api/${api}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
            console.log(data.data);
            setArray(data.data);
            })
            .catch((error) => console.error("Error fetching search results:", error));
    }


    function generateFilmLinks(films, setSelectedFilm) {
        return films?.map((item) => (
          <Link
            to={`/filmonly`}
            key={item.movieID}
            onClick={() => setSelectedFilm(item)}
            className="film-page__child"
            style={{
              backgroundImage: `url(data:image/jpeg;base64,${item.moviePicture})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // height: '300px',  // Adjust height as needed
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              textDecoration: 'none',
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

    <img  src={sampleAvatar} className="member-information-profile single-member-picture" alt="Avatar"/>

        <div className="member-information-profile single-member-name">
            {current_member[0] ? current_member[0][0] : "Loading..."}
        </div>
    </div>
    <div className="member-information-userbox-right">
        <div className="member-information-profile single-member-watchedcount">
        <div className="members-page-profile-flex__image">
            <img src={eyeImage} alt="eyeImage" />
          </div>
          <div className="members-page-profile-flex__content">{current_member[0] ? current_member[0][2] : "Loading..."}</div>


        </div>
        <div className="member-information-profile single-member-reviewcount">
        <div className="members-page-profile-flex__image">
            <img src={reviewImage} alt="Review" />
          </div>
          <div className="members-page-profile-flex__content">{current_member[0] ? current_member[0][1] : "Loading..."}</div>  
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




    {/*left side of the flex: movie-portion */}
    
    <div className='member-information-left-side-container'>
    
    {/* Favourite movies of a user */}
    <h1 className='member-information-left-side__heading'>Favourites</h1>
    <hr className="member-information-left-side__headingline"></hr>
    <div className='member-information-left-side__grid single-popular-grid'>{getgridMovies(favourite_movies)}</div>

    {/* Recent movies of a user */}
    <h1 className='member-information-left-side__heading'>Recently Watched</h1>
    <hr className="member-information-left-side__headingline"></hr>
    <div className='member-information-left-side__grid single-recent-grid'>{getgridMovies(recent_movies)}</div>
    
    </div>


    </div>   
    )
}
export default Memberonly