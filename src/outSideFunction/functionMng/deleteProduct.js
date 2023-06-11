import { useContext } from "react";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { contextApi } from "../../contextApi";
import Cookies from "js-cookie";
import { getRing } from "../functionApp/getSpecificProducts/getRings";
import { getBraclets } from "../functionApp/getSpecificProducts/getBraclets";
import { getNecklaces } from "../functionApp/getSpecificProducts/getNecklaces";
import { getEarrings } from "../functionApp/getSpecificProducts/getEarrings";
import { JWT } from "../../constans/jwtToken";
const useDeleteProduct = () => {
  const valContext = useContext(contextApi);
  const deleteTheProduct = async (valProduct) => {
    debugger;
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
        if (valProduct.type === "ring") {
          getRing(valContext.setRingProducts);
        } else if (valProduct.type === "bracelet") {
          getBraclets(valContext.setBraceletProducts);
        } else if (valContext.type === "necklace") {
          getNecklaces(valContext.setNecklaceProducts);
        } else if (valContext.type === "earring") {
          getEarrings(valContext.setEarringProducts);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteTheProduct };
};
export default useDeleteProduct;
