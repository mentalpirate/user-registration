import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../api';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetchUsers();
    }, []);

    return (
        <div>
            <h2>Users List</h2>
            
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.username} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;