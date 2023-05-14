import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../contextApi";
import Product from "./Product";
import cartCss from "../styles/cart.module.css";
import { URL } from "../constans/Url";
import usePayment from "../outSideFunction/functionCart/Payment";

export default function Cart() {
  const valContext = useContext(contextApi);
  const [paySum, setPaySum] = useState(0);
  const [falseRadioAfterPay, setFalseRadioAfterPay] = useState(false);
  const { payment } = usePayment();

  const sum = () => {
    let sumSelected = 0;
    valContext.selectedIteamToPay.forEach((product) => {
      return (sumSelected += product.price);
    });
    setPaySum(sumSelected);
  };

  useEffect(() => {
    sum();
  }, [valContext.selectedIteamToPay]);

  const pay = async () => {
    payment(valContext);
    sum();
    setFalseRadioAfterPay(!falseRadioAfterPay);
  };
  return (
    <div>
      <h1 className={cartCss.h1}>My Cart:</h1>
      {valContext.userData?.cart?.map((valProduct, indexProduct) => {
        return (
          <Product
            sum={sum}
            setPaySum={setPaySum}
            paySum={paySum}
            valProduct={valProduct}
            indexProduct={indexProduct}
            url={URL.ONCART}
            falseRadioAfterPay={falseRadioAfterPay}
          />
        );
      })}
      {valContext.userData.cart.length !== 0 ? (
        <div>
          <h3>Your Total is: {paySum}₪</h3>
          <button className={cartCss.payAllBtn} onClick={pay}>
            Pay
          </button>
        </div>
      ) : (
        "There are no items in the cart"
      )}
    </div>
  );
}
