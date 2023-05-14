import React from "react";
import { Link } from "react-router-dom";
import productsCss from "../styles/products.module.css";
import { ROUTES } from "../constans/Routes";
export default function ImgType({ val }) {
  return (
    <>
      <Link to={`${ROUTES.ELADJEWELRY}/${val.link}`}>
        <div className={productsCss.divImg}>
          <img className={productsCss.img} src={val.src} alt={val.alt} />
          <h3 className={productsCss.h3Slide}>{val.button}</h3>
        </div>
      </Link>
    </>
  );
}
