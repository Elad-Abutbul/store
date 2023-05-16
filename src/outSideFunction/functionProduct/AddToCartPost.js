import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";

const useAddToCart = () => {
  const addToCartFunc = async (productId, valContext, valProduct) => {
    debugger

    const res = await axios.post(POST.ADDTOCART, {
      productId: productId,
      userNameId: valContext.userData._id,
    });
    debugger

    const data = await res.data;
    if (data === "product added to cart!") {
      valContext.addToCart(valProduct);
    } else {
      console.log("cannot added to cart");
    }
  };
  return { addToCartFunc };
};
export default useAddToCart;
