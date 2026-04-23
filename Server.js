const express = require("express");
const os = require("os");

const app = express();
const PORT = 3000;

// Function to calculate CPU usage %
function getCPUUsage() {
  const cpus = os.cpus();

  let idle = 0;
  let total = 0;

  cpus.forEach((cpu) => {
    for (let type in cpu.times) {
      total += cpu.times[type];
    }
    idle += cpu.times.idle;
  });

  return ((1 - idle / total) * 100).toFixed(2);
}

// API route
app.get("/api/stats", (req, res) => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();

  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: os.uptime(),
    cpuCores: os.cpus().length,
    cpuUsage: getCPUUsage(), // %
    memory: {
      total: (totalMem / 1024 / 1024).toFixed(2), // MB
      free: (freeMem / 1024 / 1024).toFixed(2),   // MB
      used: ((totalMem - freeMem) / 1024 / 1024).toFixed(2) // MB
    }
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
