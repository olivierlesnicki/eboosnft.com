import { useMetaMaskAccount } from "./metaMask";
import { connect } from "./lib/discord";

export default function () {
  const account = useMetaMaskAccount();

  if (!account) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between items-center text-indigo-50 bg-gradient-to-br from-indigo-400 to-indigo-600">
      <div className="px-8 text-center py-16">
        <h2 className="text-4xl sm:text-6xl font-bold mb-8">Discord</h2>
        <div className="max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-xl sm:text-2xl mb-8">
          Connect your MetaMask wallet to your Discord account and get access to
          holders only channels.
        </div>
        <button
          className="bg-indigo-100 hover:bg-indigo-200 text-indigo-500 h-12 rounded font-bold px-8 drop-shadow"
          onClick={connect}
        >
          Connect with Discord
        </button>
      </div>
    </div>
  );
}
