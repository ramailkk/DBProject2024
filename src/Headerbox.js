import "./Headerbox.css"
import { Outlet, Link } from "react-router-dom";

function Headerbox(){
    return(
        <>
        <div className="headerbox">
        <div className="headerboxcomponent logo">LOGO</div>
        <Link to="/" className="headerboxcomponent">Home</Link>
        <Link to="/films" className="headerboxcomponent">Films</Link>
        <Link to="/members" className="headerboxcomponent">Members</Link>
        <Link className="headerboxcomponent">Settings</Link>
        <Link className="headerboxcomponent">Login</Link>
        <Link className="headerboxcomponent">Signup</Link>
        </div>

        <Outlet />
        </>
    )
}
export default Headerbox;