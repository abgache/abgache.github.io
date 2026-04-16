(async () => {
  try {
    const params = new URLSearchParams(window.location.search);

    const deviceInfo = {
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cores: navigator.hardwareConcurrency || "Unknown",
      memoryGB: navigator.deviceMemory || "Unknown",
      screenResolution: `${screen.width}x${screen.height}`,
      source_deviceInfo: params.get("src") || "Unknown",
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      gpu: (() => {
        try {
          const canvas = document.createElement("canvas");
          const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
          if (!gl) return "Unknown";
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
          return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Unknown";
        } catch {
          return "Unknown";
        }
      })()
    };

    await fetch("https://data.ctyd4zwbqh.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": "SECRET"
      },
      body: JSON.stringify({
        source: window.location.hostname,
        deviceInfo
      })
    });

  } catch (err) {
    console.error("Erreur en envoyant l'activité :", err);
  }
})();
