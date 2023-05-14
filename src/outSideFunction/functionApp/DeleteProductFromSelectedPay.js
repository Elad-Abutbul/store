import axios from "../../axiosConfig";
const useDeleteProductFromPay = () => {
  const deleteProduct = async (
    valProduct,
    indexProduct,
    userData,
    selectedIteamToPay,
    setSelectedIteamToPay
  ) => {
    try {
      const res = await axios.post("/productChooseToFalse", {
        indexProduct: indexProduct,
        userId: userData._id,
      });
      const data = await res.data;
      if ("product choose switch to false") {
        valProduct.choose = false;
        selectedIteamToPay.splice(indexProduct, 1);
        setSelectedIteamToPay([...selectedIteamToPay]);
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    deleteProduct,
  };
};
export default useDeleteProductFromPay;
