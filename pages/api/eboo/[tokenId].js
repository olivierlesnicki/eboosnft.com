import tokens from "../../../src/tokens.json";

const startIndex = 1336;
const startOffset = Math.floor((startIndex / 8192) * 512) * 16;

export default async (req, res) => {
  // DO NOT TOUCH
  const tokenId = Number(req.query.tokenId);
  const index = (startOffset + tokenId) % 8192;
  const eboo = tokens[index];

  // Return default unexistent token
  if (tokenId >= 16) {
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
    image: `https://eboosnft.com/eboos/${eboo.hash}.png`,
    attributes: eboo.attributes.filter((_) => _.trait_type !== "Background"),
  });
};
