interface IReposParams {
  user: string;
  repo: string;
  branch: string;
}

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080";

/**
 * Function that fetch commits data from server
 * @param user github username
 * @param repo github repository
 * @param branch github branch
 * @returns a json with all commits of branch
 */
export default async function getRepos(params: IReposParams) {
  try {
    const { user, repo, branch } = params;

    const response = await fetch(`${serverUrl}/api/commits`, {
      method: "POST",
      body: JSON.stringify({ user: user, repo: repo, branch: branch }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    const commits = json?.commits;

    if (!commits) return null;

    return commits;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
