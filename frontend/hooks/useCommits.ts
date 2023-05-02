import { useCallback, useRef, useState } from "react";
import getCommits from "../services/getCommits";

const useCommits = (user: string, repo: string, branch: string) => {
  const [commits, setCommits] = useState([]);
  const [loadCommit, setLoadCommit] = useState(false);
  const previousUser = useRef(user);
  const previousRepo = useRef(repo);
  const previousBranch = useRef(branch);

  const getBranchCommits = useCallback(
    async (user: string, repo: string, branch: string) => {
      // If the user, repo and branch are the same as the previous ones, return
      if (
        user === previousUser.current &&
        repo === previousRepo.current &&
        branch === previousBranch.current
      )
        return;

      // Get commits from services
      try {
        setLoadCommit(true);
        previousUser.current = user;
        previousRepo.current = repo;
        previousBranch.current = branch;
        const response = await getCommits({ user, repo, branch });
        if (!response) {
          setCommits([]);
          return;
        }
        setCommits(response);
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        setLoadCommit(false);
      }
    },
    []
  );

  return { getBranchCommits, commits, setCommits, loadCommit, setLoadCommit };
};

export default useCommits;
