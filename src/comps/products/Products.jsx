import React, { useContext } from "react";
import { contextApi } from "../../contextApi";
import productsCss from "../../styles/products.module.css";
import ImgType from "../ImgType";
export default function Products() {
  const valContext = useContext(contextApi);
  const name = valContext.userData.name;
  const lastName = valContext.userData.lastName;
  return (
    <div>
      <h1 className={productsCss.h1Name}>
        welcome {name} {lastName}
      </h1>
      <div className={productsCss.imgType}>
        {valContext.typeProductImg.map((valProductImg) => {
          return <ImgType valProductImg={valProductImg} />;
        })}
      </div>
    </div>
  );
}
