//

export default async (req, res) => {
  return res.status(200).json({
    name: `Eboo #${req.query.id}`,
    description:
      "Eboos is a collection of 8,192 randomly generated PFP NFTs that exist on the Ethereum blockchain. This will probably be your first NFT but definitely not your last. Visit [www.eboosnft.com](https://www.eboosnft.com/) to learn more.",
    image: "",
    attributes: [],
  });
};
