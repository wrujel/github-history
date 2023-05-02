interface IReposParams {
  user: string;
  repo: string;
}

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080";

/**
 * Function that fetch branches data from server
 * @param user github username
 * @param repo github repository
 * @returns an array with all branches of a repository
 */
export default async function getRepos(params: IReposParams) {
  try {
    const { user, repo } = params;

    const response = await fetch(`${serverUrl}/api/branches`, {
      method: "POST",
      body: JSON.stringify({ user: user, repo: repo }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    const branches = json?.branches;

    if (!branches) return null;

    return branches;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
