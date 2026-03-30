import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/SignFormStyles.css';
import config from '/src/config.js';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
        try {
            const response = await fetch(`${config.API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/chat');
            } else {
                setErrors({ general: data.message || 'Login failed' });
            }
        } catch (error) {
            setErrors({ general: 'Connection to server failed. Please ensure the backend is running.' });
        }
    }
  };

  return (
    <div className="auth-wrappersignin">
      <div className="auth-cardsignin">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to continue your journey</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email Address</label>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
            <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: '#2c7a5f', textDecoration: 'none' }}>
                Forgot Password?
            </Link>
          </div>

          {errors.general && (
            <span className="error-text" style={{ textAlign: 'center', display: 'block' }}>
              {errors.general}
            </span>
          )}

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>

        <div className="toggle-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;