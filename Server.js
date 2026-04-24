const express = require("express");
const os = require("os");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get("/api/stats", (req, res) => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();

  exec("df -h /", (err, stdout) => {
    let disk = { total: "N/A", used: "N/A", free: "N/A", usage: "N/A" };

    if (stdout) {
      const lines = stdout.trim().split("\n");
      const data = lines[1].split(/\s+/);

      disk = {
        total: data[1],
        used: data[2],
        free: data[3],
        usage: data[4]
      };
    }

    res.json({
      hostname: os.hostname(),
      platform: os.platform(),
      uptime: os.uptime(),
      cpuCores: os.cpus().length,
      memory: {
        total: (totalMem / 1024 / 1024).toFixed(2),
        free: (freeMem / 1024 / 1024).toFixed(2)
      },
      disk: disk
    });
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
