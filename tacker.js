// Script to get every person joinning your website sent to a discord webhook while getting a protection from webhook spammers and deleters
// To use it, please use Cloudflare workers!
export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Auth",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    const ip = request.headers.get("CF-Connecting-IP") || "Unknown";
    const source = request.headers.get("Origin") || "abgache.ink";
    const now = new Date();
    const formattedDate = now.toLocaleString("fr-FR", { timeZone: "Europe/Paris" });

    const lastActivityRaw = await env.LOGS.get(`last_${ip}`);
    if (lastActivityRaw) {
      const lastTimestamp = parseInt(lastActivityRaw);
      if (Date.now() - lastTimestamp < 60 * 60 * 1000) {
        return new Response("Too Many Requests", { status: 429, headers: corsHeaders });
      }
    }

    await env.LOGS.put(`last_${ip}`, `${Date.now()}`);

    const key = `log_${Date.now()}`;
    await env.LOGS.put(key, JSON.stringify({ ip, time: formattedDate, source }));

    await fetch("", { // Did u rlly thought i was gonna leak my webhook?
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        avatar: "",
        username: "Website tracker",
        embeds: [
          {
            title: "📌 Nouvelle activité sur le site",
            color: 918770,
            description: `- **IP :** \`${ip}\`\n- **Heure :** ${formattedDate}\n- **Source :** \`${source}\``
          }
        ]
      })
    });

    return new Response("OK", { status: 200, headers: corsHeaders });
  }
};
