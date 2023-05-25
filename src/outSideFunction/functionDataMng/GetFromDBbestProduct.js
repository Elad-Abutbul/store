import axios from "../../axiosConfig";

const useBestProductDB = () => {
  const bestProductDB = async (sortCount,setBestProduct) => {
    const res = await axios.post("/bestProduct", {
      bestSeller: sortCount[0].name,
    });
    setBestProduct(res.data);
  };
  return { bestProductDB };
};
export default useBestProductDB;
