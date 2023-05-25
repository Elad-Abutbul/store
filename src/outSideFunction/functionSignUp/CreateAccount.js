import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { RANKSUSER } from "../../constans/RanksUser";
import { ROUTES } from "../../constans/Routes";

const useCreateAccount = () => {
  const rank = RANKSUSER.USER;
  const createAccount = async (name, lastName, userName, password, nav) => {
    try {
      const res = await axios.post(POST.CREATEUSERS, {
        name: name,
        lastName: lastName,
        userName: userName,
        password: password,
        rank: rank,
      });
      const data = res.data;
      if (data === "UserName exists") {
        alert(data);
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
