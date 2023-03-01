import Image from "next/image";

export default function EschatologyOfDeath() {
  return (
    <div className="bg-red-600 py-16 lg:py-32 ">
      <div className="text-left lg:grid grid-cols-12 lg:gap-16 px-8 lg:px-16 max-w-screen-lg mx-auto items-center">
        <Image
          src="/images/518.PNG"
          height={1024}
          width={1024}
          className="rounded-2xl col-span-5 mb-8 lg:mb-0"
        />
        <div className=" flex-col mx-auto col-span-7">
          <div className="text-white text-4xl lg:text-6xl font-black max-w-sm md:max-w-none mb-4">
            Eschatology Of Death
          </div>
          <div className="text-white text-xl lg:text-2xl max-w-md lg:max-w-xl mb-4">
            Le premier no-utility freemint du projet. Une collection imaginée
            par l&apos;artiste graphiste @drea_rtist... Et si c&apos;était ton
            deuxième NFT?
          </div>
          <div className="pl-4 border-l-2 border-white text-red-300 mb-4">
            « L&apos;eschatologie est défini comme étant l&apos;étude des
            différentes fins du monde. Entre mythes et croyances, portant sur le
            sort ultime de l&apos;homme après sa mort et sur celui de
            l&apos;univers après sa disparition, cette collection donne vie à
            des figures hybrides, des âmes damnées, affluant de ces différentes
            fatalités. »
          </div>
          <a
            className="text-zinc-200 text-lg lg:text-xl flex hover:underline font-black"
            href="https://mint.fun/0x6C72accA401c4EaE5eB21a9EEba87EFf150959d6"
          >
            Mint un NFT
          </a>
          <div className="text-red-300">1 mint / wallet (2 pour les Eboos)</div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
