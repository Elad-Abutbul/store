import React, { useContext } from "react";
import Prodact from "./Product";
import { contextApi } from "../contextApi";
import productsCss from "../styles/products.module.css";

export default function Products(props) {
  const valContext = useContext(contextApi);
  const name = valContext.name;
  const lastName = valContext.lastName;
  
  return (
    <div>
      <h1 className={productsCss.h1Name}>welcome {name} {lastName}</h1>
      {props.products.map((val,index) => {
        return <Prodact key={index} index={index} val={val} url='getAddToCart' />;
      })}
    </div>
  );
}
