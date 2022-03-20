import shortid from "shortid";
import { getDatabase } from "firebase-admin/database";

export default async function nonce(req, res) {
  if (req.method !== "POST") return res.status(403).send();
  if (!req.body.address) return res.status(400).send();

  const db = getDatabase();

  const nonceDoc = await db.ref(`addresses/${req.body.address}/nonce`).get();
  let nonce = nonceDoc.val();
  if (!nonce) {
    nonce = `Sign this message to prove you have access to this wallet and we'll sign you in. This won't cost you any Ether.\n\n#${shortid.generate()}`;
    await db.ref(`addresses/${req.body.address}/nonce`).set(nonce);
  }
  res.status(200).send({ nonce });
}
