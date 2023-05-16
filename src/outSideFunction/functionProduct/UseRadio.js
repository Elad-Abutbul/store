import { useState } from "react";

const useRadio = () => {
  const [radio, setRadio] = useState(false);

  const ifRadioTrue = (valContext, valProduct, indexProduct) => {
    if (radio) {
      valContext.addProductToSelectedIteamToPay(valProduct, indexProduct);
    } else if (valContext.userData.cart.length !== 0) {
      valContext.deleteProductFromSelectedIteamToPay(valProduct, indexProduct);
    }
  };
  return { ifRadioTrue, radio, setRadio };
};
export default useRadio;
