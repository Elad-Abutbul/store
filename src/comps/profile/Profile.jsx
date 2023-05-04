import React, { useState } from "react";
import profileCss from "../../styles/profile.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constans/constans";
import DeleteAccount from "./comps/DeleteAccount";
import ViewPurches from "./comps/ViewPurches";
import EditProfile from "./comps/EditProfile";

export default function Profile() {
  const [selectedComponent, setSelectedComponent] = useState("edit");

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "edit":
        return <EditProfile />;
      case "delete":
        return <DeleteAccount />;
      case "view":
        return <ViewPurches />;
      default:
        return <EditProfile />;
    }
  };

  return (
    <>
      <div className={profileCss.container}>
        <h1 className={profileCss.h1}>Profile</h1>
        <div className={profileCss.links}>
          <button
            className={`${profileCss.btn} ${selectedComponent === "edit" ? profileCss.active : ""}`}
            onClick={() => handleSelectComponent("edit")}
          >
            Edit Profile
          </button>
            <button
              className={`${profileCss.btn} ${selectedComponent === "view" ? profileCss.active : ""}`}
              onClick={() => handleSelectComponent("view")}
            >
              View Purchases
            </button>
          <button
            className={`${profileCss.btn} ${selectedComponent === "delete" ? profileCss.active : ""}`}
            onClick={() => handleSelectComponent("delete")}
          >
            Delete Account
          </button>
        </div>
        <div className={profileCss.components}>{renderComponent()}</div>
      </div>
    </>
  );
}
