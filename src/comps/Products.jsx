import React, { useContext } from "react";
import Prodact from "./Product";
import { contextApi } from "../contextApi";
export default function Products(props) {
  const valContext = useContext(contextApi);
  const name = valContext.name;
  const lastName = valContext.lastName;
  
  return (
    <div>
      <h1>welcome {name} {lastName}</h1>
      {props.products.map((val,index) => {
        return <Prodact key={index} val={val} url='getAddToCart' />;
      })}
    </div>
  );
}
