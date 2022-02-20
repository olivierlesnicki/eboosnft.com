export default async (req, res) => {
  res.send({
    description:
      "Eboos is a collection of 8,192 randomly generated PFP NFTs that exist on the Ethereum blockchain. Visit [www.eboosnft.com](https://www.eboosnft.com/) to learn more.",
    name: `Eboo #${req.query.id}`,
    image: "",
    attributes: [],
  });
};
