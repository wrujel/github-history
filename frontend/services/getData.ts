interface IReposParams {
  user: string;
  repo: string;
  branch: string;
}

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080";

/**
 * This function fetch all data from server:
 * repositories, branches and commits
 * @param user github username
 * @param repo github repository
 * @param branch github branch
 * @returns a json with all data
 */
export default async function getRepos(params: IReposParams) {
  try {
    const { user, repo, branch } = params;

    const response = await fetch(`${serverUrl}/api/data`, {
      method: "POST",
      body: JSON.stringify({ user: user, repo: repo, branch: branch }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (!data) return null;

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
