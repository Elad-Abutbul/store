import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { JWT } from "../../constans/jwtToken";

const useSearchByUserName = () => {
  const searchByUserName = async (userName, setSearch) => {
    const token = Cookies.get(JWT.TOKEN);
    if (userName !== "") {
      const res = await axios.post(
        POST.SEARCH_BY_USERNAME_MNG,
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

  return { searchByUserName };
};
export default useSearchByUserName;
