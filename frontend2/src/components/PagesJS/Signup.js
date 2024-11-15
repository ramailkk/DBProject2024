import { useState } from "react";
import "../StyleCSS/Signup.css";
import { Outlet, Link } from "react-router-dom";


function Signup(){

    const eventHandler = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const[inputs,setInputs] = useState({});
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`name:  ${inputs.name}\n` + `username: ${inputs.username}\n` + 
            `password: ${inputs.password}\n` +
            `email: ${inputs.email}\n`
        );

        setInputs({
            username: '',
            name: '',
            password: '',
            email: ''
        });
    }
    return (
        <>
        <div className="signup-block">
            <div className="signup-exit-to-home"><Link to="/" >X</Link></div>
            <span className="signup-element heading">Create a new account</span>
            
            <form className="signup-form" onSubmit={handleSubmit}>
                
                <div className="signup-form-element"><label>Username</label><input type="text" name ="username" value={inputs.username} onChange={eventHandler}/></div>
                
                <div className="signup-form-element"><label>Name</label><input type="text" name= "name"value={inputs.name} onChange={eventHandler

                }/></div>
                
                <div className="signup-form-element"><label>Password</label><input type="password" name ="password"  value={inputs.password} onChange={eventHandler}/></div>
                
                <div className="signup-form-element"><label>Email Address</label><input type="email" name = "email" value={inputs.email} onChange={eventHandler}/></div>
                
                <input type="submit" className="signup-form-element submit-button" value="Sign Up" />
            </form>
        </div>
    </>
    );
}      
export default Signup;