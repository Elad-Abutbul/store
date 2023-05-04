import React, { useState } from "react";
import profileCss from "../../styles/profile.module.css";
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
      <div>
        <h1 className={profileCss.h1}>Profile</h1>
        <div id={profileCss.links}>
          <button
            className={profileCss.btn}
            onClick={() => handleSelectComponent("edit")}
          >
            Edit Profile
          </button>
            <button
              className={profileCss.btn}
              onClick={() => handleSelectComponent("view")}
            >
              View Purchases
            </button>
          <button
            className={profileCss.btn}
            onClick={() => handleSelectComponent("delete")}
          >
            Delete Account
          </button>
        </div>
        <div id={profileCss.components}>{renderComponent()}</div>
      </div>
    </>
  );
}
