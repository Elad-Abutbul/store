import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { JWT } from "../../constans/jwtToken";

const useBestProductDB = () => {
  const bestProductDB = async (sortCount, setBestProduct) => {
    try {
      const token = Cookies.get(JWT.TOKEN);
      if (sortCount?.length !== 0) {
        const res = await axios.post(
          POST.BESTPRODUCT,
          {
            bestSeller: sortCount[0]?.name,
          },
          {
            headers: {
              authorization: `${JWT.BEARER} ${token}`,
            },
          }
        );
        setBestProduct(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { bestProductDB };
};
export default useBestProductDB;
