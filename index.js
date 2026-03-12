const express = require("express");
const line = require("@line/bot-sdk");

const app = express();

const config = {
  channelAccessToken: "KVRl754l9C8OQiAeokroNLVSkX7d5g/N1tENkTPQkJA89uB9n/+rIsa2LvmHKjOMaATE+XLj2QnxmRRnao+a822lUY689ENqnEF14WW1yyHnVgHPPOVmNaqSJT8i6DCn1WwQcmmehvEeHLCWJ0XHgwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "56258da7b78263c4a92affd587f32b50"
};

const client = new line.Client(config);

app.get("/", (req, res) => {
  res.send("LINE bot is running");
});

app.post("/callback", line.middleware(config), async (req, res) => {

  const events = req.body.events;

  for (const event of events) {

    if (event.type !== "message") continue;
    if (event.message.type !== "text") continue;

    const userText = event.message.text;

    console.log("User message:", userText);

    await client.replyMessage(event.replyToken, {
      type: "text",
      text: "你剛剛說：" + userText
    });

  }

  res.status(200).end();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
