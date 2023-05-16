import React, { useContext } from "react";
import { contextApi } from "../../../contextApi";
import Product from "../../Product";

export default function ViewPurchases() {
  const valContext = useContext(contextApi);
  return (
    <div>
      {valContext.userData.historyOfCart.length !== 0
        ? valContext.userData.historyOfCart.map((valProduct) => {
            return <Product valProduct={valProduct} />;
          })
        : "No Purchases"}
    </div>
  );
}
