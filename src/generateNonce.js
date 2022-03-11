import shortid from "shortid";

export default function generateNonce() {
  return shortid.generate();
}
