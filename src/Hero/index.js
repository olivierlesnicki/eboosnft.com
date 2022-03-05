import HeroContent from "./HeroContent";
import HeroCountdown from "./HeroCountdown";

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
  } = useContract();

  const isPremintStarted = premintStartTime <= Date.now() / 1000;
  const isPremintEnded = !premintEndTime;
  const isMintStarted = !!premintEndTime;
  const isMintEnded = totalSupply == collectionSize;

  // Premint Has Not Started
  if (!isPremintStarted) {
    return (
      <HeroContent>
        <HeroCountdown startTime={premintStartTime} />
      </HeroContent>
    );
  }

  return (
    <HeroContent>
      <HeroCountdown />
    </HeroContent>
  );
}
