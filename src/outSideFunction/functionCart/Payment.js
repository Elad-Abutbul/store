import axios from "../../axiosConfig";
import { POST } from "../../constans/AxiosPost";

const usePayment = () => {
  const payment = async (valContext) => {
    if (valContext.selectedIteamToPay.length !== 0) {
      try {
        const res = await axios.post(POST.PAY, {
          items: valContext.selectedIteamToPay,
          userId: valContext.userData._id,
        });
        const data = res.data;
        if (data === "Payment successful") {
          alert(data);
          valContext.selectedIteamToPay.forEach((valProductSelected) => {
            valContext.paymentCart(valProductSelected);
          });
        } else {
          alert(data)
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
