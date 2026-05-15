import express from "express";
import crypto from "crypto";
import { exec } from "child_process";
import dotenv from "dotenv";
import { verifySignature } from "./utils/verifySignature.js";

dotenv.config();
const SECRET = process.env.SECRET;
const PORT = 5001;
const app = express();

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.get("/", (req, res) => {
  res.send("Hello, it is working now");
});
app.post("/deploy", (req, res) => {
  console.log("HEADERS:", req.headers);
  console.log("RAW BODY:", req.rawBody);
  console.log("BODY:", req.body);
  if (!req.rawBody) {
    return false;
  }
  if (!verifySignature(req)) {
    return res.status(401).send("Invalid signature");
  }

  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
