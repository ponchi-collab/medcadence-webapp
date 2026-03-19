import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function ResetPasswordScreen({ onDone }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setError(error.message);
    else {
      setSuccess(true);
      setTimeout(() => onDone(), 2000);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌊 MedCadence</h1>
      <p style={styles.subtitle}>Set your new password</p>

      {!success ? (
        <>
          <input
            style={styles.input}
            placeholder="New password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Confirm new password"
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleReset()}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.button} onClick={handleReset} disabled={loading}>
            {loading ? "Saving..." : "Set New Password"}
          </button>
        </>
      ) : (
        <>
          <div style={{ fontSize:"50px", marginBottom:"16px" }}>✅</div>
          <p style={{ color:"#82e0aa", fontSize:"15px", fontWeight:"700" }}>
            Password updated! Redirecting...
          </p>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    display:"flex", flexDirection:"column", alignItems:"center",
    justifyContent:"center", minHeight:"100vh", padding:"20px",
    background:"linear-gradient(180deg,#0a1628 0%,#0d2b4e 50%,#1a5276 100%)",
  },
  title: { color:"#7ec8e3", fontSize:"2rem", margin:0 },
  subtitle: { color:"#a8d8ea", marginBottom:"30px" },
  input: {
    width:"100%", maxWidth:"320px", padding:"12px", marginBottom:"12px",
    borderRadius:"8px", border:"1px solid #1a5276",
    background:"rgba(255,255,255,0.1)", color:"white", fontSize:"1rem",
  },
  button: {
    width:"100%", maxWidth:"320px", padding:"12px", marginBottom:"12px",
    borderRadius:"8px", background:"#1a5276", color:"white",
    fontSize:"1rem", border:"none", cursor:"pointer",
  },
  error: { color:"#ff6b6b", marginBottom:"10px" },
};
