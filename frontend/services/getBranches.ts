import { toast } from "react-hot-toast";
import { serverUrl, fetchMode, reposUrl, headers } from "../utils/constants";

interface IParams {
  user: string;
  repo: string;
}

/**
 * Function that fetch branches data from server
 * @param user github username
 * @param repo github repository
 * @returns an array with all branches of a repository
 */
export default async function getBranches(params: IParams) {
  try {
    const { user, repo } = params;
    let branches: string[] = [];

    if (fetchMode === "client") {
      const rawData = await fetch(
        `${reposUrl}/${user}/${repo}/branches`,
        headers
      );
      const data = await rawData.json();
      branches = data.map((x: any) => x.name);
    } else {
      const response = await fetch(`${serverUrl}/api/branches`, {
        method: "POST",
        body: JSON.stringify({ user: user, repo: repo }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      branches = json?.branches;
    }

    if (!branches) return null;

    return branches;
  } catch (error: any) {
    toast.error(error.message);
  }
}
