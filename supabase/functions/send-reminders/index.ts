import webpush from "npm:web-push@3.6.7";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")!;
const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;

webpush.setVapidDetails(
  "mailto:admin@medcadence.app",
  vapidPublicKey,
  vapidPrivateKey
);

function getCurrentTimeInTimezone(timezone: string): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const hour = parts.find(p => p.type === "hour")?.value || "00";
    const minute = parts.find(p => p.type === "minute")?.value || "00";
    // Round down to nearest 15 minutes
    const roundedMinute = Math.floor(parseInt(minute) / 15) * 15;
    return `${hour.padStart(2,"0")}:${String(roundedMinute).padStart(2,"0")}`;
  } catch {
    const now = new Date();
    const roundedMinute = Math.floor(now.getUTCMinutes() / 15) * 15;
    return `${String(now.getUTCHours()).padStart(2,"0")}:${String(roundedMinute).padStart(2,"0")}`;
  }
}

Deno.serve(async () => {
  try {
    // Get all enabled notification settings
    const settingsRes = await fetch(
      `${supabaseUrl}/rest/v1/notification_settings?enabled=eq.true`,
      {
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
        },
      }
    );
    const allSettings = await settingsRes.json();

    if (!allSettings.length) {
      return new Response(JSON.stringify({ sent: 0 }), { status: 200 });
    }

    // Filter settings where current local 15-min slot matches reminder time
    const settings = allSettings.filter((s: any) => {
      const timezone = s.timezone || "UTC";
      const localTime = getCurrentTimeInTimezone(timezone);
      const reminderTime = s.reminder_time.slice(0, 5);
      return localTime === reminderTime;
    });

    if (!settings.length) {
      return new Response(JSON.stringify({ sent: 0 }), { status: 200 });
    }

    // Get medicine names
    const medIds = [...new Set(settings.map((s: any) => s.medicine_id))];
    const medsRes = await fetch(
      `${supabaseUrl}/rest/v1/medicines?id=in.(${medIds.join(",")})`,
      {
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
        },
      }
    );
    const medicines = await medsRes.json();
    const medMap: Record<string, string> = {};
    medicines.forEach((m: any) => { medMap[m.id] = m.name; });

    // Get push subscriptions for affected users
    const userIds = [...new Set(settings.map((s: any) => s.user_id))];
    const subsRes = await fetch(
      `${supabaseUrl}/rest/v1/push_subscriptions?user_id=in.(${userIds.join(",")})`,
      {
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
        },
      }
    );
    const subscriptions = await subsRes.json();

    // Send notifications
    let sent = 0;
    for (const setting of settings) {
      const userSubs = subscriptions.filter((s: any) => s.user_id === setting.user_id);
      const medName = medMap[setting.medicine_id] || "your medicine";
      const slotEmoji = setting.slot === "morning" ? "🌅" : setting.slot === "noon" ? "☀️" : "🌙";

      for (const sub of userSubs) {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            JSON.stringify({
              title: `${slotEmoji} MedCadence Reminder`,
              body: `Time to take your ${medName}!`,
              url: "/",
            })
          );
          sent++;
        } catch (err) {
          console.error("Failed to send push:", err);
        }
      }
    }

    return new Response(JSON.stringify({ sent }), { status: 200 });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
