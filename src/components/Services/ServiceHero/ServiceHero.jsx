import React from 'react';
import './ServiceHero.css';
import servicehero from "../../../assets/images/servicehero.png";

const ServiceHero = () => {
  return (
    <>
    <section className="services-hero">
    <div className="service-container">
          <div className="service-image-wrapper">
            <img
              src={servicehero}
              alt="Mental wellness blooming with AI"
              className="floatingservice-image"
            />
          </div>

          <div className="hero-text">
            <h1 className="hero-title">Our Services</h1>
            <h2 className="hero-subtitle">Tailored AI Support for Your Mental Health Journey</h2>
          </div>
        </div>
      </section>

       <p className="hero-description">
              At InnerBloom, we offer a comprehensive suite of AI-powered tools designed to provide 
              empathetic, evidence-based assistance. Our intelligent two-tier system starts with 
              a gentle general assessment and routes you seamlessly to specialized care — all 
              integrated with real-time mood detection and immersive 3D exercises.
            </p>
</>

);
};

export default ServiceHero;