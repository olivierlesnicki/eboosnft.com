import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";

import HeroContent from "./HeroContent";
import HeroCountdown from "./HeroCountdown";
import HeroMinter from "./HeroMinter";
import HeroMinting from "./HeroMinting";
import HeroSoldOut from "./HeroSoldOut";

import { useContract } from "../contract";
import { useAuth } from "../auth";

export default function Hero() {
  const router = useRouter();
  const auth = useAuth();
  const [minting, setMinting] = useState(false);
  const [completed, setCompleted] = useState(0);

  const {
    collectionSize,
    reserveSize,
    reserved,
    totalSupply,
    price,
    premintStartTime,
    premintEndTime,
    mint,
    blockNumber,
    loading,
  } = useContract();

  const hasPremintStarted = premintStartTime <= Date.now() / 1000;
  const hasPremintEnded = !premintEndTime;
  const hasMintStarted = !!premintEndTime;
  const isMintEnded = totalSupply == collectionSize;

  let available = collectionSize - reserveSize + reserved - totalSupply;

  const nextPremintDropTime = useMemo(() => {
    return (
      premintStartTime +
      (Math.floor((Date.now() / 1000 - premintStartTime) / (24 * 3600)) + 1) *
        24 *
        3600
    );
  }, [premintStartTime, blockNumber]);

  if (!hasMintStarted) {
    available =
      Math.floor((Date.now() / 1000 - premintStartTime) / (24 * 3600) + 1) *
        16 -
      totalSupply +
      reserved;
  }

  const handleMint = useCallback(
    async (quantity) => {
      setMinting(true);

      try {
        const tx = await mint(quantity);
        router.push(`tx/${tx.hash}`);
      } catch (e) {
        setMinting(false);
      }
    },
    [router, mint]
  );

  // Contract Is Still Loading
  if (loading || !auth || auth.loading) {
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

  // Minting In Progress
  if (minting) {
    return (
      <HeroContent>
        <HeroMinting />
      </HeroContent>
    );
  }

  // Premint Has Sold Out
  if (!available) {
    return (
      <HeroContent>
        <HeroSoldOut
          nextTime={nextPremintDropTime}
          onComplete={() => setCompleted((_) => _ + 1)}
        />
      </HeroContent>
    );
  }

  return (
    <HeroContent>
      <HeroMinter
        available={available}
        max={hasMintStarted ? 5 : 8}
        onMint={handleMint}
        price={price}
        user={auth.user}
      />
    </HeroContent>
  );
}
