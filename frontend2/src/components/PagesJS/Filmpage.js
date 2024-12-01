  import "../StyleCSS/Filmpage.css";
  import { useState, useEffect, useRef, useContext} from "react";
  import { Outlet, Link } from "react-router-dom";
  import { useFilm } from './FilmContext.js' ;
  import { useSelectedMember } from './SelectedMemberContext.js';

  const decades = Array(10).fill(2020);

  function Filmpage() {
        // Inside the function component
  const isMounted = useRef(true); // Flag to track mount status

  useEffect(() => {
    return () => {
      isMounted.current = false; // Set to false when the component unmounts
    };
  }, []);

    
    const [films, setFilms] = useState([]); // Initialize films with empty values or placeholder
    const { setSelectedFilm } = useFilm();


    const { selectedMember } = useSelectedMember();



    function changeFilmsOnCriteria(get_api, criteria) {
      // Construct the API URL
      let custom_api = get_api + "" + criteria;
    
      // Make the fetch request
      fetch(custom_api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setFilms(data.data); // Assuming setFilms is defined elsewhere
        })
        .catch((error) => console.error("Error fetching search results:", error));
    }
      

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

  const allfilms = films?.map((item, index) => (
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



    const [genres, setGenres] = useState([]); // Initialize with an empty array

  useEffect(() => {
    fetch(`http://localhost:3001/api/genres/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data); // Assuming data.data is an array of genres
        setGenres(data.data); // Set genres to the entire array from the API
      })
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  const allgenres = genres.map((item, index) => (
    <div
      className="film-page-criteria-dropdown__element"
      onClick={() => changeFilmsOnCriteria('http://localhost:3001/api/moviegenre?',`id=${item[0]}`)}
      key={index}>
      {item[1]}
    </div>
  ));
    const alldecades = decades.map((item, index) => (
      <div
        className="film-page-criteria-dropdown__element"
        onClick={() =>  changeFilmsOnCriteria('http://localhost:3001/api/moviedecade?',`decade=${item - index * 10}`)}
        key={index}
      >
        {item - index * 10}s
      </div>
    ));

    const help = [1, 2, 3, 4, 5];

    const allratings = help.map((item) => (
      <div
        className="film-page-criteria-dropdown__element"
        onClick={() => changeFilmsOnCriteria('http://localhost:3001/api/movierating?', `rating=${item}`)}
      >
        {item} stars
      </div>
    ));

    return (
      <div>
        <form
          className="film-page-criteria-selectorbox"
          onSubmit={(event) => alert()}
        >
          <div className="film-page-criteria-selectorbox__element film-page-search">
          <label className="film-page-criteria-selectorbox__element flm_page-find-film">Find a film</label>
            <input
              className="film-page-criteria-selectorbox__element film-page-search-bar"
              type="text"
              name="search"
              onChange={(event) => event.target.value.length >0 ?changeFilmsOnCriteria('http://localhost:3001/api/moviename?', `name=${event.target.value}`) : changeFilmsOnCriteria('http://localhost:3001/api/movies','') }
            />
            {/* <input
              type="submit"
              value="Search"
              className="film-page-criteria-selectorbox__element film-page-search-button"
            /> */}
          </div>
          <div className="film-page-criteria-selectorbox__element">
            <p className="film-page-browse-by">Browse by</p>
          </div>
          <div className="film-page-criteria-selectorbox__element">
            <button className="film-page-criteria-dropdown__button film-page-genre-criteria">
            <p>Genre <i class="arrow down"></i></p>
            </button>
            <div className="film-age-criteria-dropdown">{allgenres}</div>
          </div>
          <div className="film-page-criteria-selectorbox__element">
            <button className="film-page-criteria-dropdown__button film-page-genre-criteria">
            <p>Year <i class="arrow down"></i></p>
            </button>
            <div className="film-age-criteria-dropdown">{alldecades}</div>
          </div>
          <div className="film-page-criteria-selectorbox__element">
            <button className="film-page-criteria-dropdown__button film-page-genre-criteria">
            <p>Rating <i class="arrow down"></i></p>
            </button>
            <div className="film-age-criteria-dropdown">
              <div
                className="film-page-criteria-dropdown__element"
                onClick={() => changeFilmsOnCriteria('http://localhost:3001/api/movierating?', 'rating=6')}
              >
                Highest
              </div>
              {allratings}
              <div className="film-page-criteria-dropdown__element"
              onClick={() => changeFilmsOnCriteria('http://localhost:3001/api/movierating?', 'rating=0')}>Lowest</div>
            </div>
          </div>
        </form>



        <div className="film-page-outer-container">
          {/* <h2 className="film-page-outer-heading">All Films</h2> */}
          <div className="film-page-context">
            {renderCurrentUserList(selectedMember)}
          </div>
          <div className="film-page-container">
            {allfilms}</div>
        </div>
      </div>
    );
  }

  function renderCurrentUserList(selectedMember){

    if (selectedMember !== null){
    const { userId, listId } = selectedMember;
    
    return(
  <div className="film-information-page">Insert Name of USERID  {userId} AND ListName of listID {listId} </div>
    )
  }
  }


  export default Filmpage;