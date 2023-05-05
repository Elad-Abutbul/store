import React, { useState } from "react";
import DeleteAlert from "./DeleteAlert";

export default function DeleteAccount() {
  const [showAlert, setShowAlert] = useState(false);
  const changeCond = () => {
    setShowAlert(false)
  }
  return <div>{showAlert ? <DeleteAlert changeCond={changeCond} /> : <h2 onClick={()=>setShowAlert(true)}>delete</h2>}</div>;
}
