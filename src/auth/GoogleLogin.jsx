import { getAuth, signInWithPopup } from "@firebase/auth";
import { googleProvider } from "../firebase/firebase";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

export default function GoogleLogin() {
  const navigate = useNavigate();
  function googleAuth() {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        navigate("/shops", { replace: true });
        toast.success(
          `You have logged in successfully. Welcome, ${user.email}`
        );
      })
      .catch((error) => {
        console.warn("error ===", error);
        toast.error("Oops! Something went wrong!");
      });
  }
  return (
    <>
      <h2 className="text-xl text-white font-bold p-4">Login with Google</h2>
      <button
        className=" rounded-md px-8 py-4  w-64 bg-[#536942] text-[#ffd936]"
        onClick={googleAuth}
      >
        Google login
      </button>
    </>
  );
}
