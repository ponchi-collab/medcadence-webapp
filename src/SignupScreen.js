import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function SignupScreen({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setMessage("Check your email to confirm your account!");
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌊 MedCadence</h1>
      <p style={styles.subtitle}>Create your account</p>

      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.message}>{message}</p>}

      <button style={styles.button} onClick={handleSignup} disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      <p style={styles.switchText}>
        Already have an account?{" "}
        <span style={styles.link} onClick={onSwitch}>Log in</span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(180deg, #0a1628 0%, #0d2b4e 50%, #1a5276 100%)",
  },
  title: { color: "#7ec8e3", fontSize: "2rem", margin: 0 },
  subtitle: { color: "#a8d8ea", marginBottom: "30px" },
  input: {
    width: "100%",
    maxWidth: "320px",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #1a5276",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    maxWidth: "320px",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    background: "#1a5276",
    color: "white",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
  },
  error: { color: "#ff6b6b", marginBottom: "10px" },
  message: { color: "#82e0aa", marginBottom: "10px" },
  switchText: { color: "#a8d8ea" },
  link: { color: "#7ec8e3", cursor: "pointer", textDecoration: "underline" },
};