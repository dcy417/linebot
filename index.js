const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("LINE bot is running");
});

app.post("/callback", (req, res) => {
  console.log("LINE webhook:", req.body);
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
