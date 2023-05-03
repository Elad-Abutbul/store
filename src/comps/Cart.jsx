import React, { useContext, useState } from "react";
import { contextApi } from "../contextApi";
import Prodact from "./Product";
import cartCss from "../styles/cart.module.css";
import { URL } from "../constans/constans";
import axios from "../axiosConfig";
// import Payment from "./Payment";
export default function Cart() {
  const valContext = useContext(contextApi);
  const pay = async () => {
    if (valContext.selectedIteamToPay.length !== 0) {
      try {
        const res = await axios.post("/pay", { items: valContext.selectedIteamToPay ,userId:valContext.userData._id});
        const data = await res.data;

        if (data === "payment succsess") {
          alert(data)
          valContext.selectedIteamToPay.map((val) => {
           valContext.paymentCart(val)
         })
        }
      } catch (error) {}
    }
  };
  return (
    <div>
      <h1 className={cartCss.h1}>my cart:</h1>
      <p></p>
      {valContext.userData?.cart?.map((valProduct, indexProduct) => {
        return (
          <Prodact
            valProduct={valProduct}
            indexProduct={indexProduct}
            url={URL.ONCART}
       
          />
        );
      })}
      <h3>your total is:</h3>
      <button onClick={pay}>pay all</button>
    </div>
  );
}
