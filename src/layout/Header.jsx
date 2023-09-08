import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../store/AuthProvider";

export default function Header() {
  const ctx = useAuth();

  return (
    <header className="container flex justify-between items-center">
      <Link to={"/"}>
        Lo<strong>Go</strong>
      </Link>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/login"}>Login</NavLink>
        <NavLink to={"/register"}>Register</NavLink>
        <NavLink to={"/login"}>Logout</NavLink>
        <NavLink to={"/shops"}>Shops</NavLink>
        <NavLink to={"/add-shop"}>Add Shop</NavLink>
      </nav>
    </header>
  );
}
