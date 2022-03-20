import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import { getDatabase } from "firebase-admin/database";

export default function auth(req, res) {
  if (req.method !== "POST") return res.status(403).send();
  if (!req.body.address || req.body.signature) return res.status(400).send();

  const recoveredAddress = recoverPersonalSignature({
    data: `0x${toHex(existingNonce)}`,
    signature: sig,
  });

  const db = getDatabase();

  return null;
}
