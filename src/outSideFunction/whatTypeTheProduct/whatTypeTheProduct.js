import { useContext } from "react";
import { contextApi } from "../../contextApi";
import { getRing } from "../functionApp/getSpecificProducts/getRings";
import { getBraclets } from "../functionApp/getSpecificProducts/getBraclets";
import { getNecklaces } from "../functionApp/getSpecificProducts/getNecklaces";
import { getEarrings } from "../functionApp/getSpecificProducts/getEarrings";
const useWhatTypeTheProductment = () => {
  const valContext = useContext(contextApi);
  const whatTypeTheProduct = async (type) => {
    if (type === "ring") {
      getRing(valContext.setRingProducts);
    } else if (type === "bracelet") {
      getBraclets(valContext.setBraceletProducts);
    } else if (type === "necklace") {
      getNecklaces(valContext.setNecklaceProducts);
    } else if (type === "earring") {
      getEarrings(valContext.setEarringProducts);
    }
  };

  return { whatTypeTheProduct };
};
export default useWhatTypeTheProductment;
