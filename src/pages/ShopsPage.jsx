import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/AuthProvider";
import { collection, deleteDoc, doc, getDocs } from "@firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-hot-toast";

export default function ShopsPage() {
  const [shopsArr, setShopsArr] = useState([]);
  const navigate = useNavigate();
  const ctx = useAuth();

  useEffect(() => {
    getShops();
  }, []);

  async function getShops() {
    const querySnapshot = await getDocs(collection(db, "shops"));
    const dataBack = [];
    querySnapshot.forEach((doc) => {
      dataBack.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log("dataBack ===", dataBack);
    setShopsArr(dataBack);
  }

  function deleteFire(delId) {
    deleteDoc(doc(db, "shops", delId))
      .then(() => {
        toast.success("Have been deleted!");
        getShops();
      })
      .catch((error) => {
        console.warn("ivyko klaida:", error);
        toast.error("Failed to delete");
      });
  }
  function isMine(elId, userId) {
    if (elId === userId) {
      return "border border-red-600 ";
    }
  }

  return (
    <div className="bg-[url('https://websitedemos.net/love-nature-02/wp-content/uploads/sites/988/2021/11/header-hero-1.jpg')]  h-screen bg-cover bg-center  ">
      <div className="absolute  inset-x-0 text-center top-[10%] w-[40%] m-auto ">
        <h1 className="text-3xl text-white font-bold pb-4 mt-4">Shop page</h1>
        <ul className="grid gap-3 lg:grid-cols-2">
          {shopsArr.map((shopObj) => (
            <li
              key={shopObj.id}
              className={`bg-slate-200 flex gap-2 py-4 lg:w-96  ${isMine(
                shopObj.userUid,
                ctx.userUid
              )}`}
            >
              <img
                className="pl-4 w-32 h-32 object-cover  "
                src={shopObj.imageUrl}
                alt={shopObj.shopName}
              />
              <div className="m-auto">
                <h2 className="font-bold text-2xl uppercase">
                  {shopObj.shopName}
                </h2>
                <p>{shopObj.town}</p>
                <p> {shopObj.description.slice(0, 25)}</p>

                <button
                  onClick={() => {
                    navigate(`/shop/${shopObj.id}`);
                  }}
                  className=" text-sm rounded-md px-4 py-2 m-2 w-32 bg-[#ffd936] text-[#536942]"
                >
                  Visit Page
                </button>
                {shopObj.userUid === ctx.userUid && (
                  <button
                    onClick={() => deleteFire(shopObj.id)}
                    className="text-sm rounded-md px-4 py-2  w-32 bg-[#536942] text-[#ffd936]"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
