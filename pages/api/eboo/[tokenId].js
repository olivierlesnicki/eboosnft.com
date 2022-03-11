import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import json from "../../../src/contract.json";
import tokens from "../../../src/tokens.json";

const startIndex = 1336;
const startOffset = Math.floor((startIndex / 8192) * 512) * 16;

export default async function eboo(req, res) {
  const web3 = createAlchemyWeb3(
    "https://eth-mainnet.alchemyapi.io/v2/pHD9f33haQv588tHSeavl1Lmt76Fu5FB"
  );

  const eboosContract = new web3.eth.Contract(
    json.abi,
    "0xA52863eeF886b51182aBfD8FB2A6Bb96Bbe92699"
  );

  const totalSupply = await eboosContract.methods.totalSupply().call();

  // DO NOT TOUCH
  const tokenId = Number(req.query.tokenId);
  const index = (startOffset + tokenId) % 8192;
  const eboo = tokens[index];

  // Return default unexistent token
  if (tokenId >= Number(totalSupply)) {
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
