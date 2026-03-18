import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNotifications } from "./useNotifications";

const THEME = {
  bg:"#EBF8FF", bgCard:"#FFFFFF", bgAlt:"#DBEEFF", border:"#93C5FD",
  text:"#0C2340", textMid:"#1E5F8C", textLight:"#4A90B8",
  accent:"#0077B6", satBg:"#E0F2FE", satText:"#0284C7",
};

const ALL_SLOTS = [
  { key:"morning", label:"Morning", emoji:"🌅" },
  { key:"noon",    label:"Noon",    emoji:"☀️" },
  { key:"evening", label:"Evening", emoji:"🌙" },
];

const fontStack = "'Nunito','Trebuchet MS',sans-serif";

export default function SettingsTab({ user, medicines }) {
  const { permission, subscribed, loading, enableNotifications, disableNotifications } = useNotifications(user.id);
  const [settings, setSettings] = useState({});
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, [medicines]);

  async function fetchSettings() {
    if (!medicines.length) return;
    const { data } = await supabase
      .from("notification_settings")
      .select("*")
      .eq("user_id", user.id);

    // Build a map: settings[medId][slot] = { enabled, reminder_time }
    const map = {};
    medicines.forEach(med => {
      map[med.id] = {};
      med.slots.forEach(slot => {
        map[med.id][slot] = { enabled: false, reminder_time: defaultTime(slot) };
      });
    });

    (data || []).forEach(row => {
      if (map[row.medicine_id]) {
        map[row.medicine_id][row.slot] = {
          enabled: row.enabled,
          reminder_time: row.reminder_time.slice(0, 5), // "HH:MM"
        };
      }
    });

    setSettings(map);
  }

  function defaultTime(slot) {
    if (slot === "morning") return "08:00";
    if (slot === "noon")    return "13:00";
    return "20:00";
  }

  function updateSetting(medId, slot, field, value) {
    setSettings(prev => ({
      ...prev,
      [medId]: {
        ...prev[medId],
        [slot]: { ...prev[medId][slot], [field]: value },
      }
    }));
  }

  async function saveSettings() {
    setSaving(true);
    const rows = [];
    medicines.forEach(med => {
      (med.slots || []).forEach(slot => {
        const s = settings[med.id]?.[slot];
        if (s) {
          rows.push({
            user_id: user.id,
            medicine_id: med.id,
            slot,
            enabled: s.enabled,
            reminder_time: s.reminder_time + ":00",
          });
        }
      });
    });

    await supabase.from("notification_settings").upsert(rows, {
      onConflict: "user_id,medicine_id,slot"
    });

    setSaving(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  }

  const notSupported = !("serviceWorker" in navigator) || !("PushManager" in window);

  return (
    <div>
      {/* Notifications card */}
      <div style={{
        background:"rgba(255,255,255,0.92)", borderRadius:"20px",
        border:`2px solid ${THEME.border}`, padding:"18px",
        marginBottom:"14px", backdropFilter:"blur(4px)",
        boxShadow:"0 2px 12px rgba(0,119,182,0.10)",
      }}>
        <div style={{ fontSize:"17px", fontWeight:"900", color:THEME.text, marginBottom:"4px" }}>
          🔔 Push Notifications
        </div>

        {notSupported ? (
          <p style={{ fontSize:"13px", color:THEME.textLight, fontWeight:"600" }}>
            Push notifications are not supported on this device or browser.
            On iPhone, make sure you added MedCadence to your home screen and open it from there.
          </p>
        ) : (
          <>
            <p style={{ fontSize:"13px", color:THEME.textLight, fontWeight:"600", marginBottom:"14px" }}>
              {subscribed
                ? "✅ Notifications are enabled on this device."
                : "Enable notifications to get reminders when it's time to take your medicines."}
            </p>
            <button
              onClick={subscribed ? disableNotifications : enableNotifications}
              disabled={loading}
              style={{
                padding:"10px 20px", borderRadius:"12px", border:"none", cursor:"pointer",
                background: subscribed ? "#FEF2F2" : THEME.accent,
                color: subscribed ? "#EF4444" : "white",
                fontSize:"13px", fontFamily:fontStack, fontWeight:"800",
                border: subscribed ? "2px solid #FECACA" : "none",
                opacity: loading ? 0.7 : 1,
              }}>
              {loading ? "Please wait..." : subscribed ? "Disable Notifications" : "Enable Notifications"}
            </button>
            {permission === "denied" && (
              <p style={{ fontSize:"12px", color:"#EF4444", marginTop:"10px", fontWeight:"600" }}>
                ⚠️ Notifications are blocked. Please enable them in your device settings.
              </p>
            )}
          </>
        )}
      </div>

      {/* Reminder times per medicine */}
      {subscribed && medicines.length > 0 && (
        <div>
          <div style={{ fontSize:"17px", fontWeight:"900", color:THEME.text, marginBottom:"12px" }}>
            ⏰ Reminder Times
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {medicines.map(med => (
              <div key={med.id} style={{
                background:"rgba(255,255,255,0.92)", borderRadius:"18px",
                border:`2px solid ${THEME.border}`, padding:"14px 16px",
                backdropFilter:"blur(4px)",
                boxShadow:"0 2px 12px rgba(0,119,182,0.08)",
              }}>
                <div style={{ fontSize:"15px", fontWeight:"800", color:THEME.text, marginBottom:"12px" }}>
                  💊 {med.name}
                  {med.dose && <span style={{ fontSize:"12px", color:THEME.textLight, fontWeight:"600", marginLeft:"6px" }}>{med.dose}</span>}
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                  {(med.slots || []).map(slot => {
                    const slotDef = ALL_SLOTS.find(s => s.key === slot);
                    const s = settings[med.id]?.[slot] || { enabled: false, reminder_time: defaultTime(slot) };
                    return (
                      <div key={slot} style={{
                        display:"flex", alignItems:"center", gap:"10px",
                        background: s.enabled ? THEME.bgAlt : "#F8FAFC",
                        borderRadius:"12px", padding:"10px 12px",
                        border:`1.5px solid ${s.enabled ? THEME.border : "#E2E8F0"}`,
                      }}>
                        <span style={{ fontSize:"18px" }}>{slotDef?.emoji}</span>
                        <span style={{ fontSize:"13px", fontWeight:"700", color:THEME.text, flex:1 }}>
                          {slotDef?.label}
                        </span>
                        {/* Time picker */}
                        <input
                          type="time"
                          value={s.reminder_time}
                          onChange={e => updateSetting(med.id, slot, "reminder_time", e.target.value)}
                          disabled={!s.enabled}
                          style={{
                            padding:"6px 8px", borderRadius:"8px",
                            border:`1.5px solid ${THEME.border}`,
                            background: s.enabled ? "white" : "#F0F4F8",
                            color: s.enabled ? THEME.text : THEME.textLight,
                            fontSize:"13px", fontFamily:fontStack, fontWeight:"700",
                            cursor: s.enabled ? "pointer" : "default",
                          }}
                        />
                        {/* Toggle */}
                        <div
                          onClick={() => updateSetting(med.id, slot, "enabled", !s.enabled)}
                          style={{
                            width:"44px", height:"24px", borderRadius:"12px",
                            background: s.enabled ? THEME.accent : "#CBD5E0",
                            cursor:"pointer", position:"relative",
                            transition:"background 0.2s", flexShrink:0,
                          }}>
                          <div style={{
                            position:"absolute", top:"3px",
                            left: s.enabled ? "23px" : "3px",
                            width:"18px", height:"18px", borderRadius:"50%",
                            background:"white", transition:"left 0.2s",
                            boxShadow:"0 1px 4px rgba(0,0,0,0.2)",
                          }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Save button */}
          <button onClick={saveSettings} disabled={saving} style={{
            width:"100%", marginTop:"16px", padding:"14px",
            borderRadius:"14px", border:"none", cursor:"pointer",
            background: THEME.accent, color:"white",
            fontSize:"15px", fontFamily:fontStack, fontWeight:"800",
            boxShadow:`0 4px 16px rgba(0,119,182,0.35)`,
            opacity: saving ? 0.7 : 1,
          }}>
            {saving ? "Saving..." : savedMsg ? "✅ Saved!" : "Save Reminder Times"}
          </button>
        </div>
      )}

      {subscribed && medicines.length === 0 && (
        <div style={{
          textAlign:"center", padding:"30px 20px",
          background:"rgba(255,255,255,0.88)", borderRadius:"20px",
          border:`2px dashed ${THEME.border}`,
          color:THEME.textLight, fontSize:"14px", fontWeight:"700",
        }}>
          💊 Add medicines first to set reminder times
        </div>
      )}
    </div>
  );
}