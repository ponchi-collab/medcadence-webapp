import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function LoginScreen({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const handleForgot = async () => {
    if (!forgotEmail.trim()) return;
    setForgotLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: window.location.origin,
    });
    if (error) setError(error.message);
    else setForgotSent(true);
    setForgotLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌊 MedCadence</h1>
      <p style={styles.subtitle}>Your medicine tracker</p>

      {!showForgot ? (
        <>
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
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.button} onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>

          <button style={styles.googleButton} onClick={handleGoogle}>
            Continue with Google
          </button>

          <p
            style={styles.forgotLink}
            onClick={() => { setShowForgot(true); setError(null); setForgotEmail(email); }}
          >
            Forgot your password?
          </p>

          <p style={styles.switchText}>
            Don't have an account?{" "}
            <span style={styles.link} onClick={onSwitch}>Sign up</span>
          </p>
        </>
      ) : (
        <>
          {!forgotSent ? (
            <>
              <p style={styles.subtitle}>Enter your email and we'll send you a reset link.</p>
              <input
                style={styles.input}
                placeholder="Email"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleForgot()}
              />
              {error && <p style={styles.error}>{error}</p>}
              <button style={styles.button} onClick={handleForgot} disabled={forgotLoading}>
                {forgotLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </>
          ) : (
            <>
              <div style={{ fontSize:"50px", marginBottom:"16px" }}>📬</div>
              <p style={{ color:"#82e0aa", fontSize:"15px", fontWeight:"700",
                textAlign:"center", maxWidth:"280px", lineHeight:"1.6" }}>
                Reset link sent! Check your email and follow the instructions.
              </p>
            </>
          )}
          <p
            style={styles.forgotLink}
            onClick={() => { setShowForgot(false); setForgotSent(false); setError(null); }}
          >
            ← Back to login
          </p>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", minHeight: "100vh", padding: "20px",
    background: "linear-gradient(180deg, #0a1628 0%, #0d2b4e 50%, #1a5276 100%)",
  },
  title: { color: "#7ec8e3", fontSize: "2rem", margin: 0 },
  subtitle: { color: "#a8d8ea", marginBottom: "30px", textAlign: "center" },
  input: {
    width: "100%", maxWidth: "320px", padding: "12px", marginBottom: "12px",
    borderRadius: "8px", border: "1px solid #1a5276",
    background: "rgba(255,255,255,0.1)", color: "white", fontSize: "1rem",
  },
  button: {
    width: "100%", maxWidth: "320px", padding: "12px", marginBottom: "12px",
    borderRadius: "8px", background: "#1a5276", color: "white",
    fontSize: "1rem", border: "none", cursor: "pointer",
  },
  googleButton: {
    width: "100%", maxWidth: "320px", padding: "12px", marginBottom: "20px",
    borderRadius: "8px", background: "white", color: "#333",
    fontSize: "1rem", border: "none", cursor: "pointer",
  },
  error: { color: "#ff6b6b", marginBottom: "10px" },
  switchText: { color: "#a8d8ea" },
  link: { color: "#7ec8e3", cursor: "pointer", textDecoration: "underline" },
  forgotLink: {
    color: "#7ec8e3", cursor: "pointer", fontSize: "13px",
    fontWeight: "600", marginTop: "8px", marginBottom: "8px",
  },
};