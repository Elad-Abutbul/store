import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { JWT } from "../../constans/jwtToken";
import { POST } from "../../constans/AxiosPost";
const useProductChooseToFalse = () => {
  const token = Cookies.get(JWT.TOKEN);

  const productChooseToFalse = async (
    valProduct,
    indexProduct,
    deleteProductFromSelectedIteamUi,
    userData
  ) => {
    try {
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
      const data = await res.data;
      if ("product choose switch to false") {
        valProduct.choose = false;
        deleteProductFromSelectedIteamUi(indexProduct, valProduct);
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { productChooseToFalse };
};
export default useProductChooseToFalse;
