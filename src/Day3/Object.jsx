// src/Day3/Object.jsx
import React from 'react';

export default function ObjectComponent() {
  // Step 1: Define an object
  const person = {
    firstName: "Bishaka",
    lastName: "Rayamajhi",
    age: 20,
    country: "thailand",
    profession: "Developer"
  };

  // Step 2: Display using dot notation
  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "10px", color: "#00bcd4" }}>👤 Person Details </h2>
      <div><strong>First Name:</strong> {person.firstName}</div>
      <div><strong>Last Name:</strong> {person.lastName}</div>
      <div><strong>Age:</strong> {person.age}</div>
      <div><strong>Country:</strong> {person.country}</div>
      <div><strong>Profession:</strong> {person.profession}</div>
    </div>
  );
}

const containerStyle = {
  background: "#fff",
  padding: "25px",
  margin: "30px auto",
  borderRadius: "15px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  maxWidth: "600px",
  fontFamily: "Segoe UI, sans-serif",
  color: "#333"
};
