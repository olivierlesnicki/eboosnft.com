import rm from "remove-markdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import Heading2 from "../../components/typography/Heading2";
import Lead from "../../components/typography/Lead";

const getLatestSnapshots = async () => {
  const res = await fetch("https://hub.snapshot.org/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operationName: "Proposals",
      query: `
        query Proposals {
          proposals(first: 3, skip: 0, where: {space_in: ["eboos.eth"]}, orderBy: "created", orderDirection: desc) {
            id
            title
            body
            choices
            scores
            scores_total
            start
            end
            snapshot
            state
            author
          }
        }      
      `,
    }),
  });
  const json = await res.json();
  return json?.data?.proposals;
};

const Snapshot = ({ id, title, choices, scores, scores_total, body }) => {
  const winningScore = scores.reduce((max, score) => {
    return score > max ? score : max;
  }, 0);

  return (
    <div className="border-zinc-700/50 max-w-lg flex flex-col gap-4 py-6 lg:py-8">
      <a
        className="text-zinc-200 text-lg lg:text-xl hover:underline font-black flex"
        href={`https://snapshot.org/#/eboos.eth/proposal/${id}`}
      >
        {title}
      </a>
      <div className="text-zinc-500">{rm(body || "").substring(0, 140)}...</div>
      <div className="space-y-1">
        {choices.map((choice, index) => (
          <div
            key={choice}
            className="py-1 px-2  flex-1 rounded  text-zinc-500 bg-zinc-700/25 relative"
          >
            <div
              className="py-1 px-2 flex-1 rounded absolute top-0 left-0 bottom-0 bg-zinc-700"
              style={{ width: `${(scores[index] / scores_total) * 100}%` }}
            ></div>
            <div className="relative flex items-center space-x-1.5">
              {scores[index] === winningScore && scores_total > 100 && (
                <FontAwesomeIcon icon={faCheck} className="w-3 text-zinc-300" />
              )}
              <div className="font-bold text-zinc-300">{choice}</div>
              <div>{Math.round((scores[index] / scores_total) * 100)}%</div>
            </div>
          </div>
        ))}
      </div>
      {scores_total < 100 && (
        <div className="p-2 bg-pink-900 text-pink-200 rounded text-xs shadow-lg shadow-pink-900/25">
          Cette proposition n&apos;a pas atteint le quorum nécessaire
        </div>
      )}
    </div>
  );
};

export default async function Treasuries() {
  const snapshots = await getLatestSnapshots();

  return (
    <>
      <div className="px-8 max-w-screen-xl mx-auto">
        <div className="text-zinc-200 text-4xl lg:text-6xl font-black mb-8 lg:mb-16 text-center">
          <div>Chaque Eboo</div>
          <div className="text-indigo-400">a son mot à dire</div>
        </div>
        <div className="grid lg:grid-cols-12 gap-8 sm:max-w-lg lg:max-w-none max-w-screen-xl mx-auto">
          <div className="bg-zinc-900 p-12 lg:p-16 text-left flex flex-col gap-4 lg:gap-8 lg:col-span-6 xl:col-span-7 rounded-2xl">
            <Heading2 className="text-zinc-200">Snapshot.org</Heading2>
            <Lead className="text-zinc-400">
              Nous utilisons{" "}
              <a
                className="text-zinc-200 hover:underline font-black"
                href="https://snapshot.org/#/eboos.eth"
              >
                snapshot.org
              </a>{" "}
              pour voter les dépenses des trésoreries proposées par la
              communauté.
            </Lead>
            <div className="divide-y divide-y-zinc-800">
              {snapshots.map((snapshot) => (
                <Snapshot key={snapshot.id} {...snapshot} />
              ))}
            </div>
            <a
              className="text-zinc-200 text-lg lg:text-xl hover:underline font-black"
              href="https://snapshot.org/#/eboos.eth"
            >
              Découvre tous les snapshots
            </a>
          </div>
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="p-8 lg:p-12 text-left flex flex-col gap-4 lg:gap-8  rounded-2xl justify-center">
              <div className=" gap-4 flex flex-col text-lg space-y-4">
                <Lead className="font-black text-zinc-300">
                  Les 6 règles d&apos;un snapshot
                </Lead>
                <ul className="text-base text-zinc-400 flex flex-col divide-y divide-zinc-700/75">
                  {[
                    "Poser une question claire à la communauté dans le titre- celle-ci doit voter POUR, CONTRE ou VOTE BLANC.",
                    "Préciser un montant précis en ETH et une explication de comment celui-ci sera utilisé",
                    "Ne pas exposer la trésorerie à une “51% Attack”",
                    "Si le snapshot concerne Le Club, ajouter une explication de comment cette dépense permettra de divertir ou agrandir la communauté",
                    "Si le snapshot concerne Le Musée, identifier clairement un NFT (ou plusieurs) ainsi que les avantages de le posséder",
                    "Atteindre un quorum de 100",
                  ].map((text, index) => (
                    <li
                      className="flex items-start py-4 first:pt-0 last:pb-0"
                      key={index}
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="w-5 mt-0.5 mr-4 text-indigo-400 flex-shrink-0 "
                      />
                      <div>{text}</div>
                    </li>
                  ))}
                </ul>
                <a
                  className="text-zinc-200 text-lg lg:text-xl hover:underline font-black"
                  href="https://snapshot.org/#/eboos.eth/create/0"
                >
                  Rédige un snapshot
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
