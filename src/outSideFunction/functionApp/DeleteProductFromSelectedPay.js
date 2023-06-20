import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { JWT } from "../../constans/jwtToken";
import { ROUTES } from "../../constans/Routes";
import { POST } from "../../constans/AxiosPost";
const useDeleteProductFromPay = () => {
  const deleteProduct = async (
    valProduct,
    indexProduct,
    userData,
    selectedIteamToPay,
    setSelectedIteamToPay
  ) => {
    try {
      const token = Cookies.get(JWT.TOKEN);
      const res = await axios.post(
        POST.PRODUCT_CHOOSE_TO_FALSE,
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
      if (data === "product choose switch to false") {
        valProduct.choose = false;
        setSelectedIteamToPay([...selectedIteamToPay]);
      } else {
        alert(data);
        window.location.href = ROUTES.ENTRY;
        Cookies.remove(JWT.TOKEN);
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
