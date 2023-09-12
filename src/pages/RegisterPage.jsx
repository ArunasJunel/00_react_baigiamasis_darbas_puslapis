import { useNavigate } from "react-router";
import * as Yup from "yup";
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string()
        .min(6, "Password must be longer then 6 symbols")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Password must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("values registration ===", values);
      registerWithFirebase(
        values.email,
        values.password,
        values.confirmPassword
      );
    },
  });

  function registerWithFirebase(email, password, confirmPassword) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password, confirmPassword).then(
      (userCredential) => {
        const user = userCredential.user;
        console.log("user register ===", user);
        toast.success("Your registration is successful!");
        navigate("/shops", { replace: true });
      }
    );
  }
  return (
    <div className="bg-[url('https://websitedemos.net/love-nature-02/wp-content/uploads/sites/988/2022/01/header-hero.jpg')]  h-screen bg-cover bg-center  ">
      <div className="absolute  inset-x-0 text-center top-[20%] backdrop-brightness-75 w-[80%] h-96 m-auto ">
        <h2 className="text-3xl text-white font-bold pb-4 mt-4">Register</h2>

        <form onSubmit={formik.handleSubmit} className=" m-auto">
          <div>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="border rounded-md border-slate-800 px-4 py-2 m-2"
              id="email"
              type="text"
              placeholder="Email"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-md font-bold text-red-500">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="border rounded-md border-slate-800 px-4 py-2 m-2"
              id="password"
              type="password"
              placeholder="Password"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-md font-bold text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="border rounded-md border-slate-800 px-4 py-2 m-2"
              id="confirmPassword"
              type="password"
              placeholder="Repeat password"
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <p className="text-md font-bold text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
          <button
            className=" rounded-md px-8 py-4 m-2 w-64 bg-[#ffd936] text-[#536942]"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
