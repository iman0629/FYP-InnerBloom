import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import config from '/src/config.js';
import "../style/SignFormStyles.css";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setStatus({ type: 'error', text: 'Passwords do not match' });
        }

        setLoading(true);
        setStatus({ type: '', text: '' });

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    newPassword: formData.password
                })
            });

            const data = await response.json();
            if (response.ok) {
                setStatus({ type: 'success', text: 'Password reset successful! Redirecting to login...' });
                setTimeout(() => navigate('/signin'), 3000);
            } else {
                setStatus({ type: 'error', text: data.error || 'Failed to reset password' });
            }
        } catch (error) {
            setStatus({ type: 'error', text: 'Connection failed' });
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="auth-wrappersignin">
                <div className="auth-cardsignin" style={{ textAlign: 'center' }}>
                    <h1 className="auth-title">Invalid Request</h1>
                    <p style={{ color: '#ef4444', marginBottom: '1.5rem' }}>No reset token provided.</p>
                    <Link to="/signin" className="submit-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Go to Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-wrappersignin">
            <div className="auth-cardsignin">
                <h1 className="auth-title">New Password</h1>
                <p className="auth-subtitle">Create a strong password for your account</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder=" "
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <label>New Password</label>
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder=" "
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <label>Confirm Password</label>
                    </div>

                    {status.text && (
                        <p className={`status-msg ${status.type}`} style={{ 
                            textAlign: 'center', 
                            fontSize: '0.85rem', 
                            color: status.type === 'success' ? '#2c7a5f' : '#ef4444',
                            marginBottom: '1rem',
                            padding: '0.5rem',
                            background: status.type === 'success' ? '#ecfdf5' : '#fef2f2',
                            borderRadius: '4px'
                        }}>
                            {status.text}
                        </p>
                    )}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Updating...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
