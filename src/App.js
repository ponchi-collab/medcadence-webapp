import { useState } from "react";
import { AuthProvider, useAuth } from "./AuthProvider";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import { useMedicines } from "./useMedicines";
import { useLogs } from "./useLogs";

/* ─── ICONS ──────────────────────────────────────────────────────────────── */
const SunIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const NoonIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
    <line x1="6.34" y1="17.66" x2="4.93" y2="19.07"/><line x1="19.07" y1="4.93" x2="17.66" y2="6.34"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const CheckIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const PillIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3"/>
    <circle cx="18" cy="18" r="3"/><path d="M20.2 15.8L15.8 20.2"/>
  </svg>
);
const SettingsIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const HistoryIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"/>
  </svg>
);
const TodayIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

/* ─── SEA THEME ──────────────────────────────────────────────────────────── */
const THEME = {
  bg:"#EBF8FF", bgCard:"#FFFFFF", bgAlt:"#DBEEFF", border:"#93C5FD",
  text:"#0C2340", textMid:"#1E5F8C", textLight:"#4A90B8",
  accent:"#0077B6", accentSoft:"#00B4D8", tabActive:"#0077B6",
  satBg:"#E0F2FE", satText:"#0284C7",
};

const COLORS = [
  { dot:"#0077B6", bg:"#E0F4FF", border:"#7EC8E3" },
  { dot:"#00B4D8", bg:"#E0FAFF", border:"#67E8F9" },
  { dot:"#0E9F6E", bg:"#DCFCE7", border:"#6EE7B7" },
  { dot:"#7C3AED", bg:"#EDE9FE", border:"#C4B5FD" },
  { dot:"#0891B2", bg:"#CFFAFE", border:"#67E8F9" },
  { dot:"#059669", bg:"#D1FAE5", border:"#6EE7B7" },
  { dot:"#1D4ED8", bg:"#DBEAFE", border:"#93C5FD" },
  { dot:"#0369A1", bg:"#E0F2FE", border:"#7DD3FC" },
];

const ALL_SLOTS = [
  { key:"morning", label:"Morning", Icon:SunIcon  },
  { key:"noon",    label:"Noon",    Icon:NoonIcon },
  { key:"evening", label:"Evening", Icon:MoonIcon },
];

const SCHEDULES = [
  { times:1, slots:["morning"],                   label:"Once daily" },
  { times:2, slots:["morning","evening"],          label:"Twice daily" },
  { times:3, slots:["morning","noon","evening"],   label:"3× daily"   },
];

function getTodayKey() { return new Date().toISOString().slice(0,10); }

const inputStyle = {
  width:"100%", padding:"11px 14px", borderRadius:"12px", fontSize:"14px",
  background:"rgba(255,255,255,0.9)", border:`2px solid ${THEME.border}`,
  color:THEME.text, outline:"none", boxSizing:"border-box",
  fontFamily:"'Nunito','Trebuchet MS',sans-serif", transition:"border-color 0.2s",
};

/* ─── SEA BACKGROUND ─────────────────────────────────────────────────────── */
const SeaBackground = () => (
  <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
    <div style={{
      position:"absolute", inset:0,
      background:"linear-gradient(180deg,#BAE6FD 0%,#7DD3FC 30%,#38BDF8 55%,#0EA5E9 70%,#0284C7 85%,#E0D5B0 86%,#D4C4A0 88%,#C8B890 90%,#B8A880 95%,#A09070 100%)",
    }}/>
    <div style={{
      position:"absolute", top:"6%", right:"18%", width:"60px", height:"60px", borderRadius:"50%",
      background:"radial-gradient(circle,#FFF9C4 0%,#FFE57F 50%,#FFD740 100%)",
      boxShadow:"0 0 40px 15px rgba(255,235,59,0.35)",
    }}/>
    <svg style={{ position:"absolute", bottom:"24%", left:0, width:"100%", opacity:0.9 }} viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,120 L0,120 Z" fill="#0369A1" opacity="0.6"/>
    </svg>
    <svg style={{ position:"absolute", bottom:"16%", left:0, width:"100%", opacity:1 }} viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path d="M0,30 C200,70 400,10 600,35 C800,60 1000,5 1200,35 C1320,55 1400,20 1440,35 L1440,100 L0,100 Z" fill="#0EA5E9" opacity="0.7"/>
    </svg>
    <svg style={{ position:"absolute", bottom:"10%", left:0, width:"100%", opacity:1 }} viewBox="0 0 1440 90" preserveAspectRatio="none">
      <path d="M0,25 C150,55 300,5 480,28 C660,52 840,8 1020,30 C1200,52 1350,15 1440,28 L1440,90 L0,90 Z" fill="#38BDF8" opacity="0.8"/>
      <path d="M0,25 C150,55 300,5 480,28 C660,52 840,8 1020,30 C1200,52 1350,15 1440,28" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3"/>
    </svg>
    <div style={{
      position:"absolute", bottom:0, left:0, right:0, height:"10%",
      background:"linear-gradient(180deg,#D4C4A0 0%,#C8B890 40%,#BBA880 100%)",
    }}/>
  </div>
);

/* ─── MEDICINE FORM ──────────────────────────────────────────────────────── */
function MedicineForm({ initial, onSave, onCancel }) {
  const [name,       setName]     = useState(initial?.name || "");
  const [dose,       setDose]     = useState(initial?.dose || "");
  const [colorIdx,   setColorIdx] = useState(initial?.color_idx ?? initial?.colorIdx ?? 0);
  const [timesPerDay,setTimes]    = useState(
    initial?.slots ? initial.slots.length : (initial?.times_per_day ?? initial?.timesPerDay ?? 2)
  );
  const [onceSlot, setOnceSlot]   = useState(
    initial?.slots?.length === 1 ? initial.slots[0] : "morning"
  );

  function handleSave() {
    if (!name.trim()) return;
    const slots = timesPerDay === 1
      ? [onceSlot]
      : (SCHEDULES.find(s => s.times === timesPerDay) || SCHEDULES[1]).slots;
    onSave({ name: name.trim(), dose: dose.trim(), colorIdx, timesPerDay, slots });
  }

  const previewSlots = timesPerDay === 1
    ? [onceSlot]
    : (SCHEDULES.find(s => s.times === timesPerDay) || SCHEDULES[1]).slots;

  return (
    <div style={{
      background:"rgba(255,255,255,0.95)", borderRadius:"20px",
      border:`2px solid ${THEME.border}`, padding:"22px",
      boxShadow:"0 8px 32px rgba(0,119,182,0.15)",
    }}>
      <h3 style={{ margin:"0 0 18px", fontSize:"17px", fontWeight:"800", color:THEME.text,
        fontFamily:"'Nunito','Trebuchet MS',sans-serif", letterSpacing:"-0.02em" }}>
        {initial ? "✏️ Edit Medicine" : "💊 New Medicine"}
      </h3>
      <input placeholder="Medicine name *" value={name} onChange={e => setName(e.target.value)}
        onKeyDown={e => e.key==="Enter" && handleSave()}
        style={{ ...inputStyle, marginBottom:"10px" }}/>
      <input placeholder="Dosage — e.g. 500mg (optional)" value={dose} onChange={e => setDose(e.target.value)}
        style={{ ...inputStyle, marginBottom:"18px" }}/>
      <div style={{ marginBottom:"18px" }}>
        <div style={{ fontSize:"11px", fontWeight:"700", color:THEME.textLight,
          letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"10px" }}>How many times per day?</div>
        <div style={{ display:"flex", gap:"8px" }}>
          {SCHEDULES.map(s => (
            <button key={s.times} onClick={() => setTimes(s.times)} style={{
              flex:1, padding:"10px 4px", borderRadius:"12px", cursor:"pointer",
              background: timesPerDay===s.times ? THEME.accent : THEME.bgAlt,
              color: timesPerDay===s.times ? "#fff" : THEME.textMid,
              border:`2px solid ${timesPerDay===s.times ? THEME.accent : THEME.border}`,
              fontFamily:"'Nunito',sans-serif", fontWeight:"700",
            }}>
              <div style={{ fontSize:"18px", marginBottom:"2px" }}>{s.times===1?"1×":s.times===2?"2×":"3×"}</div>
              <div style={{ fontSize:"11px" }}>{s.label}</div>
            </button>
          ))}
        </div>
        {timesPerDay === 1 && (
          <div style={{ marginTop:"12px" }}>
            <div style={{ fontSize:"11px", fontWeight:"700", color:THEME.textLight,
              letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"8px" }}>When do you take it?</div>
            <div style={{ display:"flex", gap:"8px" }}>
              {ALL_SLOTS.map(slot => {
                const selected = onceSlot === slot.key;
                return (
                  <button key={slot.key} onClick={() => setOnceSlot(slot.key)} style={{
                    flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"5px",
                    padding:"10px 4px", borderRadius:"12px", cursor:"pointer",
                    background: selected ? THEME.accent : THEME.bgAlt,
                    color: selected ? "#fff" : THEME.textMid,
                    border:`2px solid ${selected ? THEME.accent : THEME.border}`,
                    fontFamily:"'Nunito',sans-serif", fontWeight:"700",
                  }}>
                    <slot.Icon size={18}/>
                    <span style={{ fontSize:"11px" }}>{slot.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div style={{ display:"flex", gap:"6px", marginTop:"10px", flexWrap:"wrap" }}>
          {previewSlots.map(slotKey => {
            const slot = ALL_SLOTS.find(s => s.key===slotKey);
            return (
              <div key={slotKey} style={{
                display:"inline-flex", alignItems:"center", gap:"5px",
                background:THEME.bgAlt, border:`1.5px solid ${THEME.border}`,
                borderRadius:"20px", padding:"3px 10px 3px 8px",
                fontSize:"11px", fontWeight:"700", color:THEME.accent,
              }}>
                <slot.Icon size={11}/> {slot.label}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginBottom:"20px" }}>
        <div style={{ fontSize:"11px", fontWeight:"700", color:THEME.textLight,
          letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"10px" }}>Pick a color</div>
        <div style={{ display:"flex", gap:"9px", flexWrap:"wrap" }}>
          {COLORS.map((c,i) => (
            <button key={i} onClick={() => setColorIdx(i)} style={{
              width:"28px", height:"28px", borderRadius:"50%", background:c.dot,
              border: colorIdx===i ? `3px solid ${THEME.text}` : "3px solid transparent",
              cursor:"pointer", boxShadow: colorIdx===i ? `0 0 0 2px ${c.dot}66` : "none",
            }}/>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", gap:"9px" }}>
        <button onClick={handleSave} style={{
          flex:1, padding:"12px", borderRadius:"12px", border:"none", cursor:"pointer",
          background:THEME.accent, color:"white", fontSize:"14px",
          fontFamily:"'Nunito',sans-serif", fontWeight:"800",
        }}>{initial ? "Save Changes" : "Add Medicine"}</button>
        <button onClick={onCancel} style={{
          padding:"12px 18px", borderRadius:"12px",
          border:`2px solid ${THEME.border}`, background:"transparent",
          color:THEME.textMid, cursor:"pointer", fontSize:"14px",
          fontFamily:"'Nunito',sans-serif", fontWeight:"700",
        }}>Cancel</button>
      </div>
    </div>
  );
}

/* ─── AUTH WRAPPER ───────────────────────────────────────────────────────── */
function AppContent() {
  const { user, loading } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  if (loading) return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"center",
      minHeight:"100vh",
      background:"linear-gradient(180deg,#0a1628 0%,#0d2b4e 50%,#1a5276 100%)",
      color:"#7ec8e3", fontSize:"1.5rem",
    }}>
      <p>🌊 Loading...</p>
    </div>
  );

  if (!user) {
    return showSignup
      ? <SignupScreen onSwitch={() => setShowSignup(false)}/>
      : <LoginScreen  onSwitch={() => setShowSignup(true)}/>;
  }

  return <MedApp user={user}/>;
}

/* ─── MAIN APP ───────────────────────────────────────────────────────────── */
function MedApp({ user }) {
  const { signOut } = useAuth();
  const [view,      setView]      = useState("today");
  const [showAdd,   setShowAdd]   = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingDay,setEditingDay]= useState(null);
  const today = getTodayKey();
  const fontStack = "'Nunito','Trebuchet MS',sans-serif";

  const [historyMonth, setHistoryMonth] = useState(() => {
    const n = new Date();
    return { year:n.getFullYear(), month:n.getMonth() };
  });

  // ── Supabase hooks (replacing localStorage) ──
  const { medicines, addMedicine, updateMedicine, removeMedicine } = useMedicines(user.id);
  const { logs, toggle } = useLogs(user.id, historyMonth.year, historyMonth.month);

  function getSlots(med) {
    if (med.slots) return med.slots;
    if (med.times_per_day === 1 || med.timesPerDay === 1) return ["morning"];
    if (med.times_per_day === 3 || med.timesPerDay === 3) return ["morning","noon","evening"];
    return ["morning","evening"];
  }

  function isChecked(medId, slot) { return !!(logs[today]?.[medId]?.[slot]); }

  const totalDoses = medicines.reduce((a,m) => a + getSlots(m).length, 0);
  const takenDoses = medicines.reduce((a,m) => a + getSlots(m).filter(s => isChecked(m.id,s)).length, 0);
  const pct     = totalDoses > 0 ? Math.round((takenDoses/totalDoses)*100) : 0;
  const allDone = totalDoses > 0 && takenDoses === totalDoses;

  function getMonthDays(year, month) {
    const days = [];
    const count = new Date(year, month+1, 0).getDate();
    for (let d=1; d<=count; d++) days.push(new Date(year,month,d).toISOString().slice(0,10));
    return days;
  }

  const isCurrentMonth = historyMonth.year===new Date().getFullYear() && historyMonth.month===new Date().getMonth();

  const NAV = [
    { key:"today",   label:"Today",     Icon:TodayIcon,   emoji:"📅" },
    { key:"history", label:"History",   Icon:HistoryIcon, emoji:"📊" },
    { key:"config",  label:"Medicines", Icon:SettingsIcon,emoji:"⚙️" },
  ];

  return (
    <div style={{ minHeight:"100vh", fontFamily:fontStack, color:THEME.text, position:"relative" }}>
      <SeaBackground/>

      {/* HEADER */}
      <div style={{
        background:"linear-gradient(135deg,rgba(0,40,80,0.82) 0%,rgba(0,119,182,0.80) 50%,rgba(0,180,216,0.75) 100%)",
        backdropFilter:"blur(6px)", padding:"28px 24px 22px", textAlign:"center",
        position:"relative", zIndex:10,
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", marginBottom:"4px" }}>
          <div style={{ background:"rgba(255,255,255,0.2)", borderRadius:"12px", padding:"6px 8px", display:"flex" }}>
            <PillIcon size={22}/>
          </div>
          <h1 style={{ margin:0, fontSize:"28px", fontWeight:"900", color:"#fff", letterSpacing:"-0.03em" }}>
            MedCadence
          </h1>
        </div>
        <p style={{ margin:0, fontSize:"13px", color:"rgba(255,255,255,0.85)", fontWeight:"600" }}>
          {new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}
        </p>
        {/* Sign out button */}
        <button onClick={signOut} style={{
          position:"absolute", top:"16px", right:"16px",
          padding:"6px 12px", borderRadius:"20px",
          background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.3)",
          color:"rgba(255,255,255,0.9)", fontSize:"11px", fontWeight:"700",
          cursor:"pointer", fontFamily:fontStack,
        }}>Sign out</button>
      </div>

      <div style={{ maxWidth:"540px", margin:"0 auto", padding:"16px 14px 90px", position:"relative", zIndex:5 }}>

        {/* TAB BAR */}
        <div style={{
          display:"flex", background:"rgba(255,255,255,0.88)", borderRadius:"16px",
          border:`2px solid ${THEME.border}`, padding:"5px", marginBottom:"16px", gap:"4px",
          boxShadow:"0 2px 16px rgba(0,119,182,0.12)", backdropFilter:"blur(4px)",
        }}>
          {NAV.map(({key,label,emoji}) => (
            <button key={key} onClick={() => { setView(key); setShowAdd(false); setEditingId(null); }} style={{
              flex:1, padding:"9px 4px", borderRadius:"12px", border:"none", cursor:"pointer",
              background: view===key ? THEME.accent : "transparent",
              color: view===key ? "#fff" : THEME.textMid,
              fontSize:"11px", fontWeight:"800", fontFamily:fontStack,
              display:"flex", alignItems:"center", justifyContent:"center", gap:"4px",
              boxShadow: view===key ? `0 3px 10px ${THEME.accent}55` : "none",
            }}>
              <span style={{ fontSize:"14px" }}>{emoji}</span> {label}
            </button>
          ))}
        </div>

        {/* TODAY */}
        {view==="today" && (
          <>
            {medicines.length > 0 && (
              <div style={{
                borderRadius:"20px", marginBottom:"14px", overflow:"hidden",
                boxShadow:"0 4px 20px rgba(0,119,182,0.25)",
                background: allDone
                  ? "linear-gradient(135deg,rgba(5,150,105,0.9),rgba(16,185,129,0.9))"
                  : "linear-gradient(135deg,rgba(0,40,80,0.85),rgba(0,119,182,0.85))",
                backdropFilter:"blur(4px)",
              }}>
                <div style={{ padding:"18px 20px", display:"flex", alignItems:"center", gap:"16px" }}>
                  <div style={{ position:"relative", width:"60px", height:"60px", flexShrink:0 }}>
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="5"/>
                      <circle cx="30" cy="30" r="24" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round"
                        strokeDasharray={`${2*Math.PI*24}`}
                        strokeDashoffset={`${2*Math.PI*24*(1-pct/100)}`}
                        transform="rotate(-90 30 30)"
                        style={{ transition:"stroke-dashoffset 0.5s ease" }}/>
                    </svg>
                    <div style={{
                      position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"13px", fontWeight:"900", color:"#fff", fontFamily:"monospace",
                    }}>{pct}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize:"16px", fontWeight:"900", color:"#fff", marginBottom:"3px" }}>
                      {allDone ? "All done! Amazing! 🎉" : `${takenDoses} of ${totalDoses} doses taken`}
                    </div>
                    <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.8)", fontWeight:"600" }}>
                      {allDone ? "You crushed it today! 🌊" : "Keep going, you're doing great!"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {medicines.length === 0 ? (
              <div style={{
                textAlign:"center", padding:"60px 20px",
                background:"rgba(255,255,255,0.88)", borderRadius:"20px",
                border:`2px dashed ${THEME.border}`, backdropFilter:"blur(4px)",
              }}>
                <div style={{ fontSize:"52px", marginBottom:"12px" }}>💊</div>
                <p style={{ margin:"0 0 4px", fontSize:"17px", fontWeight:"800", color:THEME.text }}>No medicines yet</p>
                <p style={{ margin:0, fontSize:"13px", color:THEME.textLight, fontWeight:"600" }}>
                  Go to the <span style={{ color:THEME.accent }}>Medicines</span> tab to add some
                </p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                {medicines.map(med => {
                  const color    = COLORS[med.color_idx % COLORS.length];
                  const slots    = getSlots(med);
                  const taken    = slots.filter(s => isChecked(med.id,s)).length;
                  const allTaken = taken === slots.length;
                  return (
                    <div key={med.id} style={{
                      background:"rgba(255,255,255,0.90)", borderRadius:"18px",
                      border:`2px solid ${allTaken ? color.dot : color.border}`,
                      padding:"14px 15px", backdropFilter:"blur(4px)",
                      boxShadow: allTaken ? `0 4px 16px ${color.dot}40` : "0 2px 12px rgba(0,119,182,0.10)",
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
                        <div style={{
                          width:"36px", height:"36px", borderRadius:"10px",
                          background:color.bg, border:`2px solid ${color.border}`,
                          display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px",
                        }}>
                          {allTaken ? "✅" : "💊"}
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:"15px", fontWeight:"800", color:THEME.text }}>{med.name}</div>
                          {med.dose && <div style={{ fontSize:"12px", color:THEME.textLight, fontWeight:"600" }}>{med.dose}</div>}
                        </div>
                        <div style={{
                          background: allTaken ? color.dot : color.bg,
                          color: allTaken ? "#fff" : color.dot,
                          borderRadius:"20px", padding:"3px 10px",
                          fontSize:"12px", fontWeight:"800", border:`2px solid ${color.dot}`,
                        }}>{taken}/{slots.length}</div>
                      </div>
                      <div style={{ display:"flex", gap:"7px" }}>
                        {slots.map(slotKey => {
                          const slotDef = ALL_SLOTS.find(s => s.key===slotKey);
                          const checked = isChecked(med.id, slotKey);
                          return (
                            <button key={slotKey} onClick={() => toggle(med.id, slotKey, today)} style={{
                              flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"5px",
                              padding:"11px 4px", borderRadius:"14px",
                              border:`2px solid ${checked ? color.dot : color.border}`,
                              background: checked ? color.dot : color.bg,
                              cursor:"pointer", color: checked ? "#fff" : color.dot,
                              boxShadow: checked ? `0 4px 12px ${color.dot}44` : "none",
                              transform: checked ? "scale(1.02)" : "scale(1)",
                            }}>
                              {checked ? <CheckIcon size={16}/> : <slotDef.Icon size={16}/>}
                              <span style={{ fontSize:"10px", fontWeight:"800" }}>{slotDef.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* HISTORY */}
        {view==="history" && (
          <>
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              background:"rgba(255,255,255,0.88)", borderRadius:"16px",
              border:`2px solid ${THEME.border}`, padding:"10px 16px", marginBottom:"12px",
              boxShadow:"0 2px 12px rgba(0,119,182,0.10)", backdropFilter:"blur(4px)",
            }}>
              <button onClick={() => setHistoryMonth(prev => {
                const d = new Date(prev.year, prev.month-1);
                return { year:d.getFullYear(), month:d.getMonth() };
              })} style={{
                width:"34px", height:"34px", borderRadius:"10px", border:`2px solid ${THEME.border}`,
                background:THEME.bgAlt, color:THEME.accent, cursor:"pointer",
                fontSize:"18px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"900",
              }}>‹</button>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:"16px", fontWeight:"900", color:THEME.text }}>
                  {new Date(historyMonth.year,historyMonth.month).toLocaleDateString("en-US",{month:"long",year:"numeric"})}
                </div>
              </div>
              <button onClick={() => setHistoryMonth(prev => {
                const d = new Date(prev.year, prev.month+1);
                return { year:d.getFullYear(), month:d.getMonth() };
              })} disabled={isCurrentMonth} style={{
                width:"34px", height:"34px", borderRadius:"10px", border:`2px solid ${THEME.border}`,
                background: isCurrentMonth ? "#F0F4F8" : THEME.bgAlt,
                color: isCurrentMonth ? "#B0C4D4" : THEME.accent,
                cursor: isCurrentMonth ? "default" : "pointer",
                fontSize:"18px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"900",
              }}>›</button>
            </div>

            {medicines.length === 0 ? (
              <div style={{
                textAlign:"center", padding:"50px 20px",
                background:"rgba(255,255,255,0.88)", borderRadius:"20px",
                border:`2px dashed ${THEME.border}`,
                color:THEME.textLight, fontSize:"14px", fontWeight:"700",
              }}>📊 Add medicines to see history</div>
            ) : (
              <div style={{
                background:"rgba(255,255,255,0.92)", borderRadius:"20px",
                border:`2px solid ${THEME.border}`,
                boxShadow:"0 4px 20px rgba(0,119,182,0.12)",
                overflow:"hidden", backdropFilter:"blur(4px)",
              }}>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ borderCollapse:"collapse", fontSize:"12px", minWidth:"100%" }}>
                    <thead>
                      <tr style={{ background:THEME.bgAlt }}>
                        <th style={{
                          textAlign:"left", padding:"10px 12px", color:THEME.textLight,
                          fontWeight:"800", fontSize:"10px", letterSpacing:"0.08em",
                          textTransform:"uppercase", whiteSpace:"nowrap",
                          position:"sticky", left:0, background:THEME.bgAlt, zIndex:2,
                          borderBottom:`2px solid ${THEME.border}`, borderRight:`2px solid ${THEME.border}`,
                          minWidth:"90px",
                        }}>Day / Date</th>
                        {medicines.map(med => {
                          const color = COLORS[med.color_idx % COLORS.length];
                          return (
                            <th key={med.id} style={{
                              textAlign:"center", padding:"8px 6px", fontWeight:"800",
                              fontSize:"11px", whiteSpace:"nowrap",
                              borderBottom:`2px solid ${THEME.border}`, borderLeft:`1px solid ${THEME.border}`,
                              minWidth:"70px", background:THEME.bgAlt,
                            }}>
                              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
                                <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:color.dot }}/>
                                <span style={{ color:color.dot }}>{med.name}</span>
                                {med.dose && <span style={{ color:THEME.textLight, fontSize:"9px", fontWeight:"600" }}>{med.dose}</span>}
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {getMonthDays(historyMonth.year, historyMonth.month).map((dateStr, di) => {
                        const dateObj  = new Date(dateStr+"T12:00:00");
                        const dayName  = dateObj.toLocaleDateString("en-US",{weekday:"short"});
                        const dayNum   = dateObj.getDate();
                        const isToday  = dateStr === today;
                        const isFuture = dateStr > today;
                        const isSat    = dateObj.getDay() === 6;
                        const isEditing= editingDay === dateStr;
                        const rowBg    = isToday ? "#0077B6" : isSat ? THEME.satBg : "transparent";
                        const stickyBg = isToday ? "#005f94" : isSat ? THEME.satBg : "rgba(255,255,255,0.92)";

                        return (
                          <>
                            <tr key={dateStr} style={{ borderTop: di>0 ? `1px solid ${THEME.border}` : "none", background:rowBg }}>
                              <td style={{
                                padding:"6px 8px 6px 12px", whiteSpace:"nowrap",
                                position:"sticky", left:0, zIndex:1,
                                background:stickyBg, borderRight:`2px solid ${THEME.border}`,
                              }}>
                                <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                                  <div style={{
                                    width:"30px", height:"30px", borderRadius:"8px",
                                    background: isToday ? "rgba(255,255,255,0.25)" : isSat ? THEME.satText : THEME.bgAlt,
                                    border:`2px solid ${isToday ? "rgba(255,255,255,0.4)" : isSat ? THEME.satText : THEME.border}`,
                                    display:"flex", alignItems:"center", justifyContent:"center",
                                  }}>
                                    <span style={{ fontSize:"12px", fontWeight:"900", color: isToday?"#fff":isSat?"#fff":THEME.text }}>{dayNum}</span>
                                  </div>
                                  <span style={{ fontSize:"11px", fontWeight:"700", color: isToday?"rgba(255,255,255,0.9)":isSat?THEME.satText:THEME.textMid }}>
                                    {dayName}
                                  </span>
                                  {!isFuture && (
                                    <button onClick={() => setEditingDay(isEditing ? null : dateStr)} style={{
                                      width:"22px", height:"22px", borderRadius:"6px",
                                      background: isEditing ? THEME.accent : isToday ? "rgba(255,255,255,0.2)" : "rgba(0,119,182,0.1)",
                                      border: isEditing ? `1.5px solid ${THEME.accent}` : isToday ? "1.5px solid rgba(255,255,255,0.4)" : `1.5px solid ${THEME.border}`,
                                      color: isEditing?"#fff":isToday?"#fff":THEME.accent,
                                      cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                                    }}>{isEditing ? "✕" : "✎"}</button>
                                  )}
                                </div>
                              </td>
                              {medicines.map(med => {
                                const color  = COLORS[med.color_idx % COLORS.length];
                                const slots  = getSlots(med);
                                const dayLog = logs[dateStr]?.[med.id] || {};
                                const taken  = slots.filter(s => dayLog[s]).length;
                                const full   = taken === slots.length;
                                const none   = taken === 0;
                                return (
                                  <td key={med.id} style={{ textAlign:"center", padding:"6px 4px", borderLeft:`1px solid ${THEME.border}` }}>
                                    {isFuture ? (
                                      <div style={{
                                        width:"30px", height:"30px", borderRadius:"8px", margin:"0 auto",
                                        background:"rgba(219,238,255,0.5)", border:"2px solid #BDD9F0",
                                        display:"flex", alignItems:"center", justifyContent:"center",
                                        fontSize:"13px", color:"#93C5FD",
                                      }}>·</div>
                                    ) : (
                                      <div style={{
                                        width:"30px", height:"30px", borderRadius:"8px", margin:"0 auto",
                                        background: full ? color.dot : !none ? "#FEF3C7" : "#F0F6FF",
                                        border:`2px solid ${full ? color.dot : !none ? "#FCD34D" : "#BFDBFE"}`,
                                        display:"flex", alignItems:"center", justifyContent:"center",
                                        fontSize:"10px", fontWeight:"800",
                                        color: full?"#fff":!none?"#92400E":"#93C5FD", fontFamily:"monospace",
                                      }}>{full?"✓":!none?`${taken}/${slots.length}`:"–"}</div>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                            {isEditing && (
                              <tr key={dateStr+"-edit"} style={{ background:"#EFF8FF" }}>
                                <td colSpan={medicines.length+1} style={{
                                  padding:"10px 12px",
                                  borderTop:`1px dashed ${THEME.border}`,
                                  borderBottom:`2px solid ${THEME.accent}`,
                                }}>
                                  <div style={{ fontSize:"11px", fontWeight:"800", color:THEME.accent, marginBottom:"8px" }}>
                                    ✎ Editing doses for {dateObj.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}
                                  </div>
                                  <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                                    {medicines.map(med => {
                                      const color = COLORS[med.color_idx % COLORS.length];
                                      const slots = getSlots(med);
                                      return (
                                        <div key={med.id} style={{
                                          display:"flex", alignItems:"center", gap:"10px",
                                          background:"rgba(255,255,255,0.8)", borderRadius:"12px",
                                          border:`1.5px solid ${color.border}`, padding:"8px 12px",
                                        }}>
                                          <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:color.dot, flexShrink:0 }}/>
                                          <span style={{ fontSize:"13px", fontWeight:"800", color:THEME.text, flex:1 }}>{med.name}</span>
                                          <div style={{ display:"flex", gap:"6px" }}>
                                            {slots.map(slotKey => {
                                              const slotDef = ALL_SLOTS.find(s => s.key===slotKey);
                                              const checked = !!(logs[dateStr]?.[med.id]?.[slotKey]);
                                              return (
                                                <button key={slotKey} onClick={() => toggle(med.id, slotKey, dateStr)} style={{
                                                  display:"flex", flexDirection:"column", alignItems:"center", gap:"3px",
                                                  padding:"6px 10px", borderRadius:"10px", cursor:"pointer",
                                                  border:`2px solid ${checked ? color.dot : color.border}`,
                                                  background: checked ? color.dot : color.bg,
                                                  color: checked ? "#fff" : color.dot,
                                                  fontFamily:"'Nunito',sans-serif",
                                                }}>
                                                  {checked ? <CheckIcon size={13}/> : <slotDef.Icon size={13}/>}
                                                  <span style={{ fontSize:"9px", fontWeight:"800" }}>{slotDef.label}</span>
                                                </button>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  <button onClick={() => setEditingDay(null)} style={{
                                    marginTop:"10px", padding:"6px 16px", borderRadius:"20px",
                                    border:`2px solid ${THEME.accent}`, background:THEME.accent,
                                    color:"#fff", fontSize:"12px", fontWeight:"800",
                                    fontFamily:"'Nunito',sans-serif", cursor:"pointer",
                                  }}>Done</button>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{
                  display:"flex", gap:"14px", padding:"10px 16px", flexWrap:"wrap",
                  borderTop:`2px solid ${THEME.border}`,
                  fontSize:"11px", color:THEME.textLight, fontWeight:"700",
                }}>
                  <span>✓ All doses</span>
                  <span style={{ color:"#92400E" }}>n/n Partial</span>
                  <span style={{ color:"#93C5FD" }}>– Missed</span>
                  <span style={{ color:"#93C5FD" }}>· Future</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* CONFIG */}
        {view==="config" && (
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
              <div>
                <div style={{ fontSize:"17px", fontWeight:"900", color:THEME.text }}>Your Medicines</div>
                <div style={{ fontSize:"12px", color:THEME.textLight, marginTop:"2px", fontWeight:"600" }}>
                  {medicines.length} medicine{medicines.length!==1?"s":""} — tap ✏️ to edit
                </div>
              </div>
              {!showAdd && (
                <button onClick={() => { setShowAdd(true); setEditingId(null); }} style={{
                  display:"flex", alignItems:"center", gap:"6px",
                  padding:"9px 18px", borderRadius:"20px", border:"none", cursor:"pointer",
                  background:THEME.accent, color:"white", fontSize:"13px",
                  fontFamily:fontStack, fontWeight:"800",
                }}>
                  <PlusIcon/> Add
                </button>
              )}
            </div>

            {showAdd && (
              <div style={{ marginBottom:"14px" }}>
                <MedicineForm onSave={async fields => { await addMedicine(fields); setShowAdd(false); }} onCancel={() => setShowAdd(false)}/>
              </div>
            )}

            {medicines.length===0 && !showAdd && (
              <div style={{
                textAlign:"center", padding:"55px 20px",
                background:"rgba(255,255,255,0.88)", borderRadius:"20px",
                border:`2px dashed ${THEME.border}`, backdropFilter:"blur(4px)",
              }}>
                <div style={{ fontSize:"40px", marginBottom:"10px" }}>💊</div>
                <p style={{ margin:0, fontSize:"15px", fontWeight:"800", color:THEME.textMid }}>No medicines yet</p>
                <p style={{ margin:"4px 0 0", fontSize:"13px", color:THEME.textLight, fontWeight:"600" }}>Tap Add to get started</p>
              </div>
            )}

            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {medicines.map(med => {
                const color  = COLORS[med.color_idx % COLORS.length];
                const slots  = getSlots(med);
                const sched  = SCHEDULES.find(s => s.times===slots.length);
                const isEdit = editingId===med.id;
                return (
                  <div key={med.id}>
                    {isEdit ? (
                      <MedicineForm
                        initial={med}
                        onSave={async fields => { await updateMedicine(med.id, fields); setEditingId(null); }}
                        onCancel={() => setEditingId(null)}
                      />
                    ) : (
                      <div style={{
                        background:"rgba(255,255,255,0.90)", borderRadius:"18px",
                        border:`2px solid ${color.border}`, padding:"14px 15px",
                        boxShadow:"0 2px 12px rgba(0,119,182,0.10)", backdropFilter:"blur(4px)",
                      }}>
                        <div style={{ display:"flex", alignItems:"flex-start", gap:"11px" }}>
                          <div style={{
                            width:"40px", height:"40px", borderRadius:"12px",
                            background:color.bg, border:`2px solid ${color.border}`,
                            display:"flex", alignItems:"center", justifyContent:"center",
                          }}>
                            <div style={{ width:"14px", height:"14px", borderRadius:"50%", background:color.dot }}/>
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:"15px", fontWeight:"800", color:THEME.text }}>{med.name}</div>
                            {med.dose && <div style={{ fontSize:"12px", color:THEME.textLight, fontWeight:"600", marginTop:"1px", marginBottom:"8px" }}>{med.dose}</div>}
                            <div style={{ display:"flex", gap:"5px", flexWrap:"wrap", marginTop: med.dose?"0":"7px" }}>
                              <div style={{
                                display:"inline-flex", alignItems:"center",
                                background:THEME.accent+"18", border:`1.5px solid ${THEME.accent}44`,
                                borderRadius:"20px", padding:"2px 9px",
                                fontSize:"11px", fontWeight:"800", color:THEME.accent,
                              }}>{sched?.label||`${slots.length}× daily`}</div>
                              {slots.map(slotKey => {
                                const slotDef = ALL_SLOTS.find(s => s.key===slotKey);
                                return (
                                  <div key={slotKey} style={{
                                    display:"inline-flex", alignItems:"center", gap:"4px",
                                    background:color.bg, border:`1.5px solid ${color.border}`,
                                    borderRadius:"20px", padding:"2px 9px 2px 7px",
                                    fontSize:"11px", fontWeight:"700", color:color.dot,
                                  }}>
                                    <slotDef.Icon size={11}/> {slotDef.label}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div style={{ display:"flex", gap:"5px", flexShrink:0 }}>
                            <button onClick={() => { setEditingId(med.id); setShowAdd(false); }} style={{
                              width:"34px", height:"34px", borderRadius:"10px",
                              background:"#EEF2FF", border:"2px solid #C7D2FE",
                              color:"#4F46E5", cursor:"pointer",
                              display:"flex", alignItems:"center", justifyContent:"center",
                            }}><EditIcon/></button>
                            <button onClick={() => removeMedicine(med.id)} style={{
                              width:"34px", height:"34px", borderRadius:"10px",
                              background:"#FEF2F2", border:"2px solid #FECACA",
                              color:"#EF4444", cursor:"pointer",
                              display:"flex", alignItems:"center", justifyContent:"center",
                            }}><TrashIcon/></button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent/>
    </AuthProvider>
  );
}