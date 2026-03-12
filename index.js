const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("LINE bot is running");
});

app.post("/callback", async (req, res) => {

  const events = req.body.events;

  if (events && events.length > 0) {

    const event = events[0];
    const text = event.message.text;
    const replyToken = event.replyToken;

    console.log("User message:", text);

    await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_CHANNEL_ACCESS_TOKEN"
      },
      body: JSON.stringify({
        replyToken: replyToken,
        messages: [
          {
            type: "text",
            text: "你剛剛說的是：" + text
          }
        ]
      })
    });

  }

  res.status(200).send("OK");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
