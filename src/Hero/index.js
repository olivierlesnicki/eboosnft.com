import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";

import HeroContent from "./HeroContent";
import HeroMinter from "./HeroMinter";
import HeroMinting from "./HeroMinting";
import HeroSoldOut from "./HeroSoldOut";

import { useContract } from "../contract";
import { useAuth } from "../auth";
import { useAlchemy } from "../alchemy";

export default function Hero() {
  const router = useRouter();
  const auth = useAuth();
  const [minting, setMinting] = useState(false);

  const alchemy = useAlchemy();
  const { mint, loading } = useContract();

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
  if (loading || !auth || auth.loading || alchemy.loading) {
    return <HeroContent />;
  }

  // Premint Has Sold Out
  if (!alchemy.available) {
    return (
      <HeroContent>
        <HeroSoldOut
          nextTime={alchemy.nextPremintDropTime}
          onComplete={alchemy.refresh}
        />
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

  return (
    <HeroContent>
      <HeroMinter
        available={alchemy.available}
        max={alchemy.hasMintStarted ? 5 : 8}
        onMint={handleMint}
        price={alchemy.price}
        user={auth.user}
      />
    </HeroContent>
  );
}
