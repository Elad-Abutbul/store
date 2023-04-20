import React from "react";
import { Link } from "react-router-dom";
import navCss from "../styles/nav.module.css";
import { ROUTES } from "../constans/constans";
export default function Nav() {
  return (
    <div id={navCss.navBar}>
      <Link to={ROUTES.SEARCH}>
        <button className={navCss.btn}>SEARCH</button>
      </Link>
      <Link to={ROUTES.PRODUCTS}>
        <button className={navCss.btn}>PRODUCTS</button>
      </Link>
      <Link to={ROUTES.CART}>
        <button className={navCss.btn}>CART</button>
      </Link>
    </div>
  );
}
