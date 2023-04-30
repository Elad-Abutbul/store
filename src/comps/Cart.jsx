import React, { useContext } from "react";
import { contextApi } from "../contextApi";
import Prodact from "./Product";
export default function Cart() {
  const valContext = useContext(contextApi);
    console.log(valContext.cart);
  return <div>
    <h1>my cart:</h1>
    {valContext?.cart?.map((val, index) => {
      return <Prodact key={ index} val={val} />
    })}
    <button>pay all</button>
  </div>;
}
