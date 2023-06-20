import Cookies from "js-cookie";
import { JWT } from "../../constans/jwtToken";
import { POST } from "../../constans/AxiosPost";
import axios from "../../axiosConfig";
import { useContext } from "react";
import { contextApi } from "../../contextApi";

const useSearchInDeleteProductList = () => {
  const valContext = useContext(contextApi);
  const searchInDeleteProductList = async (productName, setFilterProduct) => {
    const token = Cookies.get(JWT.TOKEN);
    const res = await axios.post(
      POST.SEARCH_IN_DELETE_PRODUCT_LIST,
      {
        productName: productName,
        ceoId: valContext.userData._id,
      },
      {
        headers: {
          authorization: `${JWT.BEARER} ${token}`,
        },
      }
    );
    if (res.data.msg === "search complete") {
      setFilterProduct(res.data.products);
      Cookies.set(JWT.TOKEN, res.data.token, { expires: 30 / (24 * 60) });
    }
  };

  return { searchInDeleteProductList };
};
export default useSearchInDeleteProductList;
