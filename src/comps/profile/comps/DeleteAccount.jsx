import React, { useState } from "react";
import DeleteAlert from "./DeleteAlert";
import deleteCss from "../../../styles/deleteAccount.module.css";
import { DELETE } from "../../../constans/hardCoded/deleteAccount/DeleteHardCoded";
export default function DeleteAccount() {
  const [showAlert, setShowAlert] = useState(false);
  const changeCond = () => {
    setShowAlert(false);
  };
  return (
    <div>
      {showAlert ? (
        <DeleteAlert changeCond={changeCond} />
      ) : (
        <button
          onClick={() => setShowAlert(true)}
          className={deleteCss.btnDelete}
        >
          {DELETE.DELETE}
        </button>
      )}
    </div>
  );
}
