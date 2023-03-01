import Heading2 from "../../components/typography/Heading2";
import Lead from "../../components/typography/Lead";

export default function Funding() {
  return (
    <div className="px-8 sm:max-w-screen-sm lg:max-w-screen-lg mx-auto w-full gap-8 grid col-span-1">
      <Heading2 className="text-zinc-200">
        Aprovisionnement
        <br />
        des trésoreries
      </Heading2>
      <div className="col-span-1 text-zinc-400 flex">
        <div className="flex-1">
          <div>16 ETH</div>
          <div>1040</div>
        </div>
        <div className="flex-1">
          <div>32 ETH</div>
          <div>1040</div>
        </div>
      </div>
      <Lead className="text-zinc-400 max-w-screen-md">
        La roadmap initiale prévoyait de lier l&apos;approvisionnement des
        trésoreries à différents paliers de mint.
      </Lead>
      <Lead className="text-zinc-400 max-w-screen-md">
        Le mint ayant nettement ralenti, avant d&apos;être totalement suspendu à
        1040 suite à une décision communautaire, le fondateur a approvisionné
        les trésoreries avec un total de 13 ETH.
      </Lead>
      <Lead className="text-zinc-400 max-w-screen-md">
        Depuis la suspension du mint l&apos;entièreté des royalties issus des
        ventes secondaires sur OpenSea est reversée au Club.
      </Lead>
    </div>
  );
}
