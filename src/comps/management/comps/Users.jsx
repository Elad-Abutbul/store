import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../../../contextApi";
import userMngCss from "../../../styles/userMng.module.css";
import useDeleteUser from "../../../outSideFunction/functionDeleteUser/DeleteUser";
import { CART } from "../../../constans/hardCoded/cart/CartHardCoded";
import { PRODUCT } from "../../../constans/hardCoded/product/ProductHardCoded";
import { USERMNG } from "../../../constans/hardCoded/mangement/usersMng/UsersMngHardCoded";
import { DELETE } from "../../../constans/hardCoded/deleteAccount/DeleteHardCoded";
import useSearchByUserName from "../../../outSideFunction/functionMng/SearchByUserName";

export default function Users() {
  const valContext = useContext(contextApi);
  const { searchByUserName } = useSearchByUserName();
  const { deleteUser, userName, setUserName } = useDeleteUser();
  const [search, setSearch] = useState([]);

  useEffect(() => {
    searchByUserName(userName, setSearch);
  }, [userName]);
  const rr = () => {
    if (valContext.rankUser.length !== 0 && search.length !== 0) {
      return search;
    } else if (valContext.rankUser.length !== 0 && search.length === 0) {
      return valContext.rankUser;
    }
  };

  const getUsers = () => {
    return valContext.rankUser.length !== 0 ? (
      <table id={userMngCss.table}>
        <tr>
          <th className={userMngCss.boxes}>{USERMNG.FULL_NAME}</th>
          <th className={userMngCss.boxes}>{USERMNG.USER_NAME}</th>
          <th className={userMngCss.boxes}>{USERMNG.ALL_PURCHASES}</th>
          <th className={userMngCss.boxes}>{USERMNG.TOTAL_PRICE_PURCHASES}</th>
          <th className={userMngCss.boxes}>{DELETE.DELETE}</th>
        </tr>

        {rr().map((val) => {
          let sum = 0;
          val.historyOfCart.forEach((valHistory) => {
            return (sum += valHistory.price);
          });
          return (
            <>
              <tr className={userMngCss.tr}>
                <td className={userMngCss.boxes}>
                  {val.name} {val.lastName}
                </td>
                <td className={userMngCss.boxes}>{val.userName}</td>
                <td className={userMngCss.boxes}>
                  {val.historyOfCart?.length}
                </td>
                <td className={userMngCss.boxes}>
                  {sum}
                  {CART.SHEKEL}
                </td>
                <td
                  className={` ${userMngCss.boxes} ${userMngCss.X}`}
                  onClick={() => {
                    deleteUser(val.userName);
                  }}
                >
                  {PRODUCT.X}
                </td>
              </tr>
            </>
          );
        })}
      </table>
    ) : (
      <p>{USERMNG.NO_USERS_TO_SHOW}</p>
    );
  };

  return (
    <div className={userMngCss.mainContainer}>
      <h1 className={userMngCss.allUsers}>{USERMNG.ALL_USERS}</h1>
      <input
        type="text"
        placeholder="search by userName"
        onChange={(e) => setUserName(e.target.value)}
      />
      {getUsers()}
    </div>
  );
}
