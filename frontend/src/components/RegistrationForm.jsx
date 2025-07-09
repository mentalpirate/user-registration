import React, { useState } from 'react';
import UsersList from './UsersList';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'Username is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setSuccess(false);

        const userData = { username, email, password };
        try {
            const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setSuccess(true);
            setUsername('');
            setEmail('');
            setPassword('');
            // Optionally refresh user list if visible
            if (showUsers) {
                await handleViewUsers();
            }
        } catch (error) {
            setError('Error submitting user');
        }
    };

    const handleViewUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:5000/view');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
            setShowUsers(true);
        } catch (err) {
            setError('Could not fetch users.');
        }
        setLoading(false);
    };

    const handleCloseSuccess = () => setSuccess(false);

    return (
        <form onSubmit={handleSubmit} className="registration-form">
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <span className="error">{errors.username}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="button-group">
                <button type="submit" id='submit'>Submit</button>
                <button type="button" id='view' onClick={handleViewUsers}>
                    View Users
                </button>
            </div>
            {loading && <p className="loading">Loading users...</p>}
            {error && <p className="error">{error}</p>}
            {success && (
                <div className="popup-success">
                    User registered successfully!
                    <button className="close-btn" onClick={handleCloseSuccess} type="button">×</button>
                </div>
            )}
            {showUsers && <UsersList users={users} />}
        </form>
    );
};

export default RegistrationForm;