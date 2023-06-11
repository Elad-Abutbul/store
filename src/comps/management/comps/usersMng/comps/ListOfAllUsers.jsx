import React, { useContext, useEffect, useState } from "react";
import userMngCss from "../../../../../styles/userMng.module.css";
import { contextApi } from "../../../../../contextApi";
import { USERMNG } from "../../../../../constans/hardCoded/mangement/usersMng/UsersMngHardCoded";
import { DELETE } from "../../../../../constans/hardCoded/deleteAccount/DeleteHardCoded";
import { CART } from "../../../../../constans/hardCoded/cart/CartHardCoded";
import { PRODUCT } from "../../../../../constans/hardCoded/product/ProductHardCoded";
import useDeleteUser from "../../../../../outSideFunction/functionDeleteUser/DeleteUser";
import useSearchByUserName from "../../../../../outSideFunction/functionMng/SearchByUserName";
export default function ListOfAllUsers() {
  const valContext = useContext(contextApi);
  const [search, setSearch] = useState([]);
  const [userName, setUserName] = useState("");

  const { deleteUser } = useDeleteUser();
  const { searchByUserName } = useSearchByUserName();

  useEffect(() => {
    searchByUserName(userName, setSearch);
  }, [userName]);
  
  useEffect(() => {
    valContext.getAllUserRank();
  }, []);
  const searchUsers = () => {
    if (valContext.rankUser.length !== 0 && search.length !== 0) {
      return search;
    } else if (valContext.rankUser.length !== 0 && search.length === 0) {
      return valContext.rankUser;
    }
  };

  const getUsers = () => {
    return valContext.rankUser.length !== 0 ? (
      <>
        <input
          type="text"
          placeholder="search by userName..."
          onChange={(e) => setUserName(e.target.value)}
        />
        <table id={userMngCss.table}>
          <tbody>
            <tr>
              <th className={userMngCss.boxes}>{USERMNG.FULL_NAME}</th>
              <th className={userMngCss.boxes}>{USERMNG.USER_NAME}</th>
              <th className={userMngCss.boxes}>{USERMNG.ALL_PURCHASES}</th>
              <th className={userMngCss.boxes}>
                {USERMNG.TOTAL_PRICE_PURCHASES}
              </th>
              <th className={userMngCss.boxes}>{DELETE.DELETE}</th>
            </tr>

            {searchUsers().map((val) => {
              let sum = 0;
              val.historyOfCart?.forEach((valHistory) => {
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
                        deleteUser(val);
                      }}
                    >
                      {PRODUCT.X}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </>
    ) : (
      <p>{USERMNG.NO_USERS_TO_SHOW}</p>
    );
  };
  return <div>{getUsers()}</div>;
}
