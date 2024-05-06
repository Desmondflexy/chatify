import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./types";
import api from "./api";
// import { ChatPageContext } from "./contexts";

/**
 * Custom hook for managing authentication token.
 *
 * This hook provides functionality to save, remove, and retrieve the authentication token from local storage.
 *
 * @returns An object with the following properties:
 *   - setToken: A function to save the authentication token to local storage.
 *   - token: The current authentication token.
 *   - removeToken: A function to remove the authentication token from local storage.
 */
export function useToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) setToken(tokenFromStorage);
  }, []);

  function saveToken(userToken: string) {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  }

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}

/**A custom hook that authenticates the user and denies access if not authenticated.*/
export function useAuthenticator() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    api.getMe()
      .then((res) => setUser(res))
      .catch(() => navigate("/auth"));
  }, [navigate]);
  return user;
}

// export const ChatPageContext = createContext<User | undefined>(undefined);

// export function useUserContext() {
//   const user = useContext(ChatPageContext);
//   if (!user) throw new Error("useUserContext must be used within a UserProvider");
//   return user;
// }
