(async () => {
    try {
        let stun_ip = "Unknown";
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }]});
        pc.createDataChannel("test");
        await new Promise(resolve => {
            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    const c = event.candidate.candidate;
                    if (c.includes("typ srflx")) {
                        stun_ip = c;}} else {
                    resolve();}};
            pc.createOffer()
                .then(offer => pc.setLocalDescription(offer));});
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
            stun_ip: stun_ip,
            gpu: (() => {try {
                    const canvas = document.createElement("canvas");
                    const gl = canvas.getContext("webgl");
                    if (!gl) return "Unknown";
                    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
                    return debugInfo? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL): "Unknown";} catch {
                    return "Unknown";}})()};
        await fetch("https://data.ctyd4zwbqh.workers.dev", {
            method: "POST",
            headers: {"Content-Type": "application/json",
                "X-Auth": "SECRET"},
            body: JSON.stringify({
                source: window.location.hostname,
                deviceInfo})});} catch (err) {
        console.error("Error while sending activity :", err);}})();
