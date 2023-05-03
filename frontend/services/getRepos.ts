import { toast } from "react-hot-toast";

interface IReposParams {
  user: string;
}

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080";

/**
 * Function that fetch repositories data from server
 * @param user github username
 * @returns an array with all repositories of a user
 */
export default async function getRepos(params: IReposParams) {
  try {
    const { user } = params;

    const response = await fetch(`${serverUrl}/api/repos`, {
      method: "POST",
      body: JSON.stringify({ user: user }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    const repos = json?.repos;

    if (!repos) return null;

    return repos;
  } catch (error: any) {
    toast.error(error.message);
  }
}
