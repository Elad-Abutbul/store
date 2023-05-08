import React from "react";
import { Link } from "react-router-dom";
import productsCss from "../styles/products.module.css";
export default function ImgType({ val }) {
  return (
    <>
      <Link to={val.link}>
        <div className={productsCss.divImg}>
          <img className={productsCss.img} src={val.src} alt={val.alt} />
          <h3 className={productsCss.h3Slide}>{val.button}</h3>
        </div>
      </Link>
    </>
  );
}
