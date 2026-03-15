import "./HeroStyles.css";
import hero1 from "../../../assets/images/hero1.webp";
import hero2 from "../../../assets/images/hero2.jpg";
import hero3 from "../../../assets/images/hero3.png";
const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <div className="hero-container">
        {/* Left: Text + Project Info */}
        <div className="hero-left">
          <h1 className="hero-title">
            INNERBLOOM
            <br />
            <span className="hero-subtitle">AI-Powered Mental Health Assistance</span>
          </h1>

          <p className="hero-description">
            Your gentle, private companion for emotional check-ins, mood tracking, personalized guidance, and growth — anytime, anywhere.
          </p>


          <button className="start-btn">
            <a href="/signup">
            Start Your Journey — Free</a>
            </button>
        </div>

        {/* Right: Animated Phone Mockups */}
        <div className="hero-right">
          <div className="phone-mockup-container">
            {/* Main Phone - Center */}
            <img src={hero1}
              alt="InnerBloom App - Mood Reflection Screen"
              className="phone-mockup main-phone"
            />

            {/* Floating Secondary Phones */}
            <img
              src={hero2}
              alt="Mood Tracker & Progress Screen"
              className="phone-mockup floating-phone floating-1"
            />

            <img
              src={hero3}
              alt="Calming Dashboard & Emotions Overview"
              className="phone-mockup floating-phone floating-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;