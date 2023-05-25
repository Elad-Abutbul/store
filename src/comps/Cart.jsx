import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../contextApi";
import Product from "./Product";
import cartCss from "../styles/cart.module.css";
import { URL } from "../constans/Url";

import usePayment from "../outSideFunction/functionCart/Payment";
import { CART } from "../constans/hardCoded/cart/CartHardCoded";
import { RANKSUSER } from "../constans/RanksUser";
export default function Cart() {
  const valContext = useContext(contextApi);
  const [sum, setSum] = useState(0);
  const [falseRadioAfterPay, setFalseRadioAfterPay] = useState(false);
  const { payment } = usePayment();

  const TotalPurchases = () => {
    let total = 0;
    valContext.selectedIteamToPay.forEach((product) => {
      return (total +=
        valContext.userData.rank === RANKSUSER.CEO
          ? product.price * 0.5
          : product.price);
    });
    setSum(total);
  };

  useEffect(() => {
    TotalPurchases();
  }, [valContext.selectedIteamToPay]);

  const pay = async () => {
    payment(valContext);
    TotalPurchases();
    setFalseRadioAfterPay(!falseRadioAfterPay);
  };
  return (
    <div>
      <h1 className={cartCss.h1}>{CART.MYCART}</h1>
      {valContext.userData?.cart?.map((valProduct, indexProduct) => {
        return (
          <Product
            TotalPurchases={TotalPurchases}
            valProduct={valProduct}
            indexProduct={indexProduct}
            url={URL.ONCART}
            falseRadioAfterPay={falseRadioAfterPay}
          />
        );
      })}
      {valContext.userData.cart.length !== 0 ? (
        <div>
          <h3>
            {CART.YOURTOTAL} {sum}
            {CART.SHEKEL}
          </h3>
          <button className={cartCss.payAllBtn} onClick={pay}>
            {CART.PAY}
          </button>
        </div>
      ) : (
        CART.NOITEMSINCART
      )}
    </div>
  );
}
