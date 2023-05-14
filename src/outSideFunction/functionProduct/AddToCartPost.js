import axios from '../../axiosConfig'
import { POST } from '../../constans/AxiosPost';

const useAddToCart = () => {
  const addToCartFunc = async(productId,valContext,valProduct) => {
    const res = await axios.post(POST.ADDTOCART, {
    productId: productId,
    userNameId: valContext.userData._id,
  });
  const data = await res.data;
  if (data === "product added to cart!") {
    valContext.addToCart(valProduct);
  } else {
    console.log("cannot added to cart");
  }
  }
    return {addToCartFunc}
};
export default useAddToCart;
