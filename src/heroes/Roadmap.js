function Step({ title, children }) {
  return (
    <div className="text-left mb-8 w-full mx-auto">
      <h3 className="text-2xl sm:text-4xl mb-4 font-bold">{title}</h3>
      <div className="text-lg">{children}</div>
    </div>
  );
}

export default function Roadmap() {
  return (
    <div className="min-h-screen pt-16 text-center items-center bg-black text-white px-8 pb-16">
      <h2 className="text-6xl sm:text-8xl font-bold text-center mb-8">
        Roadmap
      </h2>
      <div className="max-w-2xl mx-auto mb-16">
        <p className="text-xl sm:text-2xl">
          We believe communities are at the core of great NFT projects. Our
          roadmap has been designed to incentivise our community from the get go
          and favor organic growth over fomo hype.
        </p>
      </div>
      <div className="max-w-xl mx-auto mb-8">
        <div className="p-8 text-left bg-slate-800">
          <p className="text-xl sm:text-2xl mb-4 font-bold">Premint</p>
          <div>
            During 64 days 1 eboo will be released for public mint every hour
            and a half. The mint price will start at 0.001 ETH and increase by
            0.001 ETH every 24 hours.
          </div>
        </div>
      </div>
      <div className="max-w-xl mx-auto mb-8">
        <div className="bg-slate-800 p-8 text-left">
          <p className="text-xl sm:text-2xl mb-4 font-bold">
            The Early-Bird Votes
          </p>
          <div>
            After 64 days the holders will gather and vote to agree on a launch
            date. The premint will extend until that date.
          </div>
        </div>
      </div>
      <div className="max-w-xl mx-auto mb-8">
        <div className="bg-green-400 p-8 text-left text-black">
          <p className="text-xl sm:text-2xl mb-4 font-bold">Launch</p>
          <div>
            The price will freeze and all the remaining eboos will be released
            for public mint at once.
          </div>
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        <div className="px-8 pt-4 text-left flex">
          <p className="text-xl sm:text-2xl mb-4 font-bold text-green-200 mr-8">
            0%
          </p>
          <div className="mt-1">Discord server</div>
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        <div className="px-8 pt-4 text-left flex">
          <p className="text-xl sm:text-2xl mb-4 font-bold text-green-200 mr-8">
            25%
          </p>
          <div className="mt-1">Discord server</div>
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        <div className="px-8 pt-4 text-left flex">
          <p className="text-xl sm:text-2xl mb-4 font-bold text-green-200 mr-8">
            50%
          </p>
          <div className="mt-1">Discord server</div>
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        <div className="px-8 pt-4 text-left flex">
          <p className="text-xl sm:text-2xl mb-4 font-bold text-green-200 mr-8">
            75%
          </p>
          <div className="mt-1">Discord server</div>
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        <div className="px-8 pt-4 text-left flex">
          <p className="text-xl sm:text-2xl mb-4 font-bold text-green-200 mr-8">
            100%
          </p>
          <div className="mt-1">Big fucking party</div>
        </div>
      </div>
    </div>
  );
}
