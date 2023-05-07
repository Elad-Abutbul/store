import React, { useContext } from "react";
import { contextApi } from "../../../contextApi";
import Product from "../../Product";
import { URL } from "../../../constans/constans";
import typeProductsCss from '../../../styles/typeProducts.module.css'

export default function Bracelets() {
  const valContext = useContext(contextApi);
  return (
    <div>
      <h1 className={typeProductsCss.h1}>Bracelets</h1>
      {valContext.braceletProducts.map((valProduct, index) => {
        return (
          <Product index={index} valProduct={valProduct} url={URL.ADDTOCART} />
        );
      })}
    </div>
  );
}
