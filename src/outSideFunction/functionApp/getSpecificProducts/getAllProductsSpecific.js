import { GET } from "../../../constans/hardCoded/app/AxiosGetOnStart";
import axios from "../../../axiosConfig";
export const getAllProductsSpecific = async (setAllProducts) => {
  const resAllProduct = await axios.get(GET.GETALLPRODUCTS);
  const dataAllProducts = resAllProduct.data;
  setAllProducts(dataAllProducts);
};
