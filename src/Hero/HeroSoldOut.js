import HeroCountdown from "./HeroCountdown";

export default function HeroSoldOut({ nextTime }) {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="text-xl sm:text-2xl max-w-2xl mb-8">
          We release 16 eboos every day. <br />
          Come back later.
        </div>
        <HeroCountdown startTime={nextTime} />
        <div className="mt-8 max-w-sm">
          If you can't wait, you can also get an Eboo on{" "}
          <a
            className="text-blue-500 hover:text-blue-600 font-bold"
            href="https://opensea.io/collection/eboos"
            target="_blank"
          >
            OpenSea
          </a>{" "}
          the largest NFT marketplace.
        </div>
        <div className="mt-8 max-w-sm">
          You can also join our community on{" "}
          <a
            className="text-blue-500 hover:text-blue-600 font-bold"
            href="https://eboosnft.com/discord"
            target="_blank"
          >
            Discord
          </a>{" "}
        </div>
      </div>
    </>
  );
}
