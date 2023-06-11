import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { JWT } from "../../constans/jwtToken";
import { useContext } from "react";
import { contextApi } from "../../contextApi";
import { getRing } from "../functionApp/getSpecificProducts/getRings";
import { getBraclets } from "../functionApp/getSpecificProducts/getBraclets";
import { getNecklaces } from "../functionApp/getSpecificProducts/getNecklaces";
import { getEarrings } from "../functionApp/getSpecificProducts/getEarrings";

const useAddProductToDB = () => {
  const valContext = useContext(contextApi);
  const addProductToDB = async (
    name,
    desc,
    linkImg,
    type,
    price,
    setShowAddProduct
  ) => {
    const token = Cookies.get(JWT.TOKEN);
    try {
      const res = await axios.post(
        POST.ADDPRODUCT,
        {
          name: name,
          description: desc,
          linkImg: linkImg,
          price: price,
          type: type,
          ceoId: valContext.userData?._id,
        },
        {
          headers: {
            authorization: `${JWT.BEARER} ${token}`,
          },
        }
      );
      if (res.data.msg === "product add to collection") {
        alert(res.data.msg);
        Cookies.set(JWT.TOKEN, res.data.token, { expires: 30 / (24 * 60) });
        if (type === "ring") {
          getRing(valContext.setRingProducts);
        } else if (type === "bracelet") {
          getBraclets(valContext.setBraceletProducts);
        } else if (type === "necklace") {
          getNecklaces(valContext.setNecklaceProducts);
        } else if (type === "earring") {
          getEarrings(valContext.setEarringProducts);
        }
        setShowAddProduct && setShowAddProduct(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { addProductToDB };
};
export default useAddProductToDB;
