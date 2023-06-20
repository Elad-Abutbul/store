import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { JWT } from "../../constans/jwtToken";
import { useContext } from "react";
import { contextApi } from "../../contextApi";
import { useNavigate } from "react-router-dom";

const useCheckNameExixt = () => {
  const valContext = useContext(contextApi);
  const nav = useNavigate();
  const chceckIfNameExixt = async (name, productId) => {

    const token = Cookies.get(JWT.TOKEN);
    const res = await axios.post(
      POST.IF_NAME_EXIXT_PRODUCT,
      {
        nameProduct: name,
        ceoId: valContext.userData?._id,
        productId: productId,
      },
      {
        headers: {
          authorization: `${JWT.BEARER} ${token}`,
        },
      }
    );
    if (
      res.data === "Failed to authenticate token" ||
      res.data === "No token provided"
    ) {
      alert("pls log in");
      return nav("/");
    } else {
      if (res.data.msg === "Name Of The Product Exixt") {
        return true;
      } else {
        Cookies.set(JWT.TOKEN, res.data.token, { expires: 30 / (24 * 60) });
        return false;
      }
    }
  };

  return { chceckIfNameExixt };
};

export default useCheckNameExixt;
