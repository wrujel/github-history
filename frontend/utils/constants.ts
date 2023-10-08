export const userUrl = "https://api.github.com/users";
export const reposUrl = "https://api.github.com/repos";
export const headers = {
  headers: {
    "content-type": "application/json;charset=UTF-8",
    "user-agent": "node.js",
  },
};
export const serverUrl =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080";
export const fetchMode = process.env.NEXT_PUBLIC_FETCH_MODE || "client";
