const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/helius", async (req, res) => {
  const tx = req.body;

  if (tx.type === "SWAP") {
    const native = tx.nativeTransfers?.[0]?.amount;

    if (native && native >= 100 * 1e9) {
      const sol = native / 1e9;

      await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          chat_id: CHAT_ID,
          text: `🚨 Whale Swap\n${sol} SOL\nhttps://solscan.io/tx/${tx.signature}`
        }
      );
    }
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server running");
});
