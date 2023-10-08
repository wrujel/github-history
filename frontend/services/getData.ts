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

interface IData {
  repos: never[];
  branches: never[];
  commits: never[];
}

/**
 * This function fetch all data from server:
 * repositories, branches and commits
 * @param user github username
 * @param repo github repository
 * @param branch github branch
 * @returns a json with all data
 */
export default async function getData(params: IParams): Promise<IData> {
  let data: IData = { repos: [], branches: [], commits: [] };
  try {
    const { user, repo, branch } = params;

    if (fetchMode === "client") {
      data = {
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
  } catch (error: any) {
    toast.error("No data found");
  }
  return data;
}
