import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { JWT } from "../../constans/jwtToken";
import { contextApi } from "../../contextApi";
import { useContext } from "react";
import { getRing } from "../functionApp/getSpecificProducts/getRings";
import { getBraclets } from "../functionApp/getSpecificProducts/getBraclets";
import { getNecklaces } from "../functionApp/getSpecificProducts/getNecklaces";
import { getEarrings } from "../functionApp/getSpecificProducts/getEarrings";
import { useNavigate } from "react-router-dom";
const useUpdateProduct = () => {
  const valContext = useContext(contextApi);
  useNavigate();
  const updateProduct = async (product) => {
    debugger;
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
    debugger;
    if (res.data.msg === "update product suc") {
      alert(res.data.msg);
      Cookies.set(JWT.TOKEN, res.data.token, { expires: 30 / (24 * 60) });
      if (product.type === "ring") {
        getRing(valContext.setRingProducts);
      } else if (product.type === "bracelet") {
        getBraclets(valContext.setBraceletProducts);
      } else if (product.type === "necklace") {
        getNecklaces(valContext.setNecklaceProducts);
      } else if (product.type === "earring") {
        getEarrings(valContext.setEarringProducts);
      }
    } else {
      alert(res.data);
    }
  };
  return { updateProduct };
};
export default useUpdateProduct;
