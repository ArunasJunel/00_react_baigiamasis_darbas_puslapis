import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../store/AuthProvider";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-hot-toast";

export default function AddShopPage() {
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
      console.log("formik values ===", values);
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
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Something went wrong");
    }
  }
  return (
    <div>
      <h2>Add shop</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* shop name */}
        <div className="mb-4">
          <label
            htmlFor="shopName"
            className="block text-sm font-medium text-gray-700"
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
            className={`mt-1 p-2 w-full border rounded-md ${
              formik.touched.shopName && formik.errors.shopName
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
          />
          {formik.touched.shopName && formik.errors.shopName && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.shopName}
            </div>
          )}
        </div>
        {/* town */}
        <div className="mb-4">
          <label
            htmlFor="town"
            className="block text-sm font-medium text-gray-700"
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
            className={`mt-1 p-2 w-full border rounded-md ${
              formik.touched.town && formik.errors.town
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
          />
          {formik.touched.town && formik.errors.town && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.town}
            </div>
          )}
        </div>

        {/* start year */}
        <div className="mb-4">
          <label
            htmlFor="startYear"
            className="block text-sm font-medium text-gray-700"
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
            className={`mt-1 p-2 w-full border rounded-md ${
              formik.touched.startYear && formik.errors.startYear
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
          />
          {formik.touched.startYear && formik.errors.startYear && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.startYear}
            </div>
          )}
        </div>
        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={`mt-1 p-2 w-full border rounded-md ${
              formik.touched.description && formik.errors.description
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </div>
          )}
        </div>

        {/* Main Image URL */}
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
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
            className={`mt-1 p-2 w-full border rounded-md ${
              formik.touched.imageUrl && formik.errors.imageUrl
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
          />
          {formik.touched.imageUrl && formik.errors.imageUrl && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.imageUrl}
            </div>
          )}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
