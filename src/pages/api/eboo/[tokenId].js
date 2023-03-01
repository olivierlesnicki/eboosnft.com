import { Network, Alchemy } from "alchemy-sdk";

import tokens from "../../../tokens.json";

const START_INDEX = 1336;
const START_OFFSET = Math.floor((START_INDEX / 8192) * 512) * 16;

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export default async function eboo(req, res) {
  const { totalSupply } = await alchemy.nft.getContractMetadata(
    "0xA52863eeF886b51182aBfD8FB2A6Bb96Bbe92699"
  );

  // DO NOT TOUCH
  const tokenId = Number(req.query.tokenId);
  const index = (START_OFFSET + tokenId) % 8192;
  const eboo = tokens[index];

  // Return default unexistent token
  if (tokenId >= Number(totalSupply) || tokenId < 0) {
    return res.status(200).json({
      name: `Eboo #${tokenId}`,
      description:
        "Eboos is a collection of 8,192 randomly generated PFP NFTs that exist on the Ethereum blockchain. This will probably be your first NFT but definitely not your last. Visit [www.eboosnft.com](https://www.eboosnft.com/) to learn more.",
      image: `https://eboosnft.com/default.png`,
      attributes: [],
    });
  }
  return res.status(200).json({
    name: `Eboo #${tokenId}`,
    description:
      "Eboos is a collection of 8,192 randomly generated PFP NFTs that exist on the Ethereum blockchain. This will probably be your first NFT but definitely not your last. Visit [www.eboosnft.com](https://www.eboosnft.com/) to learn more.",
    image: `https://ipfs.io/ipfs/${eboo.hash}`,
    attributes: eboo.attributes.filter((_) => _.trait_type !== "Background"),
  });
}
