import { toast } from "react-hot-toast";
import { serverUrl, userUrl, fetchMode, headers } from "../utils/constants";
import getRepos from "./getRepos";
import getBranches from "./getBranches";
import getCommits from "./getCommits";

interface IParams {
  user: string;
  repo: string;
  branch: string;
}

/**
 * This function fetch all data from server:
 * repositories, branches and commits
 * @param user github username
 * @param repo github repository
 * @param branch github branch
 * @returns a json with all data
 */
export default async function getData(params: IParams) {
  try {
    const { user, repo, branch } = params;
    let data = {};

    if (fetchMode === "client") {
      const response = await fetch(`${userUrl}/${user}`, headers);
      const rawData = await response.json();
      data = {
        name: rawData.name,
        avatar_url: rawData.avatar_url,
        html_url: rawData.html_url,
        repos: await getRepos({ user: user }),
        branches: await getBranches({ user: user, repo: repo }),
        commits: await getCommits({ user: user, repo: repo, branch: branch }),
      };
    } else {
      const response = await fetch(`${serverUrl}/api/data`, {
        method: "POST",
        body: JSON.stringify({ user: user, repo: repo, branch: branch }),
        headers: { "Content-Type": "application/json" },
      });
      data = await response.json();
    }

    if (!data) return null;

    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
}
