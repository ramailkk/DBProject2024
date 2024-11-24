import { useState , useEffect, useRef} from 'react';
import '../StyleCSS/Filmonly.css'
import { useParams } from 'react-router-dom';
import { useFilm } from './FilmContext.js';



function Filmonly(){ 

    // Inside the function component
const isMounted = useRef(true); // Flag to track mount status

useEffect(() => {
  return () => {
    isMounted.current = false; // Set to false when the component unmounts
  };
}, []);


    const { selectedFilm } = useFilm();

    const [choice_desc, setChoice_desc] = useState('actors');




    const [genres,setGenres] = useState([]);
    const [actors, setActors] = useState([]);
    const [directors, setDirectors] = useState([]);
    
    fetchDescriptionOption('http://localhost:3001/api/filmpagegenres?', `id=${selectedFilm[0]}`, setGenres)
    fetchDescriptionOption('http://localhost:3001/api/filmpageactors?', `id=${selectedFilm[0]}`, setActors)
    fetchDescriptionOption('http://localhost:3001/api/filmpagedirectors?', `id=${selectedFilm[0]}`, setDirectors)
    const arrays = {
        directors,
        actors,
        genres
    };

    function fetchDescriptionOption(get_api, critera, setArray){
        let customApi = get_api + "" + critera;
        fetch(customApi, {
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

    return(
        <div>
                    <div className='film-information-container'> 
            
            <div className='film-information__element film-information-title'>
                <p className='film-information-title__element title-name'>{selectedFilm[1]}</p>
                <p className='film-information-title__element title-year'>{new Date(selectedFilm[2]).getFullYear()}</p>
                <p className='film-information-title__element title-directed-by'>Directed by</p>
                <p className='film-information-title__element title-director'>{directors[0]}</p>
            </div>


            {/* 3 Part Structure Row */}
            <div className='film-information-three-row-structure-flex'>
            
            {/* Left Side: Picture + 3 elements below it */}
            <div className='film-information-left-flex'>
            <div className='film-information__element film-information-picture' >selectedFilm[0]</div>
            <div className='film-information-left-bottom-flex'>
            <div className='film-information__element film-information-watched-count'>341</div>
            <div className='film-information__element film-information-list-count'>431</div>
            <div className='film-information__element film-information-favourite-count'>12</div>
            
            </div>
            </div>

            {/* Middle: Description + 3 info elements below it*/}
            
            <div className='film-information-middle-flex'>
            <div className='film-information__element film-information-description'>{selectedFilm[3]}</div>
            <div className='film-information-bottom-desc-flex'>
                <div className='bottom-desc__element film-information__cast' onClick={() => setChoice_desc('actors')}>Cast</div>
                <div className='bottom-desc__element film-information__director' onClick={() => setChoice_desc('directors')}>Directors</div>
                <div className='bottom-desc__element film-information__genre' onClick={() => setChoice_desc('genres')} >Genres</div>
            </div>
            {currentDesc(arrays,choice_desc)}
            </div>
            
            {/*Right: Rating + Number  */}

            <div className='film-information-right-flex'>
                <div className='film-information__element film-information__log-options'>
                    {renderLogOptions("login")}
                </div>

                <div className='film-information__element film-information__ratings'>
                    <h3>Rating</h3>
                    <hr></hr>
                    <div>{selectedFilm[4]}</div>
                </div>
            </div>
            </div>
            
        </div>
        </div>
    )
}

// Function that will return the deisred category when clicked upon
function currentDesc(arrays,choice_desc){
    return(
        <div className= "film-information-desc-category"> 
        {arrays[choice_desc]?.map((item) => <div className='film-information-desc-category__child'>{item}</div>)}
        </div>
    )
}
    // login
    // logging
    // logout
function renderLogOptions(currentLogStatus){
    if(currentLogStatus === 'logout'){
        return(
    <div className='film-information__element film-information-log-options__logout '>
        Sign in to log, rate or review
    </div>
        )
    }
    else if(currentLogStatus === 'login'){
        return(
            <div className='film-information__element film-information-log-options__login'>
                    <div className='film-information-login__element film-information-login-watched'>Add to Watched</div>
                    <div className='film-information-login__element film-information-login-watchlist'>Add to Watchlist</div>
                    <div className='film-information-login__element film-information-login-watchlist'>Add to Favorites</div>
                    <div className='film-information-login__element film-information-login-watchlist'>Add a Review</div>
                    <div className='film-information-login__element film-information-login-watchlist'>Add to Lists?</div>
            </div>
                )
    }
}

export default Filmonly;