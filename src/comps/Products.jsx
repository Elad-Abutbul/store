import React, { useContext } from "react";
import Prodact from "./Product";
import { contextApi } from "../contextApi";
import productsCss from "../styles/products.module.css";
import { URL } from "../constans/constans";

export default function Products() {
  const valContext = useContext(contextApi);
  const name = valContext.userData.name;
  const lastName = valContext.userData.lastName;

  return (
    <div>
      <h1 className={productsCss.h1Name}>
        welcome {name} {lastName}
      </h1>
      {valContext.products.map((valProduct, index) => {
        return (
          <Prodact index={index} valProduct={valProduct} url={URL.ADDTOCART} />
        );
      })}
    </div>
  );
}
