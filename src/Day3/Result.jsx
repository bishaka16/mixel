import React, { useState } from "react";

function Result() {
  const [name, setName] = useState("");
  const [marks, setMarks] = useState(Array(5).fill(""));
  const [result, setResult] = useState(null);

  const handleMarkChange = (index, value) => {
    const newMarks = [...marks];
    newMarks[index] = value;
    setMarks(newMarks);
  };

  const evaluate = () => {
    const numericMarks = marks.map(Number);

    if (numericMarks.some((mark) => isNaN(mark) || mark < 0 || mark > 100)) {
      alert("Please enter valid marks between 0 and 100.");
      return;
    }

    const total = numericMarks.reduce((sum, mark) => sum + mark, 0);
    const average = total / numericMarks.length;

    let grade = "";
    if (average >= 90) grade = "A+";
    else if (average >= 80) grade = "A";
    else if (average >= 70) grade = "B+";
    else if (average >= 60) grade = "B";
    else if (average >= 50) grade = "C";
    else if (average >= 40) grade = "D";
    else grade = "F (Fail)";

    setResult({ name, total, average, grade });
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>🎓 Student Grade Evaluator</h2>

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />

      {marks.map((mark, index) => (
        <input
          key={index}
          type="number"
          placeholder={`Subject ${index + 1} Marks`}
          value={mark}
          onChange={(e) => handleMarkChange(index, e.target.value)}
          style={inputStyle}
        />
      ))}

      <button onClick={evaluate} style={buttonStyle}>
        ✅ Calculate Result
      </button>

      {result && (
        <div style={resultBox}>
          <h3>📋 Result Summary</h3>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Total:</strong> {result.total}</p>
          <p><strong>Average:</strong> {result.average.toFixed(2)}</p>
          <p><strong>Grade:</strong> {result.grade}</p>
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "30px",
  backgroundColor: "#fff",
  borderRadius: "15px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
  fontFamily: "Segoe UI, sans-serif",
};

const headingStyle = {
  color: "#00bcd4",
  marginBottom: "20px",
  textAlign: "center",
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  backgroundColor: "#00c853",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
  width: "100%",
};

const resultBox = {
  marginTop: "20px",
  background: "#f5f5f5",
  padding: "15px",
  borderRadius: "10px",
};

export default Result;
