import React, { useState,useEffect,useContext } from "react";
import profileCss from "../../styles/profile.module.css";
import DeleteAccount from "./comps/DeleteAccount";
import ViewPurches from "./comps/ViewPurchese";
import EditProfile from "./comps/EditProfile";
import axios from "../../axiosConfig";
import { contextApi } from "../../contextApi";

export default function Profile() {
  const valContext = useContext(contextApi)
  const [selectedComponent, setSelectedComponent] = useState("edit");
  const [loading, setLoading] = useState(false);
  const [purches, setPurches] = useState();
  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  useEffect(() => {
    const getPurches = async () => {
      setLoading(true);
      debugger
      try {
        const res = await axios.post("/getPurches", {
          userId: valContext.userData._id,
        });
        const data = await res.data;
        setPurches(data);
        setLoading(false);
      } catch (error) {}
    };
    getPurches();
  }, []);
  const renderComponent = () => {
    switch (selectedComponent) {
      case "edit":
        return <EditProfile />;
      case "delete":
        return <DeleteAccount />;
      case "view": {
        return loading ? <h1>Loading...</h1> : <ViewPurches purchese={purchese} />;
      }
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
            className={`${profileCss.btn} ${
              selectedComponent === "edit" ? profileCss.active : ""
            }`}
            onClick={() => handleSelectComponent("edit")}
          >
            Edit Profile
          </button>
          <button
            className={`${profileCss.btn} ${
              selectedComponent === "view" ? profileCss.active : ""
            }`}
            onClick={() => handleSelectComponent("view")}
          >
            View Purchases
          </button>
          <button
            className={`${profileCss.btn} ${
              selectedComponent === "delete" ? profileCss.active : ""
            }`}
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
