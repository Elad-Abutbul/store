import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";

const useSearchByUserName = () => {
  const searchByUserName = async (userName, setSearch) => {
    if (userName !== "") {
      debugger;
      const res = await axios.post(POST.SEARCH_BY_USERNAME, {
        userName: userName,
      });
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
