import { GET } from "../../../constans/hardCoded/app/AxiosGetOnStart";
import axios from "../../../axiosConfig";
export const getNecklaces = async (setNecklaceProducts) => {
  const resNecklace = await axios.get(GET.ALLNECKLACES);
  const dataNecklace = resNecklace.data;
  setNecklaceProducts(dataNecklace);
};
