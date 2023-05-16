import React, { useContext } from "react";
import { contextApi } from "../../../contextApi";
import Product from "../../Product";
import { VIEW } from "../../../constans/hardCoded/viewPurchases/ViewHardCoded";
export default function ViewPurchases() {
  const valContext = useContext(contextApi);
  const historyOfCart = valContext.userData.historyOfCart;
  return (
    <div>
      {historyOfCart.length !== 0
        ? historyOfCart.map((valProduct) => {
            return <Product valProduct={valProduct} />;
          })
        : VIEW.NOPURCHASES}
    </div>
  );
}
