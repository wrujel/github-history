import { useRef, useState } from "react";
import toast from "react-hot-toast";
import getUser from "../services/getUsers";

const useUser = () => {
  const [user, setUser] = useState("");
  const [loadUser, setLoadUser] = useState(false);
  const previousUser = useRef(user);

  // Validate user
  const validateUser = (user: string) => {
    if (user === "") {
      toast.error("Please enter a username");
      return false;
    }

    if (user.match(/[^a-zA-Z0-9 ]/)) {
      toast.error("Please enter only letters and numbers");
      return false;
    }

    if (user.length < 3) {
      toast.error("Please enter at least 3 characters");
      return false;
    }

    return true;
  };

  const getUserData = async (user: string): Promise<boolean> => {
    // Get repos from services
    try {
      setLoadUser(true);
      previousUser.current = user;
      const response = await getUser({ user });

      if (!response.name) {
        toast.error("No user found");
        return false;
      }
      return true;
    } catch (error: any) {
      toast.error(error.message);
      return false;
    } finally {
      setLoadUser(false);
    }
  };

  return { user, setUser, validateUser, getUserData, loadUser };
};

export default useUser;
