import { MetaMaskButton } from "../metaMask";

export default function HeroAuthenticate({ authenticate }) {
  return (
    <>
      <div className="mb-8 max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-lg text-left">
        <div className="bg-slate-200 p-8 rounded-xl">
          There's a very high demand for Eboos yet each drop only contains 16.
          If you transaction is unsuccessful because the drop has sold out you
          will recover the Eboo's value but loose the gas fees.
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-8 text-lg flex items-center">
          <input
            type="checkbox"
            id="confirm"
            className="checked:bg-blue-500 mr-2 h-4 w-4"
          />
          <label htmlFor="confirm">I confirm I'm aware of the risks</label>
        </div>
        <MetaMaskButton onClick={authenticate}>
          Sign with MetaMask
        </MetaMaskButton>
      </div>
    </>
  );
}
