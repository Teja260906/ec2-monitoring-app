const express = require("express");
const os = require("os");

const app = express();
const PORT = 3000;

app.get("/stats", (req, res) => {
  res.json({
    cpu: os.loadavg(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime()
  });
});

app.use(express.static(__dirname));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});