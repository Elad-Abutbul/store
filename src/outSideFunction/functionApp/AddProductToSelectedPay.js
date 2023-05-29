import axios from "../../axiosConfig";
import { PRODUCT } from "../../constans/hardCoded/product/ProductHardCoded";
import { JWT } from "../../constans/jwtToken";
import Cookies from "js-cookie";
import { ROUTES } from "../../constans/Routes";
const useAddProductToPay = () => {
  const addProduct = async (
    valProduct,
    indexProduct,
    userData,
    selectedIteamToPay,
    setSelectedIteamToPay
  ) => {
    try {
      const token = Cookies.get(JWT.TOKEN);
      debugger
      const res = await axios.post(
        PRODUCT.PRODUCT_CHOOSE_TO_TRUE,
        {
          indexProduct: indexProduct,
          userId: userData._id,
        },
        {
          headers: {
            authorization: `${JWT.BEARER} ${token}`,
          },
        }
      );
      const data = res.data;
      debugger
      if (data === "product choose switch to true") {
        valProduct.choose = true;
        selectedIteamToPay.push(valProduct);
        setSelectedIteamToPay([...selectedIteamToPay]);
      } else {
        alert(data);
        window.location.headers = ROUTES.ENTRY;
        Cookies.remove(JWT.TOKEN);
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
