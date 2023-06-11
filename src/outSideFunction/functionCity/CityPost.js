import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { JWT } from "../../constans/jwtToken";
import { useContext } from "react";
import { contextApi } from "../../contextApi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constans/Routes";
const useCity = () => {
  const valContext = useContext(contextApi);
  const nav = useNavigate();
  const cityPost = async (setShowChooseCity) => {
    const token = Cookies.get(JWT.TOKEN);
    const res = await axios.post(
      POST.CITY,
      {
        city: valContext.selectCity,
        userId: valContext.userData?._id,
      },
      {
        headers: {
          authorization: `${JWT.BEARER} ${token}`,
        },
      }
    );
    if (res.data.msg === "complete") {
      alert(res.data.msg);
      valContext.pushCityToUserData(valContext.selectCity);
      setShowChooseCity(false);
      Cookies.set(JWT.TOKEN, res.data.token, { expires: 10 / (24 * 60) });
    } else {
      alert(res.data);
      nav(ROUTES.ENTRY);
      Cookies.remove(JWT.TOKEN);
    }
  };

  return { cityPost };
};
export default useCity;
