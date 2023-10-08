import { toast } from "react-hot-toast";
import { serverUrl, fetchMode, reposUrl, headers } from "../utils/constants";

interface IParams {
  user: string;
  repo: string;
  branch: string;
}

/**
 * Function that fetch commits data from server
 * @param user github username
 * @param repo github repository
 * @param branch github branch
 * @returns a json with all commits of branch
 */
export default async function getCommits(params: IParams) {
  try {
    const { user, repo, branch } = params;
    let commits = [];

    if (fetchMode === "client") {
      const rawData = await fetch(
        `${reposUrl}/${user}/${repo}/commits?sha=${branch}`,
        headers
      );
      const data = await rawData.json();
      commits = data.map((x: any) => {
        const commitsData = {
          sha: x["sha"].slice(0, 7),
          html_url: x["html_url"],
          date: x["commit"].author.date,
          message: x["commit"].message,
        };
        if (x["author"] !== null) {
          return {
            ...commitsData,
            author: x["author"].login,
            avatar_url: x["author"].avatar_url,
            author_url: x["author"].html_url,
          };
        } else {
          return commitsData;
        }
      });
    } else {
      const response = await fetch(`${serverUrl}/api/commits`, {
        method: "POST",
        body: JSON.stringify({ user: user, repo: repo, branch: branch }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      commits = json?.commits;
    }

    if (!commits) return null;

    return commits;
  } catch (error: any) {
    toast.error(error.message);
    return [];
  }
}
