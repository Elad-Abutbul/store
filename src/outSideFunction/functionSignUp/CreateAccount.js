import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { RANKSUSER } from "../../constans/RanksUser";
import { ROUTES } from "../../constans/Routes";
import { useContext } from "react";
import { contextApi } from "../../contextApi";
import useRemoveFromDeleteList from "../functionMng/removeUserFromDeleteList";

const useCreateAccount = () => {
  const rank = RANKSUSER.USER;
  const { removeFromDeleteList } = useRemoveFromDeleteList();

  const nav = useNavigate();
  const valContext = useContext(contextApi);
  const createAccount = async (valUser) => {
    try {
      debugger;
      const res = await axios.post(POST.CREATEUSERS, {
        name: valUser.name,
        lastName: valUser.lastName,
        userName: valUser.userName,
        password: valUser.password,
        rank: rank,
        historyOfCart: valUser.historyOfCart,
        cart: valUser.cart,
        city: valUser.city,
        ceoId: valContext.userData._id,
      });
      if (res.data === "UserName exists") {
        alert(res.data);
      } else {
        if (valContext.userData.rank !== "ceo") {
          nav(ROUTES.ENTRY);
        } else {
          removeFromDeleteList(valUser);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { createAccount };
};
export default useCreateAccount;
