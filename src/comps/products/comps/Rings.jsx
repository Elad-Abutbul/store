import React, { useContext } from "react";
import { contextApi } from "../../../contextApi";
import Product from "../../Product";
import { URL } from "../../../constans/constans";
import typeProductsCss from '../../../styles/typeProducts.module.css'
export default function Rings() {
  const valContext = useContext(contextApi);
  return (
    <div>
      <h1 className={typeProductsCss.h1}>Rings</h1>
      {valContext.ringProducts.map((valProduct, index) => {
        return (
          <Product index={index} valProduct={valProduct} url={URL.ADDTOCART} />
        );
      })}
    </div>
  );
}
