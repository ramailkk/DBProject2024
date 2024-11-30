import { useState } from "react";
import "../StyleCSS/Signup.css";
import { Link } from "react-router-dom";

function Signup() {
    // Define state for form inputs
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        email: ''
    });

    // Handle input change
    const eventHandler = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Send the form data to the backend
        try {
            const response = await fetch('http://localhost:3001/api/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: inputs.username,
                    email: inputs.email,
                    password: inputs.password,
                }),
            });

            const data = await response.json();
            
            if (response.status === 201) {
                alert('User created successfully');
            } else {
                alert('Error creating user');
            }

            // Reset the form after submission
            setInputs({
                username: '',
                password: '',
                email: ''
            });
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('Error during form submission');
        }
    };

    return (
        <div className="signup-all">
            <div className="signup-block">
                <div className="signup-exit-to-home"><Link to="/" >X</Link></div>
                <span className="signup-element heading">Create a new account</span>
                
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-form-element">
                        <label>Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={inputs.username} 
                            onChange={eventHandler} 
                        />
                    </div>

                    <div className="signup-form-element">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={inputs.password} 
                            onChange={eventHandler} 
                        />
                    </div>

                    <div className="signup-form-element">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={inputs.email} 
                            onChange={eventHandler} 
                        />
                    </div>

                    <input 
                        type="submit" 
                        className="signup-form-element submit-button" 
                        value="Sign Up" 
                    />
                </form>
            </div>
        </div>
    );
}

export default Signup;
