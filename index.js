const express = require("express");

const app = express();
app.use(express.json());

const CHANNEL_ACCESS_TOKEN = "KVRl754l9C8OQiAeokroNLVSkX7d5g/N1tENkTPQkJA89uB9n/+rIsa2LvmHKjOMaATE+XLj2QnxmRRnao+a822lUY689ENqnEF14WW1yyHnVgHPPOVmNaqSJT8i6DCn1WwQcmmehvEeHLCWJ0XHgwdB04t89/1O/w1cDnyilFU=";

app.get("/", (req, res) => {
  res.send("LINE bot is running");
});

app.post("/callback", async (req, res) => {

  try {

    const events = req.body.events;

    if (!events || events.length === 0) {
      return res.status(200).send("OK");
    }

    const event = events[0];

    if (event.type !== "message" || event.message.type !== "text") {
      return res.status(200).send("OK");
    }

    const userText = event.message.text;
    const replyToken = event.replyToken;

    console.log("User message:", userText);

    await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        replyToken: replyToken,
        messages: [
          {
            type: "text",
            text: "你剛剛說：" + userText
          }
        ]
      })
    });

    res.status(200).send("OK");

  } catch (error) {

    console.error("Error:", error);
    res.status(200).send("Error");

  }

});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
