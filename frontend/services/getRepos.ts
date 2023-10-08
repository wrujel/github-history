import { toast } from "react-hot-toast";
import { serverUrl, fetchMode, userUrl, headers } from "../utils/constants";

interface IReposParams {
  user: string;
}

/**
 * Function that fetch repositories data from server
 * @param user github username
 * @returns an array with all repositories of a user
 */
export default async function getRepos(params: IReposParams) {
  try {
    const { user } = params;
    let repos = [];

    if (fetchMode === "client") {
      const rawData = await fetch(`${userUrl}/${user}/repos`, headers);
      const data = await rawData.json();
      repos = data.map((x: any) => x.name);
    } else {
      const response = await fetch(`${serverUrl}/api/repos`, {
        method: "POST",
        body: JSON.stringify({ user: user }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      repos = json?.repos;
    }

    if (!repos) return null;

    return repos;
  } catch (error: any) {
    toast.error("No repositories found");
    return [];
  }
}
