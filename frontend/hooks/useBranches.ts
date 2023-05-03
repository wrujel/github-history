import { useRef, useState } from "react";
import getBranches from "../services/getBranches";
import { toast } from "react-hot-toast";

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
        toast.error("No branches found");
        setBranches([]);
        setBranch("");
        return "";
      }
      setBranches(response);
      setBranch(response[0]);
      return response[0];
    } catch (error: any) {
      toast.error(error.message);
      return "";
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
