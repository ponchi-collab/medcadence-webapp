import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export function useMedicines(userId) {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load medicines from Supabase on mount
  useEffect(() => {
    if (!userId) return;
    fetchMedicines();
  }, [userId]);

  async function fetchMedicines() {
    const { data, error } = await supabase
      .from("medicines")
      .select("*")
      .eq("user_id", userId)
      .order("sort_order");
    if (!error) setMedicines(data || []);
    setLoading(false);
  }

  async function addMedicine(fields) {
    const { data, error } = await supabase
      .from("medicines")
      .insert({
        user_id: userId,
        name: fields.name,
        dose: fields.dose,
        color_idx: fields.colorIdx,
        times_per_day: fields.timesPerDay,
        slots: fields.slots,
        sort_order: medicines.length,
      })
      .select()
      .single();
    if (!error) setMedicines(prev => [...prev, data]);
  }

  async function updateMedicine(id, fields) {
    const { data, error } = await supabase
      .from("medicines")
      .update({
        name: fields.name,
        dose: fields.dose,
        color_idx: fields.colorIdx,
        times_per_day: fields.timesPerDay,
        slots: fields.slots,
      })
      .eq("id", id)
      .select()
      .single();
    if (!error) setMedicines(prev => prev.map(m => m.id === id ? data : m));
  }

  async function removeMedicine(id) {
    const { error } = await supabase
      .from("medicines")
      .delete()
      .eq("id", id);
    if (!error) setMedicines(prev => prev.filter(m => m.id !== id));
  }

  return { medicines, loading, addMedicine, updateMedicine, removeMedicine };
}