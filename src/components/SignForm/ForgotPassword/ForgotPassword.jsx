import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '/src/config.js';
import "../style/SignFormStyles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', text: '' });

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (response.ok) {
                setStatus({ type: 'success', text: data.message });
            } else {
                setStatus({ type: 'error', text: data.error || 'Something went wrong' });
            }
        } catch (error) {
            setStatus({ type: 'error', text: 'Connection failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrappersignin">
            <div className="auth-cardsignin">
                <h1 className="auth-title">Reset Password</h1>
                <p className="auth-subtitle">Enter your email to receive a reset link</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Email Address</label>
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
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <div className="toggle-text">
                    Remembered your password? <Link to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
