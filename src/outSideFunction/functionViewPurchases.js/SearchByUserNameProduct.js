import { useContext } from "react";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { contextApi } from "../../contextApi";
import { JWT } from "../../constans/jwtToken";
import { ROUTES } from "../../constans/Routes";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useSearchByNameProduct = () => {
  const valContext = useContext(contextApi);
  const nav = useNavigate();
  const searchByNameProduct = async (name, setProducts) => {
    const token = Cookies.get(JWT.TOKEN);
    if (name !== "") {
      try {
        const res = await axios.post(
          POST.SEACH_BY_NAME,
          {
            getItem: name,
            userId: valContext.userData._id,
          },
          {
            headers: {
              authorization: `${JWT.BEARER} ${token}`,
            },
          }
        );
        if (res.data.msg === "search complete") setProducts(res.data.products);
        else {
          alert("please log in");
          Cookies.remove(JWT.TOKEN);
          nav(ROUTES.ENTRY);
        }
      } catch (error) {
        alert(error);
      }
    } else {
      setProducts([]);
    }
  };

  return { searchByNameProduct };
};
export default useSearchByNameProduct;
