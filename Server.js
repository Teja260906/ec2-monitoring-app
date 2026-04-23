const express = require("express");
const os = require("os");

const app = express();
const PORT = 3000;

app.get("/api/stats", (req, res) => {
    res.json({
        hostname: os.hostname(),
        platform: os.platform(),
        uptime: os.uptime(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpuCount: os.cpus().length
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.listen(3000, "0.0.0.0", () => {
    console.log("Server running");
});
