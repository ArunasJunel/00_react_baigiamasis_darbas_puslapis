import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../store/AuthProvider";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

export default function AddShopPage() {
  const navigate = useNavigate();
  const ctx = useAuth();
  const formik = useFormik({
    initialValues: {
      shopName: "",
      town: "",
      startYear: "",
      description: "",
      imageUrl: "",
    },
    validationSchema: Yup.object({
      shopName: Yup.string()
        .min(4, "Minimum 4 symbols.")
        .required("Shop name is required."),
      town: Yup.string()
        .min(4, "Minimum 4 symbols.")
        .required("Town is required."),
      startYear: Yup.number()
        .min(1970)
        .max(2025)
        .required("Start year is required."),
      description: Yup.string().min(6, "Minimum 6 symbols.").required(),
      imageUrl: Yup.string().min(5, "Minimum 5 symbols.").required(),
    }),
    onSubmit: (values) => {
      const newObjWithUid = {
        ...values,
        userUid: ctx.userUid,
      };
      sendDataToFireBase(newObjWithUid);
    },
  });
  async function sendDataToFireBase(dataToSend) {
    console.log("creating");
    try {
      const docRef = await addDoc(collection(db, "shops"), dataToSend);
      console.log("Document written with ID: ", docRef.id);
      toast.success("Shop created");
      navigate("/shops", { replace: true });
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="bg-[url('https://websitedemos.net/love-nature-02/wp-content/uploads/sites/988/2021/11/services-hero.jpg')] h-screen bg-cover bg-center  ">
      <div className="absolute  inset-x-0 text-center top-[10%] backdrop-brightness-75 w-[80%] m-auto ">
        <h2 className="text-3xl text-white font-bold pb-4 mt-4">Add shop</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* shop name */}
          <div>
            <label
              htmlFor="shopName"
              className="block text-md font-medium text-white"
            >
              Shop name
            </label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shopName}
              className="px-4 py-2 m-2 border rounded-md "
            />
            {formik.touched.shopName && formik.errors.shopName && (
              <div className="text-red-500 text-md font-bold">
                {formik.errors.shopName}
              </div>
            )}
          </div>
          {/* town */}
          <div>
            <label
              htmlFor="town"
              className="block text-md font-medium text-white"
            >
              Town
            </label>
            <input
              type="text"
              id="town"
              name="town"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.town}
              className="px-4 py-2 m-2 border rounded-md "
            />
            {formik.touched.town && formik.errors.town && (
              <div className="text-red-500 text-md font-bold">
                {formik.errors.town}
              </div>
            )}
          </div>

          {/* start year */}
          <div>
            <label
              htmlFor="startYear"
              className="block text-md font-medium text-white"
            >
              Start year
            </label>
            <input
              type="number"
              id="startYear"
              name="startYear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startYear}
              className="px-4 py-2 m-2 border rounded-md "
            />
            {formik.touched.startYear && formik.errors.startYear && (
              <div className="text-red-500 text-md font-bold">
                {formik.errors.startYear}
              </div>
            )}
          </div>
          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-md font-medium text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="px-5 py-2 m-2 border rounded-md "
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-md font-bold">
                {formik.errors.description}
              </div>
            )}
          </div>

          {/* Main Image URL */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-md font-medium text-white"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.imageUrl}
              className="px-4 py-2 m-2 border rounded-md "
            />
            {formik.touched.imageUrl && formik.errors.imageUrl && (
              <div className="text-red-500 text-md font-bold">
                {formik.errors.imageUrl}
              </div>
            )}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className=" rounded-md px-8 py-4 w-64 bg-[#ffd936] text-[#536942] mb-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
