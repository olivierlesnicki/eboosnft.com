import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export default async function hodlers(req, res) {
  const owners = await alchemy.nft.getOwnersForContract(
    "0xA52863eeF886b51182aBfD8FB2A6Bb96Bbe92699"
  );
  return res.send(owners);
}
