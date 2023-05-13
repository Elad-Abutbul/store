import React, { useState } from "react";
import profileCss from "../../styles/profile.module.css";
import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "../../constans/Routes";

export default function Profile() {
  const [selectedComponent, setSelectedComponent] = useState("");

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <>
      <div className={profileCss.container}>
        <h1 className={profileCss.h1}>Profile</h1>
        <div className={profileCss.links}>
          <Link to={ROUTES.EDIT}>
            <button
              className={`${profileCss.btn} ${
                selectedComponent === ROUTES.EDIT ? profileCss.active : ""
              }`}
              onClick={() => handleSelectComponent(ROUTES.EDIT)}
            >
              Edit Profile
            </button>
          </Link>
          <Link to={ROUTES.VIEWPURCHASES}>
            <button
              className={`${profileCss.btn} ${
                selectedComponent === ROUTES.VIEWPURCHASES
                  ? profileCss.active
                  : ""
              }`}
              onClick={() => handleSelectComponent(ROUTES.VIEWPURCHASES)}
            >
              View Purchases
            </button>
          </Link>
          <Link to={ROUTES.DELETEACCOUNT}>
            <button
              className={`${profileCss.btn} ${
                selectedComponent === ROUTES.DELETEACCOUNT
                  ? profileCss.active
                  : ""
              }`}
              onClick={() => handleSelectComponent(ROUTES.DELETEACCOUNT)}
            >
              Delete Account
            </button>
          </Link>
        </div>
        <div id={profileCss.outlet}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
