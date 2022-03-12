import Image from "next/image";

export default function Rarities() {
  return (
    <div className="py-16 text-center">
      <div className="px-8">
        <h2 className="text-4xl sm:text-6xl font-bold mb-8">Rarities</h2>
        <div className="max-w-2xl mx-auto mb-16">
          <p className="text-xl sm:text-2xl">
            There are four rarity tiers: unique, rare, xrare and xxrare. Each
            rare tier has an instantly recognizable sky background painted by
            the talented Clara Gaby-Rose —{" "}
            <a
              href="https://www.instagram.com/clar.th/"
              className="text-sky-500 hover:text-sky-600 font-bold"
            >
              @clara.th
            </a>
            .
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 max-w-6xl mx-auto">
        <div className="relative aspect-square drop-shadow-2xl">
          <Image
            height={512}
            width={512}
            layout="responsive"
            src="/images/background_unique.png"
            className="rounded-2xl"
          />
          <div className="absolute bottom-0 flex justify-center w-full mb-4 text-xl sm:text-2xl text-white">
            unique.
          </div>
        </div>
        <div className="relative aspect-square drop-shadow-2xl">
          <Image
            height={512}
            width={512}
            layout="responsive"
            src="/images/background_rare.png"
            className="rounded-2xl"
          />
          <div className="absolute bottom-0 flex justify-center w-full mb-4 text-xl sm:text-2xl text-white">
            rare.
          </div>
        </div>
        <div className="relative aspect-square drop-shadow-2xl">
          <Image
            height={512}
            width={512}
            layout="responsive"
            src="/images/background_xrare.png"
            className="rounded-2xl"
          />
          <div className="absolute bottom-0 flex justify-center w-full mb-4 text-xl sm:text-2xl text-white">
            xrare.
          </div>
        </div>
        <div className="relative aspect-square drop-shadow-2xl">
          <Image
            height={512}
            width={512}
            layout="responsive"
            src="/images/background_xxrare.png"
            className="rounded-2xl"
          />
          <div className="absolute bottom-0 flex justify-center w-full mb-4 text-xl sm:text-2xl text-white">
            xxrare.
          </div>
        </div>
      </div>
      <div className="p-8 mt-8">
        <div className="mx-auto rounded-3xl max-w-5xl lg:flex lg:flex-row-reverse lg:items-center">
          <div className="max-w-2xl text-left mb-8 lg:mb-0 lg:ml-16 mx-auto bg-slate-200 p-16 rounded-2xl">
            <div className="font-bold text-4xl mb-8">Predictable outcome</div>
            <div className="text-xl sm:text-2xl">
              The Eboos have been split and randomly shuffled into 512
              sequential packs. Each pack contains 9 unique Eboos, 4 rare Eboos,
              2 xrare Eboos and one xxrare Eboo.
            </div>
            <div className="text-xl sm:text-2xl mt-4">
              Here's a little secret, there's a 1/4 chance that a xxrare Eboo
              turns into a shiny Eboo.
            </div>
          </div>
          <div className="lg:flex flex-col items-center p-2 hidden border-4 border-sky-400 rounded-2xl">
            <div className="flex">
              <div className="h-12 w-12 m-2 relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_unique.png"
                  className="rounded"
                />
              </div>
              <div className="h-12 w-12 m-2 relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_unique.png"
                  className="rounded"
                />
              </div>
              <div className="h-12 w-12 m-2 relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_unique.png"
                  className="rounded"
                />
              </div>
              <div className="h-12 w-12 m-2 relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_unique.png"
                  className="rounded"
                />
              </div>
            </div>
            <div className="flex">
              <div className="h-12 w-12 m-2 relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_unique.png"
                  className="rounded"
                />
              </div>
              <div className="h-12 w-12 m-2 relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_unique.png"
                  className="rounded"
                />
              </div>
              <div className="h-12 w-12 m-2 relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_unique.png"
                  className="rounded"
                />
              </div>
              <div className="h-12 w-12 m-2 relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_unique.png"
                  className="rounded"
                />
              </div>
            </div>
            <div className="flex">
              <div className="h-12 w-12 m-2 relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_unique.png"
                  className="rounded"
                />
              </div>
              <div className="h-12 w-12  m-2 rounded relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_rare.png"
                  className="rounded"
                />
              </div>
              <div className="h-12 w-12  m-2 rounded relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_rare.png"
                  className="rounded"
                />
              </div>
              <div className="h-12 w-12  m-2 rounded relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_rare.png"
                  className="rounded"
                />
              </div>
            </div>
            <div className="flex">
              <div className="h-12 w-12  m-2 rounded relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_rare.png"
                  className="rounded"
                />
              </div>
              <div className="h-12 w-12  m-2 rounded relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_xrare.png"
                  className="rounded"
                />
              </div>

              <div className="h-12 w-12  m-2 rounded relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_xrare.png"
                  className="rounded"
                />
              </div>

              <div className="h-12 w-12  m-2 rounded relative">
                <Image
                  height={48}
                  width={48}
                  layout="responsive"
                  src="/images/background_xxrare.png"
                  className="rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
