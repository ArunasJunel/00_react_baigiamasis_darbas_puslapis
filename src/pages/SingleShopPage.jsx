import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase/firebase";

export default function SingleShopPage() {
  const params = useParams();
  const [currentShopObj, setCurrentShopObj] = useState({});

  useEffect(() => {
    async function getSingleDocumentFromFirebase() {
      const docRef = doc(db, "shops", params.shopId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCurrentShopObj(docSnap.data());
      } else {
        console.warn("No such document!");
      }
    }
    getSingleDocumentFromFirebase();
  }, [params.shopId]);

  return (
    <div className="bg-[url('https://websitedemos.net/love-nature-02/wp-content/uploads/sites/988/2021/11/contact-hero.jpg')]  h-screen bg-cover bg-center  ">
      <div className=" absolute  inset-x-0 text-center top-[10%]  w-[80%]  m-auto ">
        <h2 className="text-3xl text-white font-bold pb-4 mt-4">
          Single Shop Page
        </h2>
        <img
          className="m-auto h-80 w-80 "
          src={currentShopObj.imageUrl}
          alt={currentShopObj.shopName}
        />
        <div className="backdrop-brightness-75 w-80 m-auto">
          <h2 className="text-white py-8 text-4xl font-semibold uppercase">
            {currentShopObj.shopName}
          </h2>
          <p className="text-2xl text-white pb-4">
            First Shop in:{" "}
            <span className="font-bold uppercase underline">
              {currentShopObj.town}
            </span>
          </p>
          <p className="text-2xl text-white pb-4">
            Founded In:{" "}
            <span className="font-bold ">{currentShopObj.startYear}</span>{" "}
          </p>
          <p className="text-white text-lg pb-4">
            {currentShopObj.description}
          </p>
        </div>
      </div>
    </div>
  );
}
