import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";

const useBestProductDB = () => {
  const bestProductDB = async (sortCount, setBestProduct) => {
    const res = await axios.post(POST.BESTPRODUCT, {
      bestSeller: sortCount[0]?.name,
    });
    setBestProduct(res.data);
  };
  return { bestProductDB };
};
export default useBestProductDB;
