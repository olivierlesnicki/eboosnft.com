import Premint from "./Premint";
import Roadmap from "./heroes/Roadmap";
import QuickStartGuide from "./QuickStartGuide";
import Rarities from "./Rarities";
import Discord from "./Discord";

export default function Page() {
  return (
    <>
      <QuickStartGuide />
      <Discord />
      <Premint />
      <Rarities />
      <Roadmap />
    </>
  );
}
