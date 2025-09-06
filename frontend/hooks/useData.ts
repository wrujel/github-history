import { Dispatch, SetStateAction, useState } from "react";
import getData from "../services/getData";
import { toast } from "react-hot-toast";

interface IParamsData {
  setUser: Dispatch<SetStateAction<string>>;
  setRepo: Dispatch<SetStateAction<string>>;
  setRepos: Dispatch<SetStateAction<never[]>>;
  setBranch: Dispatch<SetStateAction<string>>;
  setBranches: Dispatch<SetStateAction<never[]>>;
  setCommits: Dispatch<SetStateAction<never[]>>;
}

const useData = (params: IParamsData) => {
  const [loadData, setLoadData] = useState(false);

  // module-level lock to avoid duplicate calls across React strict-mode double mounts
  // (keeps state across component mount/unmount within the same session)
  // This prevents getDataCommits from being started twice concurrently.
  // Note: it's intentionally simple; it blocks concurrent starts but still
  // allows future calls after the first finishes.
  let dataCommitsInProgress = (useData as any)._inProgress || false;
  const { setUser, setRepo, setRepos, setBranch, setBranches, setCommits } =
    params;

  // Get data from the services
  const getDataCommits = async (user: string, repo: string, branch: string) => {
    if (loadData || dataCommitsInProgress) return;
    try {
      // mark module-level lock and local loading state
      (useData as any)._inProgress = true;
      dataCommitsInProgress = true;
      setLoadData(true);

      const response = await getData({
        user: user,
        repo: repo,
        branch: branch,
      });

      setUser(user);
      setRepo(repo);
      setBranch(branch);

      if (!response) {
        toast.error("No data found");
        return;
      }

      setRepos(response.repos);
      setBranches(response.branches);
      setCommits(response.commits);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      // clear loading flags
      setLoadData(false);
      dataCommitsInProgress = false;
      (useData as any)._inProgress = false;
    }
  };

  return { getDataCommits, loadData, setLoadData };
};

export default useData;
