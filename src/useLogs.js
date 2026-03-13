import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export function useLogs(userId, year, month) {
  const [logs, setLogs] = useState({});

  // Load logs for current month from Supabase
  useEffect(() => {
    if (!userId) return;
    fetchLogs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, year, month]);

  async function fetchLogs() {
    // Build date range for the month
    const from = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    const lastDay = new Date(year, month + 1, 0).getDate();
    const to = `${year}-${String(month + 1).padStart(2, "0")}-${lastDay}`;

    const { data, error } = await supabase
      .from("logs")
      .select("*")
      .eq("user_id", userId)
      .gte("date", from)
      .lte("date", to);

    if (!error) {
      // Convert flat array into nested object: logs[date][medId][slot] = true/false
      const nested = {};
      (data || []).forEach(row => {
        if (!nested[row.date]) nested[row.date] = {};
        if (!nested[row.date][row.medicine_id]) nested[row.date][row.medicine_id] = {};
        nested[row.date][row.medicine_id][row.slot] = row.taken;
      });
      setLogs(nested);
    }
  }

  async function toggle(medId, slot, date) {
    const current = !!(logs[date]?.[medId]?.[slot]);
    const newValue = !current;

    // Optimistic update — update UI immediately
    setLogs(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [medId]: {
          ...prev[date]?.[medId],
          [slot]: newValue,
        }
      }
    }));

    // Upsert to Supabase (insert or update if exists)
    await supabase.from("logs").upsert({
      user_id: userId,
      medicine_id: medId,
      date,
      slot,
      taken: newValue,
    }, { onConflict: "user_id,medicine_id,date,slot" });
  }

  return { logs, toggle };
}