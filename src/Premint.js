import { useMemo } from "react";
import Image from "next/image";

export default function HeroContent({ children }) {
  let arr = [0, 1];

  const days = useMemo(() => {
    const days = [];
    for (let i = 0; i < 64; i++) days.push(i);
    return days;
  }, []);

  const day = useMemo(() => {
    return (Date.now() - 1646654400000) / 1000 / 3600 / 24;
  }, []);

  return (
    <div className="flex flex-col justify-between items-center text-slate-900 bg-slate-200">
      <div className="px-8 text-center py-16">
        <h2 className="text-4xl sm:text-6xl font-bold mb-8">Premint phase</h2>
        <div className="max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-xl sm:text-2xl">
          During 64 days 16 eboos are released every 24 hours. The mint price
          starts at 0.001Ξ and increases by 0.001Ξ every day.
        </div>
        <div className="px-16">
          <div className="relative flex">
            <div
              className="mt-8 flex items-center justify-center flex-col -ml-16  relative"
              style={{
                left: `${(day / 64) * 100}%`,
              }}
            >
              <div className="py-2 w-32 bg-blue-500 text-white rounded text-lg">
                <div>
                  Day {Math.floor(day + 1)} / 64 <br />
                  <span className="font-bold">
                    {Math.floor(day) * 0.001 + 0.001}Ξ
                  </span>
                </div>
              </div>
              <div
                className="border-t-blue-500"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTopWidth: `10px`,
                }}
              />
            </div>
          </div>
          <div className="mt-2 flex">
            {days.map((index) =>
              index < day - 1 ? (
                <div
                  className="h-4 flex-1 mr-0.5 bg-blue-500"
                  key={index}
                ></div>
              ) : index < day ? (
                <div className="h-4 flex-1 mr-0.5 bg-slate-300" key={index}>
                  <div
                    className=" bg-blue-500"
                    style={{
                      height: "100%",
                      width: `${(day - Math.floor(day)) * 100}%`,
                    }}
                  ></div>
                </div>
              ) : (
                <div
                  className="h-4 flex-1 mr-0.5 bg-slate-300"
                  key={index}
                ></div>
              )
            )}
          </div>
        </div>
        <div className="max-w-5xl mx-auto text-xl sm:text-2xl mt-12 text-left">
          <div className="px-12 md:px-16 bg-slate-300 rounded-2xl flex flex-col lg:flex-row items-center lg:items-end">
            <div className="w-60 md:w-72 flex-shrink-0 order-last lg:order-first">
              <Image
                src="/images/eboo_le_motif.png"
                height={661}
                width={512}
                layout="responsive"
              />
            </div>
            <div className="py-12 md:py-16 lg:ml-16">
              <div className="font-bold text-4xl">Why?</div>
              <div className="mt-8">
                We believe early supporters should be rewarded and not
                exploited. You don't have to retweet our tweets, share our
                Discord server or purchase a raffle ticket. There's no
                whitelist, if you believe in the project just mint an Eboo.{" "}
              </div>
              <div className="mt-8">
                Even though the price increases every 24 hours, it will always
                remain well below the industry average.
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex max-w-md sm:max-w-lg md:max-w-2xl mx-auto items-center">
          <div className="uppercase border-slate-900 rounded-xl border-2 mr-8">
            <div className="py-2">DAY</div>
            <div className="border-1 border-t border-slate-900 w-full" />
            <div className="py-2 px-6 text-4xl font-bold">64</div>
          </div>
          <div className="text-left">
            <div className="text-xl sm:text-2xl">
              On the 64th day the holders will vote on{" "}
              <a
                className="text-sky-500 hover:text-sky-600 font-bold"
                href="https://snapshot.org/#/eboos.eth/proposal/0x87fafa4e8d58ccb3d42789a9629a535c27d9e393756207b824d4a1986fd964bd"
                target="_blank"
              >
                snapshot
              </a>{" "}
              and decide if the premint continues or ends releasing all the
              remaining eboos at a fixed price.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
