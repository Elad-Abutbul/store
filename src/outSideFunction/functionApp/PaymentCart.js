import { useState } from "react";

const usePaymentCart = () => {
  const [userData, setUserData] = useState(false);

  const pay = (valProduct) => {
    let indexProduct = userData.cart.findIndex(
      (valProductCart) => valProduct._id === valProductCart._id
    );
    userData.historyOfCart.unshift(valProduct);
    userData.cart.splice(indexProduct, 1);
    setUserData({ ...userData });
  };
  return { pay, userData, setUserData };
};
export default usePaymentCart;
