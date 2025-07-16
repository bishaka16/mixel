import React, { useState } from 'react';

export default function Multiplicator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);

  // Generate multiplication table 1 to 10 for the base number
  const generateTable = (n) => {
    const number = parseInt(n);
    if (isNaN(number)) return [];
    return Array.from({ length: 10 }, (_, i) => ({
      display: `${number} × ${i + 1} = ${number * (i + 1)}`,
      expr: `${number}*${i + 1}`
    }));
  };

  // Evaluate a math expression safely
  const evaluate = (expr) => {
    try {
      // eslint-disable-next-line no-eval
      return eval(expr);
    } catch {
      return 'Error';
    }
  };

  const handleInputChange = (e) => {
    setExpression(e.target.value);
    setResult(null);
  };

  const handleTableClick = (expr) => {
    setExpression(expr);
    setResult(evaluate(expr));
  };

  const handleCalculate = () => {
    setResult(evaluate(expression));
  };

  const clear = () => {
    setExpression('');
    setResult(null);
  };

  // Extract base number for the table dropdown (only if expression is a single number)
  const baseNumber = /^\d+$/.test(expression) ? expression : null;
  const table = baseNumber ? generateTable(baseNumber) : [];

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>✖️ Multiplicator</h2>

      <div style={{ position: 'relative', width: '90%', margin: '0 auto' }}>
        <input
          type="text"
          placeholder="Enter a number or expression"
          value={expression}
          onChange={handleInputChange}
          style={inputStyle}
          autoComplete="off"
        />

        {/* Multiplication table dropdown (clickable) */}
        {table.length > 0 && (
          <ul style={dropdownStyle}>
            {table.map(({ display, expr }, idx) => (
              <li
                key={idx}
                style={dropdownItemStyle}
                onClick={() => handleTableClick(expr)}
              >
                {display}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={buttonGroupStyle}>
        <button onClick={handleCalculate} style={buttonStyle}>Calculate</button>
        <button onClick={clear} style={clearButtonStyle}>Clear</button>
      </div>

      {result !== null && (
        <h3 style={resultStyle}>
          Result: <span>{result}</span>
        </h3>
      )}
    </div>
  );
}

// Styles (same as previous)
const containerStyle = {
  background: '#ffffff',
  color: '#333',
  padding: '30px',
  borderRadius: '20px',
  width: '350px',
  margin: '50px auto',
  fontFamily: 'Segoe UI, sans-serif',
  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
  textAlign: 'center',
};


const titleStyle = {
  color: '#00ffcc',
  marginBottom: '20px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '10px',
  width: '100%',
  border: '1px solid #444',
  backgroundColor: '#111',
  color: '#00ffcc',
  textAlign: 'center',
  outline: 'none',
  boxSizing: 'border-box',
  cursor: 'text',
};

const dropdownStyle = {
  position: 'absolute',
  top: '45px',
  left: 0,
  right: 0,
  backgroundColor: '#222',
  borderRadius: '8px',
  boxShadow: '0 6px 15px rgba(0, 255, 204, 0.5)',
  maxHeight: '200px',
  overflowY: 'auto',
  zIndex: 1000,
  padding: '8px 0',
  margin: 0,
  listStyle: 'none',
};

const dropdownItemStyle = {
  padding: '6px 12px',
  color: '#00ffcc',
  fontSize: '14px',
  cursor: 'pointer',
  borderBottom: '1px solid #004d40',
  userSelect: 'none',
};

const buttonGroupStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '20px',
};

const buttonStyle = {
  backgroundColor: '#00c853',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '16px',
};

const clearButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#d50000',
};

const resultStyle = {
  marginTop: '25px',
  fontSize: '20px',
  color: '#00ffcc',
};
