import React, { useRef } from 'react';

export default function FocusInput() {
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  const handleFocus = () => {
    // Focus the first input
    inputRef1.current.focus();
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
      <h3>Focus Input Example</h3>
      
      <input ref={inputRef1}
        type="text"
        placeholder="First Input"
        style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
      />
      <br />

      <input
        ref={inputRef2}
        type="text"
        placeholder="Second Input"
        style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
      />
      <br />

      <button
        onClick={handleFocus}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        Focus First Input
      </button>
    </div>
  );
}