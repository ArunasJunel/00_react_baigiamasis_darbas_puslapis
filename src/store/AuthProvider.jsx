import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext({
  email: "",
  isUserLoggedIn: "",
  userUid: "",
});

AuthContext.displayName = "Auth";

export default function AuthProvider(props) {
  const userInLocal = JSON.parse(localStorage.getItem("currentUser"));

  const [user, setUser] = useState(userInLocal);
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
        toast.success("Login succesful");
        setUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        setUser({});
        localStorage.removeItem("currentUser");
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
