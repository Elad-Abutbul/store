import React, { useState } from "react";
import userMngCss from "../../../../styles/userMng.module.css";
import { USERMNG } from "../../../../constans/hardCoded/mangement/usersMng/UsersMngHardCoded";
import { ROUTES } from "../../../../constans/Routes";
import { Link, Outlet } from "react-router-dom";
import profileCss from "../../../../styles/profile.module.css";
import { EMPTYSTRING } from "../../../../constans/EmptyString";
export default function Users() {
  const [activeLink, setActiveLink] = useState(ROUTES.LIST_OF_ALL_USERS);

  return (
    <div className={userMngCss.mainContainer}>
      <h1 className={userMngCss.h1}>{USERMNG.ALL_USERS}</h1>
      <div>
        <Link to={ROUTES.LIST_OF_ALL_USERS}>
          <button
            onClick={() => setActiveLink(ROUTES.LIST_OF_ALL_USERS)}
            className={`${profileCss.btn} ${
              activeLink === ROUTES.LIST_OF_ALL_USERS
                ? profileCss.active
                : EMPTYSTRING.EMPTYSTRING
            }`}
          >
            {USERMNG.ALL_USERS}
          </button>
        </Link>
        <Link to={ROUTES.LIST_OF_DELETING_USERS}>
          <button
            onClick={() => setActiveLink(ROUTES.LIST_OF_DELETING_USERS)}
            className={`${profileCss.btn} ${
              activeLink === ROUTES.LIST_OF_DELETING_USERS
                ? profileCss.active
                : EMPTYSTRING.EMPTYSTRING
            }`}
          >
            {USERMNG.ALL_DELETING_USERS}
          </button>
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
