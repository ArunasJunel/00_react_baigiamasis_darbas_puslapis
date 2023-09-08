import { Link, NavLink } from "react-router-dom";

export default function Header() {
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
