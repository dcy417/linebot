const express = require("express");

const app = express();
app.use(express.json());

app.post("/callback", (req, res) => {
  console.log("LINE webhook received:", JSON.stringify(req.body));
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("LINE bot is running");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
