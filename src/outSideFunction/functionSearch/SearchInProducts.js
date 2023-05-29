import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { ROUTES } from "../../constans/Routes";
import { JWT } from "../../constans/jwtToken";

const useSearch = () => {
  const search = async (req, setProducts) => {
    const token = Cookies.get(JWT.TOKEN);
    if (req !== "") {
      const res = await axios.post(
        POST.SEARCH,
        {
          getItem: req,
        },
        {
          headers: {
            authorization: `${JWT.BEARER} ${token}`,
          },
        }
      );
      const data = res.data;
      if (
        data === "No token provided" ||
        data === "Failed to authenticate token"
      ) {
        alert(data);
        window.location.href = ROUTES.ENTRY;
        return Cookies.remove(JWT.TOKEN);
      }
      setProducts(data);
    } else {
      setProducts([]);
    }
  };
  return { search };
};
export default useSearch;
