import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  // Validate user
  useEffect(() => {
    if (user === "") {
      setError("Please enter a username");
      return;
    }

    if (user.match(/[^a-zA-Z0-9 ]/)) {
      setError("Please enter only letters and numbers");
      return;
    }

    if (user.length < 3) {
      setError("Please enter at least 3 characters");
      return;
    }

    setError("");
  }, [user]);

  return { user, setUser, error, setError };
};

export default useUser;
