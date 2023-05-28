import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { RANKSUSER } from "../../constans/RanksUser";
import { ROUTES } from "../../constans/Routes";

const useCreateAccount = () => {
  const rank = RANKSUSER.USER;
  const nav = useNavigate();

  const createAccount = async (name, lastName, userName, password) => {
    try {
      const res = await axios.post(POST.CREATEUSERS, {
        name: name,
        lastName: lastName,
        userName: userName,
        password: password,
        rank: rank,
      });
      if (res.data === "UserName exists") {
        alert(res.data);
      } else {
        nav(ROUTES.ENTRY);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { createAccount };
};
export default useCreateAccount;
