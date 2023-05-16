import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";

const useDeleteItem = () => {
  const deleteItem = async (
    valContext,
    productId,
    valProduct,
    indexProduct
  ) => {
    try {
      const res = await axios.post(POST.DELETEITEAMS, {
        productId: productId,
        userNameId: valContext.userData._id,
      });
      const data = res.data;
      if (data === "Product deleted from cart") {
        alert(data);
        valContext.deleteProductFromSelectedIteamToPay(
          valProduct,
          indexProduct
        );
        valContext.deleteFromCart(indexProduct);
      } else {
        alert(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { deleteItem };
};
export default useDeleteItem;
