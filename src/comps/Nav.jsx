import React, { useContext } from "react";
import { Link } from "react-router-dom";
import navCss from "../styles/nav.module.css";
import { ROUTES } from "../constans/constans";
import { contextApi } from "../contextApi";
export default function Nav() {
  const valContext = useContext(contextApi);
  return (
    <div id={navCss.navBar}>
          <Link to={ROUTES.PROFILE}>
        <button className={navCss.btn}>PROFILE</button>
      </Link>
      <Link to={ROUTES.SEARCH}>
        <button className={navCss.btn}>SEARCH</button>
      </Link>
      <Link to={ROUTES.PRODUCTS}>
        <button className={navCss.btn}>PRODUCTS</button>
      </Link>
      <Link to={ROUTES.CART}>
        <button className={navCss.btn}>CART</button>
      </Link>

  
      <Link to={ROUTES.ENTRY}>
        <button className={navCss.btn} onClick={valContext.userDisconnect}>
          LOG OUT
        </button>
      </Link>
    </div>
  );
}
