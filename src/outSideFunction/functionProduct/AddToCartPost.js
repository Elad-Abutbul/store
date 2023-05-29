import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constans/Routes";
import { JWT } from "../../constans/jwtToken";

const useAddToCart = () => {
  const nav = useNavigate();
  const addToCartFunc = async (productId, valContext, valProduct) => {
    const token = Cookies.get(JWT.TOKEN);
    try {
      const res = await axios.post(
        POST.ADDTOCART,
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
      if (data.msg === "Product added to cart!") {
        valContext.addToCart(valProduct);
        Cookies.set(JWT.TOKEN, data.token, { expires: 10 / (24 * 60) });
      } else {
        alert("Cannot added to cart");
        Cookies.remove(JWT.TOKEN);
        nav(ROUTES.ENTRY);
      }
    } catch (error) {
      alert(error);
    }
  };
  return { addToCartFunc };
};
export default useAddToCart;
