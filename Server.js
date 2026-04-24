const express = require("express");
const os = require("os");
const path = require("path");

const app = express();
const PORT = 3000;

// 🔥 IMPORTANT: serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API
const { exec } = require("child_process");

app.get("/api/stats", (req, res) => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();

  exec("df -h /", (err, stdout) => {
    let disk = {};

    if (!err) {
      const lines = stdout.split("\n");
      const data = lines[1].split(/\s+/);

      disk = {
        total: data[1],
        used: data[2],
        free: data[3],
        usage: data[4]
      };
    }

    res.json({
      platform: os.platform(),
      uptime: os.uptime(),
      cpuCores: os.cpus().length,
      memory: {
        total: (totalMem / 1024 / 1024).toFixed(2),
        free: (freeMem / 1024 / 1024).toFixed(2),
        used: ((totalMem - freeMem) / 1024 / 1024).toFixed(2)
      },
      disk: disk
    });
  });
});

// Start
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
document.getElementById("disk").innerText =
  data.disk.used + " / " + data.disk.total + " (" + data.disk.usage + ")";
