import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import config from '/src/config.js';

const Header = () => {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) setUser(userData);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/signin');
    };

    return (
        <header className="main-header">
            <div className="header-left">
                <h2 className="page-title">InnerBloom</h2>
            </div>
            
            <div className="header-right">
                {user && (
                    <div className="user-nav" onClick={() => setShowDropdown(!showDropdown)}>
                        <div className="user-info">
                            <span className="user-name">{user.name}</span>
                            <span className="user-role">{user.role || 'User'}</span>
                        </div>
                        <div className="avatar-circle">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        
                        {showDropdown && (
                            <div className="user-dropdown">
                                <Link to="/profile" className="dropdown-item">
                                    <i className="fas fa-user-circle"></i> Profile Setting
                                </Link>
                                <button onClick={handleLogout} className="dropdown-item logout-link">
                                    <i className="fas fa-sign-out-alt"></i> Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
