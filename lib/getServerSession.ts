import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const getSessionFromServer = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export default getSessionFromServer;
