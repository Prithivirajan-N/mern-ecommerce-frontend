// src/Pages/Login/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Custom CSS
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
    
        try {
            const response = await axios.post('http://localhost:8003/login', {
                email: formData.email,
                password: formData.password,
            });
    
            const { token, userName } = response.data; // Destructure userName from the response
            localStorage.setItem('token', token); // Store the token in local storage
            localStorage.setItem('userName', userName); // Store the userName in local storage
    
            setMessage("User logged in successfully");
            setMessageType('success');
            onLoginSuccess(); // Call the function to update authentication state
            navigate('/');
            
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Server error');
            }
            setMessageType('error');
        }
    };
    
    
    

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button> 
                   You don't have account please<Link to={'/register'}>Signup</Link>
                </form>
                {message && (
                    <p className={`message ${messageType}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
