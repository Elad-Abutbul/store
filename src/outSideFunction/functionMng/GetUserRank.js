import { useState } from "react";
import axios from "../../axiosConfig";

const useRankUser = () => {
  const [rankUser, setRankUser] = useState([]);
  const getAllUserRank = async () => {
    try {
      const res = await axios.get("/allRankUser");
      const data = res.data;
      setRankUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllUserRank, rankUser, setRankUser };
};
export default useRankUser;
