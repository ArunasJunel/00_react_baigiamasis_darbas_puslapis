export default function LoginForm() {
  return (
    <div>
      <form>
        <input
          className="border border-slate-800 px-4 py-2"
          type="text"
          id="email"
          placeholder="Email..."
        />
        <input
          className="border border-slate-800 px-4 py-2"
          type="password"
          id="password"
          placeholder="Password..."
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
