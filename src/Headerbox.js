import { useState } from "react";
import "./Headerbox.css"
import { Outlet, Link } from "react-router-dom";
function Headerbox(){


    const [tab, setTab] = useState("logout");
    // login
    // logging
    // logout

    return(    
        <>
        <div className="headerbox">
        <div className="headerboxcomponent logo">LOGO</div>
        {logRender(tab,setTab)}
        </div>

        <Outlet />
        </>
    )
}


function logRender(tab, setTab){
    if(tab === "logout")
        return(logOut(tab,setTab));
    else if(tab === "logging")
        return(Logging(tab,setTab));
    else if (tab === "login")
        return(logIn(tab,setTab));
}

function logOut(tab, setTab){
    return(
    <div className="header-links">
        <Link to="/" className="headerboxcomponent">Home</Link>
        <Link to="/films" className="headerboxcomponent">Films</Link>
        <Link to="/members" className="headerboxcomponent">Members</Link>
        <div className="headerboxcomponent" onClick={() => setTab("logging")}>
            Login
        </div>
        <Link to = "/signup" className="headerboxcomponent">Signup</Link>
        </div>
        )
}



function Logging(tab,setTab){
    return(
        <>
        <div className="Login-tab">

            <form className="login-block">
                <div className="login-exit-to-logout" onClick={() => setTab("logout")}>X</div>
                <label>Username</label>
                <input type="text" name="username" />
                <label>Password</label>
                <input type="password" />

                <input className="login-submit" type="submit" value={"Sign In"}></input>
            </form>
        </div>
        </>
    )
}


    function logIn(tab,setTab){
        return(
            <>
        <div className="header-links">
        <Link to="/" className="headerboxcomponent">Home</Link>
        <Link to="memberonly" className="headerboxcomponent">insertName</Link>
        <Link to="/films" className="headerboxcomponent">Films</Link>
        <Link to="/members" className="headerboxcomponent">Members</Link>
        <div className="headerboxcomponent" onClick={() => setTab("logout")}>
            Logout
        </div>
        </div>
        </>
        )
    }

export default Headerbox;