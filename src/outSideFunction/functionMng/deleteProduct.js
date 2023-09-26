import { useContext } from "react";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { contextApi } from "../../contextApi";
import Cookies from "js-cookie";
import { JWT } from "../../constans/jwtToken";
import useWhatTypeTheProductment from "../whatTypeTheProduct/whatTypeTheProduct";
const useDeleteProduct = () => {
  const { whatTypeTheProduct } = useWhatTypeTheProductment();
  const valContext = useContext(contextApi);
  const deleteTheProduct = async (valProduct) => {
    const token = Cookies.get(JWT.TOKEN);
    try {
      const res = await axios.post(
        POST.DELETEPRODUCT,
        {
          productId: valProduct?._id,
          ceoId: valContext.userData?._id,
        },
        {
          headers: {
            authorization: `${JWT.BEARER} ${token}`,
          },
        }
      );
      if (res.data.msg === "product deleted") {
        alert(res.data.msg);
        valContext.setUserData(res.data.findUser);
        Cookies.set(JWT.TOKEN, res.data.token, { expires: 30 / (24 * 60) });
        whatTypeTheProduct(valProduct.type);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteTheProduct };
};
export default useDeleteProduct;
