import React from 'react';
import './Note.css';

const Note = () => {
  return (
    <>
      <section className="safety-section">
        <div className="safety-overlay">
          <div className="safety-content">
            <h2 className="safety-heading">Important Note</h2>

            <div className="safety-text-block">
              <p className="safety-main-text">
                InnerBloom is <strong>not a replacement</strong> for professional mental health care.
              </p>
              <p className="safety-sub-text">
                In emergencies or when experiencing severe distress, please contact a qualified mental health professional,
                your local emergency services, or a trusted crisis helpline immediately.
              </p>
            </div>

            <div className="safety-badges">
              <div className="badge-item">
                <span className="badge-icon"><i className="fa-solid fa-shield-halved"></i></span>
                <span>Supportive tool only</span>
              </div>
              <div className="badge-item">
                <span className="badge-icon"><i className="fa-solid fa-land-mine-on"></i></span>
                <span>Emergency? Call help</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};


  

export default Note;
