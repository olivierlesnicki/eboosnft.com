import Image from "next/image";
import getData from "../../components/getData";

export default async function LastSales() {
  const { latestSales } = await getData();

  return (
    <div>
      <div className="text-center flex items-center flex-col mx-auto mb-8 lg:mb-16 px-8">
        <div className="text-zinc-200 text-4xl lg:text-6xl font-black max-w-sm md:max-w-none">
          Les dernières ventes
        </div>
      </div>
      <div className="w-full flex gap-8 snap-x overflow-x-auto px-8 scrollbar-hide">
        {latestSales.nodes.map((node) => (
          <a
            key={node.token.tokenId}
            className="h-64 w-64 md:h-72 md:w-72 snap-center md:snap-start md:scroll-ml-16 shrink-0 relative"
            href={`https://opensea.com/assets/ethereum/${process.env.EBOOS_CONTRACT_ADDRESS}/${node.token.tokenId}`}
          >
            <Image
              className="h-full rounded-xl flex-shrink-0 bg-zinc-700"
              width={1024}
              height={1024}
              alt={`Eboo #${node.token.tokenId}`}
              src={node.token.image.url.replace(
                "https://ipfs.io/",
                "https://eboosnft.mypinata.cloud/"
              )}
            />
            <div className="absolute bottom-4 right-4 bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-sm shadow-lg">
              <div>Eboos #{node.token.tokenId}</div>
              <div className="text-zinc-500 font-bold">
                {node.sale.price.nativePrice.decimal}{" "}
                {node.sale.price.nativePrice.currency.name}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
