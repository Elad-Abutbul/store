import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import navCss from "../styles/nav.module.css";
import { ROUTES } from "../constans/Routes";
import { contextApi } from "../contextApi";

export default function Nav() {
  const valContext = useContext(contextApi);
  const [activeLink, setActiveLink] = useState(ROUTES.PRODUCTS);
  const handleLinkClick = (route) => {
    setActiveLink(route);
  };
  return (
    <>
      <nav className={navCss.navbar}>
        <Link to={ROUTES.PRODUCTS}>
          <h1 className={navCss.icon}>Elad's Jewelry Store</h1>
        </Link>
        <div className={navCss.nav}>
          <Link
            to={`${ROUTES.PROFILE}/${ROUTES.VIEWPURCHASES}`}
            className={`${navCss.link} ${
              activeLink === ROUTES.PROFILE ? navCss.activeLink : ""
            }`}
            onClick={() => handleLinkClick(ROUTES.PROFILE)}
          >
            PROFILE
          </Link>
          <Link
            to={ROUTES.SEARCH}
            className={`${navCss.link} ${
              activeLink === ROUTES.SEARCH ? navCss.activeLink : ""
            }`}
            onClick={() => handleLinkClick(ROUTES.SEARCH)}
          >
            SEARCH
          </Link>
          <Link
            to={ROUTES.PRODUCTS}
            className={`${navCss.link} ${
              activeLink === ROUTES.PRODUCTS ? navCss.activeLink : ""
            }`}
            onClick={() => handleLinkClick(ROUTES.PRODUCTS)}
          >
            PRODUCTS
          </Link>
          <Link
            to={ROUTES.CART}
            className={`${navCss.link} ${
              activeLink === ROUTES.CART ? navCss.activeLink : ""
            }`}
            onClick={() => handleLinkClick(ROUTES.CART)}
          >
            CART
            {valContext.userData.cart?.length !== 0 && (
              <span id={navCss.cartLength}>
                {valContext.userData.cart?.length}
              </span>
            )}
          </Link>
          <Link
            to={ROUTES.ENTRY}
            className={`${navCss.link} ${
              activeLink === ROUTES.ENTRY ? navCss.activeLink : ""
            }`}
            onClick={() => {
              handleLinkClick(ROUTES.ENTRY);
              valContext.userDisconnect();
            }}
          >
            LOG OUT
          </Link>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}
