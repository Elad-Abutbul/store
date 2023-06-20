import { GET } from "../../../constans/hardCoded/app/AxiosGetOnStart";
import axios from "../../../axiosConfig";
export const getEarrings = async (setEarringProducts) => {
  const resEarring = await axios.get(GET.ALLEARIINGS);
  const dataEarring = resEarring.data;
  setEarringProducts(dataEarring);
};
