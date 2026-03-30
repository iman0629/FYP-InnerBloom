import React, { useState, useEffect, useRef } from 'react';
import '../MainChatBot/ChatbotStyles.css';
import GeneralModule from '../modules/GeneralModule';
import AnxietyModule from '../modules/SpecializedModule/AnxietyModule';
import DepressionModule from '../modules/SpecializedModule/DepressionModule';
import BipolarModule from '../modules/SpecializedModule/BipolarModule';
import OCDModule from '../modules/SpecializedModule/OCDModule';
import PhobiasModule from '../modules/SpecializedModule/PhobiasModule';
import MoodTracker from '../MoodTacking/MoodTracker';
import ExercisePlayer from '../Exercises/ExercisePlayer';

const modules = {
  general: GeneralModule,
  anxiety: AnxietyModule,
  depression: DepressionModule,
  bipolar: BipolarModule,
  ocd: OCDModule,
  phobias: PhobiasModule,
};

const MainChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;
  const messagesEndRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    setIsListening((prev) => !prev);
  };

  // ── MISSING FUNCTION ── Add this (was causing "handleBack is not defined")
  const handleBack = () => {
    setShowExercise(false);
    // Optional: reset module if you want
    // setCurrentModule(null);
  };

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
    setChats(savedChats);
  }, []);

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const userMsg = { text, sender: 'user' };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    updateChatHistory(newMessages);
    setInput('');

    // Check symptoms only in general module
    if (currentModule === 'general' || currentModule === null) {
      const matched = checkForSpecialization(text.toLowerCase());
      if (matched) {
        switchToSpecialized(matched);
        return;
      }
    }

    // Normal bot response
    const botResponse = getBotResponse(text, currentModule);
    const updated = [...newMessages, botResponse];
    setMessages(updated);
    updateChatHistory(updated);
    speak(botResponse.text);
  };

  const checkForSpecialization = (text) => {
    const lowerText = text.toLowerCase();

    const anxietyKw = [
      'anxious', 'worry', 'worried', 'nervous', 'panic', 'fear', 'restless', 'keyed up', 'on edge',
      'fatigued', 'tired easily', 'concentration', 'mind blank', 'irritable', 'muscle tension',
      'sleep disturbance', 'heart racing', 'sweating', 'trembling', 'hyperventilation'
    ];
    if (anxietyKw.some(kw => lowerText.includes(kw))) return 'anxiety';

    const depressionKw = [
      'sad', 'depressed', 'hopeless', 'empty', 'tearful', 'no interest', 'anhedonia', 'pleasure',
      'tired', 'fatigue', 'energy low', 'worthless', 'guilt', 'concentration', 'appetite change',
      'weight change', 'insomnia', 'hypersomnia', 'psychomotor', 'suicidal', 'death thoughts'
    ];
    if (depressionKw.some(kw => lowerText.includes(kw))) return 'depression';

    const bipolarKw = [
      'manic', 'hypomanic', 'elevated mood', 'expansive', 'irritable extreme', 'grandiosity',
      'inflated self', 'decreased sleep', 'need less sleep', 'talkative', 'pressure talk',
      'racing thoughts', 'flight ideas', 'distractible', 'goal directed', 'psychomotor agitation',
      'risky behavior', 'spending spree', 'sexual indiscretion'
    ];
    if (bipolarKw.some(kw => lowerText.includes(kw))) return 'bipolar';

    const ocdKw = [
      'obsession', 'intrusive thought', 'unwanted thought', 'urge', 'compulsion', 'ritual',
      'checking', 'cleaning', 'washing', 'hand wash', 'ordering', 'arranging', 'counting',
      'repeating', 'contamination', 'fear germ', 'doubt', 'symmetry', 'perfect'
    ];
    if (ocdKw.some(kw => lowerText.includes(kw))) return 'ocd';

    const phobiaKw = [
      'phobia', 'intense fear', 'fear of', 'terrified', 'avoid', 'panic', 'heights', 'flying',
      'spider', 'animal', 'blood', 'injection', 'enclosed', 'claustrophobia', 'public speaking',
      'social fear'
    ];
    if (phobiaKw.some(kw => lowerText.includes(kw))) return 'phobias';

    return null;
  };

  const switchToSpecialized = (moduleName) => {
    setCurrentModule(moduleName);
    const messagesWithSwitch = [
      ...messages,
      {
        text: `Your symptoms match the ${moduleName} module. Switching to specialized support now.`,
        sender: 'bot',
      },
    ];
    setMessages(messagesWithSwitch);
    updateChatHistory(messagesWithSwitch);

    setPopupMessage(`Now in ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} Support`);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  };

  const getBotResponse = (text, module) => {
    if (module === 'general' || module === null) {
      return { text: 'I am here to help you. Tell me how you’re feeling.', sender: 'bot' };
    }
    // You can expand this later for each module
    return { text: `In ${module} mode – how can I assist you today?`, sender: 'bot' };
  };

  const updateChatHistory = (updatedMessages) => {
    const updatedChats = chats.map((chat, i) =>
      i === currentChatId ? { ...chat, messages: updatedMessages, module: currentModule } : chat
    );
    setChats(updatedChats);
  };

  const deleteChat = (id) => {
    if (!window.confirm('Delete this chat permanently?')) return;

    const updatedChats = chats.filter((chat) => chat.id !== id);

    if (id === currentChatId) {
      setCurrentChatId(0);
      setMessages([]);
      setCurrentModule(null);
    }

    const reIndexed = updatedChats.map((chat, index) => ({
      ...chat,
      id: index,
    }));

    setChats(reIndexed);

    if (showHistory) setShowHistory(false);
  };

  const startNewChat = () => {
    const newChat = { id: chats.length, messages: [], module: null };
    setChats([...chats, newChat]);
    setCurrentChatId(chats.length);
    setMessages([]);
    setCurrentModule(null);
    setShowHistory(false);
    setShowMoodTracker(false);
    setShowExercise(false);
  };

  const loadChat = (id) => {
    setCurrentChatId(id);
    setMessages(chats[id].messages || []);
    setCurrentModule(chats[id].module || null);
    setShowHistory(false);
    setShowMoodTracker(false);
    setShowExercise(false);
  };

  const CurrentModuleComponent = modules[currentModule] || GeneralModule; // fallback to GeneralModule

  return (
    <div className="chatbot-page">
      <div className="chat-main-container">
        <header className="chat-toolbar">
          <div className="toolbar-left">
            <button onClick={startNewChat} className="toolbar-btn primary">
              <i className="fas fa-plus-circle"></i> New Session
            </button>
            <button
              onClick={() => {
                setShowHistory(!showHistory);
                setShowMoodTracker(false);
                setShowExercise(false);
              }}
              className={`toolbar-btn ${showHistory ? 'active' : ''}`}
            >
              <i className="fas fa-history"></i> History
            </button>
          </div>

          <div className="toolbar-right">
            {currentModule && currentModule !== 'general' && (
              <>
                <button
                  className={`toolbar-btn ${showMoodTracker ? 'active' : ''}`}
                  onClick={() => {
                    setShowMoodTracker(true);
                    setShowExercise(false);
                    setShowHistory(false);
                  }}
                >
                  <i className="fas fa-chart-line"></i> Mood Tracker
                </button>
                <button
                  className={`toolbar-btn ${showExercise ? 'active' : ''}`}
                  onClick={() => {
                    setShowExercise(true);
                    setShowMoodTracker(false);
                    setShowHistory(false);
                  }}
                >
                  <i className="fas fa-video"></i> 3D Exercise
                </button>
              </>
            )}
          </div>
        </header>

        <div className="chat-body-wrapper">
          {showHistory ? (
            <div className="history-grid-container">
              <div className="history-header">
                <h2>Your Conversation History</h2>
                <p>Access and manage your previous sessions</p>
              </div>

              {chats.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-comment-slash"></i>
                  <p>No chat history yet. Start a new session above!</p>
                </div>
              ) : (
                <div className="history-cards-grid">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`history-card-item ${chat.id === currentChatId ? 'active' : ''}`}
                      onClick={() => loadChat(chat.id)}
                    >
                      <div className="card-badge">
                        {chat.module ? chat.module.toUpperCase() : 'GENERAL'}
                      </div>
                      <div className="card-content">
                        <h3>Session #{chat.id + 1}</h3>
                        {chat.messages.length > 0 && (
                          <p className="last-msg">"{chat.messages[0].text.substring(0, 50)}..."</p>
                        )}
                      </div>
                      <button
                        className="card-delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                      >
                        <i className="fas fa-times-circle"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="chat-interactive-area">
              {showPopup && <div className="module-status-pill">{popupMessage}</div>}

              {showMoodTracker ? (
                <div className="embedded-tool">
                  <MoodTracker onBack={() => setShowMoodTracker(false)} />
                </div>
              ) : showExercise ? (
                <div className="embedded-tool">
                  <ExercisePlayer selectedModule={currentModule} onBack={handleBack} />
                </div>
              ) : (
                <CurrentModuleComponent
                  messages={messages}
                  setMessages={setMessages}
                  input={input}
                  setInput={setInput}
                  handleSend={handleSend}
                  currentModule={currentModule}
                  isListening={isListening}
                  toggleListening={toggleListening}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainChatbot;