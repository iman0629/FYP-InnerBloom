import React from 'react';
import './WhyChoose.css'; 
import { features } from './FeatureContent'; 

const WhyChoose = (prop) => {
  return (
    <section className="why-choose-section"> 
      <h2 className="why-choose-header">Why Choose InnerBloom?</h2> 
      <p className="why-choose-subheader">Your trusted AI companion for mental wellness – safe, smart, and always here for you.</p> 
      
      <div className="grid"> 
        {features.map((feature, index) => ( 
          <div key={index} className="card"> 
            <div className="icon">{feature.icon}</div> 
            <h3 className="title">{feature.title}</h3> 
            <p className="description">{feature.description}</p> 
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;