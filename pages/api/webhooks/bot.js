export default async function botWebhook(req, res) {
  const { authorization } = req.headers;

  if (req.method !== "POST") return res.status(405).send();
  if (!authorization) return res.status(400).send();
  if (authorization !== `Bearer GREENOSHEUN`) return res.status(401).send();

  // Poll
}
