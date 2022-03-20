const toHex = (stringToConvert) =>
  stringToConvert
    .split("")
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");

export default async function sign(nonce, address) {
  return window.ethereum.request({
    method: "personal_sign",
    params: [`0x${toHex(nonce)}`, address],
  });
}
