import React from "react";
import { Link } from "react-router-dom";
import productsCss from "../styles/products.module.css";
import { ROUTES } from "../constans/Routes";
export default function ImgType({ valProductImg }) {
  return (
    <Link to={`${ROUTES.ELADJEWELRY}/${valProductImg.link}`}>
      <div className={productsCss.divImg}>
        <img
          className={productsCss.img}
          src={valProductImg.src}
          alt={valProductImg.alt}
        />
        <h3 className={productsCss.h3}>{valProductImg.button}</h3>
      </div>
    </Link>
  );
}
