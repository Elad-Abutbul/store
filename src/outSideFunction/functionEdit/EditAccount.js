
   

   

import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { ROUTES } from "../../constans/Routes";

const useEditAccount = () => {
  const editAccount = async (valContext,name,lastName,userName,password,nav) => {
     const userData = {
          userId: valContext.userData._id,
          name: name,
          lastName: lastName,
          userName: userName,
          password: password,
        };
        try {
          const res = await axios.post(POST.EDITACCOUNT, {
            userData: userData,
          });
          const data = res.data;
          if (data === "Username already exists") {
            alert(data);
          } else {
            alert("Edit complete");
            nav(ROUTES.ENTRY);
            valContext.userDisconnect();
          }
        } catch (error) {
          console.log(error);
     }
  };

  return { editAccount };
};
export default useEditAccount;
