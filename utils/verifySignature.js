import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config()
const SECRET = process.env.SECRET;

export function verifySignature(req) {
  const signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    return false;
  }

  const hash =
    "sha256=" +
    crypto
      .createHmac("sha256", SECRET)
      .update(req.rawBody)
      .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(hash)
  );
}