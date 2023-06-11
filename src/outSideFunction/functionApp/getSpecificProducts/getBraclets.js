import { GET } from "../../../constans/hardCoded/app/AxiosGetOnStart";
import axios from "../../../axiosConfig";
export const getBraclets = async (setBraceletProducts) => {
  const resBracelet = await axios.get(GET.ALLBRACELETS);
  const dataBracelet = resBracelet.data;
  setBraceletProducts(dataBracelet);
};
