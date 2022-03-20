import Image from "next/image";

import { useAlchemy } from "../alchemy";

function Milestone({ children, progress, start, end }) {
  if (progress < start) {
    return (
      <div className="md:flex">
        <div className="w-full flex items-center mb-4 md:mb-0 md:flex-col md:w-auto md:mr-8">
          <div className="w-8 h-0.5 bg-slate-700 md:h-5 md:w-0.5"></div>
          <div className="h-10 w-20 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 border-slate-700 border-2">
            {start}
          </div>
          <div className="w-full h-0.5 bg-slate-700 md:h-full md:w-0.5"></div>
        </div>
        <div className="text-lg mb-8 md:mb-0 md:pt-5 md:pb-8">{children}</div>
      </div>
    );
  }

  if (progress < end) {
    return (
      <div className="md:flex">
        <div className="w-full flex items-center mb-4 md:mb-0 md:flex-col md:w-auto md:mr-8">
          <div className="w-8 h-0.5 bg-green-500 md:h-5 md:w-0.5"></div>
          <div className="h-10 w-20 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 border-green-500 text-green-500 border-2">
            {start}
          </div>
          <div className="w-full h-0.5 bg-gradient-to-b from-green-500 to-slate-700 md:h-full md:w-0.5"></div>
        </div>
        <div className="text-lg mb-8 md:mb-0 md:pt-5 md:pb-8">{children}</div>
      </div>
    );
  }

  return (
    <div className="md:flex">
      <div className="w-full flex items-center mb-4 md:mb-0 md:flex-col md:w-auto md:mr-8">
        <div className="w-8 h-0.5 bg-green-500 md:h-5 md:w-0.5"></div>
        <div className="h-10 w-20 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 border-slate-700 border-2">
          {start}
        </div>
        <div className="w-full h-0.5 bg-green-500 md:h-full md:w-0.5"></div>
      </div>
      <div className="text-lg mb-8 md:mb-0 md:pt-5 md:pb-8">{children}</div>
    </div>
  );
}

export default function Roadmap() {
  const alchemy = useAlchemy();

  return (
    <div className="text-slate-300 bg-gradient-to-b from-slate-900 to-slate-800 py-16 px-8 text-left">
      <div className="md:max-w-4xl mx-auto mb-12">
        <h2 className="text-4xl sm:text-6xl font-bold mb-8">Roadmap</h2>
        <div className="text-xl sm:text-2xl">
          We truly believe NFTs have the power to change for ever the way people
          gather as communities, share ideas, collaborate and become wealthier
          together. However, it's already becoming hard for new comers to get
          into this nascent space. If you're not a crypto-millionaire with
          outstanding twitter and discord skills, joining a blue-chip collection
          can feel like a daunting task.
          <br />
          <br />
          We want to make it simple.
        </div>
      </div>
      <div className="lg:flex lg:justify-center">
        <div className="md:max-w-xl mb-16 md:mb-0">
          <Milestone start={0} end={512} progress={alchemy.totalSupply}>
            During 64 days 16 Eboos are released every 24 hours. The mint price
            starts at 0.001Ξ and increases by 0.001Ξ every day. It's our way to
            reward early birds that are crucial to the project's organic growth.
          </Milestone>
          <Milestone start={512} end={1024} progress={alchemy.totalSupply}>
            We payback the project's contributors:{" "}
            <a
              className="text-sky-500 hover:text-sky-300 font-bold"
              href="https://instagram.com/levraimotif"
            >
              levraimotif
            </a>
            ,{" "}
            <a
              className="text-sky-500 hover:text-sky-300 font-bold"
              href="https://instagram.com/s2keyz"
              target="_blank"
            >
              s2keyz
            </a>
            ,{" "}
            <a
              className="text-sky-500 hover:text-sky-300 font-bold"
              href="https://instagram.com/darkelixirone"
              target="_blank"
            >
              darkelixirone
            </a>
            ,{" "}
            <a
              className="text-sky-500 hover:text-sky-300 font-bold"
              href="https://instagram.com/clara.th"
              target="_blank"
            >
              clara.th
            </a>
            ,{" "}
            <a
              className="text-sky-500 hover:text-sky-300 font-bold"
              href="https://instagram.com/tetefuf"
              target="_blank"
            >
              tetefuf
            </a>{" "}
            and{" "}
            <a
              className="text-sky-500 hover:text-sky-300 font-bold"
              href="https://instagram.com/lex__jaggerjack"
              target="_blank"
            >
              lex__jaggerjack
            </a>
            .
          </Milestone>
          <Milestone start={1024} end={4096} progress={alchemy.totalSupply}>
            For the project's viability the premint phase must eventually end
            and switch to a flat distribution. On the 64th day the holders will
            decide if the premint continues or ends releasing all the remaining
            Eboos at a fixed price of 0.064Ξ.
          </Milestone>
          <Milestone start={2048} end={4096} progress={alchemy.totalSupply}>
            Two community driven treasuries will be created and seeded with{" "}
            <span className="font-bold">16 ETH</span> each by the founders:{" "}
            <span className="font-bold">The Club</span> and{" "}
            <span className="font-bold">The Museum</span>.
          </Milestone>
          <Milestone start={4096} end={8192} progress={alchemy.totalSupply}>
            An additional <span className="font-bold">48 ETH</span> per treasury
            will be added to <span className="font-bold">The Club</span> and{" "}
            <span className="font-bold">The Museum</span> by the founders.
          </Milestone>
          <Milestone start={8192} end={8192} progress={alchemy.totalSupply}>
            We start expanding the Ebooverse and cook up new ways to help NFT
            newcomers join the fun.
          </Milestone>
        </div>
        <div className="lg:ml-16 flex items-center flex-col">
          <div>
            <Image src="/images/150.png" width={512} height={509} />
          </div>
          <div className="text-slate-500 text-center mt-4 text-sm">
            <a
              href="https://opensea.io/assets/0xa52863eef886b51182abfd8fb2a6bb96bbe92699/150"
              className="font-bold"
            >
              Eboo #150
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
