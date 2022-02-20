import Image from "next/image";

export default function Rarities() {
  return (
    <div className="min-h-screen py-16 text-center">
      <div className="px-8">
        <h2 className="text-6xl sm:text-8xl font-bold text-center mb-8">
          Rarities
        </h2>
        <div className="max-w-2xl mx-auto mb-16">
          <p className="text-xl sm:text-2xl">
            There are four rariy tiers: unique, rare, xrare and xxrare. Each
            rare tier has an instantly recognizable sky background painted by
            the talented Clara Gaby-Rose —{" "}
            <a
              href="https://www.instagram.com/clar.th/"
              className="text-sky-500 hover:text-sky-600"
            >
              @clara.th
            </a>
            .
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
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
        <div className="mx-auto rounded-3xl max-w-4xl lg:flex lg:flex-row-reverse lg:items-center">
          <div className="max-w-2xl lg:text-left mb-8 lg:mb-0 lg:ml-16 mx-auto">
            <h2 className="text-4xl sm:text-6xl font-bold mb-8">
              Booster Packs
            </h2>
            <p className="text-xl sm:text-2xl">
              The 8,192 eboos have been split and shuffled into 512 sequential
              packs. Each pack contains 9 unique eboos, 4 rare eboos, 2 xrare
              eboos and one xxrare eboo.
            </p>
          </div>
          <div className="flex flex-col items-center p-2">
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
