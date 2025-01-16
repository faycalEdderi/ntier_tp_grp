import React, { useState } from 'react';
import axios from 'axios';
import './User.css'; // Import the CSS file

const Register = () => {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/users/create', {
                name,
                password,
                email,
            });
            setSuccess('User registered successfully!');
            setError('');
        } catch (err) {
            setError('Error registering user');
            setSuccess('');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleRegister}>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;