import { useState } from "react";
import axios from "../axiosConfig";
const useAddProductToPay = () => {
  const [selectedIteamToPay, setSelectedIteamToPay] = useState([]);
  const addProduct = async (valProduct, indexProduct,userData) => {
    try {
      const res = await axios.post("/productChooseToTrue", {
        indexProduct: indexProduct,
        userId: userData._id,
      });
      const data = await res.data;
      if (data === "product choose switch to true") {
        valProduct.choose = true;
        selectedIteamToPay.push(valProduct);
        setSelectedIteamToPay([...selectedIteamToPay]);
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error);
    }
     };
     return {
          selectedIteamToPay,setSelectedIteamToPay,addProduct
     }
};
export default useAddProductToPay;
