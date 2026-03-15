import React from 'react';
import './IntroSectionStyle.css';
import FuturisticAIwithclient from "../../../assets/images/FuturisticAIwithclient.webp";

const IntroSection = () => {
  return (
    <>
    <section className="intro-section">
      <div className="intro-container">
        {/* Left: Text Content */}
        <div className="intro-text-content">
          <h1 className="intro-heading">
            A Gentle Start to Mental Well-Being
          </h1>

          <p className="intro-description">
            InnerBloom is an AI-powered mental health support platform that helps you check in with yourself, understand your emotions, and receive personalized guidance anytime.
          </p>

          <p className="intro-description">
            This platform is designed to support your mental well-being in a simple and private way.
          </p>

        </div>

        {/* Right: Animated Image */}
        <div className="intro-image-wrapper">
          <img
            src={FuturisticAIwithclient}
            alt="Gentle blooming flower in soft light - symbolizing mental wellness"
            className="animated-image"
          />
          <div className="image-glow"></div>
        </div>
      </div>
    </section>
    </>
  );
};

export default IntroSection;
