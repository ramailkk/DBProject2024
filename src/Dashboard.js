import './Dashboard.css';
import Headerbox from './Headerbox';
function Dashboard() {

    const popularMovies = Array(5).fill(0); // Replace with actual data if available
    const newMovies = Array(5).fill(0); // Replace with actual data if available
    const suggestedMovies = Array(5).fill(0); // Replace with actual data if available

    function getgridMovies(array) {
        return array.map((_, index) => (
            <div key={index} className="child">Movie {index + 1}</div>
        ));
    }

    return(<>
    <div className='grid_container'>
        <h1 className='heading'>popular</h1>
        <hr></hr>
    <div className='grid popular_movie'>
    {getgridMovies(popularMovies)}
    </div>
    <h1 className='heading'>new movies</h1>
    <hr></hr>
    <div className='grid new_movie'>
    {getgridMovies(newMovies)}
    </div>
    <h1 className='heading'>suggested</h1>
    <hr></hr>
    <div className='grid suggested'>
        {getgridMovies(suggestedMovies)}
    </div>
    </div>
    </>)
}
export default Dashboard;