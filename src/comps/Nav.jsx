import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import navCss from "../styles/nav.module.css";
import { ROUTES } from "../constans/Routes";
import { contextApi } from "../contextApi";
import { NAV } from "../constans/hardCoded/nav/NavHardCoded";
import { EMPTYSTRING } from "../constans/EmptyString";
import NavManagement from "./management/comps/NavMng";
import { RANKSUSER } from "../constans/RanksUser.js";

export default function Nav() {
  const valContext = useContext(contextApi);
  const [activeLink, setActiveLink] = useState(ROUTES.PRODUCTS);
  const [cartLengthChanged, setCartLengthChanged] = useState(false);

  const handleLinkClick = (route) => {
    setActiveLink(route);
  };
  useEffect(() => {
    if (valContext.userData?.cart?.length !== 0) {
      setCartLengthChanged(true);
      const timer = setTimeout(() => {
        setCartLengthChanged(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [valContext.userData?.cart?.length]);
  return (
    <>
      <nav className={navCss.navbar}>
        <Link to={ROUTES.PRODUCTS}>
          <h1 className={navCss.icon}>{NAV.ELAD_JEWELRY_STORE}</h1>
        </Link>
        <Link to={ROUTES.PRODUCTS}>
          <img
            className={navCss.iconPhone}
            src="https://cdn-user-icons.flaticon.com/102795/102795171/1684862033391.svg?token=exp=1684862934~hmac=96f8071cd1086958c97134a38b780846"
          />
        </Link>
        <div className={navCss.nav}>
          {valContext.userData?.rank === RANKSUSER.CEO && (
            <NavManagement
              activeLink={activeLink}
              handleLinkClick={handleLinkClick}
            />
          )}
          <Link
            to={`${ROUTES.PROFILE}/${ROUTES.VIEWPURCHASES}`}
            className={`${navCss.link} ${
              activeLink === ROUTES.PROFILE
                ? navCss.activeLink
                : EMPTYSTRING.EMPTYSTRING
            }`}
            onClick={() => handleLinkClick(ROUTES.PROFILE)}
          >
            {NAV.PROFILE}
          </Link>
          <Link
            to={ROUTES.SEARCH}
            className={`${navCss.link} ${
              activeLink === ROUTES.SEARCH
                ? navCss.activeLink
                : EMPTYSTRING.EMPTYSTRING
            }`}
            onClick={() => handleLinkClick(ROUTES.SEARCH)}
          >
            {NAV.SEARCH}
          </Link>
          <Link
            to={ROUTES.PRODUCTS}
            className={`${navCss.link} ${
              activeLink === ROUTES.PRODUCTS
                ? navCss.activeLink
                : EMPTYSTRING.EMPTYSTRING
            }`}
            onClick={() => handleLinkClick(ROUTES.PRODUCTS)}
          >
            {NAV.PRODUCTS}
          </Link>
          <Link
            to={ROUTES.CART}
            className={`${navCss.link} ${
              activeLink === ROUTES.CART
                ? navCss.activeLink
                : EMPTYSTRING.EMPTYSTRING
            }`}
            onClick={() => handleLinkClick(ROUTES.CART)}
          >
            {NAV.CART}
            {valContext.userData.cart?.length !== 0 && (
              <span id={!cartLengthChanged && navCss.cartLength}>
                {valContext.userData.cart?.length}
              </span>
            )}
          </Link>
          <Link
            to={ROUTES.ENTRY}
            className={`${navCss.link} ${
              activeLink === ROUTES.ENTRY
                ? navCss.activeLink
                : EMPTYSTRING.EMPTYSTRING
            }`}
            onClick={() => {
              const loadUserRank = async () => {
                handleLinkClick(ROUTES.ENTRY);
                await valContext.getAllUserRank();
                valContext.userDisconnect();
              };
              loadUserRank();
            }}
          >
            {NAV.LOGOUT}
          </Link>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}
