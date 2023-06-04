import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { JWT } from "../../constans/jwtToken";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constans/Routes";
const useDeleteItem = () => {
  const nav = useNavigate();
  const deleteItem = async (
    valContext,
    productId,
    valProduct,
    indexProduct
  ) => {
    try {
      const token = Cookies.get(JWT.TOKEN);
      const res = await axios.post(
        POST.DELETEITEAMS,
        {
          productId: productId,
          userNameId: valContext.userData._id,
        },
        {
          headers: {
            authorization: `${JWT.BEARER} ${token}`,
          },
        }
      );
      const data = res.data;
      if (data.msg === "Product deleted from cart") {
        alert(data.msg);
        valContext.deleteProductFromSelectedIteamToPay(
          valProduct,
          indexProduct
        );
        valContext.deleteFromCart(indexProduct);
        Cookies.set(JWT.TOKEN, data.token, { expires: 30 / (24 * 60) });
      } else {
        alert(data);
        Cookies.remove(JWT.TOKEN);
        nav(ROUTES.ENTRY);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { deleteItem };
};
export default useDeleteItem;
