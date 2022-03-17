import Premint from "./Premint";
import Roadmap from "./heroes/Roadmap";
import QuickStartGuide from "./QuickStartGuide";
import Rarities from "./Rarities";

export default function Page() {
  return (
    <>
      <QuickStartGuide />
      <Premint />
      <Rarities />
      <Roadmap />
    </>
  );
}
