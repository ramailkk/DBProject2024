import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { useFilm } from './FilmContext.js';
import '../StyleCSS/Dashboard.css';
// import { useSelectedMember } from './SelectedMemberContext.js';
function Dashboard() {
    // useEffect(() => {
    //     fetch(`http://localhost:3001/api/recentmovies/`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log(data.data);
    //         setFilms(data.data);
    //       })
    //       .catch((error) => console.error("Error fetching search results:", error));
    //   }, [selectedMember]);

    const { setSelectedFilm } = useFilm();


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
    
    const [popularMovies, setPopularMovies] = useState([]);
    const [newMovies, setNewMovies] = useState([]);




    function getgridMovies(array) {
        return array.map((_, index) => (
            <div key={index} className="dashboard-grid__category-child">Movie {index + 1}</div>
        ));
    }
    function getgridMovies(array) {
        console.log(array);
        return array?.map((item, index) => (
            <Link
                to={`/filmonly`}
                key={item.movieID}
                onClick={() => setSelectedFilm(item)}
                className="dashboard-grid__category-child"
                style={{
                  backgroundImage: `url(data:image/jpeg;base64,${item.moviePicture})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '200px',  // Adjust height as needed
                  width: '300px',
                  objectFit: 'cover',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  textDecoration: 'none',
                }}
              ></Link>
        ));
    }

    useEffect(() => {
        type_Movies(`recentmovies`,setNewMovies);
        type_Movies(`popularmovies`,setPopularMovies);
      }, []);

    return(<div className='dashboard-all'>
    <div className='dashboard-grid'>

        {/* Popular Movies Grid */}
        <h1 className='dashboard-grid-heading'>Popular</h1>
        <hr className='dashboard-grid-headingline'></hr>
        <div className='dashboard-grid-category popular-movies'>{getgridMovies(popularMovies)}</div>

        {/* Recent Movies Grid */}
        <h1 className='dashboard-grid-heading'>New movies</h1>
        <hr className='dashboard-grid-headingline'></hr>
        <div className='dashboard-grid-category recent-movies'>{getgridMovies(newMovies)}</div>
        
        {/* Suggested Movies Grid
        <h1 className='dashboard-grid-heading'>Suggested</h1>
        <hr className='dashboard-grid-headingline'></hr>
        <div className='dashboard-grid-category suggested-movies'>{getgridMovies(suggestedMovies)}</div> */}
        
    </div>
    </div>)
}
export default Dashboard;