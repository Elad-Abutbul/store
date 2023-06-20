import { useContext } from "react";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { ROUTES } from "../../constans/Routes";
import { contextApi } from "../../contextApi";
import { JWT } from "../../constans/jwtToken";
import Cookies from "js-cookie";
import { RANKSUSER } from "../../constans/RanksUser";

const useDeleteUser = () => {
  const valContext = useContext(contextApi);

  const deleteUser = async (valUser, nav) => {
    try {
      const token = Cookies.get(JWT.TOKEN);

      const res = await axios.post(
        POST.DELETEUSER,
        {
          userName: valUser.userName,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      if (data.msg === "delete the user") {
        alert(data.msg);
        if (nav !== undefined) {
          valContext.userDisconnect();
          Cookies.remove(JWT.TOKEN);
          nav(ROUTES.ENTRY);
        } else {
          valContext.deleteFromRankUser(valUser.userName);
          Cookies.set(JWT.TOKEN, data.token, { expires: 30 / (24 * 60) });
          if (valContext.userData.rank === RANKSUSER.CEO) {
            valContext.addToListOfDeletingUsersMng(valUser);
          }
        }
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while deleting the user");
    }
  };

  return { deleteUser };
};
export default useDeleteUser;
