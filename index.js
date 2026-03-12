const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("LINE bot is running");
});

app.post("/callback", (req, res) => {
  const events = req.body.events;

  if (events && events.length > 0) {
    const text = events[0].message.text;
    console.log("User message:", text);
  }

  res.status(200).send("OK");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
