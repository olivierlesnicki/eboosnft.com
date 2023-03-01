import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckToSlot,
  faLockOpen,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

import Guild from "./sections/Guild";
import Treasuries from "./sections/Treasuries";
import Snapshots from "./sections/Snapshots";
import LastSales from "./sections/LastSales";
import History from "./sections/History";

const getContractMetadata = async (contractAddress) => {
  const res = await fetch(
    `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_API_KEY}/getContractMetadata?contractAddress=${contractAddress}`
  );
  const json = await res.json();
  return json.contractMetadata;
};

function Eboo({ src }) {
  return (
    <Image
      width={960}
      height={960}
      alt="un eboo sauvage"
      className="rounded-2xl shadow-2xl shadow-amber-400/25"
      src={src}
    />
  );
}

export default async function Home() {
  const eboosMetadata = await getContractMetadata(
    process.env.EBOOS_CONTRACT_ADDRESS
  );

  return (
    <div className="flex flex-col py-16 gap-16 lg:gap-32">
      <div className="px-8 flex flex-col items-center gap-4 lg:gap-6">
        <h1 className="text-zinc-200 text-6xl lg:text-8xl font-black">Eboos</h1>
        <div className="text-zinc-400 text-2xl lg:text-3xl text-center max-w-md lg:max-w-xl">
          Ce sera probablement ton premier NFT mais certainement pas ton
          dernier...
        </div>
        <a
          className="text-zinc-200 text-lg lg:text-xl hover:underline font-black"
          href="https://opensea.io/collection/eboos"
        >
          Achète un Eboo
        </a>
      </div>
      <div className="px-8 sm:max-w-screen-sm lg:max-w-screen-lg mx-auto lg:grid grid-cols-12 gap-16">
        <div className="col-span-4 flex flex-col justify-center h-full mb-8">
          <Eboo src="https://i.seadn.io/gae/q6FvF8DXwjgKoBowuXpS3QgLaQ2vBXdGZwwheft05qEmve-7_CFsNpSQTZKI6j33eZNUbyD8SFgJayuVUXTE8EMTt_oF0QTzlJFn?auto=format&w=1000" />
        </div>
        <div className="flex flex-col gap-4 lg:gap-8 col-span-8 justify-center h-full">
          <div className="text-zinc-200 text-4xl lg:text-6xl font-black">
            <div>Une collection pour</div>
            <div className="text-amber-400">découvrir les NFT</div>
          </div>
          <div className="text-zinc-400 text-xl lg:text-2xl">
            Eboos est une collection de{" "}
            <a
              className="text-zinc-200 hover:underline font-black"
              href="https://snapshot.org/#/eboos.eth/proposal/0x2b2568b85153bed1c9aca7170f119c66f7c35838b4d84ceb1136009fd1e94447"
            >
              1 040
            </a>{" "}
            uniques NFT. Cette collection s&apos;adresse aux gens voulant
            découvrir le fabuleux monde des NFT par le biais d&apos;un projet
            pas trop cher encadré par une communauté bienveillante.
          </div>
          <a
            className="text-zinc-200 text-lg lg:text-xl hover:underline font-black"
            href="https://opensea.io/collection/eboos"
          >
            Découvre la collection
          </a>
        </div>
      </div>
      <div className="px-8 lg:text-center">
        <div className="text-zinc-200 text-4xl lg:text-6xl font-black mb-8 lg:mb-16">
          <div>Un club privé</div>
          <div className="text-indigo-400">pour tout le monde</div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 max-w-screen-xl mx-auto">
          <div className="bg-zinc-900 p-12 lg:p-16 text-left flex flex-col gap-4 lg:gap-8 rounded-2xl">
            <div className="text-zinc-200 text-4xl xl:text-6xl font-black">
              Rejoins la communauté
            </div>
            <div className="text-zinc-400 text-xl lg:text-2xl">
              Pour rejoindre la communauté il suffit de racheter un Eboo sur le
              marché secondaire au prix du marché, celui-ci est fixé par les
              revendeurs.
            </div>
            <a
              className="text-zinc-200 text-lg lg:text-xl hover:underline font-black"
              href="https://opensea.io/collection/eboos"
            >
              Achète un Eboo
            </a>
            <div className="text-center flex flex-col items-center pt-8">
              <div className="text-6xl xl:text-8xl font-black text-indigo-400 mb-2">
                {eboosMetadata.openSea.floorPrice}Ξ
              </div>
              <div className="text-sm uppercase py-2 px-3 text-indigo-400 border-2 border-indigo-400 rounded-full">
                Prix plancher
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 p-12 lg:p-16 text-left flex flex-col gap-4 lg:gap-8 rounded-2xl justify-center">
            <div className="text-zinc-200 text-4xl xl:text-6xl font-black text-center">
              Bénéficie des avantages
            </div>
            <div className="text-zinc-400 text-xl  flex flex-col divide-y divide-zinc-700 max-w-sm mx-auto">
              <div className="py-4 flex items-center gap-6">
                <div className="w-8  text-green-400 flex-shrink-0">
                  <FontAwesomeIcon icon={faCheckToSlot} />
                </div>
                <div>
                  Obtiens un droit de vote dans la gestion du Club et du Musée
                </div>
              </div>
              <div className="py-4 flex items-center gap-6">
                <div className="w-8  text-green-400 flex-shrink-0">
                  <FontAwesomeIcon icon={faLockOpen} />
                </div>
                <div>Accède aux salons privés du serveur Discord des Eboos</div>
              </div>
              <div className="pt-4 flex items-center gap-6">
                <div className="w-8  text-green-400 flex-shrink-0">
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                </div>
                <div>
                  Reçois les droits commerciaux de l&apos;image de ton Eboo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LastSales />
      <Treasuries />
      <History />
      <Snapshots />
      <Guild />
    </div>
  );
}
