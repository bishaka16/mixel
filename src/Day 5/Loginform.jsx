import React, { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 6) error = "Min 6 characters";
    }

    setFormErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const isEmailValid = validateField("email", formData.email);
    const isPasswordValid = validateField("password", formData.password);

    if (!isEmailValid || !isPasswordValid) return;

    if (formData.email === "user@example.com" && formData.password === "password123") {
      setMessage("✅ Login successful!");
    } else {
      setMessage("❌ Invalid email or password.");
    }
  };

  const handleForgotPassword = () => {
    setMessage("🔐 Password reset link sent to your email (dummy).");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: formErrors.email ? "#ff4d4d" : "#ccc",
              }}
            />
            {formErrors.email && <span style={styles.error}>{formErrors.email}</span>}
          </div>

          <div style={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: formErrors.password ? "#ff4d4d" : "#ccc",
              }}
            />
            {formErrors.password && <span style={styles.error}>{formErrors.password}</span>}
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>

        <div style={styles.forgot}>
          <button onClick={handleForgotPassword} style={styles.linkButton}>
            Forgot Password?
          </button>
        </div>

        <div style={styles.message}>
          {message}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f9fc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "40px",
    width: "350px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    color: "#333",
    border: "1px solid #eee",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "26px",
    fontWeight: "600",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
  },
  forgot: {
    textAlign: "center",
    marginTop: "15px",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#007bff",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "14px",
  },
  error: {
    color: "#d9534f",
    fontSize: "13px",
    marginTop: "5px",
    display: "block",
  },
  message: {
    marginTop: "20px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
};