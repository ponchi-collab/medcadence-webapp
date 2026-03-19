import { useAuth } from "./AuthProvider";

const fontStack = "'Nunito','Trebuchet MS',sans-serif";

export default function PendingScreen() {
  const { signOut } = useAuth();
  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", minHeight:"100vh", padding:"30px",
      background:"linear-gradient(180deg,#0a1628 0%,#0d2b4e 50%,#1a5276 100%)",
      fontFamily:fontStack, textAlign:"center",
    }}>
      <div style={{ fontSize:"60px", marginBottom:"20px" }}>⏳</div>
      <h1 style={{ color:"#7ec8e3", fontSize:"24px", fontWeight:"900", marginBottom:"12px" }}>
        Account Pending Approval
      </h1>
      <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"15px", fontWeight:"600",
        maxWidth:"300px", lineHeight:"1.6", marginBottom:"30px" }}>
        Your account has been created successfully. Please wait for an administrator to approve your access.
      </p>
      <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"13px", marginBottom:"30px" }}>
        You'll be able to log in once approved.
      </p>
      <button onClick={signOut} style={{
        padding:"10px 24px", borderRadius:"20px",
        background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.3)",
        color:"rgba(255,255,255,0.9)", fontSize:"13px", fontWeight:"700",
        cursor:"pointer", fontFamily:fontStack,
      }}>Sign Out</button>
    </div>
  );
}