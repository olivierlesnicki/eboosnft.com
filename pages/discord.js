import { useEffect } from "react";

export default function Discord() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: "https://discord.gg/EZhcAQYF5r",
    },
  };
}
