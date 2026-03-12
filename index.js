const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("LINE bot is running");
});

app.post("/callback", (req, res) => {
  console.log("LINE message:", JSON.stringify(req.body));
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
