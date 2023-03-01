import Heading2 from "../../components/typography/Heading2";
import Lead from "../../components/typography/Lead";

export default function Guild() {
  return (
    <div className="px-8 max-w-screen-lg mx-auto space-y-4 lg:space-y-8 text-zinc-400">
      <div className="text-teal-400">
        <Heading2>Rejoins nous!</Heading2>
      </div>
      <Lead>
        Tu n&apos;es pas obligé d&apos;obtenir un Eboo pour rejoindre la
        communauté! Il te suffit de suivre les instructions sur{" "}
        <a href="https://guild.xyz/eboos" className="font-black text-white">
          guild.xyz/eboos
        </a>{" "}
        pour accèder à notre serveur Discord. Tu es le bienvenu et les membres
        de la communauté seront ravis de répondre à tes questions.
      </Lead>{" "}
      <Lead>
        Bien que le serveur soit accessible au public, certains salons sont
        réservés aux possesseurs de Eboos. Aprés avoir chopé un Eboo rends-toi
        sur la page{" "}
        <a href="https://guild.xyz/eboos" className="font-black text-white">
          guild.xyz/eboos
        </a>{" "}
        pour lier ton wallet à ton compte Discord.
      </Lead>
    </div>
  );
}
