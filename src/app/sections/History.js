import Image from "next/image";
import Lead from "../../components/typography/Lead";
import getZoraData from "../../components/getData";

function HistoryMilestone({ children, date, title }) {
  return (
    <div className="flex justify-items-stretch pr-8 lg:px-8 lg:even:flex-row-reverse lg:even:text-right max-w-screen-xl mx-auto group">
      <div className="flex-1 shrink-0 hidden lg:block"></div>
      <div className="flex flex-col items-center px-8">
        <div className="h-5 lg:h-6 w-0.5 bg-fuchsia-600" />
        <div className="h-4 w-4 bg-fuchsia-600 rounded-full"></div>
        <div className="h-4 w-0.5  bg-fuchsia-600 flex-1" />
      </div>
      <div className="text-lg flex-1 shrink-0 py-4 space-y-4 text-zinc-300 ">
        <div className="font-extrabold ">
          <span className=" text-fuchsia-400 uppercase">{date}</span> <br />
          <span className="uppercase">{title}</span>
        </div>
        <div className="text-zinc-300 space-y-4 lg:flex lg:flex-col lg:group-even:items-end">
          {children}
        </div>
      </div>
    </div>
  );
}

export default async function History() {
  const { firstMints } = await getZoraData();

  return (
    <div>
      <div className="text-center flex items-center flex-col mx-auto mb-8 lg:mb-16 px-8">
        <div className="text-zinc-200 text-4xl lg:text-6xl font-black max-w-sm md:max-w-none">
          Notre histoire
        </div>
      </div>
      <div>
        <HistoryMilestone date="Novembre 2021" title="Genèse">
          <div className="text-xl lg:text-2xl">
            L&apos;artiste musical francophone Le Motif décide de créer une
            collection s&apos;adressant aux gens voulant découvrir le monde des
            NFT.
          </div>
          <div className="text-base border-l-2 border-l-indigo-600 pl-4 text-zinc-500">
            Nous croyons vraiment que les NFT ont le pouvoir de changer pour
            toujours la façon dont les gens se rassemblent en tant que
            communautés, partagent des idées, collaborent et s&apos;enrichissent
            ensemble. Cependant, il devient déjà difficile pour les nouveaux
            venus d&apos;entrer dans cet espace naissant. Si vous n&apos;êtes
            pas un crypto-millionnaire avec des compétences exceptionnelles
            Twitter et discord, rejoindre une collection de premier ordre peut
            se sentir comme une tâche intimidante. Nous voulons simplifier les
            choses.
          </div>
          <a className="flex" href="https://opensea.io/levraimotif">
            <img
              src="https://i.seadn.io/gae/JCsE5Wm_eG8l2oO-eVy6E3wPsFJzlsNIjF88Ztsb3b6xzz070pJO0mPLwQXTh_zml970ySy2Gvqr4Udqj0wKuaNFloR6_TutU18zzQ?auto=format&w=384"
              className="h-12 w-12 rounded-full mr-4"
            />
            <div>
              <div className="font-bold">Le Motif</div>
              <div className="text-zinc-500">lemotif.eth</div>
            </div>
          </a>
        </HistoryMilestone>
        <HistoryMilestone date="7 Mars 2022" title="Lancement de la collection">
          <div className="text-xl lg:text-2xl">
            Après 3 mois de travail la collection voit le jour avec une phase de
            premint: pendant 64 jours 16 Eboos sont libérés toutes les 24
            heures.
          </div>
          <div className="text-xl lg:text-2xl">
            Pour remercier les premiers supporteurs du projet, le prix de mint
            commence à 0.001Ξ et augmente légèrement chaque jour.
          </div>
          <div className="grid grid-cols-4 gap-4 pt-4">
            {firstMints.nodes.map((node) => (
              <a
                key={node.token.tokenId}
                href={`https://opensea.com/assets/ethereum/${process.env.EBOOS_CONTRACT_ADDRESS}/${node.token.tokenId}`}
              >
                <Image
                  src={node.token.image.url.replace(
                    "https://ipfs.io/",
                    "https://eboosnft.mypinata.cloud/"
                  )}
                  alt={`Eboo #${node.token.tokenId}`}
                  height={1024}
                  width={1024}
                  className="w-full rounded-xl"
                />
              </a>
            ))}
          </div>
          <div className=" text-zinc-500 text-base text-center">
            Les 16 premiers Eboos de la collection
          </div>
        </HistoryMilestone>
        <HistoryMilestone
          date="13 Mars 2022"
          title="Création du serveur Discord"
        >
          <div className="text-xl lg:text-2xl">
            Suite au{" "}
            <a
              href="https://snapshot.org/#/eboos.eth/proposal/0x244249014e7f2874a4156f69723040aa7530ba2de3ff031544a374a63e125102"
              className="font-extrabold"
            >
              premier vote communautaire sur la plateforme snapshot
            </a>{" "}
            un serveur Discord est créé pour la communauté avec des salons
            reservés aux hodlers.
          </div>
          <div className="text-xl lg:text-2xl p-4 border-2 border-indigo-400 rounded-2xl text-indigo-300">
            Le serveur est ouvert à tous, rejoins-le en suivant les instructions
            sur{" "}
            <a href="https://guild.xyz/eboos" className="font-extrabold">
              guild.xyz/eboos
            </a>
            .
          </div>
        </HistoryMilestone>
        <HistoryMilestone date="25 Avril 2022" title="Airdrop Eboogotchi">
          <div className="text-xl lg:text-2xl">
            Eboogotchi, une jeu de type tamagotchi, est dévelopé et déployé sur
            la blockchain par Le Motif. Les possesseurs de Eboos en prennent
            soin jour et nuit jusqu&apos;à son décès permanent le 28 Avril.
          </div>
          <div className="text-xl lg:text-2xl">
            Chaque joueur reçoit un airdrop de la collection{" "}
            <a
              href="https://opensea.io/collection/eboogotchi"
              className="font-extrabold"
            >
              Ghost Eboogotchi
            </a>{" "}
            en commémoration.
          </div>
          <a
            className="text-zinc-200 text-lg lg:text-xl hover:underline flex font-black"
            href="https://etherscan.io/address/0x601e9aa07beb2648ac8d3afa84b5d6b867fa2848"
          >
            Découvre le contrat du Eboogotchi
          </a>
        </HistoryMilestone>

        <HistoryMilestone date="6 Mai 2022" title="Azuki">
          <div className="text-xl lg:text-2xl">
            Après un vote communautaire sur snapshot Le Musée achète un Bobu
            Token et rejoins officiellement l&apos;univers Azuki.
          </div>
          <div className="py-4">
            <img
              className="w-64 rounded"
              src="https://i.seadn.io/gcs/files/93a24dfff5a514a785ffa6c85f0d875b.png?auto=format&w=1000"
            />
          </div>
        </HistoryMilestone>
        <HistoryMilestone date="8 Juin 2022" title={`Eboos Night`}>
          <div className="text-xl lg:text-2xl">
            Lancement des Eboos Night un évènement hebdomadaire en vocal sur le
            serveur Discord animé par la communauté.{" "}
          </div>
          <div className="text-xl lg:text-2xl">
            Cet évènement ludique souvent axé autours de mini-jeux conviviaux
            permet aux membres du Discord d&apos;échanger de vive-voix autour du
            projet.
          </div>
        </HistoryMilestone>
        <HistoryMilestone date="16 Juin 2022" title="Publication 20 Mint">
          <div className="text-xl lg:text-2xl">
            20 Mint, un magazine gratuit de 24 pages entièrement consacré au
            Web3 et tiré à 800.000 exemplaires lancé par la rédaction du journal
            20 Minutes publie un article sur les Eboos.
          </div>
          <a
            className="text-zinc-200 text-lg lg:text-xl flex hover:underline font-black"
            href="https://20mint.xyz/"
          >
            Découvre le projet 20 Mint
          </a>
          <div className="py-4">
            <img
              className="w-64 rounded"
              src="https://cdn.discordapp.com/attachments/986572748346228786/986903744035848212/IMG_1796.png"
            />
          </div>
        </HistoryMilestone>
        <HistoryMilestone date="31 Juillet 2022" title="Soirée 10 ETH IRL">
          <div className="text-xl lg:text-2xl">
            Une soirée reservée aux hodlers est organisé au Ibis Paris Bercy
            pour célébrer le pallier des 10 ETH de volume sur le marché
            secondaire.
          </div>
          <div className="text-xl lg:text-2xl">
            L&apos;artiste Mademoiselle Lou performe son premier showcase et
            interprète en exclusivité pour les Eboos le titre Netflix &amp;
            Chill.
          </div>
        </HistoryMilestone>
        <HistoryMilestone date="17 Aout 2022" title={`Playlist DISCOVERY'BOOS`}>
          <div className="text-xl lg:text-2xl"></div>
        </HistoryMilestone>
        <HistoryMilestone date="29 Aout 2022" title={`Suspension du mint`}>
          <div className="text-xl lg:text-2xl"></div>
        </HistoryMilestone>
        <HistoryMilestone date="20 Octobre 2022" title={`Concours Eboos Music`}>
          <div className="text-xl lg:text-2xl">
            Un concours de musique est organisé au sein de la communauté. 13
            morceaux originaux sont composés, enregistrés et soumis aux votes
            des hodlers. Les trois morceaux gagnants vont être pressés sur un
            vinyl collector et vendus aux enchères sur la blockchain.
          </div>
        </HistoryMilestone>
        <HistoryMilestone
          date="1 Décembre 2022"
          title={`Calendrier de l'avent`}
        >
          <div className="text-xl lg:text-2xl">
            Pendant tous le mois de Décembre un calendrier de l&apos;avent est
            organisé sur les réseaux sociaux du projet et 7 Eboos sont offerts
            en guise de lot.
          </div>
        </HistoryMilestone>
      </div>
    </div>
  );
}
