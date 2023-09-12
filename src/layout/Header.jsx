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
    <header className="text-white text-lg flex absolute inset-x-0 justify-between items-center h-10 px-28 mx-auto bg-inherit backdrop-brightness-90 py-8 shadow-md">
      <Link
        to={"/"}
        className=" font-bold py-5 px-3 hover:rounded hover:bg-black/5 text-[#536942]"
      >
        Shop<strong className="text-[#ffd936]"> To </strong>Top
      </Link>
      <nav className="hidden lg:inline">
        <NavLink to={"/"} className="py-5 px-3 hover:rounded hover:bg-black/5">
          Home
        </NavLink>
        {!ctx.isUserLoggedIn && (
          <>
            <NavLink
              to={"/login"}
              className="py-5 px-3 hover:rounded hover:bg-black/5"
            >
              Login
            </NavLink>
            <NavLink
              to={"/register"}
              className="py-5 px-3 hover:rounded hover:bg-black/5"
            >
              Register
            </NavLink>
          </>
        )}

        {ctx.isUserLoggedIn && (
          <>
            <NavLink
              to={"/shops"}
              className="py-5 px-3 hover:rounded hover:bg-black/5"
            >
              Shops
            </NavLink>
            <NavLink
              to={"/add-shop"}
              className="py-5 px-3 hover:rounded hover:bg-black/5"
            >
              Add Shop
            </NavLink>
            <NavLink
              onClick={logout}
              to={"/login"}
              className="py-5 px-3 hover:rounded hover:bg-black/5"
            >
              Logout
            </NavLink>
          </>
        )}
        <p className="inline-block text-lg px-3 py-2">{ctx.email}</p>
      </nav>
      <div className="lg:hidden">
        <button className="py-5 px-3 hover:rounded hover:bg-black/5">
          Menu
        </button>
      </div>
    </header>
  );
}
