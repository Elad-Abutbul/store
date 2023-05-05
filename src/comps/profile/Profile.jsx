import React, { useState } from "react";
import profileCss from "../../styles/profile.module.css";
import { Link, Outlet } from "react-router-dom";

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
          <Link to="edit">
            <button
               className={`${profileCss.btn} ${
                selectedComponent === "edit" ? profileCss.active : ""
              }`}
              onClick={() => handleSelectComponent("edit")} >Edit Profile</button>
          </Link>
          <Link to='viewPurchases'>
          <button    className={`${profileCss.btn} ${
                selectedComponent === "view" ? profileCss.active : ""
              }`}
              onClick={() => handleSelectComponent("view")}>View Purchases</button>
          </Link>
          <Link to='deleteAccount'>
          <button    className={`${profileCss.btn} ${
                selectedComponent === "delete" ? profileCss.active : ""
              }`}
              onClick={() => handleSelectComponent("delete")}>Delete Account</button>
         </Link>
    
        </div>
        <div id={profileCss.outlet}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
