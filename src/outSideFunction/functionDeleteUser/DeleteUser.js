import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { ROUTES } from "../../constans/Routes";

const useDeleteUser = () => {
  const deleteUser = async (valContext, nav) => {
    try {
      const res = await axios.delete(POST.DELETEUSER, {
        userId: valContext.userData._id,
      });
      const data = res.data;
      if (data === "delete the user") {
        alert(data);
        valContext.userDisconnect();
        nav(ROUTES.ENTRY);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteUser };
};
export default useDeleteUser;
