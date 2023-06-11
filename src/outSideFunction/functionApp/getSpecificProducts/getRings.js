import { GET } from "../../../constans/hardCoded/app/AxiosGetOnStart";
import axios from "../../../axiosConfig";
export const getRing = async (setRingProducts) => {
  const resRing = await axios.get(GET.ALLRINGS);
  const dataRing = resRing.data;
  setRingProducts(dataRing);
};
