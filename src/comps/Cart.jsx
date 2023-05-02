import React, { useContext } from "react";
import { contextApi } from "../contextApi";
import Prodact from "./Product";
import cartCss from "../styles/cart.module.css";
import { URL } from "../constans/constans";

export default function Cart() {
  const valContext = useContext(contextApi);
  return (
    <div>
      <h1 className={cartCss.h1}>my cart:</h1>
      {valContext.userData.cart?.map((valProduct, index) => {
        return (
          <Prodact valProduct={valProduct} index={index} url={URL.ONCART} />
        );
      })}
      <h3>your total is:</h3>
      <button>pay all</button>
    </div>
  );
}
