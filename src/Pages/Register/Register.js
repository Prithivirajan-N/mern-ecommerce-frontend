import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css'; // Your CSS file

function Register() {
    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const { userName, email, password, confirmPassword } = user;

        // Input validation
        if (!userName) {
            toast.error("User name is required");
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Invalid email format");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsSubmitting(true); // Disable button

        try {
            const response = await axios.post('http://localhost:8003/signup', user);

            if (response.status === 201) {
                toast.success("Registration successful");
                // Navigate to the login page
                navigate('/login'); // Change this to your login route
                // Clear form fields
                setUser({ userName: '', email: '', password: '', confirmPassword: '' });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false); // Re-enable button
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form>
                <div className="mb-3">
                    <label>User Name</label>
                    <input 
                        type="text" 
                        name="userName" 
                        className="register-input" 
                        value={user.userName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        className="register-input" 
                        value={user.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        className="register-input" 
                        value={user.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        className="register-input" 
                        value={user.confirmPassword} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    className="register-btn" 
                    onClick={handleRegister} 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>
            <ToastContainer position='top-center' />
        </div>
    );
}

export default Register;
