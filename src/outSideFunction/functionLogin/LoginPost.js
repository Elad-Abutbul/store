import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { ROUTES } from "../../constans/Routes";
import { useContext } from "react";
import { contextApi } from "../../contextApi";
import Cookies from "js-cookie";
import { JWT } from "../../constans/jwtToken";

const useLogin = () => {
  const nav = useNavigate();
  const valContext = useContext(contextApi);
  const loginPost = async (userName, password) => {
    try {
      const res = await axios.post(POST.LOGIN, {
        userName: userName,
        password: password,
      });
      const data = res.data;
      if (data.msg === "success") {
        nav(`${ROUTES.ELADJEWELRY}/${ROUTES.PRODUCTS}`);
        valContext.userConnect(data.user);
        Cookies.set(JWT.TOKEN, data.token, { expires: 30 / (24 * 60) }); // Set the expiration time to 30 minutes
      } else {
        alert(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { loginPost };
};
export default useLogin;
