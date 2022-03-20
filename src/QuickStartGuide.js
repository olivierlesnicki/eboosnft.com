const Step = ({ step, title, children }) => {
  return (
    <div className="flex bg-slate-800 rounded-2xl drop-shadow-md relative">
      <div className="flex flex-col items-center ml-8">
        <div className="border-l-2 h-6"></div>
        <div className="border-2 h-12 w-12 rounded-full flex items-center justify-center">
          {step}
        </div>
        <div className="border-l-2 flex-auto"></div>
      </div>
      <div className="px-8 py-8">
        <h4 className="text-xl md:text-2xl mb-4 text-slate-200 font-semibold">
          {title}
        </h4>
        <div className="text-slate-400">{children}</div>
      </div>
    </div>
  );
};

function Path() {
  return (
    <div className="flex ml-8 z-10 relative">
      <div className="w-12 flex items-center flex-col">
        <div className="border-l-2 h-8"></div>
      </div>
    </div>
  );
}

export default function QuickStartGuide() {
  return (
    <div className="bg-slate-900 text-white">
      <div className="mx-auto max-w-4xl px-8 py-12 md:py-24">
        <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-center">
          Quick Start Guide
        </h1>
        <Path />
        <Step step={1} title="Create a MetaMask wallet">
          {" "}
          Available as a browser extension and as a mobile app, MetaMask equips
          you with a token wallet to safely keep and trade your eboos. Download
          MetaMask —{" "}
          <a
            href="https://metamask.io"
            className="text-sky-500 hover:text-sky-400"
          >
            metamask.io
          </a>
          .
        </Step>
        <Path />
        <Step step={2} title="Send ETH to your wallet">
          You can buy Ethereum (ETH) directly on MetaMask or transfer it to your
          MetaMask wallet from exchanges like Coinbase —{" "}
          <a
            href="https://coinbase.com"
            className="text-sky-500 hover:text-sky-400"
          >
            coinbase.com
          </a>
          .
        </Step>
        <Path />
        <Step step={3} title="Mint your first eboo">
          Use our website to mint your very first eboo! Remember: you can mint
          up to 8 eboos in a single transaction. Welcome to the gang #wagmi.
        </Step>
        <Path />
      </div>
    </div>
  );
}
