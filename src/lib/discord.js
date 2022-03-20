import axios from "axios";

const REDIRECT_URI = process.env.NEXT_PUBLIC_DISCORD_APP_REDIRECT_URI;
const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_APP_CLIENT_ID;

const DISCORD_API_URL = "https://discord.com/api";

export const connect = () => {
  window.location = `${DISCORD_API_URL}/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&scope=identify&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}`;
};

export default function discord(token) {
  const getUser = async () => {
    const res = await axios.get(`${DISCORD_API_URL}/users/@me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

  return {
    getUser,
  };
}
