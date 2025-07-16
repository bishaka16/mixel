import React, { useState } from 'react';

export default function Emoji() {
  const [text, setText] = useState('');

  const emojis = [
    '😂', '😍', '😎', '😢', '😡', '👍', '🙏', '💯',
    '❤', '🔥', '🎉', '🎂', '🌞', '🌈', '👀', '👋',
    '🐵', '🐶', '🐱', '🦄', '🍕', '🍔', '🍟', '🍩',
    '⚽', '🏀', '🎮', '🎧', '📱', '💻', '✈', '🚗'
  ];

  const handleEmojiClick = (emoji) => {
    setText(prev => prev + emoji);
  };

  const handleDelete = () => {
    // Remove the last emoji (each emoji is 2–4 chars)
    // This approach works even with multibyte emoji
    const emojiArray = Array.from(text);
    emojiArray.pop();
    setText(emojiArray.join(''));
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Emoji Picker 🥳</h2>

      {/* Textbox */}
      <input
        type="text"
        value={text}
        readOnly
        style={{
          fontSize: '1.4rem',
          padding: '10px',
          width: '90%',
          maxWidth: '400px',
          textAlign: 'center',
          marginBottom: '10px',
        }}
        placeholder="Click emojis to add..."
      />

      <br />

      {/* Delete button */}
      <button
        onClick={handleDelete}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          fontSize: '1rem',
          background: '#f019d3ff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        ⬅ Delete Last Emoji
      </button>

      {/* Emoji Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))',
          gap: '10px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => handleEmojiClick(emoji)}
            style={{
              fontSize: '1.8rem',
              padding: '8px',
              border: 'none',
              background: '#f2f2f2',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}