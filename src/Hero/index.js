import HeroContent from "./HeroContent";
import HeroCountdown from "./HeroCountdown";
import HeroMinter from "./HeroMinter";
import Spinner from "../Spinner";

import { useContract } from "../contract";

export default function Hero() {
  const {
    collectionSize,
    reserveSize,
    reserved,
    totalSupply,
    price,
    premintStartTime,
    premintEndTime,
    mint,
    loading,
  } = useContract();

  const hasPremintStarted = premintStartTime <= Date.now() / 1000;
  const hasPremintEnded = !premintEndTime;
  const hasMintStarted = !!premintEndTime;
  const isMintEnded = totalSupply == collectionSize;

  let available = collectionSize - reserveSize + reserved - totalSupply;

  if (!hasMintStarted) {
    available =
      Math.floor((Date.now() / 1000 - premintStartTime) / (24 * 3600) + 1) *
        16 -
      totalSupply +
      reserved;
  }

  // Contract Is Still Loading
  if (loading) {
    return <HeroContent />;
  }

  // Premint Has Not Started
  if (!hasPremintStarted) {
    return (
      <HeroContent>
        <HeroCountdown startTime={premintStartTime} />
      </HeroContent>
    );
  }

  return (
    <HeroContent>
      <HeroMinter
        available={available}
        max={hasMintStarted ? 5 : 8}
        mint={mint}
        price={price}
      />
    </HeroContent>
  );
}
