import React, { useState, useEffect } from 'react';

export default function Conditional() {
  const [inputName, setInputName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState('');
  const [users, setUsers] = useState([]);

  // Load users from localStorage on mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Save users to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleLogin = () => {
    if (inputName === 'Nikesh') {
      setLoggedUser('Nikesh');
      setIsLoggedIn(true);
    } else {
      const nameExists = users.includes(inputName);
      if (nameExists) {
        setLoggedUser(inputName);
        setIsLoggedIn(true);
      } else {
        const confirmAdd = window.confirm(`"${inputName}" not found. Do you want to register this name?`);
        if (confirmAdd && inputName.trim() !== "") {
          const updatedUsers = [...users, inputName];
          setUsers(updatedUsers);
          setLoggedUser(inputName);
          setIsLoggedIn(true);
        }
      }
    }
    setInputName('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedUser('');
    setInputName('');
  };

  const handleClearUsers = () => {
    const enteredPassword = prompt("Enter password to clear user data:");
    if (enteredPassword === "4242") {
      localStorage.removeItem('users');
      setUsers([]);
      alert("All saved user credentials have been cleared.");
    } else {
      alert("Incorrect password. Cannot clear user data.");
    }
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '10px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: '0.3s ease'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #e0f7fa, #fff3e0)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '30px'
    }}>
      <div style={{
  backgroundColor: '#ffffff',
  padding: '40px',
  borderRadius: '20px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  transition: '0.3s ease'
}}>

        <h2 style={{ color: '#333', marginBottom: '30px' }}>
          {isLoggedIn ? `${loggedUser} is logged in` : '🔐 Please Log In'}
        </h2>

        {!isLoggedIn && (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              style={{
                padding: '12px',
                width: '100%',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginBottom: '20px',
                boxSizing: 'border-box'
              }}
            />
            <button
              onClick={handleLogin}
              style={{
                ...buttonStyle,
                backgroundColor: '#4caf50',
                color: '#fff'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#43a047'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4caf50'}
            >
              Login
            </button>
            <button
              onClick={handleClearUsers}
              style={{
                ...buttonStyle,
                backgroundColor: '#ff9800',
                color: '#fff'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#fb8c00'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ff9800'}
            >
              Clear Saved Users
            </button>
          </>
        )}

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            style={{
              ...buttonStyle,
              backgroundColor: '#f44336',
              color: '#fff',
              marginTop: '20px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e53935'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
