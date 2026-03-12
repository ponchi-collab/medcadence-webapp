import { useState, useEffect } from "react";

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

/* ─── PALETTE & CONSTANTS ──────────────────────────────────────────────────── */
const THEME = {
  bg:         "#FFF8F0",
  bgCard:     "#FFFFFF",
  bgAlt:      "#FFF0E6",
  border:     "#FFD6B0",
  text:       "#1A0A00",
  textMid:    "#7A4A20",
  textLight:  "#B07040",
  accent:     "#FF5722",
  accentSoft: "#FF8A65",
  tabActive:  "#FF5722",
};

const COLORS = [
  { dot: "#FF3D71", bg: "#FFF0F3", border: "#FFB3C6" },
  { dot: "#FF9500", bg: "#FFF8E6", border: "#FFD97A" },
  { dot: "#00C48C", bg: "#E6FBF5", border: "#7DE8C6" },
  { dot: "#0090FF", bg: "#E6F4FF", border: "#7DC8FF" },
  { dot: "#A855F7", bg: "#F5EEFF", border: "#CCA8F8" },
  { dot: "#FF6B35", bg: "#FFF1EB", border: "#FFBFA0" },
  { dot: "#E91E8C", bg: "#FEEAF5", border: "#F9A0D4" },
  { dot: "#00BCD4", bg: "#E0FAFF", border: "#7AE8F5" },
];

const ALL_SLOTS = [
  { key: "morning", label: "Morning", Icon: SunIcon  },
  { key: "noon",    label: "Noon",    Icon: NoonIcon },
  { key: "evening", label: "Evening", Icon: MoonIcon },
];

const SCHEDULES = [
  { times: 1, slots: ["morning"],                   label: "Once daily" },
  { times: 2, slots: ["morning", "evening"],         label: "Twice daily" },
  { times: 3, slots: ["morning", "noon", "evening"], label: "3× daily"   },
];

function getTodayKey() { return new Date().toISOString().slice(0, 10); }
function formatDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

/* ─── localStorage helpers ─────────────────────────────────────────────────── */
function lsGet(key) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; }
}
function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

/* ─── INPUT STYLE ──────────────────────────────────────────────────────────── */
const inputStyle = {
  width: "100%", padding: "11px 14px", borderRadius: "12px", fontSize: "14px",
  background: "#FFF8F0", border: `2px solid ${THEME.border}`,
  color: THEME.text, outline: "none", boxSizing: "border-box",
  fontFamily: "'Nunito', 'Trebuchet MS', sans-serif",
  transition: "border-color 0.2s",
};

/* ─── MEDICINE FORM ────────────────────────────────────────────────────────── */
function MedicineForm({ initial, onSave, onCancel }) {
  const [name,     setName]     = useState(initial?.name || "");
  const [dose,     setDose]     = useState(initial?.dose || "");
  const [colorIdx, setColorIdx] = useState(initial?.colorIdx ?? 0);
  const [timesPerDay, setTimes] = useState(
    initial?.slots ? initial.slots.length : (initial?.timesPerDay ?? 2)
  );

  function handleSave() {
    if (!name.trim()) return;
    const schedule = SCHEDULES.find(s => s.times === timesPerDay) || SCHEDULES[1];
    onSave({ name: name.trim(), dose: dose.trim(), colorIdx, timesPerDay, slots: schedule.slots });
  }

  const previewSlots = (SCHEDULES.find(s => s.times === timesPerDay) || SCHEDULES[1]).slots;

  return (
    <div style={{
      background: "#FFFFFF", borderRadius: "20px",
      border: `2px solid ${THEME.border}`, padding: "22px",
      boxShadow: "0 8px 32px rgba(255,87,34,0.10)",
    }}>
      <h3 style={{ margin: "0 0 18px", fontSize: "17px", fontWeight: "800", color: THEME.text,
        fontFamily: "'Nunito', 'Trebuchet MS', sans-serif", letterSpacing: "-0.02em" }}>
        {initial ? "✏️ Edit Medicine" : "💊 New Medicine"}
      </h3>

      <input placeholder="Medicine name *" value={name} onChange={e => setName(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSave()}
        style={{ ...inputStyle, marginBottom: "10px" }} />
      <input placeholder="Dosage — e.g. 500mg (optional)" value={dose} onChange={e => setDose(e.target.value)}
        style={{ ...inputStyle, marginBottom: "18px" }} />

      {/* Frequency */}
      <div style={{ marginBottom: "18px" }}>
        <div style={{ fontSize: "11px", fontWeight: "700", color: THEME.textLight,
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px",
          fontFamily: "'Nunito', sans-serif" }}>
          How many times per day?
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {SCHEDULES.map(s => (
            <button key={s.times} onClick={() => setTimes(s.times)} style={{
              flex: 1, padding: "10px 4px", borderRadius: "12px", cursor: "pointer",
              background: timesPerDay === s.times ? THEME.accent : "#FFF0E6",
              color: timesPerDay === s.times ? "#fff" : THEME.textMid,
              border: `2px solid ${timesPerDay === s.times ? THEME.accent : THEME.border}`,
              fontFamily: "'Nunito', sans-serif", transition: "all 0.15s", fontWeight: "700",
            }}>
              <div style={{ fontSize: "18px", marginBottom: "2px" }}>{s.times === 1 ? "1×" : s.times === 2 ? "2×" : "3×"}</div>
              <div style={{ fontSize: "11px" }}>{s.label}</div>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px", marginTop: "10px", flexWrap: "wrap" }}>
          {previewSlots.map(slotKey => {
            const slot = ALL_SLOTS.find(s => s.key === slotKey);
            return (
              <div key={slotKey} style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: "#FFF0E6", border: `1.5px solid ${THEME.border}`,
                borderRadius: "20px", padding: "3px 10px 3px 8px",
                fontSize: "11px", fontWeight: "700", color: THEME.accent,
                fontFamily: "'Nunito', sans-serif",
              }}>
                <slot.Icon size={11} /> {slot.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Color */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "11px", fontWeight: "700", color: THEME.textLight,
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px",
          fontFamily: "'Nunito', sans-serif" }}>Pick a color</div>
        <div style={{ display: "flex", gap: "9px", flexWrap: "wrap" }}>
          {COLORS.map((c, i) => (
            <button key={i} onClick={() => setColorIdx(i)} style={{
              width: "28px", height: "28px", borderRadius: "50%", background: c.dot,
              border: colorIdx === i ? `3px solid ${THEME.text}` : "3px solid transparent",
              cursor: "pointer", transition: "all 0.15s",
              boxShadow: colorIdx === i ? `0 0 0 2px ${c.dot}55` : "none",
            }} />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "9px" }}>
        <button onClick={handleSave} style={{
          flex: 1, padding: "12px", borderRadius: "12px", border: "none", cursor: "pointer",
          background: THEME.accent, color: "white",
          fontSize: "14px", fontFamily: "'Nunito', sans-serif", fontWeight: "800",
          boxShadow: `0 4px 16px ${THEME.accent}55`, transition: "transform 0.1s",
        }}>
          {initial ? "Save Changes" : "Add Medicine"}
        </button>
        <button onClick={onCancel} style={{
          padding: "12px 18px", borderRadius: "12px",
          border: `2px solid ${THEME.border}`, background: "transparent",
          color: THEME.textMid, cursor: "pointer",
          fontSize: "14px", fontFamily: "'Nunito', sans-serif", fontWeight: "700",
        }}>Cancel</button>
      </div>
    </div>
  );
}

/* ─── MAIN APP ─────────────────────────────────────────────────────────────── */
export default function App() {
  const [medicines, setMedicines] = useState([]);
  const [logs,      setLogs]      = useState({});
  const [view,      setView]      = useState("today");
  const [showAdd,   setShowAdd]   = useState(false);
  const [editingId, setEditingId] = useState(null);
  const today = getTodayKey();

  /* Load from localStorage on first render */
  useEffect(() => {
    const m = lsGet("medcadence-medicines");
    const l = lsGet("medcadence-logs");
    if (m) setMedicines(m);
    if (l) setLogs(l);
  }, []);

  function saveMedicines(data) {
    setMedicines(data);
    lsSet("medcadence-medicines", data);
  }
  function saveLogs(data) {
    setLogs(data);
    lsSet("medcadence-logs", data);
  }

  const addMedicine    = fields => { saveMedicines([...medicines, { id: Date.now().toString(), ...fields }]); setShowAdd(false); };
  const updateMedicine = (id, fields) => { saveMedicines(medicines.map(m => m.id === id ? { ...m, ...fields } : m)); setEditingId(null); };
  const removeMedicine = id => saveMedicines(medicines.filter(m => m.id !== id));

  function getSlots(med) {
    if (med.slots) return med.slots;
    if (med.timesPerDay === 1) return ["morning"];
    if (med.timesPerDay === 3) return ["morning", "noon", "evening"];
    return ["morning", "evening"];
  }

  function toggle(medId, slot) {
    const dayLogs = logs[today] || {};
    const medLog  = dayLogs[medId] || {};
    saveLogs({ ...logs, [today]: { ...dayLogs, [medId]: { ...medLog, [slot]: !medLog[slot] } } });
  }
  function isChecked(medId, slot) { return !!(logs[today]?.[medId]?.[slot]); }

  const totalDoses = medicines.reduce((a, m) => a + getSlots(m).length, 0);
  const takenDoses = medicines.reduce((a, m) => a + getSlots(m).filter(s => isChecked(m.id, s)).length, 0);
  const pct        = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;
  const allDone    = totalDoses > 0 && takenDoses === totalDoses;

  function getHistoryDays() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      days.push(d.toISOString().slice(0, 10));
    }
    return days;
  }

  const NAV = [
    { key: "today",   label: "Today",     Icon: TodayIcon,    emoji: "📅" },
    { key: "history", label: "History",   Icon: HistoryIcon,  emoji: "📊" },
    { key: "config",  label: "Medicines", Icon: SettingsIcon, emoji: "⚙️" },
  ];

  const fontStack = "'Nunito', 'Trebuchet MS', sans-serif";

  return (
    <div style={{
      minHeight: "100vh",
      background: THEME.bg,
      fontFamily: fontStack,
      color: THEME.text,
      backgroundImage: `radial-gradient(circle, #FFD6B0 1px, transparent 1px)`,
      backgroundSize: "28px 28px",
    }}>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(135deg, #FF5722 0%, #FF9800 50%, #FFC107 100%)`,
        padding: "28px 24px 22px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position:"absolute", top:"-20px", left:"-20px", width:"80px", height:"80px", borderRadius:"50%", background:"rgba(255,255,255,0.12)" }} />
        <div style={{ position:"absolute", bottom:"-30px", right:"-10px", width:"100px", height:"100px", borderRadius:"50%", background:"rgba(255,255,255,0.08)" }} />
        <div style={{ position:"absolute", top:"10px", right:"30px", width:"40px", height:"40px", borderRadius:"50%", background:"rgba(255,255,255,0.15)" }} />

        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", marginBottom:"4px", position:"relative" }}>
          <div style={{ background:"rgba(255,255,255,0.25)", borderRadius:"12px", padding:"6px 8px", display:"flex" }}>
            <PillIcon size={22} />
          </div>
          <h1 style={{ margin:0, fontSize:"28px", fontWeight:"900", color:"#fff", letterSpacing:"-0.03em" }}>
            MedCadence
          </h1>
        </div>
        <p style={{ margin:0, fontSize:"13px", color:"rgba(255,255,255,0.85)", fontWeight:"600", letterSpacing:"0.04em" }}>
          {new Date().toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" })}
        </p>
      </div>

      <div style={{ maxWidth:"540px", margin:"0 auto", padding:"16px 14px 90px" }}>

        {/* ── TAB BAR ──────────────────────────────────────────────────────── */}
        <div style={{
          display:"flex", background:"#FFFFFF", borderRadius:"16px",
          border:`2px solid ${THEME.border}`, padding:"5px", marginBottom:"16px", gap:"4px",
          boxShadow:"0 2px 12px rgba(255,87,34,0.08)",
        }}>
          {NAV.map(({ key, label, Icon, emoji }) => (
            <button key={key} onClick={() => { setView(key); setShowAdd(false); setEditingId(null); }} style={{
              flex:1, padding:"9px 4px", borderRadius:"12px", border:"none", cursor:"pointer",
              background: view===key ? THEME.accent : "transparent",
              color: view===key ? "#fff" : THEME.textMid,
              fontSize:"11px", fontWeight:"800", letterSpacing:"0.02em",
              fontFamily: fontStack, transition:"all 0.2s",
              display:"flex", alignItems:"center", justifyContent:"center", gap:"4px",
              boxShadow: view===key ? `0 3px 10px ${THEME.accent}44` : "none",
            }}>
              <span style={{ fontSize:"14px" }}>{emoji}</span> {label}
            </button>
          ))}
        </div>

        {/* ── TODAY ────────────────────────────────────────────────────────── */}
        {view === "today" && (
          <>
            {medicines.length > 0 && (
              <div style={{
                borderRadius:"20px", marginBottom:"14px", overflow:"hidden",
                boxShadow:"0 4px 20px rgba(255,87,34,0.15)",
                background: allDone
                  ? "linear-gradient(135deg, #00C48C, #00E5A0)"
                  : "linear-gradient(135deg, #FF5722, #FF9800)",
              }}>
                <div style={{ padding:"18px 20px", display:"flex", alignItems:"center", gap:"16px" }}>
                  <div style={{ position:"relative", width:"60px", height:"60px", flexShrink:0 }}>
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="5"/>
                      <circle cx="30" cy="30" r="24" fill="none" stroke="#fff"
                        strokeWidth="5" strokeLinecap="round"
                        strokeDasharray={`${2*Math.PI*24}`}
                        strokeDashoffset={`${2*Math.PI*24*(1-pct/100)}`}
                        transform="rotate(-90 30 30)"
                        style={{ transition:"stroke-dashoffset 0.5s ease" }}
                      />
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
                      {allDone ? "You crushed it today!" : "Keep going, you're doing great!"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {medicines.length === 0 ? (
              <div style={{
                textAlign:"center", padding:"60px 20px",
                background:"#fff", borderRadius:"20px",
                border:`2px dashed ${THEME.border}`,
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
                  const color = COLORS[med.colorIdx % COLORS.length];
                  const slots = getSlots(med);
                  const taken = slots.filter(s => isChecked(med.id, s)).length;
                  const allTaken = taken === slots.length;
                  return (
                    <div key={med.id} style={{
                      background:"#fff", borderRadius:"18px",
                      border:`2px solid ${allTaken ? color.dot : color.border}`,
                      padding:"14px 15px",
                      boxShadow: allTaken ? `0 4px 16px ${color.dot}30` : "0 2px 10px rgba(0,0,0,0.06)",
                      transition:"all 0.2s",
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
                        <div style={{
                          width:"36px", height:"36px", borderRadius:"10px",
                          background: color.bg, border:`2px solid ${color.border}`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:"18px", flexShrink:0,
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
                          fontSize:"12px", fontWeight:"800",
                          border:`2px solid ${color.dot}`,
                        }}>
                          {taken}/{slots.length}
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:"7px" }}>
                        {slots.map(slotKey => {
                          const slotDef = ALL_SLOTS.find(s => s.key === slotKey);
                          const checked = isChecked(med.id, slotKey);
                          return (
                            <button key={slotKey} onClick={() => toggle(med.id, slotKey)} style={{
                              flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"5px",
                              padding:"11px 4px", borderRadius:"14px",
                              border:`2px solid ${checked ? color.dot : color.border}`,
                              background: checked ? color.dot : color.bg,
                              cursor:"pointer", transition:"all 0.18s",
                              color: checked ? "#fff" : color.dot,
                              boxShadow: checked ? `0 4px 12px ${color.dot}44` : "none",
                              transform: checked ? "scale(1.02)" : "scale(1)",
                            }}>
                              {checked ? <CheckIcon size={16} /> : <slotDef.Icon size={16} />}
                              <span style={{ fontSize:"10px", fontWeight:"800", letterSpacing:"0.02em" }}>{slotDef.label}</span>
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

        {/* ── HISTORY ──────────────────────────────────────────────────────── */}
        {view === "history" && (
          <>
            {medicines.length === 0 ? (
              <div style={{
                textAlign:"center", padding:"50px 20px", background:"#fff",
                borderRadius:"20px", border:`2px dashed ${THEME.border}`,
                color:THEME.textLight, fontSize:"14px", fontWeight:"700",
              }}>
                📊 Add medicines to see history
              </div>
            ) : (
              <div style={{
                background:"#fff", borderRadius:"20px",
                border:`2px solid ${THEME.border}`,
                boxShadow:"0 4px 16px rgba(255,87,34,0.08)",
                overflow:"hidden",
              }}>
                <div style={{ overflowX:"auto", padding:"16px" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"13px" }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign:"left", padding:"6px 8px", color:THEME.textLight, fontWeight:"800",
                          fontSize:"10px", letterSpacing:"0.08em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
                          Medicine
                        </th>
                        {getHistoryDays().map(d => (
                          <th key={d} style={{
                            textAlign:"center", padding:"6px 4px",
                            color: d===today ? THEME.accent : THEME.textLight,
                            fontWeight:"800", fontSize:"10px", whiteSpace:"nowrap",
                          }}>
                            {d===today ? "Today" : formatDate(d).replace(/\w+,\s/,"")}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {medicines.map((med, mi) => {
                        const color = COLORS[med.colorIdx % COLORS.length];
                        const slots = getSlots(med);
                        return (
                          <tr key={med.id} style={{ borderTop: mi>0 ? `1px solid ${THEME.border}` : "none" }}>
                            <td style={{ padding:"10px 8px" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                                <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:color.dot, flexShrink:0 }} />
                                <div>
                                  <div style={{ color:THEME.text, fontWeight:"700", whiteSpace:"nowrap", fontSize:"13px" }}>{med.name}</div>
                                  {med.dose && <div style={{ fontSize:"10px", color:THEME.textLight, fontWeight:"600" }}>{med.dose}</div>}
                                </div>
                              </div>
                            </td>
                            {getHistoryDays().map(d => {
                              const dayLog = logs[d]?.[med.id] || {};
                              const taken  = slots.filter(s => dayLog[s]).length;
                              const full   = taken===slots.length;
                              const none   = taken===0;
                              return (
                                <td key={d} style={{ textAlign:"center", padding:"10px 4px" }}>
                                  <div style={{
                                    width:"32px", height:"32px", borderRadius:"10px", margin:"0 auto",
                                    background: full ? color.dot : !none ? "#FFF3CD" : "#F5F5F5",
                                    border: `2px solid ${full ? color.dot : !none ? "#FFC107" : "#E0E0E0"}`,
                                    display:"flex", alignItems:"center", justifyContent:"center",
                                    fontSize:"11px", fontWeight:"800",
                                    color: full ? "#fff" : !none ? "#B07800" : "#BDBDBD",
                                    fontFamily:"monospace",
                                  }}>
                                    {full ? "✓" : !none ? `${taken}/${slots.length}` : "–"}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{
                  display:"flex", gap:"14px", padding:"10px 16px",
                  borderTop:`1px solid ${THEME.border}`,
                  fontSize:"11px", color:THEME.textLight, fontWeight:"700",
                }}>
                  <span>✓ All doses</span><span>n/n Partial</span><span>– None</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── CONFIG ───────────────────────────────────────────────────────── */}
        {view === "config" && (
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
                  background: THEME.accent, color:"white",
                  fontSize:"13px", fontFamily: fontStack, fontWeight:"800",
                  boxShadow:`0 4px 14px ${THEME.accent}55`,
                }}>
                  <PlusIcon /> Add
                </button>
              )}
            </div>

            {showAdd && (
              <div style={{ marginBottom:"14px" }}>
                <MedicineForm onSave={addMedicine} onCancel={() => setShowAdd(false)} />
              </div>
            )}

            {medicines.length === 0 && !showAdd && (
              <div style={{
                textAlign:"center", padding:"55px 20px", background:"#fff",
                borderRadius:"20px", border:`2px dashed ${THEME.border}`,
              }}>
                <div style={{ fontSize:"40px", marginBottom:"10px" }}>💊</div>
                <p style={{ margin:0, fontSize:"15px", fontWeight:"800", color:THEME.textMid }}>No medicines yet</p>
                <p style={{ margin:"4px 0 0", fontSize:"13px", color:THEME.textLight, fontWeight:"600" }}>Tap Add to get started</p>
              </div>
            )}

            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {medicines.map(med => {
                const color  = COLORS[med.colorIdx % COLORS.length];
                const slots  = getSlots(med);
                const sched  = SCHEDULES.find(s => s.times===slots.length);
                const isEdit = editingId===med.id;

                return (
                  <div key={med.id}>
                    {isEdit ? (
                      <MedicineForm
                        initial={med}
                        onSave={fields => updateMedicine(med.id, fields)}
                        onCancel={() => setEditingId(null)}
                      />
                    ) : (
                      <div style={{
                        background:"#fff", borderRadius:"18px",
                        border:`2px solid ${color.border}`, padding:"14px 15px",
                        boxShadow:"0 2px 10px rgba(0,0,0,0.05)",
                      }}>
                        <div style={{ display:"flex", alignItems:"flex-start", gap:"11px" }}>
                          <div style={{
                            width:"40px", height:"40px", borderRadius:"12px",
                            background: color.bg, border:`2px solid ${color.border}`,
                            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                          }}>
                            <div style={{ width:"14px", height:"14px", borderRadius:"50%", background:color.dot }} />
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:"15px", fontWeight:"800", color:THEME.text }}>{med.name}</div>
                            {med.dose && <div style={{ fontSize:"12px", color:THEME.textLight, fontWeight:"600", marginTop:"1px", marginBottom:"8px" }}>{med.dose}</div>}
                            <div style={{ display:"flex", gap:"5px", flexWrap:"wrap", marginTop: med.dose ? "0" : "7px" }}>
                              <div style={{
                                display:"inline-flex", alignItems:"center",
                                background: THEME.accent + "15", border:`1.5px solid ${THEME.accent}40`,
                                borderRadius:"20px", padding:"2px 9px",
                                fontSize:"11px", fontWeight:"800", color:THEME.accent,
                              }}>
                                {sched?.label || `${slots.length}× daily`}
                              </div>
                              {slots.map(slotKey => {
                                const slotDef = ALL_SLOTS.find(s => s.key===slotKey);
                                return (
                                  <div key={slotKey} style={{
                                    display:"inline-flex", alignItems:"center", gap:"4px",
                                    background: color.bg, border:`1.5px solid ${color.border}`,
                                    borderRadius:"20px", padding:"2px 9px 2px 7px",
                                    fontSize:"11px", fontWeight:"700", color:color.dot,
                                  }}>
                                    <slotDef.Icon size={11} /> {slotDef.label}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div style={{ display:"flex", gap:"5px", flexShrink:0 }}>
                            <button onClick={() => { setEditingId(med.id); setShowAdd(false); }} style={{
                              width:"34px", height:"34px", borderRadius:"10px",
                              background:"#F0F4FF", border:"2px solid #C5D0F0",
                              color:"#5C72CC", cursor:"pointer",
                              display:"flex", alignItems:"center", justifyContent:"center",
                            }}><EditIcon /></button>
                            <button onClick={() => removeMedicine(med.id)} style={{
                              width:"34px", height:"34px", borderRadius:"10px",
                              background:"#FFF0F0", border:"2px solid #FFB3B3",
                              color:"#E53935", cursor:"pointer",
                              display:"flex", alignItems:"center", justifyContent:"center",
                            }}><TrashIcon /></button>
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
