import React, { useContext } from "react";
import { contextApi } from "../../../contextApi";
import Product from "../../Product";
import { URL } from "../../../constans/Url";
import typeProductsCss from "../../../styles/typeProducts.module.css";
import { PRODUCTS } from "../../../constans/hardCoded/mangement/productsMng/products";
export default function Rings() {
  const valContext = useContext(contextApi);
  return (
    <div>
      <h1 className={typeProductsCss.h1}>{PRODUCTS.RING}</h1>
      {valContext.ringProducts.map((valProduct, index) => {
        return (
          <Product index={index} valProduct={valProduct} url={URL.ADDTOCART} />
        );
      })}
    </div>
  );
}
