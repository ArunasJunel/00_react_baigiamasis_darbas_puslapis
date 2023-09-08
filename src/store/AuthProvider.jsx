import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  email: "",
  isUserLoggedIn: "",
});

AuthContext.displayName = "Auth";

export default function AuthProvider(props) {
  const [user, setUser] = useState({});
  const email = user?.email;
  const isUserLoggedIn = !!email;

  const ctx = {
    email: email,
    isUserLoggedIn: isUserLoggedIn,
  };
  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
