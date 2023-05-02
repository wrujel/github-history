import { Dispatch, SetStateAction, useState } from "react";
import getData from "../services/getData";

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
  const { setUser, setRepo, setRepos, setBranch, setBranches, setCommits } =
    params;

  // Get data from the services
  const getDataCommits = async (user: string, repo: string, branch: string) => {
    try {
      setLoadData(true);
      const response = await getData({
        user: user,
        repo: repo,
        branch: branch,
      });
      setUser(user);
      setRepo(repo);
      setBranch(branch);
      if (!response) return;
      setRepos(response.repos);
      setBranches(response.branches);
      setCommits(response.commits);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoadData(false);
    }
  };

  return { getDataCommits, loadData, setLoadData };
};

export default useData;
