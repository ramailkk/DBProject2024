import React, { createContext, useContext, useState } from 'react';

import "../StyleCSS/Headerbox.css";
import { Outlet, Link } from "react-router-dom";
import {useAuth} from './AuthContext.js';



function Headerbox() {
    
  const [tab, setTab] = useState("logout");
  return (
    <div>
      <div className="headerbox">
        <Link
          to="/"
          className="headerboxcomponent logo"
          onClick={() => tab === "logging" ? setTab("logout") : ""}
        >
          MovieManagement
        </Link>
        {logRender(tab, setTab)}
      </div>
      <Outlet />
    </div>
  );
}

function Logging({ setTab }) {
    const { login } = useAuth();  // Get the login function from context
    const [inputs, setInputs] = useState({
      username: '',
      password: '',
    });
  
    const eventHandler = (event) => {
      const { name, value } = event.target;
      setInputs(prevInputs => ({
        ...prevInputs,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      fetch(`http://localhost:3001/api/checklogin?username=${inputs.username}&password=${inputs.password}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            // Login success, set to logged in

            fetch(`http://localhost:3001/api/username?id=${data[0]}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.data[1]);
                    login(data.data); // Store the user data in context
                })
                .catch((error) => console.error("Error fetching login:", error));
            
            setTab("login");
            alert("Login successful!");

            alert(data[0]);
          } else {
            alert("Invalid username or password");
          }
        })
        .catch((error) => console.error("Error fetching login:", error));
  
      setInputs({
        username: '',
        password: '',
      });
    };
  
    return (
      <div>
        <div className="Login-tab">
          <form className="login-block" onSubmit={handleSubmit}>
            <div className="login-exit-to-logout" onClick={() => setTab("logout")}>X</div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={eventHandler}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={eventHandler}
            />
            <input className="login-submit" type="submit" value={"Sign In"} />
          </form>
        </div>
      </div>
    );
  }

function logRender(tab, setTab) {
  switch (tab) {
    case "logout":
      return LogOut(setTab);
    case "logging":
      return <Logging setTab={setTab} />;
    case "login":
      return LogIn(setTab);
    default:
      return null;
  }
}

function LogOut(setTab) {
    const {logout} = useAuth();
  return (
    <div className="header-links">
      <Link to="/films" className="headerboxcomponent">Films</Link>
      <Link to="/members" className="headerboxcomponent">Members</Link>
      <div className="headerboxcomponent" onClick={() => handlelogout(setTab)} >Login</div>
      <Link to="/signup" className="headerboxcomponent">Signup</Link>
    </div>
  );
  function handlelogout(setTab){
    logout();
    setTab('logging');
  }
}

function LogIn(setTab) {


const { user } = useAuth();  // Get the login function from context
  return (
    <div className="header-links">
      <Link to="/memberonly" className="headerboxcomponent">
      {user.username}
          </Link>
      <Link to="/films" className="headerboxcomponent">Films</Link>
      <Link to="/members" className="headerboxcomponent">Members</Link>
      <div className="headerboxcomponent" onClick={() => setTab("logout")}>Logout</div>
    </div>
  );
}

export default Headerbox;