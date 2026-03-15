import React from 'react';
import './ExerciseStyle.css';

const ExercisePlayer = ({ onBack, selectedModule }) => {
  console.log("Received selectedModule:", selectedModule); 
  console.log("Type:", typeof selectedModule);

  const modules = [
    {
      name: 'Anxiety',
      videos: [
        {
          videoUrl: 'https://www.youtube.com/embed/Ov3NsKKCmnk',
          description: 'Calm your racing thoughts with this gentle 3D breathing journey.',
          motivation: 'Every slow breath brings you closer to peace. You’ve got this.',
        },
        {
          videoUrl: 'https://www.youtube.com/embed/tEmt1Znux58',
          description: 'Practice box breathing to reduce stress and anxiety.',
          motivation: 'Inhale calm, exhale worry.',
        },
        {
          videoUrl: 'https://www.youtube.com/embed/nC-5KaZ36P0',
          description: 'Experience 3-dimensional breathing for deep relaxation.',
          motivation: 'Connect with your body and mind.',
        },
      ],
    },
    {
      name: 'Depression',
      videos: [
        {
          videoUrl: 'https://www.youtube.com/embed/R_KwzrgoU00',
          description: 'Lift your energy with soft, uplifting 3D guided movements.',
          motivation: 'Small steps today create brighter tomorrows. Keep going.',
        },
        {
          videoUrl: 'https://www.youtube.com/embed/k6iCuTYRkvA',
          description: 'Brief mindfulness exercise to improve mental health.',
          motivation: 'Find peace in the present moment.',
        },
        {
          videoUrl: 'https://www.youtube.com/embed/Vg8J1577Q3w',
          description: 'Art therapy activities for depression.',
          motivation: 'Express yourself creatively.',
        },
      ],
    },
    {
      name: 'OCD',
      videos: [
        {
          videoUrl: 'https://www.youtube.com/embed/-jn7FRIEYv0',
          description: 'Ground yourself with this peaceful 3D mindfulness body scan.',
          motivation: 'You are not your thoughts. You are the calm observer.',
        },
        {
          videoUrl: 'https://www.youtube.com/embed/4OGsSo098W8',
          description: 'Mindfulness exercise for when you\'re overwhelmed.',
          motivation: 'Observe without judgment.',
        },
        {
          videoUrl: 'https://www.youtube.com/embed/dPvrwa95tEc',
          description: 'Guided meditation for OCD.',
          motivation: 'Let go of obsessions.',
        },
      ],
    },
    {
      name: 'Bipolar',
      videos: [
        {
          videoUrl: 'https://www.youtube.com/embed/B139W3-GZTo',
          description: 'Balance your inner rhythm with this stabilizing 3D flow.',
          motivation: 'Stability is built one gentle moment at a time.',
        },
        {
          videoUrl: 'https://www.youtube.com/embed/awPP5YrVGyY',
          description: 'Strategies to manage bipolar disorder.',
          motivation: 'Take control of your moods.',
        },
        {
          videoUrl: 'https://www.youtube.com/embed/nj0_bP4gEts',
          description: 'Yoga for bipolar disorder.',
          motivation: 'Find balance through movement.',
        },
      ],
    },
    {
      name: 'Phobias',
      videos: [
        {
          videoUrl: 'https://www.youtube.com/embed/AMiwrpYcqIo',
          description: 'Face fears safely with gradual 3D exposure guidance.',
          motivation: 'Courage is not the absence of fear — it’s moving through it.',
        },
        {
          videoUrl: 'https://www.youtube.com/embed/IZE41KejIBw',
          description: 'Virtual reality exposure therapy.',
          motivation: 'Conquer your fears virtually.',
        },
        {
          videoUrl: 'https://www.youtube.com/embed/GM43uHE-anw',
          description: 'Virtual sessions for acrophobia.',
          motivation: 'Step by step to freedom.',
        },
      ],
    },
  ];

  // Make matching case-insensitive and trim whitespace to avoid common errors
  const normalizedSelected = (selectedModule || '').trim().toLowerCase();
  const selected = modules.find(mod => mod.name.toLowerCase() === normalizedSelected);

  if (!selected) { 
    return (
      <div className="exercise-page">
        <h2>Module not found</h2>
        <p>Received: "{selectedModule || 'nothing'} "</p>
        <p>Available modules: Anxiety, Depression, OCD, Bipolar, Phobias</p>
        <button className="back-btn" onClick={onBack}>
          ← Back to Chat
        </button>
      </div>
    );
  }
   

  return (
    <div className="exercise-page">
      <header className="exercise-header">
        <div className="header-content">
          <h1>Healing Through Movement for {selected.name}</h1>
          <p className="header-subtitle">
            3D animated exercises specially designed for your mental wellness journey
          </p>
        </div>

        <button className="back-btn" onClick={onBack}>
          ← Back to Chat
        </button>
      </header>

      {/* Main Content - Animated Cards */}
      <div className="module-grid">
        {selected.videos.map((vid, index) => (
          <div key={index} className="module-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="card-header">
              <h2>Exercise {index + 1}</h2>
            </div>

            <div className="video-wrapper">
              <iframe
                src={vid.videoUrl}
                title={`${selected.name} Mental Health Exercise ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="responsive-iframe"
              ></iframe>
            </div>

            <div className="card-content">
              <p className="description">{vid.description}</p>
              <p className="motivation-quote">“{vid.motivation}”</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExercisePlayer;