import React, { useContext } from "react";
import Prodact from "./Product";
import { contextApi } from "../contextApi";
import productsCss from "../styles/products.module.css";

export default function Products() {
  const valContext = useContext(contextApi);
  const name = valContext.userData.name;
  const lastName = valContext.userData.lastName;
  
  return (
    <div>
      <h1 className={productsCss.h1Name}>welcome {name} {lastName}</h1>
      {valContext.products.map((val,index) => {
        return <Prodact key={index} index={index} val={val} url='AddToCart' />;
      })}
    </div>
  );
}
