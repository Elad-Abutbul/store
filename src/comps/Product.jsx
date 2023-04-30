import React from "react";
import productCss from '../styles/product.module.css'
export default function Prodact({ val }) {
  return (
    <div className={productCss.singleProduct}>
      <h2>{val.name}</h2>
      <h2>{val.desc}</h2>
      <h2>{val.price}</h2>
      <image src={val.image} />
      <h1 value={ val.name}>+</h1>
    </div>
  );
}
