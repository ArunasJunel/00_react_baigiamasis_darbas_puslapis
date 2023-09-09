import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  email: "",
  isUserLoggedIn: "",
  userUid: "",
});

AuthContext.displayName = "Auth";

export default function AuthProvider(props) {
  const [user, setUser] = useState({});
  const email = user?.email;
  const userUid = user?.uid;
  const isUserLoggedIn = !!email;

  const ctx = {
    email: email,
    isUserLoggedIn: isUserLoggedIn,
    userUid: userUid,
  };
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Login successful");
        setUser(user);
      } else {
        console.log("Logout");
        setUser({});
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
