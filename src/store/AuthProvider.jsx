import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  email: "",
  isUserLoggedIn: "",
  userUid: "",
});

AuthContext.displayName = "Auth";

export default function AuthProvider(props) {
  // get saved user from localStorage and set it to initial state
  // so after page refresh we have a persisted state
  const userInLocal = JSON.parse(localStorage.getItem("currentUser"));
  console.log("userInLocal ===", userInLocal);

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
      console.log("vartotojas", user);
      if (user) {
        console.log("Login successful");
        setUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        console.log("Logout");
        setUser({});
        localStorage.removeItem("currentUser");
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
