import admin from "../../../src/admin";
import generateNonce from "../../../src/generateNonce";

export default async function nonce(req, res) {
  if (req.method !== "POST") return res.status(405).send();
  if (!req.body.address) return res.status(400).send();

  let nonce;
  const { address } = req.body;
  const db = admin.database();

  const record = await db.ref(`address/${address}/nonce`).get();

  if (record.exists()) {
    nonce = record.val();
  } else {
    nonce = generateNonce();
    await db.ref(`address/${address}/nonce`).set(nonce);
  }

  return res.status(200).json({ nonce });
}
