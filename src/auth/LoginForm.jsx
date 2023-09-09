import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    }),
    onSubmit: (values) => {
      console.log("formik values ===", values);
    },
  });
  console.log("formik.errors ===", formik.errors);
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
