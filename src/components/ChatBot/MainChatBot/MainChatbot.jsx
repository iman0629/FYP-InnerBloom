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
    <div className="app-container">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo">InnerBloom</div>
        <button onClick={() => setIsSidebarOpen(false)} className="close-btn">
          ×
        </button>

        <div className="chat-controls">
          <button
            onClick={() => {
              startNewChat();
              setIsSidebarOpen(false);
            }}
            className="action-btn"
          >
            <i className="fas fa-plus"></i> New Chat
          </button>
          <button
            onClick={() => {
              const newShow = !showHistory;
              if (newShow) {
                setShowMoodTracker(false);
                setShowExercise(false);
              }
              setShowHistory(newShow);
              setIsSidebarOpen(false);
            }}
            className="action-btn"
          >
            <i className="fas fa-history"></i> History
          </button>

          {currentModule && currentModule !== 'general' && (
            <div className="specialized-tools">
              <button
                className="tool-btn"
                onClick={() => {
                  setShowMoodTracker(true);
                  setShowExercise(false);
                  setShowHistory(false);
                  setIsSidebarOpen(false);
                }}
              >
                📊 Mood Tracking
              </button>
              <button
                className="tool-btn"
                onClick={() => {
                  setShowExercise(true);
                  setShowMoodTracker(false);
                  setShowHistory(false);
                  setIsSidebarOpen(false);
                }}
              >
                ▶️ 3D Exercise Video
              </button>
            </div>
          )}
        </div>
      </aside>

      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)} />}

      <main className="main-content">
        <header className="mobile-header">
          <button className="menu-toggle" onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
            <i className="fas fa-bars"></i>
          </button>
          <div className="logo">InnerBloom</div>
        </header>

        {showHistory ? (
          <div className="history-panel">
            <h2>Chat History</h2>

            {chats.length === 0 ? (
              <p className="no-history">No chat history yet...</p>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`history-item ${chat.id === currentChatId ? 'active' : ''}`}
                  onClick={(e) => {
                    if (e.target.tagName !== 'BUTTON') {
                      loadChat(chat.id);
                    }
                  }}
                >
                  <div className="history-item-content">
                    <span>
                      Chat {chat.id + 1} ({chat.module ? chat.module.charAt(0).toUpperCase() + chat.module.slice(1) : 'General'})
                    </span>
                    {chat.messages.length > 0 && (
                      <small>{chat.messages[0].text.substring(0, 30)}...</small>
                    )}
                  </div>

                  <button
                    className="delete-chat-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    title="Delete this chat"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="chat-area">
            {showPopup && <div className="module-popup">{popupMessage}</div>}

            {showMoodTracker ? (
              <MoodTracker onBack={() => setShowMoodTracker(false)} />
            ) : showExercise ? (
              <ExercisePlayer selectedModule={currentModule} onBack={handleBack} />
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
      </main>
    </div>
  );
};

export default MainChatbot;