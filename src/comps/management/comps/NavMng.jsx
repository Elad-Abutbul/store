import React from "react";
import { Link } from "react-router-dom";
import navCss from "../../../styles/nav.module.css";
import { EMPTYSTRING } from "../../../constans/EmptyString";

export default function NavManagement({ activeLink, handleLinkClick }) {
  return (
    <div id={navCss.navMng}>
      <Link
        to={"users"}
        className={`${navCss.link} ${
          activeLink === "users"
            ? navCss.activeLink
            : EMPTYSTRING.EMPTYSTRING
        }`}
        onClick={() => handleLinkClick("users")}
      >
        USERS
      </Link>
    </div>
  );
}
