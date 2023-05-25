import { useContext, useState } from "react";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { ROUTES } from "../../constans/Routes";
import { contextApi } from "../../contextApi";

const useDeleteUser = () => {
  const valContext = useContext(contextApi);
  const [userName, setUserName] = useState("");
  debugger;
  const deleteUser = async (valUserName, nav) => {
    try {
      const res = await axios.post(POST.DELETEUSER, {
        userName: userName,
      });
      const data = res.data;
      if (data === "delete the user") {
        alert(data);
        if (nav !== undefined) {
          valContext.userDisconnect();
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
    }
  };

  return { deleteUser, userName, setUserName };
};
export default useDeleteUser;
