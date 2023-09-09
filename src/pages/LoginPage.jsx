import GoogleLogin from "../auth/GoogleLogin";
import LoginForm from "../auth/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <h2>Login here</h2>
      <LoginForm />
      <GoogleLogin />
    </div>
  );
}
