import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import RegistrationForm from './components/RegistrationForm';
import UsersList from './components/UsersList';
import { fetchUsers, submitUser } from './api';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUserSubmission = async (newUser) => {
        try {
            await submitUser(newUser);
            setUsers((prevUsers) => [...prevUsers, newUser]);
        } catch (err) {
            setError('Could not submit user.');
        }
    };

    const handleViewUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await fetchUsers();
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
            {loading && <p>Loading users...</p>}
            {error && <p className="error">{error}</p>}
            {showUsers && <UsersList users={users} />}
        </div>
    );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);