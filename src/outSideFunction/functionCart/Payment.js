import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";
import { JWT } from "../../constans/jwtToken";
import { ROUTES } from "../../constans/Routes";
import { useNavigate } from "react-router-dom";

const usePayment = () => {
  const nav = useNavigate();
  const payment = async (valContext) => {
    const token = Cookies.get(JWT.TOKEN);
    if (valContext.selectedIteamToPay.length !== 0) {
      try {
        const res = await axios.post(
          POST.PAY,
          {
            items: valContext.selectedIteamToPay,
            userId: valContext.userData?._id,
          },
          {
            headers: {
              authorization: `${JWT.BEARER} ${token}`,
            },
          }
        );
        const data = res.data;
        if (data.msg === "Payment successful") {
          alert(data.msg);
          valContext.sumAllPurchases = data.sum?.totalSum;
          valContext.selectedIteamToPay.forEach((valProductSelected) => {
            valContext.paymentCart(valProductSelected);
            Cookies.set(JWT.TOKEN, data.token, { expires: 30 / (24 * 60) });
          });
        } else {
          alert(data);
          nav(ROUTES.ENTRY);
          Cookies.remove(JWT.TOKEN);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(`select a product`);
    }
  };

  return { payment };
};
export default usePayment;
