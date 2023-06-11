import React, { useContext, useEffect, useState } from "react";
import userMngCss from "../../../../../styles/userMng.module.css";
import { contextApi } from "../../../../../contextApi";
import { USERMNG } from "../../../../../constans/hardCoded/mangement/usersMng/UsersMngHardCoded";
import { CART } from "../../../../../constans/hardCoded/cart/CartHardCoded";
import useSearchByUserNameDelete from "../../../../../outSideFunction/functionMng/SearchByUserNameDeleteUsers";
import useCreateAccount from "../../../../../outSideFunction/functionSignUp/CreateAccount";
export default function ListOfAllDeletingUsers() {
  const valContext = useContext(contextApi);
  const [search, setSearch] = useState([]);
  const [userName, setUserName] = useState("");
  const { createAccount } = useCreateAccount();
  const { searchByUserNameDelete } = useSearchByUserNameDelete();
  useEffect(() => {
    searchByUserNameDelete(userName, setSearch);
  }, [userName]);

  const searchUsers = () => {
    if (valContext.userData.deleteUsers.length !== 0 && search.length !== 0) {
      return search;
    } else if (
      valContext.userData.deleteUsers.length !== 0 &&
      search.length === 0
    ) {
      return valContext.userData.deleteUsers;
    }
  };
  const getUsers = () => {
    return valContext.userData.deleteUsers.length !== 0 ? (
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
              <th className={userMngCss.boxes}>{USERMNG.RECOVER}</th>
            </tr>
            {searchUsers().map((val) => {
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
                      className={` ${userMngCss.boxes} ${userMngCss.vi}`}
                      onClick={() => {
                        createAccount(val);
                      }}
                    >
                      {USERMNG.VI}
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
