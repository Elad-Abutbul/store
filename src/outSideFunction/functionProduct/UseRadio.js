import { useState } from "react";

const useRadio = () => {
  const [radio, setRadio] = useState(false);

  const checkRadio = (valContext, valProduct, indexProduct) => {
    if (radio) {
      valContext.addProductToSelectedIteamToPay(valProduct, indexProduct);
    } else if (valContext.userData.cart.length !== 0) {
      valContext.deleteProductFromSelectedIteamToPay(valProduct, indexProduct);
    }
  };
  return { checkRadio, radio, setRadio };
};
export default useRadio;
