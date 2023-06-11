import React from "react";
import { Link } from "react-router-dom";
import navCss from "../../../styles/nav.module.css";
import { EMPTYSTRING } from "../../../constans/EmptyString";
import { ROUTES } from "../../../constans/Routes";

export default function NavManagement({ activeLink, handleLinkClick }) {
  return (
    <>
      {" "}
      <Link
        to={`${ROUTES.USERSCEO}/${ROUTES.LIST_OF_ALL_USERS}`}
        className={`${navCss.link} ${
          activeLink === ROUTES.USERSCEO
            ? navCss.activeLink
            : EMPTYSTRING.EMPTYSTRING
        }`}
        onClick={() => handleLinkClick(`${ROUTES.USERSCEO}`)}
      >
        USERS CEO
      </Link>
      <Link
        to={`${ROUTES.PRODUCTSCEO}/${ROUTES.ADDPRODUCTS}`}
        className={`${navCss.link} ${
          activeLink === ROUTES.PRODUCTSCEO
            ? navCss.activeLink
            : EMPTYSTRING.EMPTYSTRING
        }`}
        onClick={() => handleLinkClick(`${ROUTES.PRODUCTSCEO}`)}
      >
        PRODUCTS CEO
      </Link>
    </>
  );
}
