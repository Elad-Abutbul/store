import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";

const useSearch = () => {
  const search = async (req, setProducts) => {
    if (req !== "") {
      const res = await axios.post(POST.SEARCH, {
        getItem: req,
      });
      const data = res.data;
      setProducts(data);
    } else {
      setProducts([]);
    }
  };
  return { search };
};
export default useSearch;
