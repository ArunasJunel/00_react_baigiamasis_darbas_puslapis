import GoogleLogin from "../auth/GoogleLogin";
import LoginForm from "../auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-[url('https://websitedemos.net/love-nature-02/wp-content/uploads/sites/988/2022/01/header-hero.jpg')]  h-screen bg-cover bg-center  ">
      <div className="absolute  inset-x-0 text-center top-[20%] backdrop-brightness-75 w-[80%] h-96 m-auto ">
        <h2 className="text-3xl text-white font-bold pb-4 mt-4">Login here</h2>
        <LoginForm />
        <GoogleLogin />
      </div>
    </div>
  );
}
