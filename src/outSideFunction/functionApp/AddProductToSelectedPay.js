import axios from "../../axiosConfig";
const useAddProductToPay = () => {
  const addProduct = async (
    valProduct,
    indexProduct,
    userData,
    selectedIteamToPay,
    setSelectedIteamToPay
  ) => {
    try {
      const res = await axios.post("/productChooseToTrue", {
        indexProduct: indexProduct,
        userId: userData._id,
      });
      const data = res.data;
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
    addProduct,
  };
};
export default useAddProductToPay;
