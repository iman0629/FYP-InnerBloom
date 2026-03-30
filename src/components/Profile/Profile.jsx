import React, { useState, useEffect } from 'react';
import config from '/src/config.js';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    });
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser({
                name: userData.name || '',
                email: userData.email || '',
                age: userData.age || '',
                gender: userData.gender || ''
            });
        }
    }, []);

    const handleInfoChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${config.API_BASE_URL}/api/user/profile`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(user)
            });
            
            const data = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), ...user }));
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to update profile' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Connection error' });
        } finally {
            setLoading(false);
        }
    };

    const updatePassword = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${config.API_BASE_URL}/api/user/password`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: passwords.current,
                    newPassword: passwords.new
                })
            });
            
            const data = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', text: 'Password changed successfully!' });
                setPasswords({ current: '', new: '', confirm: '' });
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to change password' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Connection error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>Profile Settings</h1>
                <p>Manage your account information and security</p>
            </header>

            {message.text && (
                <div className={`alert-box ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="profile-grid">
                <section className="profile-card">
                    <h2><i className="fas fa-user-edit"></i> Personal Information</h2>
                    <form onSubmit={updateProfile}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="name" value={user.name} onChange={handleInfoChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" name="email" value={user.email} onChange={handleInfoChange} required />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Age</label>
                                <input type="number" name="age" value={user.age} onChange={handleInfoChange} required />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select name="gender" value={user.gender} onChange={handleInfoChange} required>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </section>

                <section className="profile-card">
                    <h2><i className="fas fa-shield-alt"></i> Security</h2>
                    <form onSubmit={updatePassword}>
                        <div className="form-group">
                            <label>Current Password</label>
                            <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} required />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} required />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} required />
                        </div>
                        <button type="submit" className="save-btn secondary" disabled={loading}>
                            {loading ? 'Updating...' : 'Change Password'}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Profile;
