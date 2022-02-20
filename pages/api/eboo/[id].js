export default async (req, res) => {
  res.send({
    name: `Eboo #${req.query.id}`,
    image:
      "https://ipfs.io/ipfs/QmYrxAviWHGugdikgU1Awc8MRtfqxMYYRmBuCTMEc5mCAx",
    attributes: [],
    description:
      "Eboos is a collection of 8,192 randomly generated PFP NFTs that exist on the Ethereum blockchain. Visit [www.eboosnft.com](https://www.eboosnft.com/) to learn more.",
  });
};
