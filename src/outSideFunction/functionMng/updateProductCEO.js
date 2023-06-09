import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { JWT } from "../../constans/jwtToken";
import { contextApi } from "../../contextApi";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import useWhatTypeTheProductment from "../whatTypeTheProduct/whatTypeTheProduct";

const useUpdateProduct = () => {
  const { whatTypeTheProduct } = useWhatTypeTheProductment();
  const valContext = useContext(contextApi);
  const nav = useNavigate();
  const updateProduct = async (product) => {
    const token = Cookies.get(JWT.TOKEN);
    const res = await axios.post(
      POST.UPDATE_PRODUCT_CEO,
      {
        ceoID: valContext.userData._id,
        product: product,
      },
      {
        headers: {
          authorization: `${JWT.BEARER} ${token}`,
        },
      }
    );
    if (res.data.msg === "update product suc") {
      alert(res.data.msg);
      Cookies.set(JWT.TOKEN, res.data.token, { expires: 30 / (24 * 60) });
      whatTypeTheProduct(product.type);
    } else if (
      res.data === "Failed to authenticate token" ||
      res.data === "No token provided"
    ) {
      alert(res.data);
      Cookies.remove(JWT.TOKEN);
      nav("/");
    } else {
      alert(res.data);
    }
  };
  return { updateProduct };
};
export default useUpdateProduct;
