import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        try {
            const profile = await getUserProfile();
            setUser(profile);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Redirect to login if unauthorized
                localStorage.removeItem('token'); // Clear invalid token
                navigate('/login');
            } else {
                console.error('Error fetching user profile:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <header>
            {user ? <p>Welcome, {user.name}</p> : <p>Loading...</p>}
        </header>
    );
};

export default Header;
