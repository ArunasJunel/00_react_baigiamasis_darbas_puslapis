import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../store/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import toast from "react-hot-toast";

export default function Header() {
  const ctx = useAuth();

  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast.success("You have logged out");
      })
      .catch((error) => {
        toast.error("Error", error);
      });
  }

  return (
    <header className="container flex justify-between items-center">
      <Link to={"/"}>
        Lo<strong>Go</strong>
      </Link>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
        {!ctx.isUserLoggedIn && (
          <>
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/register"}>Register</NavLink>
          </>
        )}

        {ctx.isUserLoggedIn && (
          <>
            <NavLink to={"/shops"}>Shops</NavLink>
            <NavLink to={"/add-shop"}>Add Shop</NavLink>
            <NavLink onClick={logout} to={"/login"}>
              Logout
            </NavLink>
          </>
        )}
        <p className="inline-block">{ctx.email}</p>
      </nav>
    </header>
  );
}
