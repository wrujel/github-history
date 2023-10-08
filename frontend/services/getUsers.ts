import { toast } from "react-hot-toast";
import { serverUrl, fetchMode, userUrl, headers } from "../utils/constants";

interface IParams {
  user: string;
}

interface IUser {
  name: string;
  avatar_url: string;
  html_url: string;
}

/**
 * Function that fetch repositories data from server
 * @param user github username
 * @returns an array with all repositories of a user
 */
export default async function getUser(params: IParams): Promise<IUser> {
  let userData: IUser = { name: "", avatar_url: "", html_url: "" };
  try {
    const { user } = params;

    if (fetchMode === "client") {
      const rawData = await fetch(`${userUrl}/${user}`, headers);
      const data = await rawData.json();
      userData = {
        name: data.name,
        avatar_url: data.avatar_url,
        html_url: data.html_url,
      };
    } else {
      const response = await fetch(`${serverUrl}/api/users`, {
        method: "POST",
        body: JSON.stringify({ user: user }),
        headers: { "Content-Type": "application/json" },
      });
      userData = await response.json();
    }

    return userData;
  } catch (error: any) {
    toast.error("No user found");
    return userData;
  }
}
