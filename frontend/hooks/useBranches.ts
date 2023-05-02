import { useRef, useState } from "react";
import getBranches from "../services/getBranches";

const useBranches = (user: string, repo: string) => {
  const [branch, setBranch] = useState("");
  const [branches, setBranches] = useState([]);
  const [loadBranch, setLoadBranch] = useState(false);
  const previousUser = useRef(user);
  const previousRepo = useRef(repo);

  const getRepoBranches = async (
    user: string,
    repo: string
  ): Promise<string> => {
    // If the user and repo are the same as the previous ones, return an empty string
    if (user === previousUser.current && repo === previousRepo.current)
      return "";

    // Get branches from services
    try {
      setLoadBranch(true);
      previousUser.current = user;
      previousRepo.current = repo;
      const response = await getBranches({ user, repo });
      if (!response) {
        setBranches([]);
        setBranch("");
        return "";
      }
      setBranches(response);
      setBranch(response[0]);
      return response[0];
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoadBranch(false);
    }
  };

  return {
    getRepoBranches,
    branches,
    setBranches,
    branch,
    setBranch,
    loadBranch,
    setLoadBranch,
  };
};

export default useBranches;
