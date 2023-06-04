import React from "react";
import { Link } from "react-router-dom";
import navCss from "../../../styles/nav.module.css";
import { EMPTYSTRING } from "../../../constans/EmptyString";
import { ROUTES } from "../../../constans/Routes";

export default function NavManagement({ activeLink, handleLinkClick }) {
  return (
    <div id={navCss.navMng}>
      <Link
        to={`${ROUTES.USERS}/${ROUTES.LIST_OF_ALL_USERS}`}
        className={`${navCss.link} ${
          activeLink === ROUTES.USERS
            ? navCss.activeLink
            : EMPTYSTRING.EMPTYSTRING
        }`}
        onClick={() => handleLinkClick(`${ROUTES.USERS}`)}
      >
        USERS
      </Link>
    </div>
  );
}
