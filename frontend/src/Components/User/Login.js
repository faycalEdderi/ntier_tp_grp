import React, { useState } from 'react';
import axios from 'axios';
import './User.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/users/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token); // Store the token in local storage
            setSuccess('User logged in successfully!');
            setError('');
        } catch (err) {
            setError('Error logging in user');
            setSuccess('');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleLogin}>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;