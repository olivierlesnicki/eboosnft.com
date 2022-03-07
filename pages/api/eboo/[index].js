import tokens from "../../../src/tokens.json";

const startIndex = 1336;

export default async (req, res) => {
  const eboo = tokens[(startIndex + req.query.index) % 8192];
  const index = req.query.index;

  return res.status(200).json({
    name: `Eboo #${index}`,
    description:
      "Eboos is a collection of 8,192 randomly generated PFP NFTs that exist on the Ethereum blockchain. This will probably be your first NFT but definitely not your last. Visit [www.eboosnft.com](https://www.eboosnft.com/) to learn more.",
    image: "https://eboosnft.com/default.png",
    attributes: [],
  });
};
