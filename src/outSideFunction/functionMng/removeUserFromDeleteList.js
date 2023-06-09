import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { JWT } from "../../constans/jwtToken";
import { useContext } from "react";
import { contextApi } from "../../contextApi";
import { useNavigate } from "react-router-dom";

const useRemoveFromDeleteList = () => {
  const valContext = useContext(contextApi);
  const nav = useNavigate();
  const removeFromDeleteList = async (valUser) => {
    const token = Cookies.get(JWT.TOKEN);
    const res = await axios.post(
      POST.REMOVE_FROM_DELETE_LIST,
      {
        userName: valUser.userName,
      },
      {
        headers: {
          authorization: `${JWT.BEARER} ${token}`,
        },
      }
    );
    if (res.data.msg === "User Recovered") {
      alert(res.data.msg);
      valContext.getAllUserRank();
      valContext.deleteFromListOfDeletingUsersMng(valUser.userName);
      valContext.setUserData(res.data.userData);
      valContext.addToRankUser(
        valUser.name,
        valUser.lastName,
        valUser.userName,
        valUser.password,
        valUser.rank,
        valUser.city,
        valUser.cart,
        valUser.historyOfCart
      );
      Cookies.set(JWT.TOKEN, res.data.token, { expires: 30 / (24 * 60) });
    } else {
      Cookies.remove(JWT.TOKEN);
      nav("/");
    }
  };

  return { removeFromDeleteList };
};
export default useRemoveFromDeleteList;
