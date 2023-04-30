import React from "react";
import productCss from '../styles/product.module.css'
export default function Prodact({ val }) {
  console.log(val);
  return (
  
    <div className={productCss.singleProduct}>
      <h2>{val.name}</h2>
      <h2>{val.description}</h2>
      <h2>{val.price}</h2>
      <img className={productCss.img} src={val.image}/>
    </div>
  );
}
