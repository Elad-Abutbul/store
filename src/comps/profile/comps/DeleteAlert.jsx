import React, { useContext } from "react";
import axios from "../../../axiosConfig";
import { contextApi } from "../../../contextApi";
import { useNavigate } from "react-router-dom";
import deleteCss from "../../../styles/deleteAccount.module.css";
import { ROUTES } from "../../../constans/Routes";

export default function DeleteAlert({ changeCond }) {
  const valContext = useContext(contextApi);
  const nav = useNavigate();
  const deleteUser = async () => {
    try {
      const res = await axios.delete("/deleteUser", {
        userId: valContext.userData._id,
      });
      const data = await res.data;
      if (data === "delete the user") {
        alert(data);
        valContext.userDisconnect();
        nav(ROUTES.ENTRY);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className={deleteCss.h2Alert}>ARE YOU SURE?</h2>
      <div id={deleteCss.deleteQuestion}>
        <button
          onClick={() => {
            deleteUser();
          }}
          id={deleteCss.btnConfirmDelete}
          className={deleteCss.yesNo}
        >
          yes
        </button>
        <button onClick={changeCond} className={deleteCss.yesNo}>
          no
        </button>
      </div>
    </div>
  );
}
