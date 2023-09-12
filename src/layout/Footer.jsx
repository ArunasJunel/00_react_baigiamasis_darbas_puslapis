import { useAuth } from "../store/AuthProvider";

export default function Footer() {
  const ctx = useAuth();
  return (
    <footer className=" bottom-0 text-white text-lg flex justify-between items-center h-10 px-28 mx-auto  py-12 w-full bg-gray-800">
      <ul className=" gap-4 hidden lg:flex">
        <li className="hover:text-xl">
          <a href="/">Home</a>
        </li>
        {ctx.isUserLoggedIn ? (
          <li className="hover:text-xl">
            <a href="/shops">Shops</a>
          </li>
        ) : (
          <li className="hover:text-xl">
            <a href="/login">Login</a>
          </li>
        )}
        {ctx.isUserLoggedIn ? (
          <li className="hover:text-xl">
            <a href="/add-shop">Add Shop</a>
          </li>
        ) : (
          <li className="hover:text-xl">
            <a href="/register">Register</a>
          </li>
        )}
      </ul>
      <div>
        <p className="hover:text-xl">
          <a href="/">
            Shop <strong>To</strong> Top
          </a>
        </p>
      </div>
      <div>
        <p>
          Created by: <strong>Arūnas Junel</strong>
        </p>
      </div>
    </footer>
  );
}
