import './HowItWorksStyle.css'
import { useNavigate } from 'react-router-dom';
import { FaCommentDots, FaBrain, FaHandsHelping } from 'react-icons/fa';

const HowItWorks = () => {
  const navigate = useNavigate();
  return (
    <section className="how-it-works-section">
      <div className="sec-header">
        <h2>How it Works</h2>
        <p className="section-subtext">
          Simple, gentle, and always supportive — just three easy steps
        </p>
      </div>

      <div className="steps-timeline">
        {/* Step 1 */}
        <div className="timeline-step step-1">
          <div className="step-number">1</div>
          <div className="step-icon-wrapper">
            <FaCommentDots className="step-icon" />
          </div>
          <h3>Share your thoughts</h3>
          <p>Talk through text or voice.</p>
        </div>

        {/* Connecting Line */}
        <div className="timeline-connector"></div>

        {/* Step 2 */}
        <div className="timeline-step step-2">
          <div className="step-number">2</div>
          <div className="step-icon-wrapper">
            <FaBrain className="step-icon" />
          </div>
          <h3>AI understands your mood</h3>
          <p>The system analyzes emotional patterns.</p>
        </div>

        {/* Connecting Line */}
        <div className="timeline-connector"></div>

        {/* Step 3 */}
        <div className="timeline-step step-3">
          <div className="step-number">3</div>
          <div className="step-icon-wrapper">
            <FaHandsHelping className="step-icon" />
          </div>
          <h3>Get supportive guidance</h3>
          <p>Receive helpful activities and suggestions.</p>
        </div>
      </div>

      <div className="ctaa-container">
      <button className="see-more-btn" onClick={() => {
      navigate(`/products/${category.path.toLowerCase()}`);
      window.scrollTo(0, 0);
  }}><a href="/howitworks">See How It Works →</a></button>
      </div>
    </section>
  );
};

export default HowItWorks;