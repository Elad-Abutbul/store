import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import navCss from "../styles/nav.module.css";
import { ROUTES } from "../constans/Routes";
import { contextApi } from "../contextApi";
import { NAV } from "../constans/hardCoded/nav/NavHardCoded";
import { EMPTYSTRING } from "../constans/EmptyString";
import NavManagement from "./management/comps/NavMng";
import { RANKSUSER } from "../constans/RanksUser.js";
import Cookies from "js-cookie";
import { JWT } from "../constans/jwtToken";
import diamond from './diamond.png'
export default function Nav() {
  const valContext = useContext(contextApi);
  const [activeLink, setActiveLink] = useState(ROUTES.PRODUCTS);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [cartLengthChanged, setCartLengthChanged] = useState(false);
  const nav = useNavigate();
  const handleLinkClick = (route) => {
    setActiveLink(route);
    setIsNavOpen(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const logOut = async () => {
    valContext.userDisconnect();
    Cookies.remove(JWT.TOKEN);
    nav("/");
    await valContext.getAllUserRank();
  };

  useEffect(() => {
    if (valContext.userData?.cart?.length !== 0) {
      setCartLengthChanged(true);
      const timer = setTimeout(() => {
        setCartLengthChanged(false);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [valContext.userData?.cart?.length]);

  return (
    <>
      <nav className={navCss.navbar}>
        <Link to={ROUTES.PRODUCTS}>
          <h1 className={`${navCss.icon}`}>{NAV.ELAD_JEWELRY_STORE}</h1>
        </Link>
        <div className={navCss.phone}>
          <h1 className={navCss.menuIcon} onClick={toggleNav}>
            ☰
          </h1>
          <Link to={ROUTES.PRODUCTS}>
            <img
              className={navCss.iconPhone}
              src={diamond}
              alt="dimondIcon"
            />
          </Link>
        </div>

        <div className={`${navCss.nav} ${isNavOpen ? navCss.open : ""}`}>
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
            onClick={logOut}
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
