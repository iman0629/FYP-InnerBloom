import React from 'react';
import './SpecializedModule.css'; 
const startVoiceInput = () => {console.log("Voice input started");};
const BipolarModule = ({ messages, input, setInput, handleSend }) => {
  const testSend = () => {
    console.log("Send button clicked! handleSend exists?", !!handleSend);
    if (handleSend) handleSend();
  };
  return (
    <>
      <div className="messages-wrapper specialized">
        {messages.length === 0 ? (
          <div className="welcome">
            ⚡ Bipolar Support Module mein aapka swagat!<br />
            High energy, racing thoughts ya mood swings ke bare mein baat karen.
            Hum patterns samajhne mein help karenge.
          </div>
        ) : (
          <div className="messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
        )}
      </div>

       <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Text or voice your message..."
        />
        <button onClick={testSend} title="Send" className="send-btn">
      <i className="fas fa-paper-plane"></i>
    </button>
        <button onClick={startVoiceInput} title="Voice Input" className="voice-btn">
         <i className="fas fa-microphone"></i>
        </button>
  </div>
    </>
  );
};

export default BipolarModule;