import '../StyleCSS/Dashboard.css';

function Dashboard() {

    const popularMovies = Array(5).fill(0); // Replace with actual data if available
    const newMovies = Array(5).fill(0); // Replace with actual data if available
    const suggestedMovies = Array(5).fill(0); // Replace with actual data if available

    function getgridMovies(array) {
        return array.map((_, index) => (
            <div key={index} className="dashboard-grid__category-child">Movie {index + 1}</div>
        ));
    }

    return(<>
    <div className='dashboard-grid'>

        {/* Popular Movies Grid */}
        <h1 className='dashboard-grid-heading'>popular</h1>
        <hr className='dashboard-grid-headingline'></hr>
        <div className='dashboard-grid-category popular-movies'>{getgridMovies(popularMovies)}</div>

        {/* Recent Movies Grid */}
        <h1 className='dashboard-grid-heading'>new movies</h1>
        <hr className='dashboard-grid-headingline'></hr>
        <div className='dashboard-grid-category recent-movies'>{getgridMovies(newMovies)}</div>
        
        {/* Suggested Movies Grid */}
        <h1 className='dashboard-grid-heading'>suggested</h1>
        <hr className='dashboard-grid-headingline'></hr>
        <div className='dashboard-grid-category suggested-movies'>{getgridMovies(suggestedMovies)}</div>
    </div>
    </>)
}
export default Dashboard;