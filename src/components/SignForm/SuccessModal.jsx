import React from 'react';
import './SuccessModalStyles.css'
const SuccessModal = ({ onClose }) => {
  return (
    <div className="success-modal-overlay">
      <div className="success-modal">
        <div className="success-icon">
       <i class="fa-solid fa-circle-check"></i>
          </div>
        <h2>Registration Successful!</h2>
        <p>Your InnerBloom account has been created successfully.</p>
        <p>Let's start your wellness journey together.</p>

        <button className="continue-btn" onClick={onClose}>
          Continue to Chat
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;