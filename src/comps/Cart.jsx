import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../contextApi";
import Prodact from "./Product";
export default function Cart() {
  const [pay, setPay] = useState(0);
  const valContext = useContext(contextApi);
  let sum = 0;
  useEffect(() => {
    valContext.cart.forEach(val => {
      sum+=val.price
    })
    setPay(sum)
  },[])
  
 
  return <div>
    <h1>my cart:</h1>
    {valContext?.cart?.map((val, index) => {
      return <Prodact key={index} val={val} />
    
    })}
    <h3>your total is:{pay}</h3>
    <button>pay all</button>
  </div>;
}
