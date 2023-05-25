import { useContext } from "react";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { contextApi } from "../../contextApi";

const useSearchByNameProduct = () => {
  const valContext = useContext(contextApi);
  const searchByNameProduct = async (name, setProducts) => {
    if (name !== "") {
      try {
        const res = await axios.post(POST.SEACH_BY_NAME, {
          getItem: name,
          userId: valContext.userData._id,
        });
        if (res.data.msg === "search complete") setProducts(res.data.products);
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
