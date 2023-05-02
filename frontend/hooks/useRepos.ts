import { useRef, useState } from "react";
import getRepos from "../services/getRepos";

const useRepos = (user: string) => {
  const [repo, setRepo] = useState("");
  const [repos, setRepos] = useState([]);
  const [loadRepo, setLoadRepo] = useState(false);
  const previousUser = useRef(user);

  const getUserRepos = async (user: string): Promise<string> => {
    // If the user is the same as the previous one, return an empty string
    if (previousUser.current === user) return "";

    // Get repos from services
    try {
      setLoadRepo(true);
      previousUser.current = user;
      const response = await getRepos({ user });
      if (!response) {
        setRepos([]);
        setRepo("");
        return "";
      }
      setRepos(response);
      setRepo(response[0]);
      return response[0];
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoadRepo(false);
    }
  };

  return {
    getUserRepos,
    repos,
    setRepos,
    repo,
    setRepo,
    loadRepo,
  };
};

export default useRepos;
