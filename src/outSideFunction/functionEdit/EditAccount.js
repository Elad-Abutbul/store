import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { useContext } from "react";
import { contextApi } from "../../contextApi";
import Cookies from "js-cookie";
import { JWT } from "../../constans/jwtToken";

const useEditAccount = () => {
  const nav = useNavigate();
  const valContext = useContext(contextApi);
  const editAccount = async (name, lastName, userName, password) => {
    const token = Cookies.get(JWT.TOKEN);
    try {
      debugger
      const res = await axios.post(
        POST.EDITACCOUNT,
        {
          userId: valContext.userData._id,
          name: name,
          lastName: lastName,
          userName: userName,
          password: password,
          city: valContext.selectCity,
        },
        {
          headers: {
            authorization: `${JWT.BEARER} ${token}`,
          },
        }
      );
      debugger
      const data = res.data;
      if (data === "Username already exists") {
        alert(data);
      } else {
        alert("Edit complete");
        nav("/");
        valContext.userDisconnect();
        Cookies.remove(JWT.TOKEN);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { editAccount };
};
export default useEditAccount;
