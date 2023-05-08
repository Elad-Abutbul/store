import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../contextApi";
import Product from "./Product";
import cartCss from "../styles/cart.module.css";
import { URL } from "../constans/constans";
import axios from "../axiosConfig";

export default function Cart() {
  const valContext = useContext(contextApi);
  const [paySum, setPaySum] = useState(0);
  const [falseRaioAfterPay, setFalseRaioAfterPay] = useState(false);
  const sum = () => {
    let sum = 0;
    valContext.selectedIteamToPay.forEach((val) => {
      return (sum += val.price);
    });
    setPaySum(sum);
  };
  useEffect(() => {
    sum();
  }, [valContext.selectedIteamToPay]);
  const pay = async () => {
    if (valContext.selectedIteamToPay.length !== 0) {
      try {
        const res = await axios.post("/pay", {
          items: valContext.selectedIteamToPay,
          userId: valContext.userData._id,
        });
        const data = await res.data;

        if (data === "payment succsess") {
          valContext.selectedIteamToPay.forEach((valProduct, indexProduct) => {
            debugger
            valContext.deleteProductFromSelectedIteamUi(indexProduct);
            valContext.paymentCart(valProduct);
          sum();

          });

        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(`select a product`);
    }
    setFalseRaioAfterPay(!falseRaioAfterPay);
  };
  const deleteIteam = async (productId, indexProduct) => {
    try {
      const res = await axios.post("/deleteIteam", {
        productId: productId,
        userNameId: valContext.userData._id,
      });
      const data = await res.data;
      if (data === "Product deleted from cart") {
        debugger
        alert(data);
        valContext.deleteFromCart(indexProduct);
        valContext.deleteProductFromSelectedIteamUi(indexProduct);
     
      } else {
        console.error(data);
      }
    } catch (err) {
      console.log(err);
    }
    sum();
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
            deleteIteam={deleteIteam}
            valProduct={valProduct}
            indexProduct={indexProduct}
            url={URL.ONCART}
            falseRaioAfterPay={falseRaioAfterPay}
          />
        );
      })}
      <h3>Your Total is: {paySum}₪</h3>
      <button className={cartCss.payAllBtn} onClick={pay}>
        Pay
      </button>
    </div>
  );
}
