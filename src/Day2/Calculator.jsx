import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);

  const evaluate = (expression) => {
    try {
      // Replace display-friendly operators with JavaScript-compatible ones
      const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
      // eslint-disable-next-line no-eval
      return eval(sanitized);
    } catch {
      return 'Error';
    }
  };

  const handleButtonClick = (value) => {
    if (value === 'CE') {
      setDisplay('0');
    } else if (value === '=') {
      setDisplay(String(evaluate(display)));
    } else if (value === '√') {
      const result = Math.sqrt(parseFloat(display));
      setDisplay(String(result));
    } else if (value === '1/x') {
      const num = parseFloat(display);
      setDisplay(num !== 0 ? String(1 / num) : 'Error');
    } else if (value === '+/-') {
      const num = parseFloat(display);
      setDisplay(String(-num));
    } else if (value === 'M+') {
      setMemory(prev => prev + parseFloat(display));
    } else if (value === 'M-') {
      setMemory(prev => prev - parseFloat(display));
    } else if (value === 'MR') {
      setDisplay(String(memory));
    } else if (value === 'MC') {
      setMemory(0);
    } else {
      setDisplay(prev => prev === '0' ? value : prev + value);
    }
  };

  const buttons = [
    ['MC', 'MR', 'M+', 'M-', 'CE'],
    ['7', '8', '9', '÷', '√'],
    ['4', '5', '6', '×', '%'],
    ['1', '2', '3', '-', '1/x'],
    ['0', '.', '+/-', '+', '=']
  ];

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="button-grid">
        {buttons.flat().map((btn, index) => (
          <button
            key={index}
            className={`calc-btn ${btn === '=' ? 'equals' : ''} ${btn === 'CE' ? 'ce' : ''}`}
            onClick={() => handleButtonClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;

