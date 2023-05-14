import { useState } from "react";

const usePaymentCart = () => {
  const [userData, setUserData] = useState(false);

  const pay = (valProduct) => {
    let indexProduct = userData.cart.findIndex(
      (val) => valProduct._id === val._id
    );
    userData.historyOfCart.unshift(valProduct);
    userData.cart.splice(indexProduct, 1);
    setUserData({ ...userData });
     };
     return {pay,userData,setUserData}
};
export default usePaymentCart;
