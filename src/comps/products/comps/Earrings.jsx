import React, { useContext } from "react";
import { contextApi } from "../../../contextApi";
import Product from "../../Product";
import { URL } from "../../../constans/Url";
import typeProductsCss from "../../../styles/typeProducts.module.css";

export default function Earrings() {
  const valContext = useContext(contextApi);
  return (
    <div>
      <h1 className={typeProductsCss.h1}>Earrings</h1>

      {valContext.earringProducts.map((valProduct, index) => {
        return (
          <Product index={index} valProduct={valProduct} url={URL.ADDTOCART} />
        );
      })}
    </div>
  );
}
