import React, { useState } from 'react';
import './App.css';
import './index.css';

function App() {
  const [bgColor, setBgColor] = useState('');
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [showColors, setShowColors] = useState(false);

  const changeBackgroundColor = (color) => {
    setBgColor(color);
  };

  const resetBackgroundColor = () => {
    setBgColor('');
  };

  const handleClickMe = () => {
    if (inputText.trim() !== '') {
      setDisplayText(inputText);
    }
  };

  // Toggle the color options visibility
  const toggleColors = () => {
    setShowColors((prev) => !prev);
  };

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: bgColor || '#282c34' }}>
        <h1>Welcome to my website</h1>

        <input
          className="large-input"
          type="text"
          placeholder="Type something..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <br />

        <button className="click-me-button" onClick={handleClickMe}>Click Me</button>

        {displayText && (
          <h2 style={{ marginTop: '20px', color: '#1af4a4' }}>{displayText}</h2>
        )}
      </header>

      {/* Toggle button always visible at bottom right */}
      <div className="color-controls">
        <button onClick={toggleColors}>
          {showColors ? 'Hide colors' : 'Click to change colors'}
        </button>

        {/* Show color buttons only when toggled on */}
        {showColors && (
          <div className="color-buttons">
            <button onClick={() => changeBackgroundColor('lightblue')}>Light Blue</button>
            <button onClick={() => changeBackgroundColor('lightgreen')}>Light Green</button>
            <button onClick={() => changeBackgroundColor('#9B111E')}>Royal Red</button>
            <button onClick={() => changeBackgroundColor('#136207')}>Royal Green</button>
            <button onClick={() => changeBackgroundColor('#7851A9')}>Royal Purple</button>
            <button onClick={() => changeBackgroundColor('#4B0082')}>Royal Indigo</button>
            <button onClick={resetBackgroundColor}>Reset</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
