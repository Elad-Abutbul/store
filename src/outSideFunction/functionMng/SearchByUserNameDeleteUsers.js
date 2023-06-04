import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { JWT } from "../../constans/jwtToken";

const useSearchByUserNameDelete = () => {
  const searchByUserNameDelete = async (userName, setSearch) => {
    const token = Cookies.get(JWT.TOKEN);
    if (userName !== "") {
      const res = await axios.post(
        POST.SEARCH_BY_USERNAME_DELET_MNG,
        {
          userName: userName,
        },
        {
          headers: {
            authorization: `${JWT.BEARER} ${token}`,
          },
        }
      );
      if (res.data.msg === "search complete") {
        setSearch(res.data.users);
      }
    } else {
      setSearch([]);
    }
  };

  return { searchByUserNameDelete };
};
export default useSearchByUserNameDelete;
