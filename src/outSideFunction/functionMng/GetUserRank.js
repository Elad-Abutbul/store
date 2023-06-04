import { useState } from "react";
import axios from "../../axiosConfig";
import { GET } from "../../constans/hardCoded/app/AxiosGetOnStart";

const useRankUser = () => {
  const [rankUser, setRankUser] = useState([]);
  const getAllUserRank = async () => {
    try {
      const res = await axios.get(GET.ALLRANKUSER);
      if (res.data?.length === 0) {
        setRankUser([]);
      } else {
        setRankUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllUserRank, rankUser, setRankUser };
};
export default useRankUser;
