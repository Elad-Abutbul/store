import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../contextApi";
import Product from "./Product";
import cartCss from "../styles/cart.module.css";
import { URL } from "../constans/Url";
import axios from "../axiosConfig";
import { POST } from "../constans/AxiosPost";

export default function Cart() {
  const valContext = useContext(contextApi);
  const [paySum, setPaySum] = useState(0);
  const [falseRadioAfterPay, setFalseRadioAfterPay] = useState(false);

  const sum = () => {
    let sumSelected = 0;
    valContext.selectedIteamToPay.forEach((val) => {
      return (sumSelected += val.price);
    });
    setPaySum(sumSelected);
  };

  useEffect(() => {
    sum();
  }, [valContext.selectedIteamToPay]);

  const pay = async () => {
    if (valContext.selectedIteamToPay.length !== 0) {
      try {
        const res = await axios.post(POST.PAY, {
          items: valContext.selectedIteamToPay,
          userId: valContext.userData._id,
        });
        const data = await res.data;
        if (data === "Payment successful") {
          alert(data);
          valContext.selectedIteamToPay.forEach((valProductSelected) => {
            valContext.paymentCart(valProductSelected);
          });
          sum();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(`select a product`);
    }
    setFalseRadioAfterPay(!falseRadioAfterPay);
  };
  const geta = (indexProduct, productId) => {
    valContext.deleteFromCart(indexProduct);
    valContext.deleteProductFromSelectedIteamToPayUi(productId);
  };
  return (
    <div>
      <h1 className={cartCss.h1}>My Cart:</h1>
      <p></p>
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
            geta={geta}
          />
        );
      })}

      {valContext.userData.cart.length !== 0 ?<div>
        <h3>Your Total is: {paySum}₪</h3>
      <button className={cartCss.payAllBtn} onClick={pay}>
        Pay
      </button>
     </div> :'There are no items in the cart'}
    </div>
  );
}
