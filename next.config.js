/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "nft-cdn.alchemy.com",
      "ipfs.io",
      "opensea.io",
      "i.seadn.io",
      "eboosnft.mypinata.cloud",
    ],
  },
};

module.exports = nextConfig;
