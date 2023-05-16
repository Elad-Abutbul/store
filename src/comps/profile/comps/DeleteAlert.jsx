import React, { useContext } from "react";
import { contextApi } from "../../../contextApi";
import { useNavigate } from "react-router-dom";
import deleteCss from "../../../styles/deleteAccount.module.css";
import { DELETE } from "../../../constans/hardCoded/deleteAccount/DeleteHardCoded";
import useDeleteUser from "../../../outSideFunction/functionDeleteUser/DeleteUser";

export default function DeleteAlert({ changeCond }) {
  const valContext = useContext(contextApi);
  const nav = useNavigate();
  const {deleteUser}=useDeleteUser()
  const deleteTheUser =  () => {
    deleteUser(valContext,nav)
  };
  return (
    <div>
      <h2 className={deleteCss.h2Alert}>{DELETE.AREYOUSURE}</h2>
      <div id={deleteCss.deleteQuestion}>
        <button
          onClick={() => {
            deleteTheUser();
          }}
          id={deleteCss.btnConfirmDelete}
          className={deleteCss.deleteOrNotDelete}
        >
          {DELETE.YES}
        </button>
        <button onClick={changeCond} className={deleteCss.deleteOrNotDelete}>
        {DELETE.NO}
        </button>
      </div>
    </div>
  );
}
