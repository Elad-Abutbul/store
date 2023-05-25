import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";

const useAddToCart = () => {
  const addToCartFunc = async (productId, valContext, valProduct) => {
    const res = await axios.post(POST.ADDTOCART, {
      productId: productId,
      userNameId: valContext.userData._id,
    });
    const data = res.data;
    if (data === "Product added to cart!") {
      valContext.addToCart(valProduct);
    } else {
      alert("Cannot added to cart");
    }
  };
  return { addToCartFunc };
};
export default useAddToCart;
