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
    
    const popularMovies = Array(5).fill(0); // Replace with actual data if available
    const newMovies = Array(5).fill(0); // Replace with actual data if available
    const suggestedMovies = Array(5).fill(0); // Replace with actual data if available

    function getgridMovies(array) {
        return array.map((_, index) => (
            <div key={index} className="dashboard-grid__category-child">Movie {index + 1}</div>
        ));
    }

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
        
        {/* Suggested Movies Grid */}
        <h1 className='dashboard-grid-heading'>Suggested</h1>
        <hr className='dashboard-grid-headingline'></hr>
        <div className='dashboard-grid-category suggested-movies'>{getgridMovies(suggestedMovies)}</div>
    </div>
    </div>)
}
export default Dashboard;