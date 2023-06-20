import { GET } from "../../constans/hardCoded/app/AxiosGetOnStart";
import axios from "../../axiosConfig";
const useSumPurchases = () => {
  const getSumPurchases = async (setSumAllPurchases) => {
    try {
      const res = await axios.get(GET.GETSUM);
      if (res.data[0]?.totalSum !== undefined) {
        setSumAllPurchases(res.data[0].totalSum);
      }
    } catch (error) {
      alert(error);
    }
  };
  return {
    getSumPurchases,
  };
};
export default useSumPurchases;
