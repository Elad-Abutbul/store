import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../contextApi";
import Prodact from "./Product";
import cartCss from "../styles/cart.module.css";

export default function Cart() {
  const [pay, setPay] = useState(0);
  const [refreshPage, setRefreshPage] = useState(false);
  const valContext = useContext(contextApi);
  const refresh = () => {
    console.log('e');
    setRefreshPage(!refreshPage)
  }
  return (
    <div>
      <h1 className={cartCss.h1}>my cart:</h1>
      {valContext?.cart?.map((val, index) => {
        return <Prodact key={index} val={val} index={index} url='cart' refresh={refresh} />;
      })}
      <h3>your total is:{pay}</h3>
      <button>pay all</button>
    </div>
  );
}
