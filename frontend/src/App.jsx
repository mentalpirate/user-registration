import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import UsersList from './components/UsersList';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUserSubmission = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    const handleViewUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/view');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
            setShowUsers(true);
        } catch (err) {
            setError('Could not fetch users.');
        }
        setLoading(false);
    };

    return (
        <div className="app-container">
            <h1>User Registration</h1>
            <RegistrationForm onUserSubmit={handleUserSubmission} />
            <button className="view-users-btn" onClick={handleViewUsers}>View Users</button>
            {loading && <p>Loading users...</p>}
            {error && <p className="error">{error}</p>}
            {showUsers && <UsersList users={users} />}
        </div>
    );
};

export default App;