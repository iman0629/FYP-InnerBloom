import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/SignFormStyles.css';
import config from '/src/config.js';
import SuccessModal from '../SuccessModal';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number & special character';
    }

    if (!formData.gender) newErrors.gender = 'Please select your gender';

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age < 13 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age (13–120)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setShowSuccess(true);
        } else {
          const data = await response.json();
          setErrors({ general: data.error || 'Registration failed' });
        }
      } catch (error) {
        setErrors({ general: 'Connection failed. Ensure the server is running.' });
      }
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/chat'); // ← Signup success ke baad chat page pe redirect
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Create Your Account</h1>
        <p className="auth-subtitle">Join InnerBloom – Start Your Wellness Journey</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Full Name</label>
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

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

          <div className="form-group">
            <label>Gender</label>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.1rem' }}>
              {['Male', 'Female', 'Other'].map(g => (
                <label key={g} style={{ display: 'flex', position: 'relative', alignItems: 'center', gap: '0.5rem',marginTop: '35px' }}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                  />
                  {g}
                </label>
              ))}
            </div>
            {errors.gender && <span className="error-text">{errors.gender}</span>}
          </div>
          
          <div className="form-group">
            <input
              type="number"
              name="age"
              id="age"
              placeholder=" "
              value={formData.age}
              onChange={handleChange}
              min="13"
              max="120"
            />
            <label htmlFor="age">Age</label>
            {errors.age && <span className="error-text">{errors.age}</span>}
          </div>

          {errors.general && (
            <span className="error-text" style={{ textAlign: 'center', display: 'block', marginBottom: '1rem' }}>
              {errors.general}
            </span>
          )}

          <button type="submit" className="submit-btn">
            Register Now
          </button>
        </form>

        <div className="toggle-text">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </div>

      {showSuccess && (
        <SuccessModal onClose={handleSuccessClose} />
      )}
    </div>
  );
};

export default SignUp;