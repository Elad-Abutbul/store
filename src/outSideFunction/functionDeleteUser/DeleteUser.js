import { useContext, useState } from "react";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { ROUTES } from "../../constans/Routes";
import { contextApi } from "../../contextApi";
import { JWT } from "../../constans/jwtToken";
import Cookies from "js-cookie";

const useDeleteUser = () => {
  const valContext = useContext(contextApi);
  const [userName, setUserName] = useState("");
  const deleteUser = async (valUserName, nav) => {
    try {
      const token = Cookies.get(JWT.TOKEN); // Use cookies.get to retrieve the token
      const res = await axios.post(
        POST.DELETEUSER,
        {
          userName: userName,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      if (data === "delete the user") {
        alert(data);
        if (nav !== undefined) {
          valContext.userDisconnect();
          Cookies.remove(JWT.TOKEN);
          nav(ROUTES.ENTRY);
        } else {
          valContext.deleteFromRankUser(valUserName);
          setUserName("");
        }
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while deleting the user");
    }
  };

  return { deleteUser, userName, setUserName };
};
export default useDeleteUser;
