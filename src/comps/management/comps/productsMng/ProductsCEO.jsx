import React, { useState } from "react";
import userMngCss from "../../../../styles/userMng.module.css";
import { USERMNG } from "../../../../constans/hardCoded/mangement/usersMng/UsersMngHardCoded";
import { ROUTES } from "../../../../constans/Routes";
import { Link, Outlet } from "react-router-dom";
import profileCss from "../../../../styles/profile.module.css";
import { EMPTYSTRING } from "../../../../constans/EmptyString";
export default function ProductsCEO() {
  const [activeLink, setActiveLink] = useState(ROUTES.LIST_OF_ALL_USERS);

  return (
    <div className={userMngCss.mainContainer}>
      <h1 className={userMngCss.h1}>Product CEO</h1>
      <div>
        <Link to={ROUTES.ADDPRODUCTS}>
          <button
            onClick={() => setActiveLink(ROUTES.LIST_OF_ALL_USERS)}
            className={`${profileCss.btn} ${
              activeLink === ROUTES.LIST_OF_ALL_USERS
                ? profileCss.active
                : EMPTYSTRING.EMPTYSTRING
            }`}
          >
            add a product
          </button>
        </Link>
        <Link to={ROUTES.LIST_OF_DELETING_PRODUCTS}>
          <button
            onClick={() => setActiveLink(ROUTES.LIST_OF_DELETING_PRODUCTS)}
            className={`${profileCss.btn} ${
              activeLink === ROUTES.LIST_OF_DELETING_PRODUCTS
                ? profileCss.active
                : EMPTYSTRING.EMPTYSTRING
            }`}
          >
            list of deleting products
          </button>
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
