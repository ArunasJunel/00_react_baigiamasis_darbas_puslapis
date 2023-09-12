import { useNavigate } from "react-router";
import { useAuth } from "../store/AuthProvider";

export default function HomePage() {
  const ctx = useAuth();
  const navigate = useNavigate();

  return (
    <div className=" bg-[url('https://websitedemos.net/love-nature-02/wp-content/uploads/sites/988/2022/01/header-hero.jpg')]  h-screen bg-cover bg-center  ">
      <div className="absolute  inset-x-0 text-center top-[30%] backdrop-brightness-75 w-[80%]  m-auto  ">
        <h1 className="text-5xl text-white font-bold pb-4  mt-12">
          we all love nature
        </h1>
        <p className="text-2xl text-white p-4">
          Look deep into nature, and you will understand everything better.
        </p>
        <div className="flex p-8 gap-2 justify-center ">
          {!ctx.isUserLoggedIn && (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className=" rounded-md px-8 py-4 w-64 bg-[#ffd936] text-[#536942]"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className=" rounded-md px-8 py-4  w-64 bg-[#536942] text-[#ffd936]"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
