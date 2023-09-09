import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { googleProvider } from "../firebase/firebase";

export default function GoogleLogin() {
  function googleAuth() {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("token ===", token);
        // The signed-in user info.
        const user = result.user;
        console.log("user ===", user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.warn("error ===", error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <>
      <h2>Login with Google</h2>
      <button
        className="border border-slate-500 px-4 py-2 rounded-md"
        onClick={googleAuth}
      >
        Login google
      </button>
    </>
  );
}
