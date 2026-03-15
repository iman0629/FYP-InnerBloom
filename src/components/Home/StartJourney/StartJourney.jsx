import React from 'react';
import './StartJourneyStyle.css';
import startimag from "../../../assets/images/startimag.jpg";

const StartJourney = () => {
  return (
    <>  
   
   <section className="final-cta-section">
      <div className="cta-container">
        {/* Left side - Text */}
        <div className="cta-text-content">
          <h2 className="cta-heading">Start Your Journey</h2>

          <p className="cta-description">
            Take a moment for yourself.<br />
            InnerBloom is here to listen — whenever you need.
          </p>

          <button className="get-started-btn">
            <a href="/signup">
            Get Started — It's Free
            </a>
          </button>
        </div>

        {/* Right side - Floating animated image */}
        <div className="start-image-wrapper">
          <img
            src={startimag}
            alt="Start journey"
            className="floatingstart-image"
          />
          <div className="image-soft-glow"></div>
        </div>
      </div>
    </section>
</>
);
};
export default StartJourney;