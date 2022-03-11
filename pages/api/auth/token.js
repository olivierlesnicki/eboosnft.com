import { recoverPersonalSignature } from "@metamask/eth-sig-util";

import admin from "../../../src/admin";
import generateNonce from "../../../src/generateNonce";

function toHex(_) {
  return _.split("")
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
}

export default async function verify(req, res) {
  if (req.method !== "POST") return res.status(405).send();
  if (!req.body.address || !req.body.signature) return res.status(400).send();

  const { address, signature } = req.body;
  const db = admin.database();

  const record = await db.ref(`address/${address}/nonce`).get();

  if (record.exists()) {
    const nonce = record.val();

    const recoveredAddress = recoverPersonalSignature({
      data: `0x${toHex(nonce)}`,
      signature,
    });

    if (address == recoveredAddress) {
      // Avoid replay attacks
      db.ref(`address/${address}/nonce`).set(generateNonce());

      const token = await admin.auth().createCustomToken(address);

      res.status(200).send({ token });
    } else {
      return res.status(401).send();
    }
  } else {
    return res.status(500).send();
  }
}
