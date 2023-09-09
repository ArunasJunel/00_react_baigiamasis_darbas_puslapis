import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "arunas@junel.lt",
      password: "junel123",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    }),
    onSubmit: (values) => {
      console.log("formik values ===", values);
      loginWithFirestore(values.email, values.password);
    },
  });
  console.log("formik.errors ===", formik.errors);
  function loginWithFirestore(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user is logged in ===", user);
        toast.success(`You have logged in successfully. Welcome, ${email}`);
        // ...
      })
      .catch((error) => {
        toast.error("Login failed, check email or password");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="max-w-xs">
        <div>
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            className="border border-slate-800 px-4 py-2"
            type="text"
            id="email"
            placeholder="Email..."
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-md text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            className="border border-slate-800 px-4 py-2"
            type="password"
            id="password"
            placeholder="Password..."
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-md text-red-500">{formik.errors.password}</p>
          )}
        </div>
        <button
          className="border border-slate-500 px-4 py-2 rounded-md"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
