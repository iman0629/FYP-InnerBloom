import React from 'react';
import './AboutHeroStyle.css';
import abouthero from "../../../assets/images/abouthero.jpg";

const AboutHero = () => {
  return(
<section className="about-layout-section">
      <div className="container">
      
        <div className="left-content">
          <h1 className="section-title">About InnerBloom</h1>
          <p className="about-description">Bridging Technology and Empathy – Evidence-Based Mental Health Support Anytime, Anywhere</p>
        </div>

        <div className="rightabout-image">
          <div className="image-wrapper">
            <img 
              src={abouthero} 
              alt="about bg" 
              className="floatingabout-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutHero;
